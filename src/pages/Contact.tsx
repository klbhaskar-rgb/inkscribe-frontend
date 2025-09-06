import { useState } from "react";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    // Here you would typically send the form data to a server
    toast({
      title: "Message sent!",
      description: "We'll get back to you as soon as possible.",
    });

    // Reset form
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      content: "hello@inkscribe.com",
      link: "mailto:hello@inkscribe.com",
    },
    {
      icon: Phone,
      title: "Phone",
      content: "+1 (555) 123-4567",
      link: "tel:+15551234567",
    },
    {
      icon: MapPin,
      title: "Address",
      content: "123 Writer's Lane, Creative City, CC 12345",
      link: "#",
    },
  ];

  return (
    <div className="min-h-screen animate-fade-in">
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-subtle">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Get in Touch
            </h1>
            <p className="text-xl text-muted-foreground">
              Have a question, suggestion, or want to contribute? We'd love to hear from you.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Contact Information */}
              <div className="lg:col-span-1">
                <h2 className="font-serif text-2xl font-bold mb-6">
                  Contact Information
                </h2>
                <p className="text-muted-foreground mb-8">
                  Fill out the form and we'll get back to you within 24 hours.
                </p>
                
                <div className="space-y-6">
                  {contactInfo.map((info) => (
                    <a
                      key={info.title}
                      href={info.link}
                      className="flex items-start space-x-4 group"
                    >
                      <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <info.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">{info.title}</h3>
                        <p className="text-muted-foreground text-sm">
                          {info.content}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>

                {/* Social Links */}
                <div className="mt-8 pt-8 border-t border-border">
                  <h3 className="font-semibold mb-4">Follow Us</h3>
                  <div className="flex space-x-3">
                    {["Twitter", "LinkedIn", "GitHub"].map((social) => (
                      <a
                        key={social}
                        href="#"
                        className="w-10 h-10 bg-secondary hover:bg-primary hover:text-primary-foreground rounded-full flex items-center justify-center transition-all duration-300"
                      >
                        <span className="text-xs font-medium">{social[0]}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="lg:col-span-2">
                <div className="bg-card rounded-xl border border-border p-8">
                  <h2 className="font-serif text-2xl font-bold mb-6">
                    Send us a Message
                  </h2>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium mb-2">
                          Name *
                        </label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="John Doe"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-2">
                          Email *
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="john@example.com"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium mb-2">
                        Subject
                      </label>
                      <Input
                        id="subject"
                        name="subject"
                        type="text"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="What's this about?"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium mb-2">
                        Message *
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us what's on your mind..."
                        rows={6}
                        className="resize-none"
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="bg-gradient-primary hover:opacity-90 w-full md:w-auto"
                    >
                      <Send className="mr-2 h-4 w-4" />
                      Send Message
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 bg-gradient-subtle">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-serif text-3xl font-bold text-center mb-12">
              Frequently Asked Questions
            </h2>
            
            <div className="space-y-6">
              <div className="p-6 bg-card rounded-xl border border-border">
                <h3 className="font-semibold text-lg mb-2">
                  How can I contribute an article?
                </h3>
                <p className="text-muted-foreground">
                  We welcome contributions from writers worldwide. Send us your article proposal through the contact form, and our editorial team will review it within 48 hours.
                </p>
              </div>
              
              <div className="p-6 bg-card rounded-xl border border-border">
                <h3 className="font-semibold text-lg mb-2">
                  Do you offer writing guidelines?
                </h3>
                <p className="text-muted-foreground">
                  Yes! Once your proposal is accepted, we'll send you our comprehensive writing guidelines, including style guide, formatting requirements, and best practices.
                </p>
              </div>
              
              <div className="p-6 bg-card rounded-xl border border-border">
                <h3 className="font-semibold text-lg mb-2">
                  How often do you publish new content?
                </h3>
                <p className="text-muted-foreground">
                  We publish new articles daily, with special features and in-depth pieces released weekly. Subscribe to our newsletter to never miss an update.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}