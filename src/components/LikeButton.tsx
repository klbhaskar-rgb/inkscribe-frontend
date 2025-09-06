import { useState } from "react";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LikeButtonProps {
  initialLikes: number;
  onLike?: (liked: boolean) => void;
}

export function LikeButton({ initialLikes, onLike }: LikeButtonProps) {
  const [likes, setLikes] = useState(initialLikes);
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    const newLiked = !liked;
    setLiked(newLiked);
    setLikes(newLiked ? likes + 1 : likes - 1);
    onLike?.(newLiked);
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleLike}
      className={`group transition-all duration-300 ${
        liked ? "bg-red-50 border-red-300 dark:bg-red-950 dark:border-red-800" : ""
      }`}
    >
      <Heart
        className={`h-4 w-4 mr-2 transition-all duration-300 ${
          liked
            ? "fill-red-500 text-red-500 scale-110"
            : "group-hover:text-red-500 group-hover:scale-110"
        }`}
      />
      <span className={liked ? "text-red-500 font-semibold" : ""}>
        {likes} {likes === 1 ? "Like" : "Likes"}
      </span>
    </Button>
  );
}