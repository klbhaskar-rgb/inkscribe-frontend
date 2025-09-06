-- Drop existing trigger if it exists
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Drop existing function if it exists  
DROP FUNCTION IF EXISTS public.handle_new_user() CASCADE;

-- Create user_roles enum if not exists
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'app_role') THEN
        CREATE TYPE public.app_role AS ENUM ('admin', 'user');
    END IF;
END $$;

-- Create profiles table for user metadata
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    role app_role DEFAULT 'user' NOT NULL,
    bio TEXT,
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create blogs table
CREATE TABLE IF NOT EXISTS public.blogs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    cover_image TEXT,
    content TEXT NOT NULL,
    excerpt TEXT,
    tags TEXT[],
    analytics_data JSONB,
    views INTEGER DEFAULT 0,
    author_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    published BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create comments table
CREATE TABLE IF NOT EXISTS public.comments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    blog_id UUID REFERENCES public.blogs(id) ON DELETE CASCADE,
    user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    user_name TEXT NOT NULL,
    user_email TEXT,
    content TEXT NOT NULL,
    approved BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create blog_likes table
CREATE TABLE IF NOT EXISTS public.blog_likes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    blog_id UUID REFERENCES public.blogs(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(blog_id, user_id)
);

-- Create books table
CREATE TABLE IF NOT EXISTS public.books (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    cover_image TEXT,
    description TEXT,
    link TEXT,
    author TEXT,
    year INTEGER,
    category TEXT,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create blog_summaries table for AI-generated summaries
CREATE TABLE IF NOT EXISTS public.blog_summaries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    blog_id UUID REFERENCES public.blogs(id) ON DELETE CASCADE,
    summary TEXT NOT NULL,
    generated_by UUID REFERENCES auth.users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(blog_id)
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.books ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_summaries ENABLE ROW LEVEL SECURITY;

-- Create or replace function to check user role
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.profiles
    WHERE id = _user_id
      AND role = _role
  );
$$;

-- Create or replace function to auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
    INSERT INTO public.profiles (id, email, name, role)
    VALUES (
        NEW.id, 
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'name', NEW.email),
        CASE 
            WHEN NEW.email = 'admin@example.com' THEN 'admin'::app_role
            ELSE 'user'::app_role
        END
    );
    RETURN NEW;
END;
$$;

-- Create trigger for new user signup
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create or replace function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for timestamp updates
DROP TRIGGER IF EXISTS update_profiles_updated_at ON public.profiles;
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_blogs_updated_at ON public.blogs;
CREATE TRIGGER update_blogs_updated_at BEFORE UPDATE ON public.blogs
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_books_updated_at ON public.books;
CREATE TRIGGER update_books_updated_at BEFORE UPDATE ON public.books
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Drop existing policies if they exist and recreate
DROP POLICY IF EXISTS "Profiles are viewable by everyone" ON public.profiles;
CREATE POLICY "Profiles are viewable by everyone" ON public.profiles
    FOR SELECT USING (true);

DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile" ON public.profiles
    FOR UPDATE USING (auth.uid() = id);

-- RLS Policies for blogs
DROP POLICY IF EXISTS "Published blogs are viewable by everyone" ON public.blogs;
CREATE POLICY "Published blogs are viewable by everyone" ON public.blogs
    FOR SELECT USING (published = true OR auth.uid() = author_id OR has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins can create blogs" ON public.blogs;
CREATE POLICY "Admins can create blogs" ON public.blogs
    FOR INSERT WITH CHECK (has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins can update blogs" ON public.blogs;
CREATE POLICY "Admins can update blogs" ON public.blogs
    FOR UPDATE USING (has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins can delete blogs" ON public.blogs;
CREATE POLICY "Admins can delete blogs" ON public.blogs
    FOR DELETE USING (has_role(auth.uid(), 'admin'));

-- RLS Policies for comments
DROP POLICY IF EXISTS "Approved comments are viewable by everyone" ON public.comments;
CREATE POLICY "Approved comments are viewable by everyone" ON public.comments
    FOR SELECT USING (approved = true OR has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Anyone can create comments" ON public.comments;
CREATE POLICY "Anyone can create comments" ON public.comments
    FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Admins can update comments" ON public.comments;
CREATE POLICY "Admins can update comments" ON public.comments
    FOR UPDATE USING (has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins can delete comments" ON public.comments;
CREATE POLICY "Admins can delete comments" ON public.comments
    FOR DELETE USING (has_role(auth.uid(), 'admin'));

-- RLS Policies for blog_likes
DROP POLICY IF EXISTS "Likes are viewable by everyone" ON public.blog_likes;
CREATE POLICY "Likes are viewable by everyone" ON public.blog_likes
    FOR SELECT USING (true);

DROP POLICY IF EXISTS "Authenticated users can like blogs" ON public.blog_likes;
CREATE POLICY "Authenticated users can like blogs" ON public.blog_likes
    FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can remove their own likes" ON public.blog_likes;
CREATE POLICY "Users can remove their own likes" ON public.blog_likes
    FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for books
DROP POLICY IF EXISTS "Books are viewable by everyone" ON public.books;
CREATE POLICY "Books are viewable by everyone" ON public.books
    FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admins can manage books" ON public.books;
CREATE POLICY "Admins can manage books" ON public.books
    FOR ALL USING (has_role(auth.uid(), 'admin'));

-- RLS Policies for blog_summaries
DROP POLICY IF EXISTS "Summaries are viewable by everyone" ON public.blog_summaries;
CREATE POLICY "Summaries are viewable by everyone" ON public.blog_summaries
    FOR SELECT USING (true);

DROP POLICY IF EXISTS "Authenticated users can create summaries" ON public.blog_summaries;
CREATE POLICY "Authenticated users can create summaries" ON public.blog_summaries
    FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_blogs_slug ON public.blogs(slug);
CREATE INDEX IF NOT EXISTS idx_blogs_published ON public.blogs(published);
CREATE INDEX IF NOT EXISTS idx_blogs_author ON public.blogs(author_id);
CREATE INDEX IF NOT EXISTS idx_comments_blog ON public.comments(blog_id);
CREATE INDEX IF NOT EXISTS idx_likes_blog ON public.blog_likes(blog_id);
CREATE INDEX IF NOT EXISTS idx_likes_user ON public.blog_likes(user_id);

-- Insert sample books data
INSERT INTO public.books (title, author, description, category, year, display_order, cover_image)
VALUES 
  ('Vibhajana Katha', 'Undavalli Arun Kumar', 'A profound narrative exploring the partition of states and its socio-political impact', 'Original Works', 2020, 1, 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400'),
  ('YSR Tho Undavalli Arun Kumar', 'Undavalli Arun Kumar', 'Personal memoirs and political journey with YS Rajasekhara Reddy', 'Memoirs', 2018, 2, 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400'),
  ('Telugu Translations', 'Various Authors', 'Collection of classic works translated into Telugu', 'Translations', 2019, 3, 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400')
ON CONFLICT DO NOTHING;