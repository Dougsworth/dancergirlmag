import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Clock, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageLayout } from '@/components/PageLayout';

interface Video {
  id: string;
  title: string;
  youtubeId: string;
  duration: string;
  thumbnail?: string;
  description?: string;
  transcript?: string;
  publishedAt: string;
}

// Temporary mock data - replace with Sanity data later
const mockVideos: Video[] = [
  {
    id: "1",
    title: "Dance Conversation with Maria Rodriguez",
    youtubeId: "dQw4w9WgXcQ", // Replace with actual YouTube ID
    duration: "15:30",
    description: "Maria shares her journey from Kingston to international stages",
    transcript: "This is a sample transcript that would contain the full conversation...",
    publishedAt: "2024-01-15"
  },
  {
    id: "2", 
    title: "Behind the Scenes: Caribbean Dance Festival",
    youtubeId: "dQw4w9WgXcQ", // Replace with actual YouTube ID
    duration: "22:45",
    description: "Exclusive look at the preparations for the biggest dance event",
    transcript: "Full transcript of the behind the scenes footage...",
    publishedAt: "2024-01-10"
  }
];

export default function DancerSpeakUp() {
  const [videos, setVideos] = useState<Video[]>(mockVideos);
  const [loading, setLoading] = useState(false);
  const [expandedTranscripts, setExpandedTranscripts] = useState<Set<string>>(new Set());

  const toggleTranscript = (videoId: string) => {
    setExpandedTranscripts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(videoId)) {
        newSet.delete(videoId);
      } else {
        newSet.add(videoId);
      }
      return newSet;
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6
      }
    }
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
          className="py-16 md:py-24 bg-gradient-to-b from-background via-transparent to-background relative overflow-hidden"
          variants={itemVariants}
        >
          <div className="container mx-auto px-4 relative z-10">
            <motion.div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-secondary font-bold text-foreground mb-6">
                Dance Conversations
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Conversations about dance advocacy, education and importance to the Caribbean identity.
              </p>
            </motion.div>
          </div>
        </motion.section>

        {/* Videos Grid */}
        <div className="container mx-auto px-4 pb-16">
          <motion.div 
            className="grid gap-12 md:gap-16 max-w-4xl mx-auto"
            variants={containerVariants}
          >
            {videos.map((video, index) => (
              <motion.article
                key={video.id}
                variants={itemVariants}
                className="bg-card rounded-2xl overflow-hidden shadow-lg border border-border/50"
              >
                {/* Video Embed */}
                <div className="aspect-video relative bg-black">
                  <iframe
                    src={`https://www.youtube.com/embed/${video.youtubeId}`}
                    title={video.title}
                    className="absolute inset-0 w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>

                {/* Video Info */}
                <div className="p-6 md:p-8">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h2 className="text-2xl font-secondary font-bold text-foreground mb-2">
                        {video.title}
                      </h2>
                      {video.description && (
                        <p className="text-muted-foreground">
                          {video.description}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground ml-4">
                      <Clock className="w-4 h-4 mr-1" />
                      {video.duration}
                    </div>
                  </div>

                  {/* Transcript Toggle */}
                  {video.transcript && (
                    <div className="mt-6">
                      <Button
                        variant="outline"
                        onClick={() => toggleTranscript(video.id)}
                        className="w-full justify-between"
                      >
                        <span>Read Transcript</span>
                        {expandedTranscripts.has(video.id) ? (
                          <ChevronUp className="w-4 h-4 ml-2" />
                        ) : (
                          <ChevronDown className="w-4 h-4 ml-2" />
                        )}
                      </Button>

                      <AnimatePresence>
                        {expandedTranscripts.has(video.id) && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="mt-4 p-6 bg-muted/50 rounded-lg">
                              <h3 className="font-semibold text-foreground mb-3">
                                Transcript
                              </h3>
                              <div className="prose prose-sm max-w-none text-muted-foreground">
                                {video.transcript}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )}
                </div>
              </motion.article>
            ))}
          </motion.div>

          {/* Empty State */}
          {videos.length === 0 && !loading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <div className="text-6xl mb-4">🎥</div>
              <h3 className="text-2xl font-secondary font-bold mb-2">
                Coming Soon
              </h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                We're preparing amazing dance conversations. Check back soon!
              </p>
            </motion.div>
          )}
        </div>
      </motion.div>
    </PageLayout>
  );
}