import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Section from "@/components/Section";
import AppearOnScroll from "@/components/AppearOnScroll";
import PartnerCarousel from "@/components/PartnerCarousel";
import AudioPlayer, { AudioEpisode } from "@/components/AudioPlayer";
import SEO from "@/components/SEO";
import { PAGE_SEO } from "@/lib/seo";
import { Shield, Users, Scale, Clock, Star, Briefcase, Heart, Home, FileText, Gavel, DollarSign, X, Mail, Lock, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { OnboardingModal } from "@/components/OnboardingModal";

// (rest of Blog.tsx with OnboardingModal usage as before)
const Blog = () => {
  // ... existing
  const [showOnboarding, setShowOnboarding] = useState(false);
  // ...
  return (
    // ...
    <OnboardingModal isOpen={showOnboarding} onClose={() => setShowOnboarding(false)} />
    // update buttons to openOnboarding
  );
};

export default Blog;
