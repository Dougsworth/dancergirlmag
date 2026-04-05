import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";
import LanguageToggle from "./LanguageToggle";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import { ChevronDown, Menu, X } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const NavigationWithDropdowns = () => {
  const { language } = useLanguage();
  const { t } = useTranslation();
  const { theme } = useTheme();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState<string | null>(null);

  const navItems = [
    {
      name: "Home",
      path: "/",
      hasDropdown: false
    },
    {
      name: "Watch",
      path: "/watch",
      hasDropdown: false
    },
    {
      name: "Stories",
      path: "/stories",
      hasDropdown: true,
      subItems: [
        { name: "Money Moves", path: "/money-moves" },
        { name: "Choreographer's Corner", path: "/choreographers-corner" },
        { name: "Letters from the Editor", path: "/editor-letters" },
      ]
    },
    {
      name: "Features",
      path: "/features",
      hasDropdown: true,
      subItems: [
        { name: "D.O.M Archive", path: "/dancers-of-the-month" },
        { name: "Dancers: Speak Up!", path: "/dancers-speak-up" },
      ]
    },
    {
      name: "About",
      path: "/about",
      hasDropdown: false
    },
  ];


  return (
    <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/30 shadow-lg transition-all duration-300" style={{ position: 'sticky' }}>
      <div className="container mx-auto px-3 sm:px-4">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0">
            <NavLink to="/" className="flex items-center">
              <img
                src={theme === 'dark' ? "/dancergirlmonoimage.png" : "/DG Monogram Letters ONLY Digital Black.png"}
                alt="DancerGirl Logo"
                className="h-12 sm:h-16 w-auto object-contain transition-all duration-300 no-translate"
                onError={(e) => {
                  console.error("Failed to load logo:", e);
                }}
              />
            </NavLink>
          </div>

          {/* Desktop Navigation with Dropdowns */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <div key={item.path} className="relative">
                {item.hasDropdown ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className={cn(
                          "text-foreground hover:bg-primary/10 hover:text-primary px-3 py-2 text-sm font-medium transition-all duration-200 rounded-md",
                          "nav-primary",
                          (location.pathname === item.path || 
                           item.subItems?.some(subItem => location.pathname === subItem.path)) && 
                          "text-primary bg-primary/5"
                        )}
                      >
                        {item.name}
                        <ChevronDown className="h-3 w-3 ml-1" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-48">
                      {item.subItems?.map((subItem) => (
                        <DropdownMenuItem key={subItem.path} asChild>
                          <NavLink
                            to={subItem.path}
                            className={({ isActive }) =>
                              cn(
                                "w-full nav-secondary",
                                isActive ? "bg-primary/10 text-primary" : "text-foreground"
                              )
                            }
                          >
                            {subItem.name}
                          </NavLink>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      cn(
                        "px-3 py-2 text-sm font-medium transition-all duration-200 hover:text-primary hover:bg-primary/10 rounded-md",
                        "nav-primary",
                        isActive ? "text-primary bg-primary/5" : "text-foreground/80"
                      )
                    }
                  >
                    {item.name}
                  </NavLink>
                )}
              </div>
            ))}
            
            {/* Events Link */}
            <NavLink
              to="/events"
              className={({ isActive }) =>
                cn(
                  "px-3 py-2 text-sm font-medium transition-all duration-200 hover:text-primary hover:bg-primary/10 rounded-md",
                  "nav-primary",
                  isActive ? "text-primary bg-primary/5" : "text-foreground/80"
                )
              }
            >
              Events
            </NavLink>
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-2">
            <LanguageToggle />
            <ThemeToggle />
            
            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2"
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-border/30 bg-background/95 backdrop-blur-md">
          <div className="px-4 py-4 space-y-2">
            {navItems.map((item) => (
              <div key={item.path}>
                {item.hasDropdown ? (
                  <div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-between text-left"
                      onClick={() => setMobileDropdownOpen(
                        mobileDropdownOpen === item.path ? null : item.path
                      )}
                    >
                      <span>{item.name}</span>
                      <ChevronDown 
                        className={cn(
                          "h-4 w-4 transition-transform",
                          mobileDropdownOpen === item.path && "rotate-180"
                        )}
                      />
                    </Button>
                    
                    {mobileDropdownOpen === item.path && (
                      <div className="ml-4 mt-2 space-y-2">
                        {item.subItems?.map((subItem) => (
                          <NavLink
                            key={subItem.path}
                            to={subItem.path}
                            onClick={() => {
                              setMobileMenuOpen(false);
                              setMobileDropdownOpen(null);
                            }}
                            className={({ isActive }) =>
                              cn(
                                "block px-4 py-2 text-sm rounded-md transition-colors",
                                isActive 
                                  ? "bg-primary/10 text-primary font-medium" 
                                  : "text-foreground/80 hover:text-primary hover:bg-primary/5"
                              )
                            }
                          >
                            {subItem.name}
                          </NavLink>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <NavLink
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      cn(
                        "block px-4 py-2 text-sm rounded-md transition-colors",
                        isActive 
                          ? "bg-primary/10 text-primary font-medium" 
                          : "text-foreground/80 hover:text-primary hover:bg-primary/5"
                      )
                    }
                  >
                    {item.name}
                  </NavLink>
                )}
              </div>
            ))}
            
            {/* Mobile Events Link */}
            <NavLink
              to="/events"
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                cn(
                  "block px-4 py-2 text-sm rounded-md transition-colors",
                  isActive 
                    ? "bg-primary/10 text-primary font-medium" 
                    : "text-foreground/80 hover:text-primary hover:bg-primary/5"
                )
              }
            >
              Events
            </NavLink>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavigationWithDropdowns; 