import React, { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import secondSection from "../../../../public/partner-with-enh.webp";
import thirdSection from "../../../../public/business-challenges.webp";
import serviceHeroBannerBusiness from "../../../../public/service-hero-banner.webp";
import faqImage from "../../../../public/faqImage.webp";

import {
  FaArrowRight,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaStar,
  FaQuoteLeft,
  FaFlask,
  FaLightbulb,
  FaSearch,
  FaRocket,
  FaShieldAlt,
  FaClock,
  FaHeadset,
  FaChevronLeft,
  FaChevronRight,
  FaPaperPlane,
  FaCheckCircle,
  FaBriefcase,
  FaGraduationCap,
  FaLaptopCode,
  FaWallet,
  FaBullseye,
  FaPlus,
  FaTools,
  FaHandshake,
  FaBullhorn,
  FaHeartbeat,
  FaBuilding,
  FaHotel,
  FaShoppingCart,
  FaIndustry,
  FaGlobe,
  FaGoogle,
  FaFacebook,
  FaLinkedin,
  FaYoutube,
  FaAd,
  FaChartLine,
  FaSyncAlt,
  FaClipboardList,
  FaSlidersH,
  FaShoppingBag,
} from "react-icons/fa";
import { FiArrowUpRight } from "react-icons/fi";
import api from "../../../utils/api";
import { Helmet } from "react-helmet-async";

// ─── Shared variants ─────────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 44 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};
const fadeLeft = {
  hidden: { opacity: 0, x: -48 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};
const fadeRight = {
  hidden: { opacity: 0, x: 48 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
const staggerSm = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};
const cardV = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};
const vp = { once: true, amount: 0.2 };
const vpMd = { once: true, amount: 0.3 };
const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

// ─── JSON-LD: FAQ schema ──────────────────────────────────────────────────────
const ppcFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is PPC advertising?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "PPC, or pay-per-click, is advertising where you pay each time someone clicks your ad rather than paying for placement upfront. It covers Google Ads, Meta Ads, LinkedIn Ads, and similar platforms, and it's one of the fastest ways to get in front of people actively searching for what you offer.",
      },
    },
    {
      "@type": "Question",
      name: "Which platforms do you manage?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We manage Google Ads, Meta Ads Manager for Facebook and Instagram, LinkedIn Campaign Manager, and Microsoft Advertising. Which platform makes sense depends on where your customers actually spend time and how they search - something we work out during discovery rather than assuming upfront.",
      },
    },
    {
      "@type": "Question",
      name: "How much does PPC cost in Dubai?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It depends on your industry, competition, and goals - CPC varies a lot between sectors. Rather than a flat number, we build a budget around what it actually takes to hit your targets, and walk through that with you directly before anything launches.",
      },
    },
    {
      "@type": "Question",
      name: "How quickly can PPC generate leads?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Campaigns can start generating clicks and leads within days of launch, though the first few weeks are usually spent testing and refining. Most accounts hit a stronger, more efficient stride within four to six weeks as we gather enough data to optimize properly.",
      },
    },
    {
      "@type": "Question",
      name: "How do you measure PPC success?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We track cost per acquisition, ROAS, conversion rate, and lead quality - not just clicks or impressions. A campaign with a great CTR that generates the wrong leads isn't a success, so we measure against business outcomes, not vanity metrics.",
      },
    },
    {
      "@type": "Question",
      name: "Do you provide remarketing campaigns?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Remarketing across Google and Meta is part of most PPC strategies we build, since most visitors don't convert on their first visit. It's usually one of the more cost-effective ways to bring people back and improve overall ROI.",
      },
    },
    {
      "@type": "Question",
      name: "Can PPC work alongside SEO?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, and they work well together. PPC gets you immediate visibility while SEO builds organic rankings over time - running both means you're not entirely dependent on either channel, and data from paid campaigns often informs which keywords are worth targeting organically.",
      },
    },
    {
      "@type": "Question",
      name: "Should my business invest in SEO or PPC?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It depends on how quickly you need results and what budget you're working with. PPC delivers immediate traffic and leads, which suits businesses that need visibility now. SEO builds sustainable, long-term organic growth that keeps paying off without ongoing spend per click. Most businesses get the most value from running both together, weighted differently depending on goals - something our SEO services team can help map out alongside your PPC strategy.",
      },
    },
    {
      "@type": "Question",
      name: "How do you reduce wasted ad spend?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Through negative keywords, tighter audience targeting, ongoing bid adjustments, and cutting underperforming campaigns quickly instead of letting them run. Most wasted spend comes from accounts nobody's actively managing - regular optimization is what actually prevents it.",
      },
    },
    {
      "@type": "Question",
      name: "Do you guarantee results?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No agency can honestly guarantee specific lead numbers or a fixed ROAS, and any that claims to isn't being straight with you. What we can guarantee is continuous optimization, transparent reporting, and decisions based on your actual data rather than assumptions.",
      },
    },
  ],
};

// ─── JSON-LD: Service schema ──────────────────────────────────────────────────
const ppcServiceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://enh.consulting/ppc-company-in-dubai#service",
  name: "PPC Services in Dubai",
  serviceType: "Pay-Per-Click Advertising (PPC)",
  url: "https://enh.consulting/ppc-company-in-dubai",
  description:
    "ENH Consulting provides PPC services in Dubai to help businesses generate qualified leads, improve advertising efficiency, reduce wasted ad spend, increase conversions, and achieve stronger returns through Google Ads, Meta Ads, LinkedIn Advertising, Google Shopping Ads, Display Advertising, YouTube Advertising, remarketing, conversion tracking, PPC audits, and campaign optimization.",
  provider: {
    "@id": "https://enh.consulting/#organization",
  },
  areaServed: [
    {
      "@type": "City",
      name: "Dubai",
    },
    {
      "@type": "Country",
      name: "United Arab Emirates",
    },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "PPC Services",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Google Ads Management" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Meta Ads Management" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "LinkedIn Advertising" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Google Shopping Ads" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Display Advertising" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "YouTube Advertising" } },
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "Conversion Tracking and Analytics" },
      },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Remarketing Campaigns" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "PPC Audit" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Campaign Optimization" } },
    ],
  },
};

