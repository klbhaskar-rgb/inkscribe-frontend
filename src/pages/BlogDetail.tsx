import { useParams, Link } from "react-router-dom";
import { Calendar, Clock, User, ArrowLeft, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LikeButton } from "@/components/LikeButton";
import { CommentSection } from "@/components/CommentSection";
import { blogPosts } from "@/data/blogPosts";
import { sampleComments } from "@/data/comments";
import { toast } from "@/hooks/use-toast";

export default function BlogDetail() {
  const { id } = useParams();
  const post = blogPosts.find(p => p.id === id);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The article you're looking for doesn't exist.
          </p>
          <Link to="/blog">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link copied!",
      description: "Article link has been copied to clipboard.",
    });
  };

  const relatedPosts = blogPosts
    .filter(p => p.id !== post.id && p.category === post.category)
    .slice(0, 3);

  return (
    <article className="min-h-screen animate-fade-in">
      {/* Back Button */}
      <div className="container mx-auto px-4 pt-8">
        <Link to="/blog">
          <Button variant="ghost" className="group">
            <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Blog
          </Button>
        </Link>
      </div>

      {/* Hero Image */}
      <div className="relative h-[400px] md:h-[500px] mt-8">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>

          {/* Title */}
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-6">
            {post.title}
          </h1>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-6 mb-8 pb-8 border-b border-border">
            <div className="flex items-center space-x-3">
              <img
                src={post.authorAvatar}
                alt={post.author}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="font-medium flex items-center">
                  <User className="w-4 h-4 mr-1" />
                  {post.author}
                </p>
                <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                  <span className="flex items-center">
                    <Calendar className="w-3 h-3 mr-1" />
                    {post.date}
                  </span>
                  <span className="flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    {post.readTime}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 ml-auto">
              <LikeButton initialLikes={post.likes} />
              <Button variant="outline" size="sm" onClick={handleShare}>
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </div>

          {/* Article Content */}
          <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
            {post.content.split('\n').map((paragraph, index) => {
              if (paragraph.startsWith('#')) {
                const level = paragraph.match(/^#+/)?.[0].length || 1;
                const text = paragraph.replace(/^#+\s/, '');
                const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements;
                return (
                  <HeadingTag key={index} className={`font-serif ${level === 1 ? 'text-3xl' : level === 2 ? 'text-2xl' : 'text-xl'} font-bold mt-8 mb-4`}>
                    {text}
                  </HeadingTag>
                );
              }
              if (paragraph.startsWith('- ')) {
                return (
                  <li key={index} className="ml-6 mb-2">
                    {paragraph.replace(/^- /, '')}
                  </li>
                );
              }
              if (paragraph.trim()) {
                return (
                  <p key={index} className="mb-4 leading-relaxed text-muted-foreground">
                    {paragraph}
                  </p>
                );
              }
              return null;
            })}
          </div>

          {/* Comments Section */}
          <CommentSection comments={sampleComments} />

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <div className="mt-16 pt-16 border-t border-border">
              <h2 className="font-serif text-2xl font-bold mb-8">
                Related Articles
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <Link
                    key={relatedPost.id}
                    to={`/blog/${relatedPost.id}`}
                    className="group"
                  >
                    <div className="relative h-48 mb-4 overflow-hidden rounded-lg">
                      <img
                        src={relatedPost.image}
                        alt={relatedPost.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                    <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                      {relatedPost.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {relatedPost.readTime}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}