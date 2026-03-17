import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Facebook, 
  Instagram, 
  Twitter, 
  Youtube, 
  Mail, 
  MapPin, 
  Phone,
  Heart,
  Calendar,
  BookOpen,
  Music,
  Users
} from 'lucide-react';

const ProfessionalFooter = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    content: [
      { name: 'Stories', href: '/stories', icon: BookOpen },
      { name: 'Music & Rhythms', href: '/music', icon: Music },
      { name: 'Events', href: '/events', icon: Calendar },
      { name: 'Letters from Editor', href: '/editor-letters', icon: Mail },
    ],
    community: [
      { name: 'D.O.M Archive', href: '/dancers-of-the-month', icon: Users },
      { name: 'Dancer Speak Up', href: '/dancer-speak-up', icon: Heart },
      { name: 'Choreographers Corner', href: '/choreographers-corner', icon: Users },
      { name: 'Newsletter', href: '/newsletter', icon: Mail },
    ],
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Features', href: '/features' },
      { name: 'Watch', href: '/watch' },
      { name: 'Contact', href: '/contact' },
    ]
  };

  const socialLinks = [
    { name: 'Facebook', href: '#', icon: Facebook },
    { name: 'Instagram', href: '#', icon: Instagram },
    { name: 'Twitter', href: '#', icon: Twitter },
    { name: 'YouTube', href: '#', icon: Youtube },
  ];

  return (
    <footer className="bg-foreground text-background">
      {/* Newsletter Section */}
      <div className="border-b border-background/10">
        <div className="container mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-center"
          >
            <h3 className="text-2xl font-secondary font-bold mb-4">
              Stay in the Rhythm
            </h3>
            <p className="text-background/70 mb-6">
              Get the latest Caribbean dance stories, events, and cultural insights delivered weekly.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 rounded-sm bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-background/20"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-background text-foreground font-semibold rounded-sm hover:bg-background/90 transition-colors"
              >
                Subscribe
              </button>
            </form>
            <p className="text-xs mt-3 text-background/50">
              No spam, unsubscribe at any time.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block mb-6">
              <h2 className="text-2xl font-secondary font-bold">
                DANCERGIRL
              </h2>
              <p className="text-xs uppercase tracking-wider text-background/60 mt-1">
                Island Rhythms
              </p>
            </Link>
            <p className="text-background/70 text-sm leading-relaxed mb-6">
              Celebrating Caribbean dance culture through stories, events, and community connections across the islands and beyond.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3 text-sm">
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-2 text-background/60" />
                <span className="text-background/70">Caribbean Region</span>
              </div>
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-2 text-background/60" />
                <span className="text-background/70">hello@dancergirl.com</span>
              </div>
            </div>
          </div>

          {/* Content Links */}
          <div>
            <h3 className="font-semibold mb-6 text-background">Content</h3>
            <ul className="space-y-3">
              {footerLinks.content.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="flex items-center text-background/70 hover:text-background transition-colors text-sm group"
                  >
                    <link.icon className="w-4 h-4 mr-2 text-background/50 group-hover:text-background/70" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Community Links */}
          <div>
            <h3 className="font-semibold mb-6 text-background">Community</h3>
            <ul className="space-y-3">
              {footerLinks.community.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="flex items-center text-background/70 hover:text-background transition-colors text-sm group"
                  >
                    <link.icon className="w-4 h-4 mr-2 text-background/50 group-hover:text-background/70" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold mb-6 text-background">Company</h3>
            <ul className="space-y-3 mb-8">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-background/70 hover:text-background transition-colors text-sm block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Social Links */}
            <div>
              <h4 className="font-semibold mb-4 text-background text-sm">Follow Us</h4>
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-background/20 transition-colors group"
                    aria-label={social.name}
                  >
                    <social.icon className="w-5 h-5 text-background/70 group-hover:text-background" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-background/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-background/60">
              © {currentYear} DancerGirl. All rights reserved.
            </div>
            <div className="flex items-center gap-6 text-sm">
              <Link to="/privacy" className="text-background/60 hover:text-background transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-background/60 hover:text-background transition-colors">
                Terms of Service
              </Link>
              <div className="flex items-center text-background/60">
                Made with <Heart className="w-4 h-4 mx-1 text-red-400" /> for Caribbean culture
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default ProfessionalFooter;