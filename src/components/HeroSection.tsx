import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { getCurrentDancerOfMonth } from "@/lib/sanity/queries/dancers-of-month";
import { urlFor } from "@/lib/sanity";
import type { SanityDancerOfTheMonth } from "@/lib/sanity/types";

const HeroSection = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [0, 100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.3]);
  const [dom, setDom] = useState<SanityDancerOfTheMonth | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    getCurrentDancerOfMonth().then(setDom).catch(() => {});
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      setMousePos({
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      });
    };
    const el = sectionRef.current;
    if (el) el.addEventListener("mousemove", handleMouseMove);
    return () => { if (el) el.removeEventListener("mousemove", handleMouseMove); };
  }, []);

  const dancerName = dom?.artist
    ? (typeof dom.artist.name === "string" ? dom.artist.name : (dom.artist.name as any)?.en || "")
    : "";

  const heroImageUrl = dom?.featuredImage
    ? urlFor(dom.featuredImage)?.width(1920).height(1080).url()
    : null;

  return (
    <section ref={sectionRef} className="relative h-screen min-h-[600px] flex flex-col overflow-hidden bg-black w-full">
      {/* Background — image when DOM has one, else mouse-reactive gradient */}
      <motion.div className="absolute inset-0" style={{ y, opacity }}>
        {heroImageUrl ? (
          <img
            src={heroImageUrl}
            alt={dancerName}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full relative overflow-hidden">
            {/* Base gradient */}
            <div
              className="absolute inset-0 transition-all duration-700 ease-out"
              style={{
                background: `
                  radial-gradient(ellipse 80% 60% at ${mousePos.x * 100}% ${mousePos.y * 100}%, rgba(100, 30, 50, 0.4) 0%, transparent 60%),
                  radial-gradient(ellipse 60% 80% at ${(1 - mousePos.x) * 100}% ${(1 - mousePos.y) * 100}%, rgba(60, 20, 40, 0.3) 0%, transparent 50%),
                  radial-gradient(ellipse at 50% 50%, #0d0508 0%, #050203 100%)
                `,
              }}
            />
            {/* Mouse-following warm spotlight */}
            <div
              className="absolute w-[800px] h-[800px] rounded-full transition-all duration-500 ease-out pointer-events-none"
              style={{
                background: "radial-gradient(circle, rgba(212, 165, 116, 0.08) 0%, rgba(139, 69, 87, 0.04) 40%, transparent 70%)",
                left: `${mousePos.x * 100}%`,
                top: `${mousePos.y * 100}%`,
                transform: "translate(-50%, -50%)",
              }}
            />
            {/* Slow-moving ambient orbs */}
            <motion.div
              className="absolute w-[500px] h-[500px] rounded-full opacity-[0.06] pointer-events-none"
              style={{
                background: "radial-gradient(circle, #d4a574 0%, transparent 70%)",
                top: "5%",
                left: "10%",
              }}
              animate={{
                x: [0, 120, -60, 0],
                y: [0, -80, 60, 0],
                scale: [1, 1.3, 0.8, 1],
              }}
              transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute w-[400px] h-[400px] rounded-full opacity-[0.05] pointer-events-none"
              style={{
                background: "radial-gradient(circle, #8b4557 0%, transparent 70%)",
                bottom: "15%",
                right: "10%",
              }}
              animate={{
                x: [0, -80, 60, 0],
                y: [0, 60, -40, 0],
                scale: [1, 0.7, 1.2, 1],
              }}
              transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute w-[350px] h-[350px] rounded-full opacity-[0.04] pointer-events-none"
              style={{
                background: "radial-gradient(circle, #c9956b 0%, transparent 70%)",
                top: "50%",
                left: "60%",
              }}
              animate={{
                x: [0, 50, -90, 0],
                y: [0, -70, 30, 0],
                scale: [1, 1.1, 0.9, 1],
              }}
              transition={{ duration: 17, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        )}

        {/* Overlays for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/50" />
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

      {/* Dancer of the Month overlay */}
      <motion.div
        className="absolute bottom-16 sm:bottom-24 left-0 right-0 z-20 px-4 sm:px-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        <div className="container mx-auto max-w-4xl">
          {dom && dancerName ? (
            <div className="flex items-end justify-between">
              <div className="bg-black/50 backdrop-blur-sm rounded-2xl p-4 sm:p-5 border border-white/10 max-w-xs">
                <div className="text-xs uppercase tracking-widest text-primary font-semibold mb-1">
                  Dancer of the Month
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 drop-shadow-lg">
                  {dancerName}
                </h2>
                {dom.slug?.current && (
                  <Link
                    to={`/dancers-of-the-month/${dom.slug.current}`}
                    className="inline-flex items-center gap-2 bg-primary text-white text-sm font-medium px-4 py-2 rounded-full hover:bg-primary/90 transition-colors"
                  >
                    Meet {dancerName.split(" ")[0]}
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
