import { useState } from "react";
import { MessageCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";

interface Comment {
  id: string;
  author: string;
  avatar: string;
  content: string;
  date: string;
}

interface CommentSectionProps {
  comments: Comment[];
}

export function CommentSection({ comments: initialComments }: CommentSectionProps) {
  const [comments, setComments] = useState(initialComments);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !comment) {
      toast({
        title: "Missing fields",
        description: "Please fill in all fields before submitting.",
        variant: "destructive",
      });
      return;
    }

    const newComment: Comment = {
      id: Date.now().toString(),
      author: name,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`,
      content: comment,
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
    };

    setComments([newComment, ...comments]);
    setName("");
    setEmail("");
    setComment("");
    
    toast({
      title: "Comment posted!",
      description: "Your comment has been successfully added.",
    });
  };

  return (
    <div className="mt-12 pt-12 border-t border-border">
      <h2 className="font-serif text-2xl font-bold mb-8 flex items-center">
        <MessageCircle className="mr-2 h-6 w-6 text-primary" />
        Comments ({comments.length})
      </h2>

      {/* Comment Form */}
      <div className="mb-8 p-6 bg-card rounded-xl border border-border">
        <h3 className="font-semibold mb-4">Leave a Comment</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-background"
            />
            <Input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-background"
            />
          </div>
          <Textarea
            placeholder="Write your comment here..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={4}
            className="bg-background resize-none"
          />
          <Button type="submit" className="bg-gradient-primary hover:opacity-90">
            <Send className="mr-2 h-4 w-4" />
            Post Comment
          </Button>
        </form>
      </div>

      {/* Comments List */}
      <div className="space-y-6">
        {comments.map((comment) => (
          <div
            key={comment.id}
            className="flex space-x-4 p-6 bg-card rounded-xl border border-border animate-fade-in"
          >
            <img
              src={comment.avatar}
              alt={comment.author}
              className="w-12 h-12 rounded-full object-cover flex-shrink-0"
            />
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold">{comment.author}</h4>
                <span className="text-sm text-muted-foreground">{comment.date}</span>
              </div>
              <p className="text-muted-foreground">{comment.content}</p>
            </div>
          </div>
        ))}

        {comments.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <MessageCircle className="mx-auto h-12 w-12 mb-4 opacity-50" />
            <p>No comments yet. Be the first to comment!</p>
          </div>
        )}
      </div>
    </div>
  );
}