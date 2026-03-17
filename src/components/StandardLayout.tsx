import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import NavigationWithDropdowns from "./NavigationWithDropdowns";
import Footer from "./Footer";

interface StandardLayoutProps {
  children: ReactNode;
  className?: string;
  showFooter?: boolean;
}

export const StandardLayout = ({
  children,
  className,
  showFooter = true,
}: StandardLayoutProps) => {
  return (
    <div className={cn(
      "min-h-screen flex flex-col bg-background text-foreground",
    )}>
      {/* Navigation at the top */}
      <NavigationWithDropdowns />
      
      {/* Main content */}
      <main 
        className={cn(
          "flex-1 w-full pt-8 pb-8 sm:pb-12",
          className
        )}
      >
        {children}
      </main>
      
      {showFooter && <Footer />}
    </div>
  );
};

export default StandardLayout; 