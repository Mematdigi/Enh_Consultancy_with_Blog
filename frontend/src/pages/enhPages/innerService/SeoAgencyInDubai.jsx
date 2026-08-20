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
  FaClipboardList,
  FaCode,
  FaLink,
  FaCogs,
  FaRobot,
  FaComments,
  FaFileAlt,
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
const seoFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What SEO services do you provide?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We provide SEO audits, technical SEO, keyword research, on-page optimization, content optimization, local SEO, and enterprise SEO. These aren't sold as separate add-ons - every service is combined under one coordinated strategy, so technical fixes, content, and authority-building work toward the same ranking and lead-generation goals together.",
      },
    },
    {
      "@type": "Question",
      name: "How long does SEO take to deliver results?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most businesses see measurable ranking and traffic improvements within three to six months. That timeline depends on your starting point - sites with heavier technical issues or newer domains take longer, while stronger, more sustainable growth typically builds over six to twelve months as authority and content depth compound.",
      },
    },
    {
      "@type": "Question",
      name: "Why is SEO important for businesses in Dubai?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "SEO matters because Dubai's search market is highly competitive and customers increasingly research businesses online before buying anything. Without strong organic visibility, competitors capture that search traffic instead of you. SEO builds a presence in those searches, generating consistent, qualified leads without the recurring cost of paid ads.",
      },
    },
    {
      "@type": "Question",
      name: "How much do SEO services cost?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "There's no single fixed price - cost depends on your current site health, competition level, and growth goals. A newer site with heavy technical issues needs more upfront work than an established one. We scope pricing around what's actually required to hit your specific targets, and walk you through that directly.",
      },
    },
    {
      "@type": "Question",
      name: "What is included in an SEO audit?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "An SEO audit covers technical health, site structure, keyword rankings, content quality, and backlink profile. Each area is reviewed to pinpoint exactly what's limiting your visibility right now - whether that's crawl errors, thin content, or weak authority - and the findings translate into a clear, prioritized roadmap for improvement.",
      },
    },
    {
      "@type": "Question",
      name: "Do you provide Local SEO services?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, local SEO is a core part of what we offer. We optimize Google Business Profiles, build local citations, and create location-based content so your business shows up when Dubai and UAE customers search nearby - which is often where the highest-intent, ready-to-buy traffic comes from.",
      },
    },
    {
      "@type": "Question",
      name: "Can SEO help small businesses?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, and often more effectively than paid advertising alone. SEO targets customers who are already actively searching for what you offer, without the recurring cost of running ads. For small businesses with limited budgets, that makes it one of the most cost-effective, sustainable channels available for consistent growth.",
      },
    },
    {
      "@type": "Question",
      name: "How do you measure SEO success?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Success isn't measured by rankings alone - we track rankings, organic traffic growth, qualified leads, and conversions together. A page can rank well and still fail to generate business, so these metrics are monitored continuously, ensuring your SEO investment consistently ties back to real, measurable outcomes rather than vanity numbers.",
      },
    },
    {
      "@type": "Question",
      name: "Do you guarantee first-page Google rankings?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No, and any agency that promises guaranteed rankings isn't being straight with you - no one controls Google's algorithm, and guarantees like that usually signal risky, non-compliant tactics. Instead, ENH follows white-hat, best-practice SEO designed to build sustainable visibility and long-term results you can actually rely on.",
      },
    },
  ],
};

