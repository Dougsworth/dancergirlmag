import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Play, ExternalLink } from "lucide-react";
import { PageLayout } from "@/components/PageLayout";
import { sanityFetch } from "@/lib/sanity/client";
import { urlFor } from "@/lib/sanity";

interface SpeakaUpVideo {
  _id: string;
  title: string;
  youtubeUrl: string;
  thumbnail?: any;
  description?: string;
  publishedAt?: string;
}

export default function DancersSpeakUp() {
  const [videos, setVideos] = useState<SpeakaUpVideo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const query = `*[_type == "video" && defined(youtubeUrl)] | order(publishedAt desc) [0...24] {
      _id,
      title,
      youtubeUrl,
      thumbnail,
      description,
      publishedAt
    }`;

    sanityFetch<SpeakaUpVideo[]>(query)
      .then(setVideos)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const getYouTubeThumbnail = (url: string): string => {
    try {
      const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/);
      if (match) {
        return `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg`;
      }
    } catch {}
    return "";
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <PageLayout>
      <motion.div
        className="page-container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.section
          className="py-16 md:py-24 relative overflow-hidden"
          variants={itemVariants}
        >
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
          </div>
          <div className="container mx-auto px-4 relative z-10 text-center">
            <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Play className="w-8 h-8 text-accent ml-1" />
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-secondary font-bold text-foreground mb-4">
              Dancers: Speak Up!
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Caribbean dancers share their stories — conversations about dance advocacy, education, and
              the importance of dance to Caribbean identity.
            </p>
          </div>
        </motion.section>

        {/* Videos Grid */}
        <div className="container mx-auto px-4 pb-16">
          {loading ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="animate-pulse bg-card rounded-2xl overflow-hidden border border-border/50">
                  <div className="aspect-video bg-muted/50" />
                  <div className="p-5 space-y-3">
                    <div className="h-5 bg-muted/50 rounded w-3/4" />
                    <div className="h-4 bg-muted/50 rounded w-full" />
                  </div>
                </div>
              ))}
            </div>
          ) : videos.length === 0 ? (
            <motion.div
              variants={itemVariants}
              className="text-center py-16"
            >
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Play className="w-8 h-8 text-muted-foreground ml-1" />
              </div>
              <h3 className="text-2xl font-secondary font-bold mb-2">Coming Soon</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                We're preparing amazing dance conversations. Check back soon!
              </p>
            </motion.div>
          ) : (
            <motion.div
              className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
              variants={containerVariants}
            >
              {videos.map((video) => {
                const thumbnail = video.thumbnail
                  ? urlFor(video.thumbnail).width(640).height(360).url()
                  : getYouTubeThumbnail(video.youtubeUrl);
                const title = typeof video.title === "string" ? video.title : (video.title as any)?.en || "Video";
                const description = typeof video.description === "string"
                  ? video.description
                  : (video.description as any)?.en || "";

                return (
                  <motion.article
                    key={video._id}
                    variants={itemVariants}
                    className="group bg-card rounded-2xl overflow-hidden border border-border/50 hover:border-primary/30 hover:shadow-lg transition-all duration-300"
                  >
                    <a href={video.youtubeUrl} target="_blank" rel="noopener noreferrer">
                      <div className="relative aspect-video bg-black overflow-hidden">
                        {thumbnail ? (
                          <img
                            src={thumbnail}
                            alt={title}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-muted">
                            <Play className="w-12 h-12 text-muted-foreground" />
                          </div>
                        )}
                        {/* Play overlay */}
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="w-14 h-14 rounded-full bg-primary/90 flex items-center justify-center">
                            <Play className="w-6 h-6 text-white ml-1" />
                          </div>
                        </div>
                      </div>

                      <div className="p-5">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <h2 className="font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2 flex-1">
                            {title}
                          </h2>
                          <ExternalLink className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                        </div>
                        {description && (
                          <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
                        )}
                        {video.publishedAt && (
                          <p className="text-xs text-muted-foreground mt-3">
                            {new Date(video.publishedAt).toLocaleDateString("en-US", {
                              month: "long",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </p>
                        )}
                      </div>
                    </a>
                  </motion.article>
                );
              })}
            </motion.div>
          )}
        </div>
      </motion.div>
    </PageLayout>
  );
}
