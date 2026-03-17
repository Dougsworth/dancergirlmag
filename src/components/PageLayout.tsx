import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import NavigationWithDropdowns from "./NavigationWithDropdowns";
import Footer from "./Footer";
import AdSpace from "./AdSpace";

interface PageLayoutProps {
  children: ReactNode;
  className?: string;
  fullWidth?: boolean;
  showFooter?: boolean;
}

export const PageLayout = ({
  children,
  className,
  fullWidth = false,
  showFooter = true,
}: PageLayoutProps) => {
  return (
    <div className={cn(
      "min-h-screen flex flex-col bg-background text-foreground",
    )}>
      <NavigationWithDropdowns />
      
      <main 
        className={cn(
          "flex-1 w-full pb-8 sm:pb-12",
          className
        )}
      >
        {children}
      </main>
      
      {showFooter && <Footer />}
    </div>
  );
};

// Keep the default export for backward compatibility
export default PageLayout;

// Article Layout Component
export function ArticleLayout({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <PageLayout>
      <article className={cn("max-w-4xl mx-auto w-full py-8", className)}>
        {children}
      </article>
    </PageLayout>
  );
}

// Grid Layout Component
export function GridLayout({
  children,
  className,
  cols = 3,
}: {
  children: ReactNode;
  className?: string;
  cols?: 2 | 3 | 4;
}) {
  const gridCols = {
    2: "md:grid-cols-2",
    3: "md:grid-cols-2 lg:grid-cols-3",
    4: "md:grid-cols-2 lg:grid-cols-4",
  };

  return (
    <div className={cn("grid grid-cols-1 gap-8", gridCols[cols], className)}>
      {children}
    </div>
  );
}

// Section Component
export function Section({
  children,
  title,
  description,
  className,
  isNarrow = false,
  showAd = false,
}: {
  children: ReactNode;
  title?: string;
  description?: string;
  className?: string;
  isNarrow?: boolean;
  showAd?: boolean;
}) {
  return (
    <section className={cn("py-12", className)}>
      <div className={cn(isNarrow ? "max-w-4xl mx-auto" : "w-full")}>
        {(title || description) && (
          <div className="mb-10 text-center">
            {title && (
              <h2 className="text-3xl md:text-4xl font-secondary mb-4">
                {title}
              </h2>
            )}
            {description && (
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {description}
              </p>
            )}
          </div>
        )}
        {children}
        
        {/* Optional banner ad after section content */}
        {showAd && (
          <div className="flex justify-center mt-12">
            <AdSpace 
              size="banner" 
              className="mx-auto"
              showPlaceholder={true}
            />
          </div>
        )}
      </div>
    </section>
  );
}

// Ad Banner Component - for inserting between sections
export function AdBanner({
  className,
  size = "banner",
  placement,
  currentPage,
}: {
  className?: string;
  size?: 'banner' | 'square';
  placement?: string;
  currentPage?: string;
}) {
  return (
    <div className={cn("py-8 flex justify-center", className)}>
      <AdSpace 
        size={size}
        placement={placement}
        currentPage={currentPage}
        className="mx-auto"
        showPlaceholder={true}
      />
    </div>
  );
}

// Container Component
export function Container({
  children,
  className,
  size = "default",
}: {
  children: ReactNode;
  className?: string;
  size?: "default" | "narrow" | "wide" | "full";
}) {
  const maxWidth = {
    default: "max-w-7xl",
    narrow: "max-w-4xl",
    wide: "max-w-7xl",
    full: "max-w-full",
  }[size];

  return (
    <div className={cn("mx-auto px-4 w-full", maxWidth, className)}>
      {children}
    </div>
  );
}