// ─── JSON-LD: Service schema ──────────────────────────────────────────────────
const seoServiceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://enh.consulting/best-seo-agency-in-dubai#service",
  name: "SEO Services in Dubai",
  serviceType: "Search Engine Optimization (SEO)",
  url: "https://enh.consulting/best-seo-agency-in-dubai",
  description:
    "ENH Consulting provides SEO services in Dubai to help businesses improve search rankings, increase qualified organic traffic, generate leads, strengthen local visibility, and achieve sustainable organic growth through SEO audits, on-page SEO, link building, technical SEO, generative engine optimization, answer engine optimization, content optimization, and local SEO.",
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
    name: "SEO Services",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "SEO Audit" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "On-Page SEO" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Link Building" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Technical SEO" } },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Generative Engine Optimization (GEO)",
        },
      },
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "Answer Engine Optimization (AEO)" },
      },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Content Optimization" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Local SEO" } },
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
const SEO_DATA = {
  default: {
    badge: "SEO Agency",
    headline: "Hire the Best SEO Agency in Dubai for Sustainable Organic Growth",
    tagline:
      "Ranking on page one in Dubai's crowded search market doesn't happen through guesswork - it takes a strategy built around your business, not just algorithms. As the best SEO agency in Dubai, ENH Consulting helps businesses overcome stalled visibility and inconsistent traffic, building organic search presence that grows steadily and keeps generating qualified leads long after the work is done.",
    cta: "Get a Free Consultation",
    heroImg: secondSection,
    heroImgTwo: thirdSection,

    // Business challenges / intro
    introTitle: "Is Your Business Struggling to Rank Higher on Google?",
    introText:
      "Businesses looking for an SEO agency in Dubai often aren't lacking effort - they're lacking a coordinated SEO strategy. Common challenges include low organic traffic, poor keyword rankings, unresolved technical issues, weak local visibility, and website content that fails to turn visitors into leads.",
    introText2:
      "These problems can become more difficult when Dubai businesses compete against established local and regional brands. Without aligning technical SEO, content, local optimization, and authority building, rankings can stagnate and organic traffic may deliver limited business value. ENH Consulting takes a comprehensive approach as an experienced SEO company in Dubai, connecting technical optimization, content strategy, local SEO, and authority building under one plan. The goal is to improve search visibility, attract qualified traffic, increase conversions, and support sustainable organic growth.",
    enquireText: "Get a Free Consultation",

    // Why partner with ENH
    partnerTitle: "Partner with a Results-Driven SEO Agency in Dubai",
    partnerText1:
      "Handling SEO internally means managing technical audits, keyword research, content strategy, link building, local SEO, and ongoing optimization without dedicated expertise across every area. Partnering with a top SEO agency in Dubai gives businesses access to specialists who can bring these activities together under one focused strategy from the start.",
    partnerText2:
      "ENH Consulting combines technical SEO, content planning, local search optimization, and authority building to create a stronger foundation for sustainable organic growth. Rather than relying on a fixed checklist or targeting keywords simply because they have search volume, the strategy is shaped around your industry, competitors, audience, and business objectives. As your Dubai SEO agency, we continuously monitor performance and refine the strategy to attract qualified organic traffic, generate meaningful enquiries and leads, and build search visibility that becomes more valuable over time.",

    // Services we offer
    rdTitle: "Result-Driven & Full-Scale SEO Services in Dubai by ENH Consulting",
    rdCards: [
      {
        icon: <FaClipboardList />,
        title: "SEO Audit",
        desc: "A thorough SEO audit uncovers exactly what's holding your rankings back - technical errors, content gaps, or weak site structure. This SEO audit Dubai businesses rely on gives you a clear roadmap before work begins, prioritizing the highest-impact fixes first so effort goes toward changes most likely to move rankings and lead generation.",
      },
      {
        icon: <FaCode />,
        title: "On-Page SEO",
        desc: "On-page optimization aligns your pages with what both search engines and visitors are looking for. By refining structure, messaging, and internal linking, we improve how easily your business is found in search, and how effectively that traffic converts once it actually arrives on your site.",
      },
      {
        icon: <FaLink />,
        title: "Link Building",
        desc: "Businesses need effective off-page SEO strategies that strengthen authority, improve trust, and build valuable links over time. We develop targeted link building campaigns that support stronger rankings, expand online visibility, and build a credible digital presence across Dubai, the UAE, and relevant industry markets.",
      },
      {
        icon: <FaCogs />,
        title: "Technical SEO",
        desc: "Search engines can't rank what they can't crawl. We fix site speed, indexing, crawlability, and structural issues that quietly cap your visibility, giving your content the technical foundation it needs to compete for rankings against local Dubai competitors, before content or authority work can make any real difference.",
      },
      {
        icon: <FaRobot />,
        title: "Generative Engine Optimization (GEO)",
        desc: "As AI-powered search platforms like ChatGPT, Google AI Overviews, and Perplexity change how people discover information, we optimize your content to increase its visibility in AI-generated responses. Our GEO strategies help position your business for the future of search while strengthening your overall organic presence.",
      },
      {
        icon: <FaComments />,
        title: "Answer Engine Optimization (AEO)",
        desc: "Modern search increasingly relies on featured snippets, voice search, and AI-generated answers. We structure and optimize your content to provide clear, authoritative responses that improve visibility across answer engines and help your business reach users searching with high intent.",
      },
      {
        icon: <FaFileAlt />,
        title: "Content Optimization",
        desc: "Existing and new content is refined for relevance, depth, and search intent alignment, improving rankings for pages that already have traffic potential. This targeted approach strengthens visibility faster than building new content from scratch every time, making the most of what your site already has.",
      },
      {
        icon: <FaMapMarkerAlt />,
        title: "Local SEO",
        desc: "For Dubai businesses competing on proximity and local intent, local SEO services drive visibility where customers are actively searching nearby. Google Business Profile optimization, local citations, and location-based content help you show up in local search results and maps when it matters most.",
      },
    ],

    // Industries we serve
    whyUs: [
      {
        icon: <FaHeartbeat />,
        title: "Healthcare",
        desc: "Turning high-intent patient searches into consistent patient acquisition for providers competing in a research-heavy market.",
      },
      {
        icon: <FaGraduationCap />,
        title: "Education",
        desc: "Driving organic visibility that translates into stronger student enrollment growth across academic cycles.",
      },
      {
        icon: <FaBuilding />,
        title: "Real Estate",
        desc: "Capturing high-consideration searches and converting them into qualified buyer inquiries in Dubai's fast-moving property market.",
      },
      {
        icon: <FaHotel />,
        title: "Hospitality",
        desc: "Improving local and seasonal search visibility to drive more direct bookings, reducing reliance on third-party platforms.",
      },
      {
        icon: <FaShoppingCart />,
        title: "Ecommerce & Retail",
        desc: "Ranking product and category pages to generate qualified traffic that converts into online sales.",
      },
      {
        icon: <FaIndustry />,
        title: "Manufacturing & B2B",
        desc: "Building organic visibility across longer sales cycles to generate consistent B2B lead generation.",
      },
    ],

    // Our process
    testimonials: [
      {
        step: "Step 1 — SEO Audit",
        text: "We assess your current rankings, technical health, and content gaps to identify exactly where opportunity exists.",
      },
      {
        step: "Step 2 — Research & Strategy",
        text: "Findings shape a keyword and content strategy built around real buyer search intent.",
      },
      {
        step: "Step 3 — Technical Optimization",
        text: "Site speed, crawlability, and indexing issues are resolved to remove ranking barriers.",
      },
      {
        step: "Step 4 — Content & On-Page Optimization",
        text: "Pages are optimized and new content created to target high-value search terms.",
      },
      {
        step: "Step 5 — Authority Building",
        text: "Ethical, white-hat link building and citations strengthen domain authority over time.",
      },
      {
        step: "Step 6 — Performance Monitoring",
        text: "Rankings and traffic are tracked continuously, with strategy adjusted as results come in.",
      },
    ],

    // Expected results
    whyEnh: [
      {
        num: "01",
        icon: <FaSearch />,
        title: "Higher Google Rankings",
        desc: "Improved visibility for the search terms that matter most to your business and customers.",
      },
      {
        num: "02",
        icon: <FaBullseye />,
        title: "More Qualified Organic Traffic",
        desc: "Visitors who match your ideal customer profile, not just higher visitor counts.",
      },
      {
        num: "03",
        icon: <FaMapMarkerAlt />,
        title: "Increased Local Visibility",
        desc: "Stronger presence in local search and maps for customers searching nearby.",
      },
      {
        num: "04",
        icon: <FaHandshake />,
        title: "Better Lead Generation",
        desc: "Organic traffic that converts into real inquiries, not just page views.",
      },
      {
        num: "05",
        icon: <FaRocket />,
        title: "Higher Website Conversions",
        desc: "Optimized pages that turn more organic visitors into customers.",
      },
      {
        num: "06",
        icon: <FaShieldAlt />,
        title: "Sustainable Long-Term Growth",
        desc: "Rankings that compound over time, reducing dependence on paid advertising.",
      },
    ],

    // FAQs
    faqs: [
      {
        q: "What SEO services do you provide?",
        a: "We provide SEO audits, technical SEO, keyword research, on-page optimization, content optimization, local SEO, and enterprise SEO. These aren't sold as separate add-ons - every service is combined under one coordinated strategy, so technical fixes, content, and authority-building work toward the same ranking and lead-generation goals together.",
        img: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80",
        imgLabel: "Full-scope SEO services",
      },
      {
        q: "How long does SEO take to deliver results?",
        a: "Most businesses see measurable ranking and traffic improvements within three to six months. That timeline depends on your starting point - sites with heavier technical issues or newer domains take longer, while stronger, more sustainable growth typically builds over six to twelve months as authority and content depth compound.",
        img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80",
        imgLabel: "Results that compound over time",
      },
      {
        q: "Why is SEO important for businesses in Dubai?",
        a: "SEO matters because Dubai's search market is highly competitive and customers increasingly research businesses online before buying anything. Without strong organic visibility, competitors capture that search traffic instead of you. SEO builds a presence in those searches, generating consistent, qualified leads without the recurring cost of paid ads.",
        img: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=800&q=80",
        imgLabel: "Why SEO matters in Dubai",
      },
      {
        q: "How much do SEO services cost?",
        a: "There's no single fixed price - cost depends on your current site health, competition level, and growth goals. A newer site with heavy technical issues needs more upfront work than an established one. We scope pricing around what's actually required to hit your specific targets, and walk you through that directly.",
        img: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80",
        imgLabel: "Transparent, goal-based pricing",
      },
      {
        q: "What is included in an SEO audit?",
        a: "An SEO audit covers technical health, site structure, keyword rankings, content quality, and backlink profile. Each area is reviewed to pinpoint exactly what's limiting your visibility right now - whether that's crawl errors, thin content, or weak authority - and the findings translate into a clear, prioritized roadmap for improvement.",
        img: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80",
        imgLabel: "What an SEO audit covers",
      },
      {
        q: "Do you provide Local SEO services?",
        a: "Yes, local SEO is a core part of what we offer. We optimize Google Business Profiles, build local citations, and create location-based content so your business shows up when Dubai and UAE customers search nearby - which is often where the highest-intent, ready-to-buy traffic comes from.",
        img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80",
        imgLabel: "Built for local search",
      },
      {
        q: "Can SEO help small businesses?",
        a: "Yes, and often more effectively than paid advertising alone. SEO targets customers who are already actively searching for what you offer, without the recurring cost of running ads. For small businesses with limited budgets, that makes it one of the most cost-effective, sustainable channels available for consistent growth.",
        img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80",
        imgLabel: "SEO for small businesses",
      },
      {
        q: "How do you measure SEO success?",
        a: "Success isn't measured by rankings alone - we track rankings, organic traffic growth, qualified leads, and conversions together. A page can rank well and still fail to generate business, so these metrics are monitored continuously, ensuring your SEO investment consistently ties back to real, measurable outcomes rather than vanity numbers.",
        img: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=800&q=80",
        imgLabel: "Metrics that matter",
      },
      {
        q: "Do you guarantee first-page Google rankings?",
        a: "No, and any agency that promises guaranteed rankings isn't being straight with you - no one controls Google's algorithm, and guarantees like that usually signal risky, non-compliant tactics. Instead, ENH follows white-hat, best-practice SEO designed to build sustainable visibility and long-term results you can actually rely on.",
        img: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80",
        imgLabel: "Sustainable, white-hat SEO",
      },
    ],

    // Let's Talk Growth CTA banner
    growthTitle: "Let's Improve Your Organic Visibility",
    growthText:
      "Every business's SEO challenges are different, shaped by industry, competition, and current site health. Discuss your goals with our SEO specialists, and we'll identify exactly where the opportunity is to attract more qualified traffic and improve your rankings.",
    growthNote:
      "Discover how a coordinated SEO strategy can generate more qualified organic traffic.",
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
                Strong organic visibility doesn't come from one fix - it's the
                result of technical optimization, content strategy, user
                experience, and continuous improvement working together.
                Here's how ENH structures SEO services in Dubai as a complete,
                full-scale offering.
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
        "Startups need visibility built efficiently on limited budgets. We prioritize technical fixes and targeted keyword opportunities that generate early traction quickly, laying a foundation that scales as the business grows without requiring a strategy overhaul later.",
      number: "01",
    },
    {
      icon: <FaBriefcase />,
      title: "Small & Medium Businesses",
      description:
        "Growing SMEs need SEO that expands alongside the business. We build strategies that scale from a handful of core pages to broader content coverage, keeping organic growth efficient as competition and ambitions increase.",
      number: "02",
    },
    {
      icon: <FaGlobe />,
      title: "Enterprises",
      description:
        "Enterprises need SEO managed across multiple markets, product lines, or locations. We handle that complexity with structured governance and reporting, keeping large-scale organic strategies aligned with business-wide growth targets.",
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
                SEO Solutions for Businesses of Every Size
              </span>
            </h2>
          </motion.div>
          <motion.p className="services-subtitle mt-4" variants={fadeUp}>
            SEO priorities shift with business size, budget, and growth stage -
            a strategy that fits a startup rarely fits an enterprise. Here's
            how we tailor our approach for each.
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
      title: "ROI-Focused SEO Strategies",
      description:
        "Every optimization is tied to business impact - leads and revenue - not rankings alone, ensuring SEO investment translates into measurable growth.",
    },
    {
      title: "Dedicated SEO Specialists",
      description:
        "A dedicated team across technical, content, and local SEO means every discipline is handled by someone who specializes in it, not a single generalist.",
    },
    {
      title: "Transparent Reporting",
      description:
        "Clients see exactly what's driving rankings and traffic changes, with reporting tied to business outcomes rather than opaque ranking charts alone.",
    },
    {
      title: "Data-Driven Optimization",
      description:
        "Strategy decisions are based on search data and performance trends, not assumptions, keeping SEO investment focused on what actually moves rankings.",
    },
    {
      title: "Ethical (White-Hat) SEO Practices",
      description:
        "All optimization follows Google's guidelines, protecting your site from penalties and building rankings that are sustainable rather than at risk of collapsing.",
    },
    {
      title: "Deep Understanding of Dubai and UAE Search Markets",
      description:
        "Local search behavior, competition, and intent shape every strategy, giving businesses an edge that generic, market-agnostic SEO approaches can't match.",
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
                Why Businesses Choose ENH as Their SEO Agency in Dubai
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
            Industries We Help Grow Through SEO
          </motion.h2>
          <motion.p className="mt-3 text-white" variants={fadeUp}>
            SEO priorities vary by industry - what drives rankings and leads
            for one sector rarely applies directly to another.
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
              Our SEO Process for Sustainable Organic Growth
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
            A clear, repeatable process is what turns SEO effort into
            measurable rankings and traffic growth. Here's exactly how we take
            a strategy from audit to results.
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
              Insights to Help You Grow Organically
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
            What Results Can You Expect from Our SEO Services?
          </motion.h2>
          <motion.p className="svp-why-enh__lead" variants={fadeUp}>
            Every SEO strategy we build is focused on outcomes that matter to
            your business, not rankings alone. Here's what businesses
            typically experience when they partner with ENH Consulting.
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
                Frequently Asked Questions About SEO Services in Dubai
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
                Everything you need to know before partnering with an SEO
                agency in Dubai.
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
                Get in touch today to start improving your search rankings and
                organic visibility with expert SEO guidance.
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
                      <option value="seo-audit">SEO Audit</option>
                      <option value="on-page-seo">On-Page SEO</option>
                      <option value="link-building">Link Building</option>
                      <option value="technical-seo">Technical SEO</option>
                      <option value="geo">
                        Generative Engine Optimization (GEO)
                      </option>
                      <option value="aeo">
                        Answer Engine Optimization (AEO)
                      </option>
                      <option value="content-optimization">
                        Content Optimization
                      </option>
                      <option value="local-seo">Local SEO</option>
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
            Ready to Grow with a Leading SEO Agency in Dubai?
          </motion.h2>

          <motion.p className="svp-final-cta__text" variants={fadeUp}>
            Stronger organic visibility, more qualified traffic, and
            sustainable growth start with the right strategy, not another
            isolated fix. Talk to ENH Consulting about your search rankings
            and local search visibility goals, and let's build an SEO
            approach designed to keep compounding well beyond the first few
            months.
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
export default function SEOAgencyDubai() {
  const { slug } = useParams();
  const data = SEO_DATA[slug] || SEO_DATA["default"];

  return (
    <div className="service-view-page">
      <Helmet>
        <title>Hire the Best SEO Agency in Dubai | ENH Consulting</title>
        <meta
          name="description"
          content="Partner with ENH Consulting, the best SEO agency in Dubai, to improve rankings, increase organic traffic, generate quality leads, and grow faster."
        />
        <link
          rel="canonical"
          href={`https://enh.consulting/best-seo-agency-in-dubai`}
        />

        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="ENH Consulting" />
        <meta property="og:locale" content="en_US" />

        <meta
          property="og:title"
          content="Hire the Best SEO Agency in Dubai | ENH Consulting"
        />
        <meta
          property="og:description"
          content="Partner with ENH Consulting, the best SEO agency in Dubai, to improve rankings, increase organic traffic, generate quality leads, and grow faster."
        />

        <meta
          property="og:url"
          content="https://enh.consulting/best-seo-agency-in-dubai"
        />
        <meta
          property="og:image"
          content="https://enh.consulting/assets/service-hero-banner-BWwONeQz.webp"
        />
        <meta property="og:image:width" content="1935" />
        <meta property="og:image:height" content="813" />
        <meta
          property="og:image:alt"
          content="Best SEO Agency in Dubai | ENH Consulting"
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Hire the Best SEO Agency in Dubai | ENH Consulting"
        />
        <meta
          name="twitter:description"
          content="Partner with ENH Consulting, the best SEO agency in Dubai, to improve rankings, increase organic traffic, generate quality leads, and grow faster."
        />

        <meta
          name="twitter:image"
          content="https://enh.consulting/assets/service-hero-banner-BWwONeQz.webp"
        />
        <script type="application/ld+json">{JSON.stringify(seoFaqSchema)}</script>
        <script type="application/ld+json">
          {JSON.stringify(seoServiceSchema)}
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
