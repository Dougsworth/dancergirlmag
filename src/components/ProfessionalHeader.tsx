import { useState, useEffect } from "react";
import { Menu, X, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NavLink, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const ProfessionalHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const navigate = useNavigate();

  const navItems = [
    { name: "Stories", path: "/stories" },
    { name: "Events", path: "/events" },
    { name: "Features", path: "/features" },
    { name: "Music", path: "/music" },
    { name: "About", path: "/about" },
  ];

  const secondaryNav = [
    { name: "Watch", path: "/watch" },
    { name: "Letters", path: "/editor-letters" },
    { name: "Dancers", path: "/dancers-of-the-month" },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Top Bar */}
      <div className="hidden lg:block bg-foreground text-background">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-10 text-xs">
            <div className="flex items-center space-x-6">
              <span className="font-medium">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
              <span className="opacity-70">Caribbean Dance Culture Magazine</span>
            </div>
            <div className="flex items-center space-x-6">
              {secondaryNav.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className="hover:opacity-70 transition-opacity"
                >
                  {item.name}
                </NavLink>
              ))}
              <button className="hover:opacity-70 transition-opacity">Subscribe</button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header
        className={cn(
          "sticky top-0 z-50 bg-background transition-all duration-300",
          isScrolled ? "shadow-sm" : ""
        )}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="hover:bg-transparent"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>

            {/* Logo */}
            <NavLink to="/" className="flex-shrink-0">
              <h1 className="font-secondary text-3xl lg:text-4xl font-bold tracking-tight">
                DancerGirl
              </h1>
            </NavLink>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    cn(
                      "text-sm font-medium transition-all duration-200 hover:text-foreground/70",
                      "relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-foreground",
                      "after:w-0 hover:after:w-full after:transition-all after:duration-300",
                      isActive ? "text-foreground after:w-full" : "text-foreground/60"
                    )
                  }
                >
                  {item.name}
                </NavLink>
              ))}
            </nav>

            {/* Search */}
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="hover:bg-transparent"
              >
                <Search className="h-5 w-5" />
              </Button>
              
              {/* Subscribe Button - Desktop */}
              <Button
                variant="default"
                className="hidden lg:inline-flex"
                onClick={() => navigate('/newsletter')}
              >
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="border-t bg-background"
            >
              <div className="container mx-auto px-4 py-4">
                <div className="max-w-2xl mx-auto">
                  <input
                    type="text"
                    placeholder="Search stories, events, artists..."
                    className="w-full px-4 py-2 bg-transparent border-b-2 border-foreground/20 focus:border-foreground outline-none transition-colors"
                    autoFocus
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-y-0 left-0 w-full max-w-sm bg-background z-50 shadow-xl lg:hidden"
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-4 border-b">
                <h2 className="font-secondary text-2xl font-bold">Menu</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <X className="h-6 w-6" />
                </Button>
              </div>
              <nav className="flex-1 overflow-y-auto">
                <div className="p-4 space-y-1">
                  {navItems.map((item) => (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsMenuOpen(false)}
                      className={({ isActive }) =>
                        cn(
                          "block px-4 py-3 text-base font-medium rounded-lg transition-colors",
                          isActive
                            ? "bg-foreground text-background"
                            : "text-foreground hover:bg-muted"
                        )
                      }
                    >
                      {item.name}
                    </NavLink>
                  ))}
                  <div className="pt-4 mt-4 border-t">
                    {secondaryNav.map((item) => (
                      <NavLink
                        key={item.path}
                        to={item.path}
                        onClick={() => setIsMenuOpen(false)}
                        className="block px-4 py-3 text-base font-medium text-foreground/70 hover:text-foreground transition-colors"
                      >
                        {item.name}
                      </NavLink>
                    ))}
                  </div>
                </div>
              </nav>
              <div className="p-4 border-t">
                <Button
                  variant="default"
                  className="w-full"
                  onClick={() => {
                    navigate('/newsletter');
                    setIsMenuOpen(false);
                  }}
                >
                  Subscribe to Newsletter
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu Backdrop */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setIsMenuOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default ProfessionalHeader;