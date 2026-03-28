import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { HelmetProvider } from "react-helmet-async";
import ScrollToTop from "@/components/ScrollToTop";
import Blog from "./pages/Blog";
import About from "./pages/About";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import PracticeAreas from "./pages/PracticeAreas";
import HowItWorks from "./pages/HowItWorks";
import Pricing from "./pages/Pricing";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Partners from "./pages/Partners";
import CaseStudyRedemption from "./pages/CaseStudyRedemption";
import Start from "./pages/Start";
import Stream from "./pages/Stream";
import NotFound from "./pages/NotFound";
import LandingIreland from "./pages/LandingIreland";
import LandingGhana from "./pages/LandingGhana";
import LandingKenya from "./pages/LandingKenya";
import KnowledgeCenter from "./pages/KnowledgeCenter";
import CaseStudyRedemptionNew from "./pages/CaseStudyRedemptionNew";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="system" storageKey="monogamy-theme">
        <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Blog />} />
            <Route path="/practice-areas" element={<PracticeAreas />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/partners" element={<Partners />} />
            <Route path="/case-study/redemption-law-group" element={<Navigate to="/case-study/redemption" replace />} />
            <Route path="/case-study/redemption" element={<CaseStudyRedemptionNew />} />
            <Route path="/start" element={<Start />} />
            <Route path="/stream" element={<Stream />} />
            <Route path="/ie" element={<LandingIreland />} />
            <Route path="/gh" element={<LandingGhana />} />
            <Route path="/ke" element={<LandingKenya />} />
            <Route path="/knowledge-center" element={<KnowledgeCenter />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
</HelmetProvider>
);

export default App;
