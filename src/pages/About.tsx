import { Github, Twitter, Linkedin, Mail, Award, BookOpen, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function About() {
  const stats = [
    { icon: BookOpen, value: "1000+", label: "Articles Published" },
    { icon: Users, value: "50K+", label: "Active Readers" },
    { icon: Award, value: "15+", label: "Awards Won" },
  ];

  const team = [
    {
      name: "Sarah Johnson",
      role: "Editor in Chief",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      bio: "Leading editorial strategy with 10+ years of experience in digital publishing.",
    },
    {
      name: "Michael Chen",
      role: "Creative Director",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
      bio: "Crafting visual narratives that complement our written content.",
    },
    {
      name: "Emily Rodriguez",
      role: "Content Strategist",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
      bio: "Ensuring our content reaches and resonates with the right audience.",
    },
  ];

  return (
    <div className="min-h-screen animate-fade-in">
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-subtle">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              About InkScribe
            </h1>
            <p className="text-xl text-muted-foreground">
              We're on a mission to share knowledge, inspire creativity, and connect writers with readers worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="font-serif text-3xl font-bold mb-6">Our Story</h2>
                <p className="text-muted-foreground mb-4">
                  Founded in 2020, InkScribe began as a simple blog but quickly evolved into a thriving platform for writers and readers alike. We believe in the power of words to educate, inspire, and transform lives.
                </p>
                <p className="text-muted-foreground mb-4">
                  Our platform hosts diverse voices from around the globe, covering topics from technology and design to lifestyle and culture. Every article is carefully curated to ensure quality and value for our readers.
                </p>
                <p className="text-muted-foreground">
                  Today, we're proud to be home to thousands of articles that have been read by millions worldwide. But we're just getting started on our journey to democratize knowledge sharing.
                </p>
              </div>
              <div className="relative h-80 rounded-xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&h=400&fit=crop"
                  alt="About InkScribe"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-gradient-subtle">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-serif text-3xl font-bold text-center mb-12">
              Our Impact
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center group">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4 group-hover:scale-110 transition-transform">
                    <stat.icon className="h-8 w-8 text-primary" />
                  </div>
                  <div className="text-3xl font-bold mb-2">{stat.value}</div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-serif text-3xl font-bold text-center mb-12">
              Meet Our Team
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {team.map((member) => (
                <div key={member.name} className="text-center group">
                  <div className="relative w-32 h-32 mx-auto mb-4">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-full h-full rounded-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <h3 className="font-semibold text-lg mb-1">{member.name}</h3>
                  <p className="text-primary text-sm mb-3">{member.role}</p>
                  <p className="text-muted-foreground text-sm">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-4 bg-gradient-subtle">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-serif text-3xl font-bold text-center mb-12">
              Our Values
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-6 bg-card rounded-xl border border-border">
                <h3 className="font-semibold text-xl mb-3">Quality First</h3>
                <p className="text-muted-foreground">
                  We prioritize quality over quantity, ensuring every article provides genuine value to our readers.
                </p>
              </div>
              <div className="p-6 bg-card rounded-xl border border-border">
                <h3 className="font-semibold text-xl mb-3">Diverse Voices</h3>
                <p className="text-muted-foreground">
                  We celebrate diversity in perspectives, backgrounds, and experiences to enrich our content.
                </p>
              </div>
              <div className="p-6 bg-card rounded-xl border border-border">
                <h3 className="font-semibold text-xl mb-3">Continuous Learning</h3>
                <p className="text-muted-foreground">
                  We foster a culture of continuous learning, both for our team and our community.
                </p>
              </div>
              <div className="p-6 bg-card rounded-xl border border-border">
                <h3 className="font-semibold text-xl mb-3">Community Focus</h3>
                <p className="text-muted-foreground">
                  We build and nurture a supportive community where ideas can flourish and grow.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-serif text-3xl font-bold mb-6">
              Join Our Journey
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Whether you're a writer looking to share your ideas or a reader seeking inspiration, there's a place for you at InkScribe.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-primary hover:opacity-90">
                Start Writing
              </Button>
              <Button size="lg" variant="outline">
                Subscribe to Newsletter
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}