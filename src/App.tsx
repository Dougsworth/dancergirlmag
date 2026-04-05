import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { useEffect, lazy, Suspense } from "react";
import { LanguageProvider } from './contexts/LanguageContext';
import PageTransition from "@/components/PageTransition";
import LoadingSpinner from "@/components/LoadingSpinner";

// Lazy load all pages - only download code when the route is visited
const Home = lazy(() => import("@/pages/Index"));
const About = lazy(() => import("@/pages/About"));
const Features = lazy(() => import("@/pages/Features"));
const Stories = lazy(() => import("@/pages/Stories"));
const StoryDetail = lazy(() => import("@/pages/StoryDetail"));
const ChoreographersCorner = lazy(() => import("@/pages/ChoreographersCorner"));
const NotFound = lazy(() => import("@/pages/NotFound"));
const Events = lazy(() => import("@/pages/Events"));
const EventDetail = lazy(() => import("@/pages/EventDetail"));
const Newsletter = lazy(() => import("@/pages/Newsletter"));
const EditorLetters = lazy(() => import("@/pages/EditorLetters"));
const EditorLetterDetail = lazy(() => import("@/pages/EditorLetterDetail"));
const DancersOfTheMonth = lazy(() => import("@/pages/DancersOfTheMonth"));
const DancerOfTheMonthDetail = lazy(() => import("@/pages/DancerOfTheMonthDetail"));
const DancerSpeakUp = lazy(() => import("@/pages/DancerSpeakUp"));
const DancersSpeakUp = lazy(() => import("@/pages/DancersSpeakUp"));
const MoneyMoves = lazy(() => import("@/pages/MoneyMoves"));
const Watch = lazy(() => import("@/pages/Watch"));

// This component ensures we scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <Router>
          <ScrollToTop />
          <div className="min-h-screen bg-background transition-colors duration-200">
            <Suspense fallback={<div className="flex items-center justify-center min-h-screen"><LoadingSpinner size="lg" /></div>}>
              <PageTransition>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/features" element={<Features />} />
                  <Route path="/stories" element={<Stories />} />
                  <Route path="/stories/:slug" element={<StoryDetail />} />
                  <Route path="/article/:slug" element={<StoryDetail />} />
                  <Route path="/choreographers-corner" element={<ChoreographersCorner />} />
                  <Route path="/dancers" element={<DancersOfTheMonth />} />
                  <Route path="/dancers/:slug" element={<DancerOfTheMonthDetail />} />
                  <Route path="/newsletter" element={<Newsletter />} />
                  <Route path="/newsletter/:slug" element={<EditorLetterDetail />} />
                  <Route path="/editor-letters" element={<EditorLetters />} />
                  <Route path="/editor-letters/:slug" element={<EditorLetterDetail />} />
                  <Route path="/events" element={<Events />} />
                  <Route path="/events/:slug" element={<EventDetail />} />
                  <Route path="/dancers-of-the-month" element={<DancersOfTheMonth />} />
                  <Route path="/dancers-of-the-month/:slug" element={<DancerOfTheMonthDetail />} />
                  <Route path="/dancer-speak-up" element={<DancerSpeakUp />} />
                  <Route path="/dancers-speak-up" element={<DancersSpeakUp />} />
                  <Route path="/money-moves" element={<MoneyMoves />} />
                  <Route path="/watch" element={<Watch />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </PageTransition>
            </Suspense>
          </div>
          <Toaster />
        </Router>
      </ThemeProvider>
    </LanguageProvider>
  );
}

export default App;
