import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { urlFor, sanityFetch } from "@/lib/sanity";

function str(v: unknown): string {
  if (!v) return "";
  if (typeof v === "string") return v;
  return (v as any)?.en ?? "";
}

function getYouTubeThumbnail(url: string): string | null {
  const match = url.match(/(?:v=|youtu\.be\/)([^&?/]+)/);
  return match ? `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg` : null;
}

export default function DancersSpeakUpPanel() {
  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    sanityFetch<any[]>(
      `*[_type == "video" && defined(videoUrl)] | order(publishedAt desc) [0...4] { _id, title, videoUrl, thumbnail, description }`
    )
      .then((data) => setVideos(data ?? []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) return null;

  return (
    <section className="py-16 md:py-20 border-t border-border" style={{ background: "hsl(var(--caribbean-burgundy) / 0.08)" }}>
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <p
              className="text-xs font-semibold uppercase tracking-[0.25em] mb-3"
              style={{ color: "#D26059" }}
            >
              Voices from the Floor
            </p>
            <h2 className="font-primary text-3xl md:text-4xl leading-tight text-foreground">
              Dancers: Speak Up!
            </h2>
          </div>
          <Link
            to="/dancers-speak-up"
            className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold hover:gap-3 transition-all duration-200"
            style={{ color: "#D26059" }}
          >
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {videos.length === 0 ? (
          <div className="text-center py-10 text-muted-foreground">
            <p>Video content coming soon.</p>
          </div>
        ) : (
          <div className="flex flex-wrap justify-center gap-5">
            {videos.map((video, i) => {
              const thumb = video.thumbnail?.asset
                ? urlFor(video.thumbnail).width(600).height(400).url()
                : getYouTubeThumbnail(video.videoUrl ?? "");
              const title = str(video.title);
              const desc = str(video.description);
              return (
                <motion.a
                  key={video._id}
                  href={video.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="group block rounded-xl overflow-hidden border border-border/50 bg-card hover:shadow-lg hover:border-primary/30 transition-all duration-300 w-full sm:w-[calc(50%-10px)] lg:w-[calc(25%-15px)]"
                >
                  <div className="relative aspect-video overflow-hidden">
                    {thumb ? (
                      <img
                        src={thumb}
                        alt={title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full bg-muted flex items-center justify-center">
                        <span className="font-primary text-4xl text-muted-foreground/30">DG</span>
                      </div>
                    )}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center">
                        <svg className="w-5 h-5 text-gray-900 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-foreground text-sm leading-snug line-clamp-2 group-hover:text-primary transition-colors mb-1">
                      {title}
                    </h3>
                    {desc && (
                      <p className="text-xs text-muted-foreground line-clamp-2">{desc}</p>
                    )}
                  </div>
                </motion.a>
              );
            })}
          </div>
        )}

        <div className="sm:hidden text-center mt-8">
          <Link
            to="/dancers-speak-up"
            className="inline-flex items-center gap-2 text-sm font-semibold"
            style={{ color: "#D26059" }}
          >
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
