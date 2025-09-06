import { Link } from "react-router-dom";
import { Heart, MessageCircle, Clock, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface BlogCardProps {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  author: string;
  authorAvatar: string;
  date: string;
  readTime: string;
  likes: number;
  comments: number;
  tags: string[];
  featured?: boolean;
}

export function BlogCard({
  id,
  title,
  excerpt,
  image,
  author,
  authorAvatar,
  date,
  readTime,
  likes,
  comments,
  tags,
  featured = false,
}: BlogCardProps) {
  return (
    <article
      className={`group bg-card hover:bg-card-hover rounded-xl overflow-hidden border border-border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
        featured ? "md:col-span-2 md:row-span-2" : ""
      }`}
    >
      <Link to={`/blog/${id}`} className="block">
        <div className={`relative overflow-hidden ${featured ? "h-96" : "h-48"}`}>
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </Link>

      <div className="p-6">
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-3">
          {tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        {/* Title */}
        <Link to={`/blog/${id}`}>
          <h3 className={`font-serif font-bold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors ${
            featured ? "text-2xl" : "text-xl"
          }`}>
            {title}
          </h3>
        </Link>

        {/* Excerpt */}
        <p className={`text-muted-foreground mb-4 ${featured ? "line-clamp-3" : "line-clamp-2"}`}>
          {excerpt}
        </p>

        {/* Author info */}
        <div className="flex items-center space-x-3 mb-4">
          <img
            src={authorAvatar}
            alt={author}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="flex-1">
            <p className="text-sm font-medium">{author}</p>
            <div className="flex items-center space-x-3 text-xs text-muted-foreground">
              <span className="flex items-center">
                <Calendar className="w-3 h-3 mr-1" />
                {date}
              </span>
              <span className="flex items-center">
                <Clock className="w-3 h-3 mr-1" />
                {readTime}
              </span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-1 text-muted-foreground hover:text-primary transition-colors">
              <Heart className="w-4 h-4" />
              <span className="text-sm">{likes}</span>
            </button>
            <button className="flex items-center space-x-1 text-muted-foreground hover:text-primary transition-colors">
              <MessageCircle className="w-4 h-4" />
              <span className="text-sm">{comments}</span>
            </button>
          </div>
          <Link to={`/blog/${id}`}>
            <Button variant="ghost" size="sm" className="group/btn">
              Read More
              <span className="ml-1 transition-transform group-hover/btn:translate-x-1">→</span>
            </Button>
          </Link>
        </div>
      </div>
    </article>
  );
}