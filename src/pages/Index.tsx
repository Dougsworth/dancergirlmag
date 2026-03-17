import HeroSection from "@/components/HeroSection";
import DancersSpeakUpPanel from "@/components/DancersSpeakUpPanel";
import { VideoFirstLayout } from "@/components/VideoFirstLayout";
import LatestFromDancerGirl from "@/components/LatestFromDancerGirl";
import AdSpace from "@/components/AdSpace";
import HomepageMagazine from "@/components/HomepageMagazine";

const Index = () => {
  return (
    <VideoFirstLayout showFooter={true}>
      {/* Hero — full screen video / DOM image */}
      <HeroSection />

      {/* Latest articles — PrimeReact carousel */}
      <LatestFromDancerGirl />

      {/* Ad break */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-center">
          <AdSpace
            size="banner"
            placement="home-between"
            currentPage="home"
            className="max-w-4xl"
          />
        </div>
      </div>

      {/* Magazine panels: Editor Letter / DOM / Events / Music */}
      <HomepageMagazine />

      {/* Dancers: Speak Up! */}
      <DancersSpeakUpPanel />
    </VideoFirstLayout>
  );
};

export default Index;
