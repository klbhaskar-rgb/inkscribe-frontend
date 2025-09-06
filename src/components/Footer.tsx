import { Link } from "react-router-dom";
import { Feather, Github, Twitter, Linkedin, Mail } from "lucide-react";

export function Footer() {
  const socialLinks = [
    { icon: Github, href: "#", label: "GitHub" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Mail, href: "#", label: "Email" },
  ];

  const footerLinks = {
    "Quick Links": [
      { name: "Home", path: "/" },
      { name: "Blog", path: "/blog" },
      { name: "About", path: "/about" },
      { name: "Contact", path: "/contact" },
    ],
    "Categories": [
      { name: "Technology", path: "/blog?category=technology" },
      { name: "Design", path: "/blog?category=design" },
      { name: "Business", path: "/blog?category=business" },
      { name: "Lifestyle", path: "/blog?category=lifestyle" },
    ],
  };

  return (
    <footer className="bg-gradient-subtle border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <Feather className="h-6 w-6 text-primary" />
              <span className="font-serif text-xl font-bold">InkScribe</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Discover insightful articles and stories from writers around the world.
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="h-9 w-9 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-all duration-300 flex items-center justify-center group"
                >
                  <social.icon className="h-4 w-4 group-hover:scale-110 transition-transform" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="font-semibold mb-4">{title}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter Section */}
          <div>
            <h3 className="font-semibold mb-4">Newsletter</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Subscribe to get our latest articles delivered to your inbox.
            </p>
            <form className="space-y-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-3 py-2 text-sm bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring transition-all"
              />
              <button className="w-full px-3 py-2 text-sm font-medium bg-gradient-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} InkScribe. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link to="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link to="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}