// ─── FadeUp wrapper ───────────────────────────────────────────────────────────
function FadeUp({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

// ─── ScaleIn wrapper ──────────────────────────────────────────────────────────
function ScaleIn({ children, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.88 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

// ─── Section eyebrow ─────────────────────────────────────────────────────────
function Eyebrow({ children, gold = false }) {
  return (
    <motion.div
      variants={fadeUp}
      className={`svp-eyebrow-tag${gold ? " svp-eyebrow-tag--gold" : ""}`}
    >
      <span className="svp-eyebrow-dot" />
      {children}
    </motion.div>
  );
}

// ─── Service Data ─────────────────────────────────────────────────────────────
const PPC_DATA = {
  default: {
    badge: "PPC Company",
    headline: "PPC Company in Dubai That Drives Qualified Leads and Higher ROI",
    tagline:
      "Every dirham you spend on Google or Meta should bring back a real lead, not just another click. As a PPC company in Dubai that businesses trust when ad costs keep climbing and results fall short, we've seen the same pattern repeatedly: clicks that don't convert, leads that don't match what sales actually needs, and budgets wasted on keywords that were never likely to generate revenue.",
    cta: "Get a Free Consultation",
    heroImg: secondSection,
    heroImgTwo: thirdSection,

    // Business challenges / intro
    introTitle: "Is Your Advertising Budget Delivering the Results You Expect?",
    introText:
      "Many Dubai businesses invest in PPC but struggle with rising CPCs, broad targeting, low-quality clicks, and landing pages that fail to convert. Even when PPC services in Dubai generate traffic, campaigns can underperform when clicks don't translate into qualified leads or advertising costs continue rising without stronger returns.",
    introText2:
      "These challenges often come from campaigns that aren't optimized consistently. PPC requires ongoing attention to bids, audiences, ad copy, negative keywords, landing pages, and conversion data. ENH Consulting takes a performance-focused approach, continuously refining campaigns to improve targeting, reduce wasted spend, increase qualified leads, and strengthen conversion rates. Our goal is to help Dubai businesses get more value from their advertising investment while building PPC campaigns designed for sustainable, measurable growth.",
    enquireText: "Get a Free Consultation",

    // Why partner with ENH
    partnerTitle: "Partner with a Results-Driven PPC Company in Dubai",
    partnerText1:
      "There's a real difference between running ads and managing a campaign that's actually profitable. Anyone can turn on Google Ads. Getting a positive return out of it, consistently, is a different job. A PPC agency in Dubai worth hiring brings Google Ads and Meta Ads expertise that goes beyond the basics, knowing which levers actually move performance instead of just watching a dashboard.",
    partnerText2:
      "That means allocating budget toward what's converting, cutting what isn't, and making decisions based on the data coming in rather than a plan set at kickoff and never revisited. As a PPC company in Dubai, ENH works as an extension of your team. We're in the account weekly, not glancing at it once a month. When paid campaigns need to work alongside broader digital marketing services in Dubai, we can align PPC with SEO, content, social media, and other channels to create a more connected growth strategy.",

    // Services we offer
    rdTitle: "PPC Services Designed to Maximize Advertising ROI in Dubai",
    rdCards: [
      {
        icon: <FaGoogle />,
        title: "Google Ads Management",
        desc: "Search, Display, Performance Max, and Shopping campaigns built to reach people with real purchase intent, not just broad traffic. We structure accounts around what actually improves lead quality and ROAS, adjusting keywords and bids as performance data comes in rather than leaving a campaign to run untouched for months.",
      },
      {
        icon: <FaFacebook />,
        title: "Meta Ads Management",
        desc: "Facebook and Instagram campaigns built around audiences that match your actual customers, not broad demographic guesses. We run lead generation, remarketing, and brand awareness side by side, so people who've already shown interest get another shot at converting instead of disappearing after one visit.",
      },
      {
        icon: <FaLinkedin />,
        title: "LinkedIn Advertising",
        desc: "For B2B businesses selling to decision makers, LinkedIn is often the only platform where the right person actually sees the ad. We build lead generation and account-based campaigns using LinkedIn Campaign Manager, targeting the specific roles, seniority, and companies that matter to your pipeline.",
      },
      {
        icon: <FaShoppingBag />,
        title: "Google Shopping Ads",
        desc: "For ecommerce businesses, Shopping Ads put your products in front of buyers who are already comparing prices and ready to purchase. Set up correctly through Google Merchant Center, they tend to improve click-through rates and product visibility while attracting traffic with genuinely high purchase intent.",
      },
      {
        icon: <FaAd />,
        title: "Display Advertising",
        desc: "Display campaigns build brand awareness across Google's Display Network through visual ads that reach people while they browse other sites. Paired with audience targeting and remarketing, they keep your business visible to people who aren't ready to search for you directly yet.",
      },
      {
        icon: <FaYoutube />,
        title: "YouTube Advertising",
        desc: "Video ads on YouTube help businesses build awareness and promote products in a format that holds attention longer than a static banner. We build campaigns around specific audiences and goals, whether that's generating leads directly or building the kind of recognition that makes future ads convert better.",
      },
      {
        icon: <FaChartLine />,
        title: "Conversion Tracking & Analytics",
        desc: "Campaigns are only as good as the data behind them. We set up GA4 and Google Tag Manager properly, so conversion tracking, ROI, and customer acquisition cost are all measured accurately from day one, and reporting reflects what's actually happening rather than a rough estimate.",
      },
      {
        icon: <FaSyncAlt />,
        title: "Remarketing Campaigns",
        desc: "Most visitors don't convert on the first visit. Remarketing across Google and Meta brings them back with the right message at the right time, which tends to improve conversion rates and stretch advertising ROI further than chasing new traffic alone.",
      },
      {
        icon: <FaClipboardList />,
        title: "PPC Audit",
        desc: "We go through your existing account - keywords, bidding strategy, Quality Score, conversion tracking, audience targeting, and budget allocation - and come back with a clear roadmap for what to fix first. Useful whether you're switching agencies or running PPC in-house and something feels off.",
      },
      {
        icon: <FaSlidersH />,
        title: "Campaign Optimization",
        desc: "Bid adjustments, keyword refinement, A/B testing, audience optimization, ad copy improvements, and budget reallocation, this is the ongoing work that separates a campaign that used to perform from one that keeps performing. We do it weekly, not as an afterthought.",
      },
    ],

    // Industries we serve
    whyUs: [
      {
        icon: <FaHeartbeat />,
        title: "Healthcare",
        desc: "Getting in front of patients actively searching for care, without wasting spend on low-intent clicks.",
      },
      {
        icon: <FaGraduationCap />,
        title: "Education",
        desc: "Filling enrollment pipelines around application deadlines and academic calendars.",
      },
      {
        icon: <FaBuilding />,
        title: "Real Estate",
        desc: "Reaching buyers and investors ready to act in a market that moves fast.",
      },
      {
        icon: <FaHotel />,
        title: "Hospitality",
        desc: "Driving direct bookings during the periods that matter most, instead of losing margin to booking platforms.",
      },
      {
        icon: <FaShoppingCart />,
        title: "Retail",
        desc: "Turning ad spend into sales through campaigns built around actual purchase intent.",
      },
      {
        icon: <FaIndustry />,
        title: "Manufacturing",
        desc: "Generating B2B leads from decision makers, not tire-kickers, across longer sales cycles.",
      },
    ],

    // Our process
    testimonials: [
      {
        step: "Step 1 — Discovery",
        text: "We look at your business, goals, and current account performance to understand what \"success\" actually needs to mean.",
      },
      {
        step: "Step 2 — Audience Research",
        text: "We map out who's actually converting, not just who's clicking, and build targeting around that.",
      },
      {
        step: "Step 3 — Campaign Setup",
        text: "Accounts, tracking, and conversion goals get built and tested before a single dirham is spent.",
      },
      {
        step: "Step 4 — Ad Creation",
        text: "Copy and creative built to match search intent, tested against alternatives rather than guessed at once.",
      },
      {
        step: "Step 5 — Optimization",
        text: "Bids, audiences, and budgets get adjusted weekly based on what the data is actually showing.",
      },
      {
        step: "Step 6 — Reporting",
        text: "Clear, regular reporting on what's working and why, not a wall of numbers with no context.",
      },
    ],

    // Expected results
    whyEnh: [
      {
        num: "01",
        icon: <FaBullseye />,
        title: "Higher-Quality Leads",
        desc: "Attract prospects who match your ideal customer profile rather than simply generating more form fills.",
      },
      {
        num: "02",
        icon: <FaWallet />,
        title: "Lower Cost per Acquisition",
        desc: "Reduce wasted ad spend by continuously optimizing keywords, targeting, bids, and campaign performance.",
      },
      {
        num: "03",
        icon: <FaChartLine />,
        title: "Higher ROAS",
        desc: "Shift budget toward campaigns, audiences, and keywords that consistently generate conversions and stronger returns.",
      },
      {
        num: "04",
        icon: <FaRocket />,
        title: "Better Click-Through Rates",
        desc: "Create relevant, intent-focused ads that encourage more qualified users to engage with your campaigns.",
      },
      {
        num: "05",
        icon: <FaHandshake />,
        title: "More Conversions",
        desc: "Turn more of your existing paid traffic into qualified leads and customers through ongoing campaign and landing page optimization.",
      },
      {
        num: "06",
        icon: <FaShieldAlt />,
        title: "Scalable Campaign Growth",
        desc: "Scale successful campaigns while keeping acquisition costs under control and connecting PPC performance to measurable business revenue.",
      },
    ],

    // FAQs
    faqs: [
      {
        q: "What is PPC advertising?",
        a: "PPC, or pay-per-click, is advertising where you pay each time someone clicks your ad rather than paying for placement upfront. It covers Google Ads, Meta Ads, LinkedIn Ads, and similar platforms, and it's one of the fastest ways to get in front of people actively searching for what you offer.",
        img: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80",
        imgLabel: "What PPC actually means",
      },
      {
        q: "Which platforms do you manage?",
        a: "We manage Google Ads, Meta Ads Manager for Facebook and Instagram, LinkedIn Campaign Manager, and Microsoft Advertising. Which platform makes sense depends on where your customers actually spend time and how they search, something we work out during discovery rather than assuming upfront.",
        img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80",
        imgLabel: "Platforms we manage",
      },
      {
        q: "How much does PPC cost in Dubai?",
        a: "It depends on your industry, competition, and goals - CPC varies a lot between sectors. Rather than a flat number, we build a budget around what it actually takes to hit your targets, and walk through that with you directly before anything launches.",
        img: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=800&q=80",
        imgLabel: "Budgeting built around your targets",
      },
      {
        q: "How quickly can PPC generate leads?",
        a: "Campaigns can start generating clicks and leads within days of launch, though the first few weeks are usually spent testing and refining. Most accounts hit a stronger, more efficient stride within four to six weeks as we gather enough data to optimize properly.",
        img: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80",
        imgLabel: "Speed to first leads",
      },
      {
        q: "How do you measure PPC success?",
        a: "We track cost per acquisition, ROAS, conversion rate, and lead quality, not just clicks or impressions. A campaign with a great CTR that generates the wrong leads isn't a success, so we measure against business outcomes, not vanity metrics.",
        img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80",
        imgLabel: "Metrics that matter",
      },
      {
        q: "Do you provide remarketing campaigns?",
        a: "Yes. Remarketing across Google and Meta is part of most PPC strategies we build, since most visitors don't convert on their first visit. It's usually one of the more cost-effective ways to bring people back and improve overall ROI.",
        img: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80",
        imgLabel: "Bringing visitors back",
      },
      {
        q: "Can PPC work alongside SEO?",
        a: "Yes, and they work well together. PPC gets you immediate visibility while SEO builds organic rankings over time - running both means you're not entirely dependent on either channel, and data from paid campaigns often informs which keywords are worth targeting organically.",
        img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80",
        imgLabel: "PPC and SEO together",
      },
      {
        q: "Should my business invest in SEO or PPC?",
        a: "It depends on how quickly you need results and what budget you're working with. PPC delivers immediate traffic and leads, which suits businesses that need visibility now. SEO builds sustainable, long-term organic growth that keeps paying off without ongoing spend per click. Most businesses get the most value from running both together, weighted differently depending on goals.",
        img: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=800&q=80",
        imgLabel: "Choosing between SEO and PPC",
      },
      {
        q: "How do you reduce wasted ad spend?",
        a: "Through negative keywords, tighter audience targeting, ongoing bid adjustments, and cutting underperforming campaigns quickly instead of letting them run. Most wasted spend comes from accounts nobody's actively managing - regular optimization is what actually prevents it.",
        img: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80",
        imgLabel: "Cutting wasted spend",
      },
      {
        q: "Do you guarantee results?",
        a: "No agency can honestly guarantee specific lead numbers or a fixed ROAS, and any that claims to isn't being straight with you. What we can guarantee is continuous optimization, transparent reporting, and decisions based on your actual data rather than assumptions.",
        img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80",
        imgLabel: "No empty guarantees",
      },
    ],

    // Let's Talk Growth CTA banner
    growthTitle: "Let's Turn More Clicks into Customers",
    growthText:
      "Wasted ad spend and low-quality leads usually come down to an account nobody's watching closely enough. Talk to ENH Consulting about your advertising goals, and we'll show you where the budget is leaking and what a properly managed campaign could actually return - lower CPA, higher ROAS, and leads your sales team wants to follow up on.",
    growthNote:
      "Discover how a properly managed PPC account can lower your cost per lead.",
    growthCta: "Get Started",
  },
};

// ─── Floating particles background ───────────────────────────────────────────
function FloatingParticles({ count = 12, color = "rgba(235,174,95,0.15)" }) {
  const particles = Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 4 + Math.random() * 10,
    duration: 6 + Math.random() * 8,
    delay: Math.random() * 5,
  }));

  return (
    <div className="floating-particles" aria-hidden="true">
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: color,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

// ─── SECTION 1 · Hero Banner ──────────────────────────────────────────────────
function HeroBanner({ data }) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    website: "",
    message: "",
  });
  const [status, setStatus] = useState("idle");
  const [focusedField, setFocusedField] = useState(null);

  const handleSubmit = async () => {
    if (!form.name || !form.phone || !form.email) return;
    setStatus("loading");
    try {
      await api.post("/enquiries", { ...form, source: "svp-hero" });
      setStatus("success");
      setForm({ name: "", phone: "", email: "", website: "", message: "" });
      setTimeout(() => setStatus("idle"), 4000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  const bannerStagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
  };

  return (
    <section
      className="svp-hero"
      style={{
        backgroundImage: `url(${serviceHeroBannerBusiness})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to right, rgba(228, 198, 140, 0.81) 0%, rgba(255, 237, 200, 0.57) 10%, rgba(243, 200, 114, 0.28) 65%, rgba(255,237,200,0.0) 90%)",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />
      <motion.span
        className="svp-blob svp-blob--1"
        animate={{
          x: [0, 28, -18, 0],
          y: [0, -22, 32, 0],
          scale: [1, 1.1, 0.94, 1],
        }}
        transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.span
        className="svp-blob svp-blob--2"
        animate={{
          x: [0, -24, 20, 0],
          y: [0, 30, -14, 0],
          scale: [1, 0.9, 1.08, 1],
        }}
        transition={{
          duration: 17,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />
      <motion.span
        className="svp-blob svp-blob--3"
        animate={{
          x: [0, 22, -28, 0],
          y: [0, -28, 12, 0],
          scale: [1, 1.14, 0.9, 1],
        }}
        transition={{
          duration: 11,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 5,
        }}
      />

      <Container>
        <Row className="align-items-center g-4">
          <Col lg={7}>
            <motion.div
              variants={bannerStagger}
              initial="hidden"
              animate="show"
            >
              <motion.h1
                className="svp-hero__h1"
                variants={fadeLeft}
                style={{
                  color: "#422308",
                  lineHeight: 1.1,
                  fontSize: "2.4rem",
                }}
              >
                {data.headline}
              </motion.h1>
              <motion.p
                className="svp-hero__tagline"
                variants={fadeUp}
                style={{ color: "#422308" }}
              >
                {data.tagline}
              </motion.p>

              <motion.div
                className="svp-hero__cta-bar"
                variants={fadeUp}
                style={{ background: "#ffae45e0" }}
              >
                <motion.span
                  className="svp-hero__cta-text"
                  animate={{ opacity: [0.85, 1, 0.85] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                >
                  <Link
                    to="/contact"
                    style={{ color: "inherit", textDecoration: "none" }}
                  >
                    {data.cta}
                  </Link>
                </motion.span>
              </motion.div>
            </motion.div>
          </Col>

          <Col lg={5}>
            <motion.div
              className="svp-hero__form"
              initial={{ opacity: 0, x: 60, rotateY: 5 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              transition={{
                duration: 0.85,
                delay: 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{ perspective: 1000 }}
            >
              <div className="svp-hero__form-accent" />
              <div className="svp-hero__form-shimmer" aria-hidden="true" />

              <motion.h3
                className="svp-hero__form-title"
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                Talk to An Expert
              </motion.h3>
              <motion.p
                className="svp-hero__form-sub"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.4 }}
              >
                Free 30-min consultation, no strings attached
              </motion.p>

              {[
                [
                  { name: "name", placeholder: "Your Name*" },
                  {
                    name: "phone",
                    placeholder: "Your Phone Number*",
                    type: "tel",
                  },
                ],
                [
                  { name: "email", placeholder: "Your E-Mail*", type: "email" },
                  { name: "website", placeholder: "Your Website" },
                ],
              ].map((row, ri) => (
                <motion.div
                  key={ri}
                  className="svp-hero__form-row"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.5 + ri * 0.1,
                    duration: 0.4,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {row.map((f) => (
                    <div
                      key={f.name}
                      className={`svp-input-wrap${focusedField === f.name ? " svp-input-wrap--focused" : ""}`}
                    >
                      <input
                        className="svp-hero__input"
                        placeholder={f.placeholder}
                        value={form[f.name]}
                        type={f.type || "text"}
                        onChange={(e) =>
                          setForm({ ...form, [f.name]: e.target.value })
                        }
                        onFocus={() => setFocusedField(f.name)}
                        onBlur={() => setFocusedField(null)}
                        disabled={status === "loading"}
                      />
                      <motion.div
                        className="svp-input-focus-bar"
                        animate={{
                          scaleX: focusedField === f.name ? 1 : 0,
                          opacity: focusedField === f.name ? 1 : 0,
                        }}
                        transition={{ duration: 0.25 }}
                      />
                    </div>
                  ))}
                </motion.div>
              ))}

              <motion.div
                className="svp-input-wrap"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.72, duration: 0.4 }}
              >
                <textarea
                  className="svp-hero__input svp-hero__textarea"
                  placeholder="Message..."
                  value={form.message}
                  onChange={(e) =>
                    setForm({ ...form, message: e.target.value })
                  }
                  rows={3}
                  disabled={status === "loading"}
                />
              </motion.div>

              <motion.button
                className="svp-hero__form-btn"
                onClick={handleSubmit}
                disabled={status === "loading" || status === "success"}
                whileHover={
                  status === "idle"
                    ? {
                        scale: 1.02,
                        y: -2,
                        boxShadow: "0 12px 32px rgba(212,91,8,0.45)",
                      }
                    : {}
                }
                whileTap={{ scale: 0.97 }}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.82, duration: 0.4 }}
              >
                <AnimatePresence mode="wait">
                  {status === "loading" && (
                    <motion.span
                      key="l"
                      className="svp-btn-state"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                    >
                      <FaPaperPlane className="svp-spin" /> Sending...
                    </motion.span>
                  )}
                  {status === "success" && (
                    <motion.span
                      key="s"
                      className="svp-btn-state"
                      initial={{ opacity: 0, scale: 0.6 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ type: "spring", stiffness: 280 }}
                    >
                      <FaCheckCircle /> Request Sent!
                    </motion.span>
                  )}
                  {status === "error" && (
                    <motion.span
                      key="e"
                      className="svp-btn-state"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                    >
                      <FaPaperPlane /> Try Again
                    </motion.span>
                  )}
                  {status === "idle" && (
                    <motion.span
                      key="i"
                      className="svp-btn-state"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                    >
                      <FaPaperPlane /> Talk to An Expert
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </motion.div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

// ─── SECTION 2 · Intro / Business Challenges ─────────────────────────────────
function IntroSection({ data }) {
  return (
    <section
      className="svp-intro"
      style={{
        background:
          "linear-gradient(135deg,#fff4e1 0%,#fdedce 60%,#ffd78a 100%)",
      }}
    >
      <FloatingParticles count={8} />
      <Container>
        {[
          {
            img: data.heroImgTwo,
            title: data.introTitle,
            text: data.introText,
            text2: data.introText2,
            note: data.enquireText,
            btnLabel: "Enquire Now",
            decoClass: "",
            reverse: false,
          },
        ].map((block, bi) => (
          <Row
            key={bi}
            className={`align-items-center g-4 g-md-5 mt-3 mt-md-5 p-3 svp-intro-row`}
            style={{
              border: "1px solid rgba(212,91,8,0.28)",
              borderRadius: 14,
              boxShadow: "0 4px 16px rgba(212,91,8,0.14)",
            }}
          >
            <Col lg={6} className={block.reverse ? "order-lg-2" : ""}>
              <FadeUp>
                <motion.div
                  className="svp-intro__img-wrap"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.35 }}
                >
                  <motion.img
                    src={block.img}
                    alt={block.title}
                    className="svp-intro__img"
                    initial={{ scale: 1.05, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  />
                  <div className={`svp-intro__img-deco ${block.decoClass}`} />
                  <div className="svp-intro__img-shine" aria-hidden="true" />
                </motion.div>
              </FadeUp>
            </Col>
            <Col lg={6} className={block.reverse ? "order-lg-1" : ""}>
              <FadeUp delay={0.1}>
                <motion.div
                  initial="hidden"
                  whileInView="show"
                  viewport={vp}
                  variants={stagger}
                >
                  <Eyebrow>Business Challenges</Eyebrow>
                  <motion.h2 className="svp-intro__title" variants={fadeLeft}>
                    {block.title}
                  </motion.h2>
                  <motion.p className="svp-intro__text" variants={fadeUp}>
                    {block.text}
                  </motion.p>

                  <motion.p className="svp-intro__text" variants={fadeUp}>
                    {block.text2}
                  </motion.p>
                  <motion.p
                    className="svp-intro__enquire-note"
                    variants={fadeUp}
                  >
                    {block.note}
                  </motion.p>
                  <motion.div variants={fadeUp}>
                    <Link to="/contact">
                      <motion.button
                        className="svp-enquire-btn"
                        whileHover={{
                          scale: 1.04,
                          x: 5,
                          boxShadow: "0 8px 24px rgba(212,91,8,0.35)",
                        }}
                        whileTap={{ scale: 0.97 }}
                      >
                        {block.btnLabel}
                      </motion.button>
                    </Link>
                  </motion.div>
                </motion.div>
              </FadeUp>
            </Col>
          </Row>
        ))}
      </Container>
    </section>
  );
}

// ─── SECTION 2 · Why Partner With ENH ────────────────────────────────────────
function IntroSection2({ data }) {
  return (
    <section
      className="svp-intro"
      style={{
        background:
          "linear-gradient(135deg,#fff4e1 0%,#fdedce 60%,#ffd78a 100%)",
      }}
    >
      <FloatingParticles count={8} />
      <Container>
        {[
          {
            img: data.heroImg,
            title: data.partnerTitle,
            text: data.partnerText1,
            text2: data.partnerText2,
            btnLabel: "Enquire Now",
            decoClass: "",
            reverse: false,
          },
        ].map((block, bi) => (
          <Row
            key={bi}
            className={`align-items-center g-4 g-md-5 mt-3 mt-md-5 p-3 svp-intro-row`}
            style={{
              border: "1px solid rgba(212,91,8,0.28)",
              borderRadius: 14,
              boxShadow: "0 4px 16px rgba(212,91,8,0.14)",
            }}
          >
            <Col lg={6} className={block.reverse ? "order-lg-1" : ""}>
              <FadeUp delay={0.1}>
                <motion.div
                  initial="hidden"
                  whileInView="show"
                  viewport={vp}
                  variants={stagger}
                >
                  <Eyebrow>WHY PARTNER WITH ENH</Eyebrow>
                  <motion.h2 className="svp-intro__title" variants={fadeLeft}>
                    {block.title}
                  </motion.h2>
                  <motion.p className="svp-intro__text" variants={fadeUp}>
                    {block.text}
                  </motion.p>

                  <motion.p className="svp-intro__text" variants={fadeUp}>
                    {block.text2}
                  </motion.p>
                  <motion.p
                    className="svp-intro__enquire-note"
                    variants={fadeUp}
                  >
                    {block.note}
                  </motion.p>
                  <motion.div variants={fadeUp}>
                    <Link to="/contact">
                      <motion.button
                        className="svp-enquire-btn"
                        whileHover={{
                          scale: 1.04,
                          x: 5,
                          boxShadow: "0 8px 24px rgba(212,91,8,0.35)",
                        }}
                        whileTap={{ scale: 0.97 }}
                      >
                        {block.btnLabel}
                      </motion.button>
                    </Link>
                  </motion.div>
                </motion.div>
              </FadeUp>
            </Col>
            <Col lg={6} className={block.reverse ? "order-lg-2" : ""}>
              <FadeUp>
                <motion.div
                  className="svp-intro__img-wrap"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.35 }}
                >
                  <motion.img
                    src={block.img}
                    alt={block.title}
                    className="svp-intro__img"
                    initial={{ scale: 1.05, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  />
                  <div className={`svp-intro__img-deco ${block.decoClass}`} />
                  <div className="svp-intro__img-shine" aria-hidden="true" />
                </motion.div>
              </FadeUp>
            </Col>
          </Row>
        ))}
      </Container>
    </section>
  );
}

// ─── SECTION 3 · Services We Offer ────────────────────────────────────────────
function RDSection({ data }) {
  const [hovered, setHovered] = useState(null);

  return (
    <section className="svp-rd">
      <FloatingParticles count={6} color="#532a06" />
      <Container>
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={vpMd}
          variants={stagger}
        >
          <Row className="align-items-center mb-4 mb-md-5">
            <Col lg={12}>
              <Eyebrow>What We Offer</Eyebrow>
              <motion.h2 className="svp-rd__title" style={{ color: "#532a06" }}>
                {data.rdTitle}
              </motion.h2>
              <p
                variants={fadeUp}
                style={{ color: "#532a06" }}
                className="mt-3"
              >
                A profitable PPC account isn't one lever - it's strategy,
                audience targeting, creative testing, landing page work, and
                ongoing refinement, all pulling in the same direction. Here's
                what that looks like broken down across the platforms and
                campaign types we manage day to day.
              </p>
            </Col>
          </Row>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={vp}
          variants={stagger}
        >
          <Row className="g-4">
            {data.rdCards.map((card, i) => (
              <Col lg={6} md={6} key={i}>
                <motion.div
                  variants={cardV}
                  onHoverStart={() => setHovered(i)}
                  onHoverEnd={() => setHovered(null)}
                >
                  <motion.div
                    className="svp-rd__card"
                    animate={{
                      boxShadow:
                        hovered === i
                          ? "0 20px 52px rgba(133,86,25,0.18)"
                          : "0 4px 6px rgba(133,86,25,0.06)",
                    }}
                    whileHover={{
                      y: -10,
                      transition: {
                        type: "spring",
                        stiffness: 300,
                        damping: 18,
                      },
                    }}
                  >
                    <motion.div
                      className="svp-rd__icon"
                      animate={{
                        backgroundColor:
                          hovered === i
                            ? "linear-gradient(135deg,rgb(235,174,95),#d45b08)"
                            : "rgba(235,174,95,0.2)",
                      }}
                      whileHover={{
                        rotate: -8,
                        scale: 1.12,
                        backgroundColor: "rgb(235,174,95)",
                        color: "#fff",
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 280,
                        damping: 14,
                      }}
                    >
                      {card.icon}
                    </motion.div>
                    {card.link ? (
                      <Link to={card.link}>
                        <h3 className="svp-rd__card-title">{card.title}</h3>
                      </Link>
                    ) : (
                      <h3 className="svp-rd__card-title">{card.title}</h3>
                    )}
                    <p className="svp-rd__card-desc">{card.desc}</p>

                    {/* Animated progress bar on hover */}
                    <motion.div
                      className="svp-rd__card-bar"
                      animate={{ scaleX: hovered === i ? 1 : 0 }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </motion.div>
                </motion.div>
              </Col>
            ))}
          </Row>
        </motion.div>
      </Container>
    </section>
  );
}

function Services() {
  const serviceList = [
    {
      icon: <FaRocket />,
      title: "Startups",
      description:
        "Startups usually need leads fast on a budget that doesn't leave room for trial and error. We focus early on the highest-intent keywords and audiences, testing quickly and cutting what isn't working before it eats into a limited budget, so early traction doesn't come at the cost of runway.",
      number: "01",
    },
    {
      icon: <FaBriefcase />,
      title: "Small & Medium Businesses",
      description:
        "Growing businesses need campaigns that scale without costs spiraling. We expand what's working, new keywords, new audiences, new platforms, while keeping CPA in check, so growth in spend actually translates to growth in leads instead of just higher advertising bills.",
      number: "02",
    },
    {
      icon: <FaGlobe />,
      title: "Enterprises",
      description:
        "Larger accounts mean bigger budgets across multiple campaigns, regions, or product lines. We manage that complexity with structured reporting and governance, keeping every campaign accountable to the same ROI standard regardless of scale or how many stakeholders are involved.",
      number: "03",
    },
  ];

  return (
    <section className="services-section">
      <Container>
        <motion.div
          className="services-header"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeUp} className="services-label">
            <span className="label-dot" />
            Who We Serve
          </motion.div>
          <motion.div className="services-title-row" variants={fadeUp}>
            <h2 className="services-main-title">
              <span className="title-accent" style={{ color: "#8a5520" }}>
                PPC Solutions for Businesses of Every Size
              </span>
            </h2>
          </motion.div>
          <motion.p className="services-subtitle mt-4" variants={fadeUp}>
            Budget, growth stage, and how fast you need results all shape what
            a PPC account should look like - a startup's account rarely looks
            like an enterprise's. Here's how we tailor our approach for each.
          </motion.p>
        </motion.div>

        <motion.div
          className="services-grid"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
        >
          {serviceList.map((service, index) => (
            <motion.div key={index} className="service-card-wrap">
              <motion.div
                className="service-card"
                whileHover={{
                  y: -10,
                  transition: { type: "spring", stiffness: 300, damping: 20 },
                }}
              >
                <span className="card-number">{service.number}</span>
                <div className="card-icon-wrap">
                  <div className="card-icon">{service.icon}</div>
                  <div className="icon-ring" />
                </div>
                <h3 className="card-title">{service.title}</h3>
                <p className="card-desc">{service.description}</p>
                <div className="card-divider" />
                <div className="card-glow" />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div variants={fadeUp}>
          <Link to="/contact" style={{ textDecoration: "none" }}>
            <motion.button
              className="svp-enquire-btn mt-4 mt-md-5"
              whileHover={{
                scale: 1.04,
                x: 5,
                boxShadow: "0 8px 24px rgba(212,91,8,0.35)",
              }}
              whileTap={{ scale: 0.97 }}
            >
              Let's Discuss Your Requirements
            </motion.button>
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}

function Services2() {
  const serviceList = [
    {
      title: "ROI-Focused Campaigns",
      description:
        "Every campaign decision gets measured against actual return, not clicks or impressions that look good in a screenshot but don't mean much.",
    },
    {
      title: "Certified PPC Specialists",
      description:
        "Google and Meta certified specialists manage your account, people who work in these platforms daily, not a generalist splitting time across ten different channels.",
    },
    {
      title: "Transparent Reporting",
      description:
        "You see what's spent, what it returned, and why decisions were made, no vague summaries standing in for real numbers.",
    },
    {
      title: "Continuous Optimization",
      description:
        "Accounts get reviewed weekly. Bids, budgets, and targeting shift as the data comes in, instead of sitting untouched between quarterly check-ins.",
    },
    {
      title: "Data-Driven Decisions",
      description:
        "Budget moves based on performance, not assumptions about what should work. If something's converting, it gets more spent. If it isn't, it doesn't.",
    },
    {
      title: "Dubai Market Expertise",
      description:
        "We know how local competition, search behavior, and cost benchmarks actually work in Dubai and the UAE, not generic advice pulled from a US or European playbook.",
    },
  ];

  return (
    <section className="services-section">
      <Container>
        <motion.div
          className="services-header"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeUp} className="services-label">
            <span className="label-dot" />
            Why Choose ENH
          </motion.div>
          <motion.div className="services-title-row" variants={fadeUp}>
            <h2 className="services-main-title">
              <span className="title-accent" style={{ color: "#8a5520" }}>
                Why Businesses Choose ENH Consulting for PPC Management
              </span>
            </h2>
          </motion.div>
        </motion.div>

        <motion.div
          className="services-grid"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
        >
          {serviceList.map((service, index) => (
            <motion.div key={index} className="service-card-wrap">
              <motion.div
                className="service-card"
                whileHover={{
                  y: -10,
                  transition: { type: "spring", stiffness: 300, damping: 20 },
                }}
              >
                <h3 className="card-title">{service.title}</h3>
                <p className="card-desc">{service.description}</p>
                <div className="card-divider" />
                <div className="card-glow" />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}

// ─── SECTION 4 · Industries We Serve ─────────────────────────────────────────
function WhyUsSection({ data }) {
  return (
    <section className="svp-whyus">
      <motion.span
        className="svp-whyus__ring svp-whyus__ring--1"
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      />
      <motion.span
        className="svp-whyus__ring svp-whyus__ring--2"
        animate={{ rotate: [0, -360] }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
      />
      <FloatingParticles count={8} color="rgba(235,174,95,0.08)" />

      <Container>
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={vpMd}
          variants={stagger}
        >
          <Eyebrow gold>Industries We Serve</Eyebrow>
          <motion.h2 className="svp-whyus__title" variants={fadeLeft}>
            Industries We Help Grow Through PPC Advertising
          </motion.h2>
          <motion.p className="mt-3 text-white" variants={fadeUp}>
            What drives performance and cost-efficiency in one industry rarely
            translates directly to another, so campaign structure has to
            adapt to how each sector's buyers actually search and decide.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={vp}
          variants={stagger}
        >
          <Row className="g-4 mt-2">
            {data.whyUs.map((item, i) => (
              <Col lg={6} key={i}>
                <motion.div
                  className="svp-whyus__card"
                  variants={cardV}
                  whileHover={{
                    borderColor: "rgb(235,174,95)",
                    backgroundColor: "rgba(235,174,95,0.06)",
                    x: 4,
                    transition: { duration: 0.25 },
                  }}
                >
                  <motion.div
                    className="svp-whyus__icon-wrap"
                    whileHover={{
                      backgroundColor: "rgb(235,174,95)",
                      color: "#fff",
                      rotate: -8,
                      scale: 1.1,
                    }}
                    transition={{ type: "spring", stiffness: 280, damping: 14 }}
                  >
                    {item.icon}
                  </motion.div>
                  <div>
                    <h3 className="svp-whyus__card-title">{item.title}</h3>
                    <p className="svp-whyus__card-desc">{item.desc}</p>
                  </div>
                </motion.div>
              </Col>
            ))}
          </Row>
        </motion.div>
      </Container>
    </section>
  );
}

// ─── SECTION 5 · Our Process ──────────────────────────────────────────────────
function TestimonialsSection({ data }) {
  const [active, setActive] = useState(0);
  const total = data.testimonials.length;

  // auto-advance
  useEffect(() => {
    const t = setInterval(() => setActive((p) => (p + 1) % total), 5000);
    return () => clearInterval(t);
  }, [total]);

  return (
    <section className="svp-testimonials">
      <Container>
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={vpMd}
          variants={stagger}
        >
          <Eyebrow>Our Process</Eyebrow>
          <motion.div className="svp-testimonials__header" variants={fadeUp}>
            <h2
              className="svp-testimonials__title"
              style={{ color: "#532a06" }}
            >
              Our PPC Management Process
            </h2>
            <div className="svp-testimonials__nav">
              {[-1, 1].map((dir) => (
                <motion.button
                  key={dir}
                  className="svp-testimonials__arrow"
                  onClick={() => setActive((p) => (p + dir + total) % total)}
                  whileHover={{
                    scale: 1.12,
                    backgroundColor: "rgb(235,174,95)",
                    color: "#fff",
                    borderColor: "rgb(235,174,95)",
                  }}
                  whileTap={{ scale: 0.88 }}
                >
                  {dir === -1 ? <FaChevronLeft /> : <FaChevronRight />}
                </motion.button>
              ))}
            </div>
          </motion.div>
          <p className="mt-4" style={{ color: "#532a06" }}>
            A clear, repeatable process is what separates a campaign that
            performs once from one that keeps performing. Here's exactly how
            we take an account from discovery to results.
          </p>
        </motion.div>

        <Row className="g-4 mt-2">
          {data.testimonials.map((t, i) => (
            <Col lg={4} md={6} key={i}>
              <motion.div
                className={`svp-testimonials__card${i === active ? " svp-testimonials__card--active" : ""}`}
                animate={{
                  opacity: i === active ? 1 : 0.6,
                  scale: i === active ? 1 : 0.97,
                  y: i === active ? 0 : 4,
                }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                onHoverStart={() => setActive(i)}
                whileHover={{
                  y: i === active ? -8 : -4,
                  boxShadow: "0 14px 36px rgba(133,86,25,0.14)",
                }}
              >
                <h3 className="svp-testimonials__step">{t.step}</h3>
                <p className="svp-testimonials__text">"{t.text}"</p>
              </motion.div>
            </Col>
          ))}
        </Row>

        <div className="svp-testimonials__dots">
          {data.testimonials.map((_, i) => (
            <motion.button
              key={i}
              className={`svp-testimonials__dot${i === active ? " svp-testimonials__dot--active" : ""}`}
              onClick={() => setActive(i)}
              whileHover={{ scale: 1.4 }}
              whileTap={{ scale: 0.8 }}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}

// ─── SECTION 6 · Blog (dynamic) ──────────────────────────────────────────────
function BlogSection() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/posts?limit=3")
      .then(({ data }) => setPosts(data.data || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const fmt = (d) =>
    new Date(d).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  return (
    <section className="svp-blog">
      <Container>
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={vpMd}
          variants={stagger}
        >
          <Eyebrow>News &amp; Blog</Eyebrow>
          <motion.div className="svp-blog__header" variants={fadeUp}>
            <h2 className="svp-blog__title">
              Insights to Help You Advertise Smarter
            </h2>
            <Link to="/blog">
              <motion.button
                className="svp-outline-btn"
                whileHover={{
                  scale: 1.05,
                  y: -2,
                  backgroundColor: "rgb(235,174,95)",
                  color: "#fff",
                  borderColor: "rgb(235,174,95)",
                }}
                whileTap={{ scale: 0.97 }}
              >
                View More <FiArrowUpRight />
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>

        <Row className="g-4 mt-2">
          {loading ? (
            [...Array(3)].map((_, i) => (
              <Col lg={4} md={6} key={i}>
                <div className="svp-blog__card svp-blog__card--skeleton">
                  <div
                    className="svp-blog__img-wrap"
                    style={{ background: "#e8ddd0", height: 220 }}
                  />
                  <div className="svp-blog__body" style={{ padding: 16 }}>
                    <div
                      style={{
                        height: 11,
                        background: "#e8ddd0",
                        borderRadius: 4,
                        width: "45%",
                        marginBottom: 10,
                      }}
                    />
                    <div
                      style={{
                        height: 15,
                        background: "#e8ddd0",
                        borderRadius: 4,
                        width: "85%",
                        marginBottom: 6,
                      }}
                    />
                    <div
                      style={{
                        height: 15,
                        background: "#e8ddd0",
                        borderRadius: 4,
                        width: "65%",
                      }}
                    />
                  </div>
                </div>
              </Col>
            ))
          ) : posts.length === 0 ? (
            <Col>
              <p
                style={{
                  color: "#888",
                  textAlign: "center",
                  padding: "40px 0",
                }}
              >
                No blog posts found.
              </p>
            </Col>
          ) : (
            posts.map((post, i) => (
              <Col lg={6} md={6} key={post._id}>
                <FadeUp delay={i * 0.12}>
                  <motion.div
                    className="svp-blog__card"
                    whileHover={{
                      y: -10,
                      boxShadow: "0 20px 52px rgba(133,86,25,0.16)",
                      transition: {
                        type: "spring",
                        stiffness: 280,
                        damping: 18,
                      },
                    }}
                  >
                    <Link to={`/blog/${post.slug}`} className="svp-blog__lin">
                      <div className="svp-blog__img-wrap">
                        <motion.img
                          src={
                            post.featuredImage?.url ||
                            "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&q=80"
                          }
                          alt={post.featuredImage?.alt || post.title}
                          className="svp-blog__img"
                          whileHover={{ scale: 1.08 }}
                          transition={{ duration: 0.5 }}
                        />
                      </div>
                    </Link>
                    <div className="svp-blog__body">
                      <p className="svp-blog__date">
                        {post.category?.name && (
                          <span
                            style={{
                              color: "#d45b08",
                              marginRight: 8,
                              fontWeight: 600,
                            }}
                          >
                            {post.category.name}
                          </span>
                        )}
                        {fmt(post.createdAt)}
                      </p>
                      <h3 className="svp-blog__card-title">
                        <Link
                          to={`/blog/${post.slug}`}
                          style={{ color: "inherit", textDecoration: "none" }}
                        >
                          {post.title}
                        </Link>
                      </h3>
                    </div>
                  </motion.div>
                </FadeUp>
              </Col>
            ))
          )}
        </Row>
      </Container>
    </section>
  );
}

// ─── SECTION 7 · Expected Results ────────────────────────────────────────────
function WhyChooseENH({ data }) {
  return (
    <section className="svp-why-enh">
      <FloatingParticles count={8} color="rgba(235,174,95,0.12)" />
      <motion.span
        className="svp-why-enh__blob svp-why-enh__blob--1"
        animate={{
          x: [0, 20, -10, 0],
          y: [0, -18, 14, 0],
          scale: [1, 1.08, 0.95, 1],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.span
        className="svp-why-enh__blob svp-why-enh__blob--2"
        animate={{
          x: [0, -16, 12, 0],
          y: [0, 14, -10, 0],
          scale: [1, 0.92, 1.06, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3,
        }}
      />

      <Container>
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={vpMd}
          variants={stagger}
          className="svp-why-enh__header"
        >
          <Eyebrow>Expected Results</Eyebrow>
          <motion.h2 className="svp-why-enh__title" variants={fadeLeft}>
            What Results Can You Expect from Our PPC Services?
          </motion.h2>
          <motion.p className="svp-why-enh__lead" variants={fadeUp}>
            Every campaign we run is judged against actual business return,
            not clicks or impressions alone. Here's what businesses typically
            experience when they partner with ENH Consulting.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={vp}
          variants={stagger}
        >
          <Row className="g-4">
            {data.whyEnh.map((reason, i) => (
              <Col lg={4} md={6} key={i}>
                <motion.div
                  className="svp-why-enh__card"
                  variants={cardV}
                  whileHover={{
                    y: -10,
                    transition: { type: "spring", stiffness: 280, damping: 18 },
                  }}
                >
                  <div className="svp-why-enh__card-head">
                    <motion.div
                      className="svp-why-enh__icon"
                      whileHover={{ rotate: -8, scale: 1.12 }}
                      transition={{
                        type: "spring",
                        stiffness: 280,
                        damping: 14,
                      }}
                    >
                      {reason.icon}
                    </motion.div>
                    <span className="svp-why-enh__num">{reason.num}</span>
                  </div>
                  <h3 className="svp-why-enh__card-title">{reason.title}</h3>
                  <p className="svp-why-enh__card-desc">{reason.desc}</p>
                  <div className="svp-why-enh__card-line" />
                </motion.div>
              </Col>
            ))}
          </Row>
        </motion.div>
      </Container>
    </section>
  );
}

// ─── SECTION 8 · FAQ ─────────────────────────────────────────────────────────
function FAQSection({ data }) {
  const [openIdx, setOpenIdx] = useState(0);
  const activeFaq = data.faqs[openIdx >= 0 ? openIdx : 0];

  return (
    <section className="svp-faq">
      <FloatingParticles count={6} color="rgba(235,174,95,0.10)" />
      <Container>
        <Row className="g-4 g-lg-5 align-items-start">
          <Col lg={5}>
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={vpMd}
              variants={stagger}
              className="svp-faq__intro"
            >
              <Eyebrow>FAQ</Eyebrow>
              <motion.h4 className="svp-faq__title" variants={fadeLeft}>
                Frequently Asked Questions About PPC Services in Dubai
              </motion.h4>

              <motion.div className="svp-faq__media" variants={fadeUp}>
                <AnimatePresence mode="wait">
                  <motion.div
                    className="svp-faq__media-inner"
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <img
                      src={faqImage}
                      alt={"FAQ visual"}
                      className="svp-faq__media-img"
                    />
                  </motion.div>
                </AnimatePresence>
              </motion.div>

              <motion.p className="svp-faq__lead" variants={fadeUp}>
                Everything you need to know before partnering with a PPC
                company in Dubai.
              </motion.p>
              <motion.div className="svp-faq__cta-block" variants={fadeUp}>
                <Link to="/contact" style={{ textDecoration: "none" }}>
                  <motion.button
                    className="svp-enquire-btn"
                    whileHover={{
                      scale: 1.04,
                      x: 5,
                      boxShadow: "0 8px 24px rgba(212,91,8,0.35)",
                    }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Talk to an Expert <FaArrowRight />
                  </motion.button>
                </Link>
              </motion.div>
            </motion.div>
          </Col>

          <Col lg={7}>
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={vp}
              variants={stagger}
              className="svp-faq__list"
            >
              {data.faqs.map((faq, i) => {
                const isOpen = openIdx === i;
                return (
                  <motion.div
                    key={i}
                    variants={fadeUp}
                    className={`svp-faq__item${isOpen ? " svp-faq__item--open" : ""}`}
                  >
                    <button
                      type="button"
                      className="svp-faq__q"
                      onClick={() => setOpenIdx(isOpen ? -1 : i)}
                      aria-expanded={isOpen}
                    >
                      <h5 className="svp-faq__q-text">{faq.q}</h5>
                      <motion.span
                        className="svp-faq__q-icon"
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <FaPlus />
                      </motion.span>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          key="answer"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{
                            duration: 0.35,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          className="svp-faq__a-wrap"
                        >
                          <p className="svp-faq__a">{faq.a}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </motion.div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

// ─── SECTION 8B · Let's Talk Growth banner ───────────────────────────────────
function GrowthCTASection({ data }) {
  return (
    <section className="svp-growth-banner">
      <Container>
        <motion.div
          className="svp-growth-banner__inner"
          initial="hidden"
          whileInView="show"
          viewport={vpMd}
          variants={stagger}
        >
          <div className="svp-growth-banner__text-block">
            <Eyebrow>LET'S TALK GROWTH</Eyebrow>
            <motion.h3
              className="svp-growth-banner__title"
              style={{ fontSize: "50px" }}
              variants={fadeLeft}
            >
              {data.growthTitle}
            </motion.h3>
            <motion.p className="svp-growth-banner__text" variants={fadeUp}>
              {data.growthText}
            </motion.p>
            <motion.p className="svp-growth-banner__note" variants={fadeUp}>
              {data.growthNote}
            </motion.p>
          </div>
          <motion.div variants={fadeUp} className="svp-growth-banner__action">
            <Link to="/contact" style={{ textDecoration: "none" }}>
              <motion.button
                className="svp-enquire-btn svp-growth-banner__btn"
                whileHover={{
                  scale: 1.04,
                  x: 5,
                  boxShadow: "0 8px 24px rgba(212,91,8,0.35)",
                }}
                whileTap={{ scale: 0.97 }}
              >
                {data.growthCta} <FaArrowRight />
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}

// ─── SECTION 9 · Contact ──────────────────────────────────────────────────────
function ContactSection() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    message: "",
  });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const handleSubmit = async () => {
    if (!form.name || !form.phone || !form.email) return;
    setLoading(true);
    try {
      await api.post("/enquiries", { ...form, source: "svp-contact" });
      setSent(true);
      setForm({ name: "", phone: "", email: "", service: "", message: "" });
      setTimeout(() => setSent(false), 3000);
    } catch {
    } finally {
      setLoading(false);
    }
  };

  const contactItems = [
    {
      icon: <FaPhoneAlt />,
      label: "Have any question?",
      value: "+971 505913055",
    },
    {
      icon: <FaEnvelope />,
      label: "Write email",
      value: "contact@enh.consulting",
    },
    {
      icon: <FaMapMarkerAlt />,
      label: "Our Location",
      value: "DSO-IFZA, IFZA Properties, Dubai Silicon Oasis, Dubai",
    },
  ];

  const fields = [
    { md: 6, name: "name", placeholder: "Full Name*", type: "text" },
    { md: 6, name: "phone", placeholder: "Phone*", type: "tel" },
    { md: 12, name: "email", placeholder: "Email*", type: "email" },
  ];

  return (
    <section className="svp-contact">
      <FloatingParticles count={8} color="rgba(235,174,95,0.07)" />
      <Container>
        <Row className="g-4 g-lg-5">
          {/* Left info */}
          <Col lg={5}>
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={vpMd}
              variants={stagger}
            >
              <Eyebrow>Get in touch</Eyebrow>
              <motion.h2
                className="svp-contact__title"
                variants={fadeLeft}
                style={{ color: "#58300d" }}
              >
                Get in touch with us
              </motion.h2>
              <motion.p
                className="svp-contact__desc"
                variants={fadeUp}
                style={{ color: "#7a410fe3" }}
              >
                Get in touch today to start turning ad spend into qualified
                leads with expert PPC management.
              </motion.p>

              <motion.div className="svp-contact__items" variants={staggerSm}>
                {contactItems.map((item, i) => (
                  <motion.div
                    key={i}
                    className="svp-contact__item"
                    variants={fadeUp}
                    whileHover={{
                      x: 6,
                      backgroundColor: "rgba(235,174,95,0.06)",
                      transition: { duration: 0.2 },
                    }}
                  >
                    <motion.div
                      className="svp-contact__icon"
                      whileHover={{
                        backgroundColor: "rgb(235,174,95)",
                        color: "#fff",
                        scale: 1.08,
                      }}
                      transition={{ duration: 0.25 }}
                    >
                      {item.icon}
                    </motion.div>
                    <div>
                      <p className="svp-contact__item-label">{item.label}</p>
                      <p className="svp-contact__item-value">{item.value}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </Col>

          {/* Right form */}
          <Col lg={7}>
            <motion.div
              className="svp-contact__form"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={vp}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="svp-contact__form-shimmer" aria-hidden="true" />
              <h3 className="svp-contact__form-title">Send Message</h3>
              <Row className="g-3">
                {fields.map((f, i) => (
                  <Col md={f.md} key={f.name}>
                    <motion.div
                      className={`svp-contact-input-wrap${focusedField === f.name ? " svp-contact-input-wrap--focused" : ""}`}
                      initial={{ opacity: 0, y: 14 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={vp}
                      transition={{ delay: 0.1 + i * 0.07, duration: 0.4 }}
                      whileHover={{ scale: 1.01 }}
                    >
                      <input
                        className="svp-contact__field"
                        placeholder={f.placeholder}
                        value={form[f.name]}
                        type={f.type}
                        onChange={(e) =>
                          setForm({ ...form, [f.name]: e.target.value })
                        }
                        onFocus={() => setFocusedField(f.name)}
                        onBlur={() => setFocusedField(null)}
                      />
                      <motion.div
                        className="svp-contact-focus-bar"
                        animate={{
                          scaleX: focusedField === f.name ? 1 : 0,
                          opacity: focusedField === f.name ? 1 : 0,
                        }}
                        transition={{ duration: 0.25 }}
                      />
                    </motion.div>
                  </Col>
                ))}
                <Col md={12}>
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={vp}
                    transition={{ delay: 0.31, duration: 0.4 }}
                  >
                    <select
                      className="svp-contact__field svp-contact__field--select"
                      value={form.service}
                      onChange={(e) =>
                        setForm({ ...form, service: e.target.value })
                      }
                    >
                      <option value="" disabled>
                        Select Services *
                      </option>
                      <option value="google-ads">Google Ads Management</option>
                      <option value="meta-ads">Meta Ads Management</option>
                      <option value="linkedin-ads">LinkedIn Advertising</option>
                      <option value="shopping-ads">Google Shopping Ads</option>
                      <option value="display-ads">Display Advertising</option>
                      <option value="youtube-ads">YouTube Advertising</option>
                      <option value="remarketing">Remarketing Campaigns</option>
                      <option value="ppc-audit">PPC Audit</option>
                      <option value="campaign-optimization">
                        Campaign Optimization
                      </option>
                      <option value="other">Other Services</option>
                    </select>
                  </motion.div>
                </Col>
                <Col md={12}>
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={vp}
                    transition={{ delay: 0.38, duration: 0.4 }}
                  >
                    <textarea
                      className="svp-contact__field svp-contact__field--textarea"
                      placeholder="Message"
                      rows={4}
                      value={form.message}
                      onChange={(e) =>
                        setForm({ ...form, message: e.target.value })
                      }
                    />
                  </motion.div>
                </Col>
                <Col md={12}>
                  <motion.button
                    className={`svp-contact__submit${sent ? " svp-contact__submit--sent" : ""}`}
                    onClick={handleSubmit}
                    whileHover={
                      !sent && !loading
                        ? {
                            scale: 1.02,
                            y: -2,
                            boxShadow: "0 12px 28px rgba(212,91,8,0.35)",
                          }
                        : {}
                    }
                    whileTap={{ scale: 0.97 }}
                    disabled={sent || loading}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={vp}
                    transition={{ delay: 0.45, duration: 0.4 }}
                  >
                    <AnimatePresence mode="wait">
                      {loading && (
                        <motion.span
                          key="l"
                          className="svp-btn-state"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          <FaPaperPlane className="svp-spin" /> Sending...
                        </motion.span>
                      )}
                      {sent && (
                        <motion.span
                          key="s"
                          className="svp-btn-state"
                          initial={{ opacity: 0, scale: 0.7 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ type: "spring" }}
                        >
                          <FaCheckCircle /> Message Sent!
                        </motion.span>
                      )}
                      {!sent && !loading && (
                        <motion.span
                          key="i"
                          className="svp-btn-state"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          <FaPaperPlane /> Send Message
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.button>
                </Col>
              </Row>
            </motion.div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

// ─── SECTION 10 · Final CTA ──────────────────────────────────────────────────
function FinalCTA() {
  return (
    <section className="svp-final-cta">
      <motion.span
        className="svp-final-cta__blob svp-final-cta__blob--1"
        animate={{
          x: [0, 30, -15, 0],
          y: [0, -20, 25, 0],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.span
        className="svp-final-cta__blob svp-final-cta__blob--2"
        animate={{
          x: [0, -25, 18, 0],
          y: [0, 22, -16, 0],
          scale: [1, 0.92, 1.08, 1],
        }}
        transition={{
          duration: 17,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3,
        }}
      />
      <FloatingParticles count={10} color="rgba(235,174,95,0.12)" />

      <Container>
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={vpMd}
          variants={stagger}
          className="svp-final-cta__inner"
        >
          <motion.h2 className="svp-final-cta__title" variants={fadeUp}>
            Ready to Grow with a Leading PPC Company in Dubai?
          </motion.h2>

          <motion.p className="svp-final-cta__text" variants={fadeUp}>
            If your current campaigns are spending more and returning less,
            it's worth a conversation before you spend another month on
            autopilot. Let's talk about your advertising goals and build a
            PPC strategy across Google Ads, Meta Ads, and LinkedIn Ads that's
            actually built to maximize return, not just impressions.
          </motion.p>
          <motion.div className="svp-final-cta__actions" variants={fadeUp}>
            <Link to="/contact" style={{ textDecoration: "none" }}>
              <motion.button
                className="svp-final-cta__btn"
                whileHover={{
                  scale: 1.04,
                  y: -3,
                  boxShadow: "0 16px 40px rgba(212,91,8,0.55)",
                }}
                whileTap={{ scale: 0.97 }}
              >
                Book a Free Consultation <FaArrowRight />
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}

const postUrl = window.location.href;

// ─── ROOT ─────────────────────────────────────────────────────────────────────
export default function PPCCompanyDubai() {
  const { slug } = useParams();
  const data = PPC_DATA[slug] || PPC_DATA["default"];

  return (
    <div className="service-view-page">
      <Helmet>
        <title>Best PPC Company in Dubai | ENH Consulting</title>
        <meta
          name="description"
          content="PPC company in Dubai offering Google Ads, Meta Ads, and PPC management to increase qualified leads and ROI. Partner with ENH Consulting."
        />
        <link
          rel="canonical"
          href={`https://enh.consulting/ppc-company-in-dubai`}
        />

        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="ENH Consulting" />
        <meta property="og:locale" content="en_US" />

        <meta
          property="og:title"
          content="Best PPC Company in Dubai | ENH Consulting"
        />
        <meta
          property="og:description"
          content="PPC company in Dubai offering Google Ads, Meta Ads, and PPC management to increase qualified leads and ROI. Partner with ENH Consulting."
        />

        <meta
          property="og:url"
          content="https://enh.consulting/ppc-company-in-dubai"
        />
        <meta
          property="og:image"
          content="https://enh.consulting/assets/service-hero-banner-BWwONeQz.webp"
        />
        <meta property="og:image:width" content="1935" />
        <meta property="og:image:height" content="813" />
        <meta
          property="og:image:alt"
          content="Best PPC Company in Dubai | ENH Consulting"
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Best PPC Company in Dubai | ENH Consulting"
        />
        <meta
          name="twitter:description"
          content="PPC company in Dubai offering Google Ads, Meta Ads, and PPC management to increase qualified leads and ROI. Partner with ENH Consulting."
        />

        <meta
          name="twitter:image"
          content="https://enh.consulting/assets/service-hero-banner-BWwONeQz.webp"
        />
        <script type="application/ld+json">{JSON.stringify(ppcFaqSchema)}</script>
        <script type="application/ld+json">
          {JSON.stringify(ppcServiceSchema)}
        </script>
      </Helmet>
      <HeroBanner data={data} />
      <IntroSection data={data} />
      <IntroSection2 data={data} />
      <RDSection data={data} />
      <GrowthCTASection data={data} />
      <Services />
      <WhyUsSection data={data} />
      <TestimonialsSection data={data} />
      <WhyChooseENH data={data} />
      <BlogSection />
      <Services2 />
      <FAQSection data={data} />
      <ContactSection />
      <FinalCTA />
    </div>
  );
}
