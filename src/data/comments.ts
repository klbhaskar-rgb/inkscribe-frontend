export interface Comment {
  id: string;
  author: string;
  avatar: string;
  content: string;
  date: string;
}

export const sampleComments: Comment[] = [
  {
    id: "1",
    author: "John Doe",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    content: "Great article! I've been looking for a comprehensive guide on this topic. The examples really helped clarify the concepts.",
    date: "Jan 15, 2024"
  },
  {
    id: "2",
    author: "Jane Smith",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane",
    content: "This is exactly what I needed. Your writing style makes complex topics easy to understand. Looking forward to more posts!",
    date: "Jan 14, 2024"
  },
  {
    id: "3",
    author: "Robert Brown",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Robert",
    content: "I appreciate the practical approach you've taken here. It's refreshing to see real-world applications instead of just theory.",
    date: "Jan 13, 2024"
  }
];