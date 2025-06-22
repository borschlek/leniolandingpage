import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { Heart, Stethoscope, UserCheck, Trophy, Brain, ClipboardList, TrendingUp, Shield, Rocket, Star, Bell, Gift, HeartHandshake, Menu, X, ChevronDown, CheckCircle, TriangleAlert, University, Lightbulb, Lock, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { trackEvent } from "@/lib/analytics";

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [heroForm, setHeroForm] = useState({ name: "", email: "" });
  const [finalForm, setFinalForm] = useState({ name: "", email: "" });
  const [communityForm, setCommunityForm] = useState({
    type: "",
    story: "",
    name: "",
    email: "",
    wantsUpdates: false
  });

  const { toast } = useToast();

  // Waitlist signup mutation
  const waitlistMutation = useMutation({
    mutationFn: async (data: { name: string; email: string; source: string }) => {
      return apiRequest("POST", "/api/waitlist", data);
    },
    onSuccess: () => {
      toast({
        title: "Welcome to the waitlist!",
        description: "Thanks for joining our waitlist! We'll be in touch soon.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Community feedback mutation
  const communityMutation = useMutation({
    mutationFn: async (data: typeof communityForm) => {
      return apiRequest("POST", "/api/community", data);
    },
    onSuccess: () => {
      toast({
        title: "Thank you!",
        description: "Thank you for sharing your story! Your feedback helps us build a better platform.",
      });
      setCommunityForm({
        type: "",
        story: "",
        name: "",
        email: "",
        wantsUpdates: false
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Cookie Consent State
  const [cookieConsent, setCookieConsent] = useState<null | boolean>(null);
  const [gtmLoaded, setGtmLoaded] = useState(false);

  // GTM container ID
  const GTM_ID = "G-SG60Z2LCZQ";

  // Inject GTM after consent
  useEffect(() => {
    if (cookieConsent && !gtmLoaded) {
      // Inject GTM head
      if (!document.getElementById("gtm-head")) {
        const script = document.createElement("script");
        script.id = "gtm-head";
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
        document.head.appendChild(script);
      }
      // Inject GTM body (noscript)
      if (!document.getElementById("gtm-body")) {
        const noscript = document.createElement("noscript");
        noscript.id = "gtm-body";
        noscript.innerHTML = `<iframe src=\"https://www.googletagmanager.com/ns.html?id=${GTM_ID}\" height=\"0\" width=\"0\" style=\"display:none;visibility:hidden\"></iframe>`;
        document.body.prepend(noscript);
      }
      setGtmLoaded(true);
    }
  }, [cookieConsent, gtmLoaded]);

  // Check for consent on mount
  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent");
    if (consent === "accepted") {
      setCookieConsent(true);
    } else if (consent === "declined") {
      setCookieConsent(false);
    } else {
      setCookieConsent(null);
    }
  }, []);

  // Handle Accept/Decline
  const handleCookieConsent = (accept: boolean) => {
    setCookieConsent(accept);
    localStorage.setItem("cookie_consent", accept ? "accepted" : "declined");
  };

  const handleHeroSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (heroForm.name && heroForm.email) {
      // Track analytics event
      trackEvent('waitlist_signup', 'conversion', 'hero_section');
      
      waitlistMutation.mutate({ ...heroForm, source: "hero" });
      setHeroForm({ name: "", email: "" });
    }
  };

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (finalForm.name && finalForm.email) {
      waitlistMutation.mutate({ ...finalForm, source: "final" });
      setFinalForm({ name: "", email: "" });
    }
  };

  const handleCommunitySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (communityForm.type && communityForm.story && communityForm.email) {
      communityMutation.mutate(communityForm);
    }
  };

  const smoothScroll = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) {
      const headerHeight = 64; // Header height
      const targetPosition = element.offsetTop - headerHeight;
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
      setMobileMenuOpen(false);
    }
  };

  useEffect(() => {
    const observeElements = () => {
      const observer = new IntersectionObserver(
        (entries, obs) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("animate-fade-in");
              obs.unobserve(entry.target); // Unobserve after animating once
            }
          });
        },
        {
          threshold: 0.1,
          rootMargin: "0px 0px -50px 0px",
        }
      );

      const animatedElements = document.querySelectorAll(".animate-on-scroll");
      animatedElements.forEach((el) => observer.observe(el));

      return () => observer.disconnect();
    };

    const cleanup = observeElements();
    return cleanup;
  }, []);

  // Track Hero CTA click via GTM dataLayer
  const handleHeroCTAClick = () => {
    if (window.dataLayer) {
      window.dataLayer.push({
        event: "hero_cta_click",
        category: "engagement",
        label: "Join the Waitlist Hero CTA"
      });
    }
    smoothScroll("waitlist");
  };

  // Track Google Form submission (iframe interaction)
  useEffect(() => {
    if (!cookieConsent) return;
    // Listen for postMessage from Google Form
    const handler = (event: MessageEvent) => {
      // Only accept messages from Google Forms
      if (typeof event.data === "string" && event.data.indexOf("google-forms-response") !== -1) {
        if (window.dataLayer) {
          window.dataLayer.push({
            event: "waitlist_form_submit",
            category: "conversion",
            label: "Google Form Waitlist"
          });
        }
      }
    };
    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, [cookieConsent]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {/* Cookie Consent Banner */}
      {cookieConsent === null && (
        <div className="fixed bottom-0 left-0 w-full z-[100] flex justify-center px-2">
          <div className="bg-white border border-slate-200 shadow-lg rounded-t-xl max-w-xl w-full mx-auto p-4 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-slate-800 animate-slide-up">
            <div className="flex-1 text-sm text-center sm:text-left">
              We use cookies for analytics to improve your experience. See our {" "}
              <a href="/privacy.html" className="underline text-blue-700 hover:text-blue-900" target="_blank" rel="noopener noreferrer">privacy policy</a>.
            </div>
            <div className="flex gap-2">
              <button
                className="bg-blue-700 hover:bg-blue-800 text-white font-semibold px-4 py-2 rounded-lg transition-colors text-sm"
                onClick={() => handleCookieConsent(true)}
              >
                Accept
              </button>
              <button
                className="bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold px-4 py-2 rounded-lg transition-colors text-sm"
                onClick={() => handleCookieConsent(false)}
              >
                Decline
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50" id="header">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <div className="flex items-center">
                <img 
                  src="/images/lenio-logo.png" 
                  alt="Lenio" 
                  className="h-16 w-auto object-contain"
                />
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <button
                onClick={() => smoothScroll("how-it-works")}
                className="text-slate-600 hover:text-medical-blue transition-colors duration-200 font-medium"
              >
                How it Works
              </button>
              <button
                onClick={() => smoothScroll("faqs")}
                className="text-slate-600 hover:text-medical-blue transition-colors duration-200 font-medium"
              >
                FAQs
              </button>
              <Button
                onClick={handleHeroCTAClick}
                className="bg-medical-blue hover:bg-blue-700 text-white"
              >
                Join Waitlist
              </Button>
            </nav>

            {/* Mobile menu button */}
            <button
              className="md:hidden text-slate-600 hover:text-medical-blue"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t">
                <button
                  onClick={() => smoothScroll("how-it-works")}
                  className="block w-full text-left px-3 py-2 text-slate-600 hover:text-medical-blue transition-colors duration-200"
                >
                  How it Works
                </button>
                <button
                  onClick={() => smoothScroll("faqs")}
                  className="block w-full text-left px-3 py-2 text-slate-600 hover:text-medical-blue transition-colors duration-200"
                >
                  FAQs
                </button>
                <Button
                  onClick={handleHeroCTAClick}
                  className="w-full bg-medical-blue hover:bg-blue-700 text-white mt-2"
                >
                  Join Waitlist
                </Button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-white via-sky-100 to-sky-200 overflow-hidden font-['Work_Sans']" id="hero">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="text-center lg:text-left lg:flex lg:items-center lg:justify-between">
            <div className="lg:w-1/2 animate-slide-up">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-slate-900">
                Run Strong.
                <br />
                <span className="text-blue-800">Pain-Free.</span>
              </h1>
              <p className="text-xl sm:text-2xl text-slate-600 mb-2 leading-relaxed">
                Your digital physio for identifying pain, accelerating recovery, and staying injury-free.
              </p>
              <p className="text-sm text-slate-500 mb-8">
                Backed by physiotherapists. Built for everyday runners.
              </p>

              <Button
                onClick={handleHeroCTAClick}
                className="bg-blue-800 hover:bg-blue-900 text-white font-semibold py-4 px-8 text-lg transform hover:scale-105 transition-all duration-200"
              >
                <Rocket className="mr-2 h-5 w-5" />
                Join the Waitlist
              </Button>
            </div>

            <div className="lg:w-1/2 mt-12 lg:mt-0 lg:ml-12">
              <div className="relative w-full max-w-md mx-auto transform hover:scale-105 transition-all duration-300 overflow-hidden animate-slide-up">
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
                  <defs>
                    <clipPath id="oval-tilted" clipPathUnits="objectBoundingBox">
                      <ellipse cx="0.5" cy="0.5" rx="0.5" ry="0.35" transform="rotate(-10 0.5 0.5)" />
                    </clipPath>
                  </defs>
                  <image
                    xlinkHref="/images/hero_image.jpg"
                    width="100%"
                    height="100%"
                    preserveAspectRatio="xMidYMid slice"
                    clipPath="url(#oval-tilted)"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* User Journeys Section */}
      <section className="bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 py-16 sm:py-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              What Lenio Helps With
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Less pain, more progress. Discover how Lenio supports you at every stage of your running journey.
            </p>
          </div>
          
          <div className="flex justify-center">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 w-full">
              <div className="mx-auto w-full max-w-sm bg-white shadow-md hover:shadow-lg transition duration-300 ease-in-out border border-sky-100 rounded-2xl p-6 cursor-pointer"
                onClick={() => smoothScroll('feature-1')}>
                <div className="mb-4 text-blue-600">
                  <Brain className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-slate-900">
                  Understand Your Pain
                </h3>
                <p className="text-slate-600">
                  Identify potential injuries early through AI-powered symptom assessments.
                </p>
              </div>

              <div className="mx-auto w-full max-w-sm bg-white shadow-md hover:shadow-lg transition duration-300 ease-in-out border border-sky-100 rounded-2xl p-6 cursor-pointer"
                onClick={() => smoothScroll('feature-2')}>
                <div className="mb-4 text-blue-600">
                  <TrendingUp className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-slate-900">
                  Recover Faster
                </h3>
                <p className="text-slate-600">
                  Access expert-backed recovery plans tailored to your pain and recovery phase.
                </p>
              </div>

              <div className="md:col-span-2 lg:col-span-1 mx-auto w-full max-w-sm bg-white shadow-md hover:shadow-lg transition duration-300 ease-in-out border border-sky-100 rounded-2xl p-6 cursor-pointer"
                onClick={() => smoothScroll('feature-4')}>
                <div className="mb-4 text-blue-600">
                  <Shield className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-slate-900">
                  Prevent Injury
                </h3>
                <p className="text-slate-600">
                  Stay active and pain-free with prehab routines designed for runners.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Mockups Section */}
      <section className="py-16 lg:py-24 bg-slate-50" id="how-it-works">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">How Lenio Works</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              From assessment to recovery, we've got you covered every step of the way.
            </p>
          </div>

          {/* Feature 1: AI-powered Symptom Assessment */}
          <div id="feature-1" className="flex flex-col lg:flex-row items-center mb-16 lg:mb-24 animate-on-scroll">
            <div className="w-full lg:w-1/2 mb-8 lg:mb-0 lg:pr-12">
              <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white p-2 rounded-lg inline-block mb-4">
                <Brain className="h-6 w-6" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6">AI-Powered Injury Assessments</h3>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                Lenio combines AI with clinical best practices to guide you safely through your injury journey. Developed with physiotherapists, Lenio asks the right questions to identify what is driving your pain and recommend the safest next step, whether that is seeking professional care or starting safe at-home rehab.
              </p>
              <ul className="space-y-3 text-slate-600">
                <li className="flex items-center">
                  <CheckCircle className="text-health-green mr-3 h-5 w-5" />
                  Built with licensed clinicians
                </li>
                <li className="flex items-center">
                  <CheckCircle className="text-health-green mr-3 h-5 w-5" />
                  Considers injury history and context
                </li>
                <li className="flex items-center">
                  <CheckCircle className="text-health-green mr-3 h-5 w-5" />
                  Recommends the safest next step
                </li>
              </ul>
            </div>
            <div className="w-full lg:w-1/2">
              <img
                src="/images/lenio_assessment_mockup2.png"
                alt="Smartphone displaying health assessment interface"
                className="rounded-2xl mx-auto w-full max-w-[90%] sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl"
              />
            </div>
          </div>

          {/* Feature 2: Personalized Rehab Plans */}
          <div id="feature-2" className="flex flex-col lg:flex-row-reverse items-center mb-16 lg:mb-24 animate-on-scroll">
            <div className="w-full lg:w-1/2 mb-8 lg:mb-0 lg:pl-12">
              <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white p-2 rounded-lg inline-block mb-4">
                <ClipboardList className="h-6 w-6" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6">Personalized Rehab Plans</h3>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                Lenio turns your assessment into a rehab plan designed by physiotherapists and tailored to your recovery. Sessions adapt to your progress and symptoms, keeping you on track. Varied exercises and customizable voiceovers and music keep rehab fresh, personal, and engaging.
              </p>
              <ul className="space-y-3 text-slate-600">
                <li className="flex items-center">
                  <CheckCircle className="text-health-green mr-3 h-5 w-5" />
                  Video-guided exercises with expert instruction
                </li>
                <li className="flex items-center">
                  <CheckCircle className="text-health-green mr-3 h-5 w-5" />
                  Sessions adapt to progress and symptoms
                </li>
                <li className="flex items-center">
                  <CheckCircle className="text-health-green mr-3 h-5 w-5" />
                  Personalize voiceovers and music to your preference
                </li>
              </ul>
            </div>
            <div className="w-full lg:w-1/2">
              <img
                src="/images/lenio_rehab_mockup.png"
                alt="Tablet displaying rehabilitation exercise program"
                className="rounded-2xl mx-auto w-full max-w-[90%] sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl"
              />
            </div>
          </div>

          {/* Feature 3: Adherence-optimized UX */}
          <div className="flex flex-col lg:flex-row items-center mb-16 lg:mb-24 animate-on-scroll">
            <div className="w-full lg:w-1/2 mb-8 lg:mb-0 lg:pr-12">
              <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white p-2 rounded-lg inline-block mb-4">
                <TrendingUp className="h-6 w-6" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6">Adherence-Optimized Experience</h3>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                Injury recovery takes consistency. Lenio is built to keep you engaged with full transparency on your progress and what lies ahead. Shareable milestones, streaks, and simple rewards make sticking to your rehab feel natural, while flexible scheduling adapts to your daily life.
              </p>
              <ul className="space-y-3 text-slate-600">
                <li className="flex items-center">
                  <CheckCircle className="text-health-green mr-3 h-5 w-5" />
                  Transparent progress tracking and milestones
                </li>
                <li className="flex items-center">
                  <CheckCircle className="text-health-green mr-3 h-5 w-5" />
                  Streaks, rewards, and shareable achievements
                </li>
                <li className="flex items-center">
                  <CheckCircle className="text-health-green mr-3 h-5 w-5" />
                  Flexible scheduling that fits your routine
                </li>
              </ul>
            </div>
            <div className="w-full lg:w-1/2">
              <img
                src="/images/lenio_engagement_mockup.png"
                alt="Mobile app displaying progress tracking and motivation features"
                className="rounded-2xl mx-auto w-full max-w-[90%] sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl"
              />
            </div>
          </div>

          {/* Feature 4: Tailored Prehab Routines */}
          <div id="feature-4" className="flex flex-col lg:flex-row-reverse items-center animate-on-scroll">
            <div className="w-full lg:w-1/2 mb-8 lg:mb-0 lg:pl-12">
              <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white p-2 rounded-lg inline-block mb-4">
                <Shield className="h-6 w-6" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6">Tailored Prehab</h3>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                Lenio helps you stay ahead of injuries with prehab routines designed for runners. Your plan adapts to your past injuries, recovery feedback, and personal running goals, whether you are training for your first 5K or your next marathon. Lenio also factors in what commonly affects other runners to target weak spots before they become problems.
              </p>
              <ul className="space-y-3 text-slate-600">
                <li className="flex items-center">
                  <CheckCircle className="text-health-green mr-3 h-5 w-5" />
                  Personalized prehab based on your injury history
                </li>
                <li className="flex items-center">
                  <CheckCircle className="text-health-green mr-3 h-5 w-5" />
                  Targets common running injury risks
                </li>
                <li className="flex items-center">
                  <CheckCircle className="text-health-green mr-3 h-5 w-5" />
                  Adjusted for your running goals and distance
                </li>
              </ul>
            </div>
            <div className="w-full lg:w-1/2">
              <img
                src="/images/lenio_prehab_mockup.png"
                alt="Person performing preventive exercises with mobile app guidance"
                className="rounded-2xl mx-auto w-full max-w-[90%] sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Clinical Safety Section */}
      <section className="py-16 lg:py-24 bg-white animate-on-scroll" id="clinical-safety">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-3xl p-8 lg:p-12 text-white">
            <div className="text-center mb-12">
              <div className="w-40 h-40 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-6 overflow-hidden">
                <img 
                  src="/images/pexels-shkrabaanthony-5215009.jpg"
                  alt="Medical professional"
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Built with Clinicians, Backed by Evidence</h2>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                Your safety comes first. Lenio is developed in collaboration with sports physicians and physiotherapists, following clinical best practices and the latest research in injury prevention and recovery.
              </p>
            </div>

            <div className="max-w-3xl mx-auto">
              <h3 className="text-2xl font-semibold mb-6 text-center">Evidence-Based Approach</h3>
              <ul className="space-y-4">
                <li className="flex items-start justify-center">
                  <CheckCircle className="text-health-green mr-3 mt-1 h-5 w-5" />
                  <span>Developed with sports physicians and physiotherapists</span>
                </li>
                <li className="flex items-start justify-center">
                  <CheckCircle className="text-health-green mr-3 mt-1 h-5 w-5" />
                  <span>Triage to in-person care if self-treatment is not appropriate</span>
                </li>
                <li className="flex items-start justify-center">
                  <CheckCircle className="text-health-green mr-3 mt-1 h-5 w-5" />
                  <span>Personal risk profile and injury history inform every recommendation</span>
                </li>
                <li className="flex items-start justify-center">
                  <CheckCircle className="text-health-green mr-3 mt-1 h-5 w-5" />
                  <span>Evidence-based exercises tailored to your injury and recovery stage</span>
                </li>
                <li className="flex items-start justify-center">
                  <CheckCircle className="text-health-green mr-3 mt-1 h-5 w-5" />
                  <span>Ongoing pain and symptom monitoring to adjust rehab in real time</span>
                </li>
              </ul>
            </div>
          </div>
          <p className="text-center text-slate-600 mt-6 text-sm">
            Disclaimer: Lenio does not provide a medical diagnosis. If in doubt, it is always best to seek advice from a medical professional.
          </p>
        </div>
      </section>

      {/* Trust Logos Section */}
      <section className="py-16 bg-slate-50 animate-on-scroll" id="trust-logos">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">Supported by</h2>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-12 max-w-5xl mx-auto">
            <img 
              src="/images/University of Oxford Logo.svg.png" 
              alt="University of Oxford" 
              className="h-12 grayscale"
            />
            <img 
              src="/images/SBS Logo.png" 
              alt="SBS" 
              className="h-12 grayscale"
            />
            <img 
              src="/images/EnSpire Logo.png" 
              alt="EnSpire Oxford" 
              className="h-12 grayscale"
            />
            <img 
              src="/images/OVB Logo.png" 
              alt="OVB" 
              className="h-12 grayscale"
            />
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-16 lg:py-24 bg-white animate-on-scroll" id="faqs">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-slate-600">Get answers to common questions about Lenio</p>
          </div>

          <Accordion type="single" collapsible className="w-full space-y-6">
            <AccordionItem value="item-1" className="bg-slate-50 rounded-2xl border border-slate-200 px-6">
              <AccordionTrigger className="text-left hover:no-underline hover:bg-slate-100 transition-colors duration-200 rounded-2xl px-0">
                <span className="text-lg font-semibold text-slate-900">Who is Lenio for?</span>
              </AccordionTrigger>
              <AccordionContent className="text-slate-600 leading-relaxed pb-6">
                Lenio is built for runners who want to take control of their injuries. From pinpointing the source of your pain to guiding your recovery and preventing future setbacks, Lenio adapts to your personal needs and gets smarter with your feedback. It takes the guesswork out of injury recovery, helping you get back on your feet and stay injury-free.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="bg-slate-50 rounded-2xl border border-slate-200 px-6">
              <AccordionTrigger className="text-left hover:no-underline hover:bg-slate-100 transition-colors duration-200 rounded-2xl px-0">
                <span className="text-lg font-semibold text-slate-900">Does it replace a physio?</span>
              </AccordionTrigger>
              <AccordionContent className="text-slate-600 leading-relaxed pb-6">
                Lenio doesn't replace physiotherapists, but helps you triage whether you need one. Many overuse injuries don't require imaging or in-person care, and Lenio offers safe, evidence-based guidance for these cases. If professional treatment is needed, Lenio bridges the gap until you see a clinician and complements ongoing care.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="bg-slate-50 rounded-2xl border border-slate-200 px-6">
              <AccordionTrigger className="text-left hover:no-underline hover:bg-slate-100 transition-colors duration-200 rounded-2xl px-0">
                <span className="text-lg font-semibold text-slate-900">What sports does it cover?</span>
              </AccordionTrigger>
              <AccordionContent className="text-slate-600 leading-relaxed pb-6">
                Lenio is fully focused on running injuries. This narrow focus allows us to deliver highly accurate assessments and holistic rehab plans tailored to runners. In the future, we aim to expand to other non-contact sports like cycling, swimming, and racket sports, but running is our DNA.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="bg-slate-50 rounded-2xl border border-slate-200 px-6">
              <AccordionTrigger className="text-left hover:no-underline hover:bg-slate-100 transition-colors duration-200 rounded-2xl px-0">
                <span className="text-lg font-semibold text-slate-900">How accurate is the AI assessment?</span>
              </AccordionTrigger>
              <AccordionContent className="text-slate-600 leading-relaxed pb-6">
                Lenio is built in collaboration with physiotherapists and sports clinicians, using best practices from elite athlete care. It's not a generic AI model but a purpose-built symptom assessment tool that prioritizes safety and avoids hallucination. We're actively running clinical studies to validate accuracy and benchmark against international standards. However, Lenio is not a diagnostic tool — if symptoms worsen or you're concerned, always seek medical attention.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="bg-slate-50 rounded-2xl border border-slate-200 px-6">
              <AccordionTrigger className="text-left hover:no-underline hover:bg-slate-100 transition-colors duration-200 rounded-2xl px-0">
                <span className="text-lg font-semibold text-slate-900">When will the app be available?</span>
              </AccordionTrigger>
              <AccordionContent className="text-slate-600 leading-relaxed pb-6">
                We're currently fine-tuning the symptom assessment and building out our exercise content to deliver the full Lenio experience. Our MVP is planned to launch by the end of 2025, and your feedback will help us make Lenio the tool every runner loves to use. Waitlist members get priority access and exclusive early-bird pricing. We'll keep you updated with progress and behind-the-scenes insights as we build the future of sports injury prevention.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Community Section */}
      {false && (
      <section className="py-16 lg:py-24 bg-slate-50 animate-on-scroll" id="community">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">Share Your Story</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Help us build a platform that truly serves the running community.
            </p>
          </div>
          <iframe 
            src="https://docs.google.com/forms/d/e/1FAIpQLSe7mDJ7paSuxE-YvVnuJ5ICf0mzGb-2PK84TKIBVUVGM-RQgA/viewform?embedded=true" 
            width="100%" 
            height={1200} 
            frameBorder="0" 
            marginHeight={0} 
            marginWidth={0}
            className="w-full"
            style={{ width: '100%' }}
          >Loading…</iframe>
        </div>
      </section>
      )}

      {/* Waitlist CTA (Repeated) */}
      <section className="py-16 lg:py-24 bg-gradient-to-r from-blue-600 to-blue-800 text-white relative overflow-hidden animate-on-scroll" id="waitlist">
        <div className="absolute inset-0 bg-black bg-opacity-10"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">Ready to Stay Injury-Free?</h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Join thousands of runners who are already on the waitlist. Be the first to experience AI-powered injury prevention and recovery.
            </p>
          </div>

          <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-8 max-w-2xl mx-auto border border-white border-opacity-20">
            <div className="w-full overflow-hidden rounded-xl shadow-md">
              <iframe
                src="https://docs.google.com/forms/d/e/1FAIpQLScgJenTnkZgdW3zdGon7L6EtjfKYh-xyRrx4UDVfdgL9i-Y-Q/viewform?embedded=true"
                width={"100%"}
                height={700}
                frameBorder={0}
                marginHeight={0}
                marginWidth={0}
                className="w-full rounded-lg bg-white"
                onLoad={(e) => {
                  // Listen for Google Form submission via postMessage (if possible)
                  // This is a fallback; main tracking is via the useEffect above
                }}
              >
                Loading…
              </iframe>
            </div>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center text-sm text-blue-100">
              <div className="flex items-center justify-center">
                <Star className="mr-2 h-4 w-4 text-warm-amber" />
                Early access pricing
              </div>
              <div className="flex items-center justify-center">
                <Bell className="mr-2 h-4 w-4 text-warm-amber" />
                Launch notifications
              </div>
              <div className="flex items-center justify-center">
                <Gift className="mr-2 h-4 w-4 text-warm-amber" />
                Exclusive content
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-12" id="footer">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="text-2xl font-bold text-white mb-4 flex items-center">
                <img 
                  src="/images/lenio-logo-white.png" 
                  alt="Lenio" 
                  className="h-16 w-auto object-contain"
                />
              </div>
              <p className="text-slate-400 leading-relaxed max-w-md">
                Smarter recovery and injury prevention for runners. Stay strong, stay pain-free, keep running.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-white font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => smoothScroll("how-it-works")}
                    className="hover:text-white transition-colors duration-200"
                  >
                    How it Works
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => smoothScroll("faqs")}
                    className="hover:text-white transition-colors duration-200"
                  >
                    FAQs
                  </button>
                </li>
                {/*
                <li>
                  <button
                    onClick={() => smoothScroll("community")}
                    className="hover:text-white transition-colors duration-200"
                  >
                    Community
                  </button>
                </li>
                */}
                <li>
                  <button
                    onClick={() => smoothScroll("waitlist")}
                    className="hover:text-white transition-colors duration-200"
                  >
                    Join Waitlist
                  </button>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="text-white font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                {/*
                <li>
                  <a href="#" className="hover:text-white transition-colors duration-200">
                    Terms of Service
                  </a>
                </li>
                */}
                <li>
                  <a href="/privacy-policy.html" className="hover:text-white transition-colors duration-200">
                    Privacy Policy
                  </a>
                </li>
                {/*
                <li>
                  <a href="#" className="hover:text-white transition-colors duration-200">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors duration-200">
                    Medical Disclaimer
                  </a>
                </li>
                */}
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center">
            <p className="text-slate-400 text-sm">© 2025 Lenio. All rights reserved.</p>

            {/* Social Icons (coming soon) */}
            <div className="flex space-x-4 mt-4 sm:mt-0 opacity-40 cursor-not-allowed">
              {/* X */}
              <svg className="h-6 w-6 text-slate-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.29 3H17.8L13.9 8.08 9.96 3H3l6.88 8.9L3.14 21h2.49l4.24-5.47 3.98 5.47H21l-7.16-9.26L20.29 3z" />
              </svg>

              {/* Instagram */}
              <svg className="h-6 w-6 text-slate-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.2c3.2 0 3.584.012 4.85.07 1.17.054 1.97.24 2.43.41a4.92 4.92 0 011.77 1.13 4.92 4.92 0 011.13 1.77c.17.46.356 1.26.41 2.43.058 1.266.07 1.65.07 4.85s-.012 3.584-.07 4.85c-.054 1.17-.24 1.97-.41 2.43a4.92 4.92 0 01-1.13 1.77 4.92 4.92 0 01-1.77 1.13c-.46.17-1.26.356-2.43.41-1.266.058-1.65.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.054-1.97-.24-2.43-.41a4.92 4.92 0 01-1.77-1.13 4.92 4.92 0 01-1.13-1.77c-.17-.46-.356-1.26-.41-2.43C2.212 15.584 2.2 15.2 2.2 12s.012-3.584.07-4.85c.054-1.17.24-1.97.41-2.43a4.92 4.92 0 011.13-1.77 4.92 4.92 0 011.77-1.13c.46-.17 1.26.356 2.43-.41C8.416 2.212 8.8 2.2 12 2.2zm0 2.4c-3.13 0-3.49.012-4.72.07-1.02.05-1.57.217-1.94.36a2.92 2.92 0 00-1.09.71 2.92 2.92 0 00-.71 1.09c-.143.37-.31.92-.36 1.94-.058 1.23-.07 1.59-.07 4.72s.012 3.49.07 4.72c.05 1.02.217 1.57.36 1.94.14.37.33.69.71 1.09.4.38.72.57 1.09.71.37.143.92.31 1.94.36 1.23.058 1.59.07 4.72.07s3.49-.012 4.72-.07c1.02-.05 1.57-.217 1.94-.36a2.92 2.92 0 001.09-.71 2.92 2.92 0 00.71-1.09c.143-.37.31-.92.36-1.94.058-1.23.07-1.59.07-4.72s-.012-3.49-.07-4.72c-.05-1.02-.217-1.57-.36-1.94a2.92 2.92 0 00-.71-1.09 2.92 2.92 0 00-1.09-.71c-.37-.143-.92-.31-1.94-.36-1.23-.058-1.59-.07-4.72-.07zm0 3.9a5.5 5.5 0 110 11 5.5 5.5 0 010-11zm0 2.2a3.3 3.3 0 100 6.6 3.3 3.3 0 000-6.6zm4.7-2.9a1.3 1.3 0 110 2.6 1.3 1.3 0 010-2.6z" />
              </svg>

              {/* Facebook */}
              <svg className="h-6 w-6 text-slate-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.675 0H1.325C.593 0 0 .593 0 1.326v21.348C0 23.407.593 24 1.325 24h11.494v-9.294H9.691V11.06h3.128V8.414c0-3.1 1.894-4.788 4.659-4.788 1.325 0 2.464.099 2.797.143v3.24l-1.919.001c-1.504 0-1.796.715-1.796 1.763v2.313h3.587l-.467 3.646h-3.12V24h6.116C23.407 24 24 23.407 24 22.674V1.326C24 .593 23.407 0 22.675 0z"/>
              </svg>

              {/* TikTok */}
              <svg className="h-6 w-6 text-slate-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.63 2h3.3c.11 1.6 1.34 3 2.9 3.3v3.2a7.21 7.21 0 01-4.2-1.3V16a6 6 0 11-6-6v3a3 3 0 103 3V2z" />
              </svg>

              {/* LinkedIn */}
              <svg className="h-6 w-6 text-slate-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M4.98 3.5C4.98 2.12 6.1 1 7.48 1s2.5 1.12 2.5 2.5S8.86 6 7.48 6 4.98 4.88 4.98 3.5zM3 8h4.5v12H3zm6.75 0H15v1.79h.06c.54-.96 1.88-1.97 3.87-1.97 4.13 0 4.89 2.75 4.89 6.32V20H19v-5.28c0-1.26-.02-2.89-1.76-2.89-1.76 0-2.03 1.38-2.03 2.8V20h-4.5z"/>
              </svg>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}