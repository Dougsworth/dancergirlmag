import { Link } from "react-router-dom";
import { Instagram, Facebook, Youtube } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/contexts/ThemeContext";

const TikTokIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    aria-label="TikTok"
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.77a4.85 4.85 0 0 1-1.01-.08z"/>
  </svg>
);

const Footer = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center gap-6">
          {/* Brand */}
          <Link to="/" className="flex items-center">
            <img
              src={theme === 'dark' ? "/dancergirlmonoimage.png" : "/DG Monogram Letters ONLY Digital Black.png"}
              alt="DancerGirl Logo"
              className="h-12 w-auto object-contain"
            />
          </Link>

          <p className="text-sm text-muted-foreground text-center max-w-xs">
            The Caribbean's first magazine dedicated entirely to dance and its dancers.
          </p>

          {/* Social Icons */}
          <div className="flex space-x-5">
            <a href="https://www.instagram.com/dancergirlmag/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-muted-foreground hover:text-primary transition-colors">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="https://www.facebook.com/profile.php?id=100095030267158" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-muted-foreground hover:text-primary transition-colors">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="https://www.youtube.com/@dancergirlmag" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="text-muted-foreground hover:text-primary transition-colors">
              <Youtube className="w-5 h-5" />
            </a>
            <a href="https://www.tiktok.com/@dancergirlmag" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="text-muted-foreground hover:text-primary transition-colors">
              <TikTokIcon />
            </a>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
            <Link to="/stories" className="text-muted-foreground hover:text-foreground transition-colors">
              {t('nav.stories')}
            </Link>
            <Link to="/events" className="text-muted-foreground hover:text-foreground transition-colors">
              {t('nav.events')}
            </Link>
            <Link to="/dancers-speak-up" className="text-muted-foreground hover:text-foreground transition-colors">
              Dancers: Speak Up!
            </Link>
            <Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">
              {t('nav.about')}
            </Link>
          </div>
        </div>

        <div className="border-t border-border mt-6 pt-4 text-center text-xs text-muted-foreground">
          <p>{t('footer.copyright', { year: currentYear })}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
