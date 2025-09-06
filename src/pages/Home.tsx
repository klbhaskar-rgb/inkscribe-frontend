import { Link } from "react-router-dom";
import { BlogCard } from "@/components/BlogCard";
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, Star, Users } from "lucide-react";
import { blogPosts } from "@/data/blogPosts";

export default function Home() {
  const featuredPost = blogPosts.find(post => post.featured);
  const recentPosts = blogPosts.slice(0, 6);

  return (
    <div className="min-h-screen animate-fade-in">
      {/* Hero Section */}
      <section className="relative bg-gradient-subtle py-20 px-4">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent animate-fade-in-up">
              Welcome to InkScribe
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 animate-fade-in-up animation-delay-100">
              Discover insightful articles and stories from writers around the world
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animation-delay-200">
              <Link to="/blog">
                <Button size="lg" className="bg-gradient-primary hover:opacity-90 group">
                  Explore Articles
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link to="/about">
                <Button size="lg" variant="outline">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 px-4 border-b border-border">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="group cursor-pointer">
              <div className="flex justify-center mb-4">
                <TrendingUp className="h-8 w-8 text-primary group-hover:scale-110 transition-transform" />
              </div>
              <div className="text-3xl font-bold mb-2">1,000+</div>
              <div className="text-muted-foreground">Articles Published</div>
            </div>
            <div className="group cursor-pointer">
              <div className="flex justify-center mb-4">
                <Users className="h-8 w-8 text-primary group-hover:scale-110 transition-transform" />
              </div>
              <div className="text-3xl font-bold mb-2">50,000+</div>
              <div className="text-muted-foreground">Active Readers</div>
            </div>
            <div className="group cursor-pointer">
              <div className="flex justify-center mb-4">
                <Star className="h-8 w-8 text-primary group-hover:scale-110 transition-transform" />
              </div>
              <div className="text-3xl font-bold mb-2">4.9/5</div>
              <div className="text-muted-foreground">Reader Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-8 text-center">
              Featured Story
            </h2>
            <div className="max-w-5xl mx-auto">
              <BlogCard {...featuredPost} />
            </div>
          </div>
        </section>
      )}

      {/* Recent Posts */}
      <section className="py-16 px-4 bg-gradient-subtle">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-serif text-3xl md:text-4xl font-bold">
              Recent Articles
            </h2>
            <Link to="/blog">
              <Button variant="outline" className="group">
                View All
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentPosts.map((post) => (
              <BlogCard key={post.id} {...post} />
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-8 text-center">
            Explore Categories
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {["Technology", "Design", "Business", "Lifestyle"].map((category) => (
              <Link
                key={category}
                to={`/blog?category=${category.toLowerCase()}`}
                className="group p-6 bg-card hover:bg-card-hover rounded-xl border border-border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 text-center"
              >
                <h3 className="font-semibold group-hover:text-primary transition-colors">
                  {category}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}