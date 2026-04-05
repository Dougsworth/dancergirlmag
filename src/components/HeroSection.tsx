import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { getActiveHero, type SanityHeroSection } from "@/lib/sanity/queries/hero";
import { getCurrentDancerOfMonth } from "@/lib/sanity/queries/dancers-of-month";
import { urlFor } from "@/lib/sanity";
import type { SanityDancerOfTheMonth } from "@/lib/sanity/types";

const HeroSection = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [0, 100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.3]);
  const [hero, setHero] = useState<SanityHeroSection | null>(null);
  const [dom, setDom] = useState<SanityDancerOfTheMonth | null>(null);

  useEffect(() => {
    // Try CMS hero first, fall back to current dancer of the month
    getActiveHero().then(setHero).catch(() => {});
    getCurrentDancerOfMonth().then(setDom).catch(() => {});
  }, []);

  // Determine video source: CMS hero video > fallback static file
  const heroVideoSrc = hero?.heroVideo?.url
    || hero?.heroVideoUrl
    || "/hero-video-compressed.mp4";

  // Determine caption data: CMS hero > current D.O.M
  const captionHeading = hero?.captionHeading || "Dancer of the Month";
  const captionName = hero?.captionName || dom?.dancerName || "";
  const captionLink = hero?.captionLinkResolved
    || hero?.captionLinkUrl
    || (dom?.slug?.current ? `/dancers-of-the-month/${dom.slug.current}` : "");
  const captionButton = hero?.captionButtonText
    || (captionName ? `Meet ${captionName.split(" ")[0]}` : "");

  // Use D.O.M featured image as background if no video is configured
  const heroImageUrl = dom?.featuredImage
    ? urlFor(dom.featuredImage)?.width(1920).height(1080).url()
    : null;

  // Show image background only when there's NO CMS hero (i.e. no managed video)
  const useImageBackground = !hero && heroImageUrl;

  return (
    <section className="relative h-screen min-h-[600px] flex flex-col overflow-hidden bg-black w-full">
      {/* Background */}
      <motion.div className="absolute inset-0" style={{ y, opacity }}>
        {useImageBackground ? (
          <img
            src={heroImageUrl!}
            alt={captionName}
            className="w-full h-full object-cover"
          />
        ) : (
          <video
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            src={heroVideoSrc}
          />
        )}

        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />
      </motion.div>

      {/* Logo */}
      <div className="relative z-20 pt-16 sm:pt-24 md:pt-32 lg:pt-36 px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <img
            src="/Dancer Girl Logo Digital Black.png"
            alt="DancerGirl"
            className="h-16 sm:h-24 md:h-32 lg:h-40 w-auto object-contain mx-auto"
            style={{
              filter:
                "brightness(0) invert(1) drop-shadow(0 6px 30px rgba(0,0,0,0.6)) drop-shadow(0 4px 15px rgba(0,0,0,0.5)) drop-shadow(0 2px 8px rgba(0,0,0,0.3)) drop-shadow(0 0 20px rgba(255,255,255,0.3))",
            }}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              const parent = target.parentElement;
              if (parent) {
                parent.innerHTML = `<span style="color: rgba(255,255,255,0.98); text-shadow: 0 6px 30px rgba(0,0,0,0.6); font-size: clamp(2.5rem, 8vw, 12rem); font-weight: 700;">DancerGirl</span>`;
              }
            }}
          />
        </motion.div>
      </div>

      {/* Caption overlay */}
      <motion.div
        className="absolute bottom-16 sm:bottom-24 left-0 right-0 z-20 px-4 sm:px-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        <div className="container mx-auto max-w-4xl">
          {captionName ? (
            <div className="flex items-end justify-between">
              <div className="bg-black/50 backdrop-blur-sm rounded-2xl p-4 sm:p-5 border border-white/10 max-w-xs">
                <div className="text-xs uppercase tracking-widest text-primary font-semibold mb-1">
                  {captionHeading}
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 drop-shadow-lg">
                  {captionName}
                </h2>
                {captionLink && (
                  <Link
                    to={captionLink}
                    className="inline-flex items-center gap-2 bg-primary text-white text-sm font-medium px-4 py-2 rounded-full hover:bg-primary/90 transition-colors"
                  >
                    {captionButton}
                  </Link>
                )}
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <motion.p
                className="text-base sm:text-lg text-white/50 tracking-widest uppercase font-light"
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                Movement, rhythm, and stories from the islands
              </motion.p>
            </div>
          )}
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 z-20"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.8 }}
      >
        <motion.div
          className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center"
          animate={{ y: [0, 4, 0], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg
            width="10"
            height="10"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-white/80"
          >
            <path d="M7 13l5 5 5-5" />
            <path d="M7 6l5 5 5-5" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
