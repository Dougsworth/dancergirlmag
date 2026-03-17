import { useState, useEffect } from "react";
import { Menu, X, Search, User, Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NavLink, useLocation } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";
import LanguageToggle from "./LanguageToggle";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

const Header = () => {
  const { language } = useLanguage();
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Watch", path: "/watch" },
    { name: "Stories", path: "/stories" },
    { name: "Events", path: "/events" },
    { name: "Features", path: "/features" },
    { name: "Music", path: "/music" },
    { name: "Choreographers Corner", path: "/choreographers-corner" },
    { name: "About", path: "/about" },
  ];

  const storiesSubItems = [
    { name: "All Stories", path: "/stories" },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed w-full z-50 transition-all duration-300 border-b",
        isScrolled
          ? "bg-background/95 backdrop-blur-sm border-border/50"
          : "bg-background/80 border-transparent"
      )}
    >
      <div className="container mx-auto px-3 sm:px-4">
        <div className="flex items-center justify-between h-20 sm:h-24">
          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-nav"
              className="text-foreground hover:bg-transparent"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              <span className="sr-only">{t('ui.toggleMenu')}</span>
            </Button>
          </div>

          {/* Logo */}
          <div className="flex items-center flex-shrink-0">
            <NavLink
              to="/"
              className="flex items-center"
              onClick={() => setIsMenuOpen(false)}
            >
              <img
                src="/DG Monogram Letters ONLY Digital Black.png"
                alt="DancerGirl Logo"
                className="h-14 sm:h-20 w-auto object-contain transition-all duration-300 no-translate"
                onError={(e) => {
                  console.error("Failed to load logo:", e);
                }}
              />
            </NavLink>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.slice(0, 5).map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  cn(
                    "px-3 py-2 text-sm font-medium transition-colors hover:text-primary",
                    "nav-primary",
                    isActive ? "text-primary" : "text-foreground/80"
                  )
                }
              >
                {item.name}
              </NavLink>
            ))}
            
            {/* Calendar Link */}
            <NavLink
              to="/events"
              className={({ isActive }) =>
                cn(
                  "px-3 py-2 text-sm font-medium transition-colors hover:text-primary flex items-center",
                  "nav-primary",
                  isActive ? "text-primary" : "text-foreground/80"
                )
              }
            >
              <CalendarIcon className="h-4 w-4 mr-2" />
              Calendar
            </NavLink>
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="text-foreground hover:bg-transparent">
              <Search className="h-5 w-5" />
              <span className="sr-only">{t('ui.search')}</span>
            </Button>

            <Button variant="ghost" size="icon" className="text-foreground hover:bg-transparent">
              <User className="h-5 w-5" />
              <span className="sr-only">{t('ui.account')}</span>
            </Button>

            <LanguageToggle />
            <ThemeToggle />

          </div>
        </div>


      </div>

                {/* Mobile Menu */}
          {isMenuOpen && (
            <div
              id="mobile-nav"
              className="lg:hidden bg-background/95 backdrop-blur-sm border-t border-border/50"
            >
              <div className="px-4 py-2 space-y-1">
                {navItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={({ isActive }) =>
                      cn(
                        "block px-3 py-2 text-base font-medium rounded-md",
                        "nav-mobile",
                        isActive
                          ? "bg-primary/10 text-primary"
                          : "text-foreground hover:bg-muted"
                      )
                    }
                  >
                    {item.name}
                  </NavLink>
                ))}
              </div>
            </div>
          )}
    </header>
  );
};

export default Header;