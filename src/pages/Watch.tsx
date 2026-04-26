import { motion } from "framer-motion";
import { PageLayout } from "@/components/PageLayout";
import { Play, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Watch() {
  return (
    <PageLayout>
      <div className="min-h-[70vh] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="container mx-auto px-4 text-center max-w-2xl"
        >
          {/* Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="mb-8"
          >
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <Play className="w-10 h-10 text-primary ml-1" />
            </div>
          </motion.div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-secondary font-bold text-foreground mb-4">
            Coming Soon
          </h1>

          {/* Description */}
          <p className="text-xl text-muted-foreground mb-4">
            Watch exclusive dance content, full performances, and behind-the-scenes footage from Caribbean dance culture.
          </p>

          <p className="text-muted-foreground mb-8">
            In the meantime, catch our content on YouTube.
          </p>

          <Button asChild size="lg" className="gap-2">
            <a href="https://www.youtube.com/@dancergirlmag" target="_blank" rel="noopener noreferrer">
              <ExternalLink className="w-4 h-4" />
              Visit our YouTube Channel
            </a>
          </Button>
        </motion.div>
      </div>
    </PageLayout>
  );
}
