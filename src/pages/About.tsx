import { Button } from '@/components/ui/button';
import { StandardLayout } from '@/components/StandardLayout';
import { motion } from 'framer-motion';

export default function About() {

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
    <StandardLayout className="relative">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative overflow-hidden"
      >
        <div className="relative h-[80vh] bg-black">
          <img
            src="/images/DSC00010-Edit.jpg"
            alt="Dancer in motion"
            className="w-full h-full object-cover object-[50%_20%] opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/70">
            <div className="container mx-auto h-full flex items-center px-4 relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="max-w-4xl text-center mx-auto"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="inline-flex items-center gap-3 mb-8 px-6 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20"
                >
                  <span className="text-sm font-medium text-white uppercase tracking-[0.2em]">Our Story</span>
                </motion.div>

                <h1 className="text-4xl md:text-5xl lg:text-7xl font-secondary text-white mb-6 drop-shadow-2xl leading-tight">
                  About DancerGirl
                </h1>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.9 }}
                  className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed"
                >
                  The Caribbean's first magazine dedicated entirely to dance and its dancers.
                </motion.p>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Mission Statement Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-20 md:py-28"
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <div className="w-12 h-[2px] bg-primary mb-8" />
            <h2 className="text-xs font-medium uppercase tracking-[0.3em] text-primary mb-8">Mission</h2>
            <p className="text-lg md:text-xl leading-[1.85] text-foreground/90">
              To inspire the minds of the creatively passionate by revealing the limitless possibilities within
              dance. Proudly rooted in Brand Jamaica and embracing the wider Caribbean, we celebrate and
              amplify the artistry, integrity, and evolution of dance across every island through vibrant
              storytelling, thoughtful critique, and engaging educational content. Our mission is to honor the
              region's rich cultural diversity—its histories, traditions, and contemporary expressions—while
              positioning Caribbean dance as a global force for identity, innovation, and influence. We
              empower young creatives with the knowledge, inspiration, and resources they need to thrive
              both at home and on the world stage.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Vision Section */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="py-20 md:py-28 border-t border-border/20"
      >
        <div className="container mx-auto px-4">
          <motion.div variants={itemVariants} className="max-w-4xl mx-auto">
            <div className="w-12 h-[2px] bg-primary mb-8" />
            <h2 className="text-xs font-medium uppercase tracking-[0.3em] text-primary mb-8">Vision</h2>
            <p className="text-lg md:text-xl leading-[1.85] text-foreground/90">
              DancerGirl Magazine seeks to build a thriving Caribbean creative ecosystem where dance is
              more than performance—it is a vital vehicle for cultural storytelling, regional pride, and
              economic empowerment. We envision a united Caribbean community of artists, audiences, and
              cultural advocates who elevate Caribbean dance as a powerful symbol of identity, innovation,
              and influence, driving the region's cultural capital on the global stage.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Extended About / Our Story */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="py-16 md:py-24 border-t border-border/20"
      >
        <div className="container mx-auto px-4">
          <motion.div variants={itemVariants} className="max-w-4xl mx-auto space-y-6 text-foreground/85">
            <div className="w-12 h-[2px] bg-primary mb-8" />
            <h2 className="text-xs font-medium uppercase tracking-[0.3em] text-primary mb-8">About</h2>
            <p className="text-lg md:text-xl leading-relaxed">
              At DancerGirl Magazine, our mission is to spotlight regional talent, strengthen audience
              engagement both across the Caribbean and internationally, and create new economic pathways
              for dancers, companies, schools, groups, and organizations through media exposure,
              advertising, and branded partnerships.
            </p>

            <p className="text-lg md:text-xl leading-relaxed">
              We serve an incredibly talented yet underserved community by offering compelling storytelling,
              a centralized regional event calendar, and vibrant short-form video and photo content. By
              bridging Caribbean dance communities and connecting them with international markets, we aim
              to position the region's dance culture on the global stage.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Dancer Image Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-8 md:py-16"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <img
              src="/images/DSC00127-Edit.jpg"
              alt="Dancer in yellow flowing fabric"
              className="w-full h-auto rounded-sm shadow-2xl"
            />
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative py-20 md:py-28 bg-neutral-900 text-white overflow-hidden"
      >
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-xs font-medium uppercase tracking-[0.3em] text-white/60 mb-8 block">Get Involved</span>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-secondary font-bold text-white mb-8">Share Your Dance Story</h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed text-white/80"
            >
              Have a story to share? We'd love to feature you. Submit your dance journey, choreography showcase, or cultural insights for a chance to be featured in DancerGirl Magazine.
            </motion.p>

            <Button
              variant="secondary"
              size="lg"
              className="px-8 py-6 text-lg rounded-full"
              onClick={() => {
                window.location.href = 'mailto:submit@dancergirlmag.com?subject=Dance Story Submission';
              }}
            >
              Submit Your Story
            </Button>
          </motion.div>
        </div>
      </motion.section>
    </StandardLayout>
  );
}
