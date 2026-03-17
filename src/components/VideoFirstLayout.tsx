import { ReactNode, useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import Footer from "./Footer";
import NavigationWithDropdowns from "./NavigationWithDropdowns";

interface VideoFirstLayoutProps {
  children: ReactNode;
  showFooter?: boolean;
  navStyle?: 'floating' | 'bottom' | 'hidden';
}

export const VideoFirstLayout = ({
  children,
  showFooter = true,
  navStyle = 'floating',
}: VideoFirstLayoutProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 100;
      setIsVisible(scrolled);
    };

    const handleMouseMove = (e: MouseEvent) => {
      // Show navbar when mouse is near top of screen
      setIsHovered(e.clientY < 80);
    };

    if (navStyle === 'floating') {
      window.addEventListener('scroll', handleScroll);
      window.addEventListener('mousemove', handleMouseMove);
      
      return () => {
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('mousemove', handleMouseMove);
      };
    }
  }, [navStyle]);

  const renderNavigation = () => {
    if (navStyle === 'hidden') return null;
    
    if (navStyle === 'floating') {
      return (
        <div
          className={cn(
            "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
            // Mobile: always visible (no mousemove on touch)
            // Desktop: show on scroll past 100px or mouse near top
            (isVisible || isHovered)
              ? "translate-y-0 opacity-100"
              : "translate-y-0 opacity-100 lg:-translate-y-full lg:opacity-0"
          )}
        >
          <div className="bg-background/90 backdrop-blur-md border-b border-border/20">
            <NavigationWithDropdowns />
          </div>
        </div>
      );
    }

    if (navStyle === 'bottom') {
      return (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-t border-border/30">
          <div className="container mx-auto px-3 sm:px-4">
            <div className="flex items-center justify-between h-14">
              {/* Simplified bottom nav - key items only */}
              <div className="flex items-center space-x-4">
                <img src="/DG Monogram Letters ONLY Digital Black.png" alt="DancerGirl" className="h-8 w-auto" />
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <a href="/" className="px-3 py-2 hover:text-primary transition-colors">Home</a>
                <a href="/watch" className="px-3 py-2 hover:text-primary transition-colors">Watch</a>
                <a href="/about" className="px-3 py-2 hover:text-primary transition-colors">About</a>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className={cn(
      "min-h-screen flex flex-col bg-background text-foreground",
    )}>      
      {/* Navigation */}
      {renderNavigation()}
      
      {/* Video section and main content */}
      <div className="flex-1">
        {children}
      </div>
      
      {/* Footer at bottom */}
      {showFooter && (
        <div className={cn(
          "mt-auto",
          navStyle === 'bottom' && "mb-14" // Add bottom margin when navbar is at bottom
        )}>
          <Footer />
        </div>
      )}
    </div>
  );
};

export default VideoFirstLayout; 