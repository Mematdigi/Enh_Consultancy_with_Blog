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
  FaEye,
  FaAward,
  FaComments,
  FaChartLine,
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
const ormFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is online reputation management?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Online reputation management is the ongoing process of monitoring, responding to, and shaping how a business is perceived across reviews, search results, and social media - helping ensure that what customers find reflects your business accurately and favorably.",
      },
    },
    {
      "@type": "Question",
      name: "What do online reputation management services include?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Our services include reputation monitoring, review and ratings management, negative content and search result management, brand reputation building, social media reputation management, and ongoing reporting and strategy.",
      },
    },
    {
      "@type": "Question",
      name: "How can ORM help my business in Dubai?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "In a competitive market where most customers research online before making contact, a well-managed reputation builds the trust needed to convert that research into enquiries, bookings, or sales, rather than losing customers to better-reviewed competitors.",
      },
    },
    {
      "@type": "Question",
      name: "Can you remove negative reviews?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We can't guarantee removal of specific reviews or search results - no agency legitimately can. We focus on professional response, dispute processes where a review genuinely violates a platform's policies, and building a stronger overall reputation that puts negative content in context.",
      },
    },
    {
      "@type": "Question",
      name: "How do you handle negative search results?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We build compliant strategies to strengthen your overall search footprint with more authoritative, relevant content, helping accurate and positive information rank more prominently over time, rather than attempting to guarantee removal of specific results.",
      },
    },
    {
      "@type": "Question",
      name: "How long does reputation management take?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Response to active issues can begin immediately, but building a stronger overall reputation - improved review sentiment, better search visibility - is a gradual process that typically develops over several months of consistent monitoring and activity.",
      },
    },
    {
      "@type": "Question",
      name: "How do you improve online reviews?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We respond professionally to existing reviews, encourage genuine customers to share their experience, and address service issues that may be driving negative feedback, building a more accurate and balanced review profile over time.",
      },
    },
    {
      "@type": "Question",
      name: "How do you measure ORM success?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We track review sentiment, rating trends, search visibility, and mention volume over time, reporting on how your online reputation is changing rather than relying on a single metric.",
      },
    },
    {
      "@type": "Question",
      name: "Is online reputation management suitable for small businesses?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Smaller businesses often have fewer reviews, which means each one carries more weight - making early, consistent reputation management especially valuable while a business is still building its online presence.",
      },
    },
    {
      "@type": "Question",
      name: "Why should I hire an ORM agency in Dubai?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "An agency brings continuous monitoring, response capacity, and reputation-building expertise that's difficult to maintain consistently in-house, along with an understanding of how Dubai and UAE customers specifically research and choose businesses.",
      },
    },
  ],
};

// ─── JSON-LD: Service schema ──────────────────────────────────────────────────
const ormServiceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://enh.consulting/online-reputation-management-services-in-dubai/#service",
  name: "Online Reputation Management Services in Dubai",
  serviceType: "Online Reputation Management",
  url: "https://enh.consulting/online-reputation-management-services-in-dubai/",
  description:
    "ENH Consulting provides online reputation management services in Dubai to help businesses monitor reviews and online mentions, manage reputation risks, strengthen positive brand signals, improve search visibility, build customer trust, and protect their online reputation through ethical and data-driven reputation management strategies.",
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
    name: "Online Reputation Management Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "Online Reputation Monitoring" },
      },
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "Review and Ratings Management" },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Negative Content and Search Result Management",
        },
      },
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "Brand Reputation Building" },
      },
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "Social Media Reputation Management" },
      },
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "ORM Reporting and Reputation Strategy" },
      },
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
const ORM_DATA = {
  default: {
    badge: "ORM Services",
    headline: "Online Reputation Management Services in Dubai That Protect & Grow Your Brand",
    tagline:
      "Before a customer calls, books, or buys, they search. What shows up, reviews, ratings, search results, social mentions, often decides whether they trust your business enough to move forward. Online reputation management services in Dubai help you shape that first impression: monitoring what's being said, responding to reviews and complaints, and building the kind of consistent, positive presence that turns searchers into customers.",
    cta: "Get a Free Consultation",
    heroImg: secondSection,
    heroImgTwo: thirdSection,

    // Business challenges / intro
    introTitle: "Is Your Business Struggling to Protect Its Online Reputation?",
    introText:
      "Reputation problems rarely appear as one major crisis. They often build gradually through negative reviews, poor ratings, unanswered complaints, and negative search results that influence potential customers before they contact your business. These challenges can become more serious when online reputation management services in Dubai are not supported by consistent monitoring and a clear response strategy.",
    introText2:
      "Without structured reputation management, negative conversations can spread across Google, social media, and review platforms while competitors with stronger ratings gain customer trust. ENH Consulting helps Dubai businesses monitor their online reputation, respond to reputation risks, manage negative content, and strengthen positive brand signals. The goal is to protect customer trust, improve brand perception, and help businesses maintain a stronger online presence that supports long-term growth.",
    enquireText: "Get a Free Consultation",

    // Why partner with ENH
    partnerTitle: "Partner with a Results-Driven Online Reputation Management Agency in Dubai",
    partnerText1:
      "Reputation issues move fast, and they show up across more channels than most businesses can track on their own, Google reviews, search results, social media, and industry-specific platforms all shaping how you're perceived at once. Managing that well takes continuous monitoring, not an occasional check-in, along with a fast, appropriate response when something needs addressing.",
    partnerText2:
      "As an online reputation management agency, ENH Consulting builds that as an ongoing system rather than a reactive scramble. We monitor across the channels that matter for your business, respond to reviews and reputation risks quickly, and build positive reputation signals strategically over time. Every decision is backed by real monitoring data, not guesswork, and shaped by an understanding of how Dubai and UAE audiences actually research and choose businesses before they buy.",

    // Services we offer
    rdTitle: "Online Reputation Management Services Designed to Build Trust",
    rdCards: [
      {
        icon: <FaEye />,
        title: "Online Reputation Monitoring",
        desc: "We track reviews, mentions, search results, and social conversations across the platforms most relevant to your business, so reputation risks are identified early rather than after they've already affected customer perception. Most reputation damage happens in the gap between an issue appearing and someone noticing it.",
      },
      {
        icon: <FaStar />,
        title: "Review & Ratings Management",
        desc: "We monitor and respond to customer reviews across the platforms that matter to your business, helping you address negative feedback professionally while encouraging genuine customers to share their experience. The goal is a review profile that reflects real customer sentiment accurately, not manipulated numbers.",
      },
      {
        icon: <FaShieldAlt />,
        title: "Negative Content & Search Result Management",
        desc: "We identify content in search results that's damaging your reputation and build compliant strategies to reduce its visibility, primarily through stronger, more authoritative, and more relevant content that earns better search placement over time. We don't promise removal of specific negative reviews or search results, since no agency can legitimately guarantee that.",
      },
      {
        icon: <FaAward />,
        title: "Brand Reputation Building",
        desc: "We build positive brand signals through authoritative content, PR opportunities, social media presence, and other digital channels that strengthen how credible and trustworthy your business appears. This is the proactive side of reputation management, building the kind of consistent positive presence that makes isolated negative content far less influential.",
      },
      {
        icon: <FaComments />,
        title: "Social Media Reputation Management",
        desc: "We monitor comments, mentions, and sentiment across the social platforms relevant to your business, responding appropriately when a reputation risk appears rather than letting it sit unanswered. Social platforms often move faster than search results, so this ongoing monitoring catches issues while they're still small and manageable.",
      },
      {
        icon: <FaChartLine />,
        title: "ORM Reporting & Reputation Strategy",
        desc: "We track sentiment, review volume, visibility, and mention trends over time, turning that data into an ongoing strategy rather than a one-off report. Reputation management works best as a continuous cycle, monitor, respond, build, measure, adjust, and this is where that cycle is reviewed and refined.",
      },
    ],

    // Industries we serve
    whyUs: [
      {
        icon: <FaHeartbeat />,
        title: "Healthcare",
        desc: "Patient reviews and search results heavily influence which providers people trust with their care.",
      },
      {
        icon: <FaGraduationCap />,
        title: "Education",
        desc: "Parent and student reviews shape enrollment decisions long before a school or institute is contacted directly.",
      },
      {
        icon: <FaBuilding />,
        title: "Real Estate",
        desc: "Buyer and investor trust depends heavily on how a developer or agency is perceived online before any deal begins.",
      },
      {
        icon: <FaHotel />,
        title: "Hospitality",
        desc: "Guest reviews on platforms like Google and TripAdvisor directly influence booking decisions and occupancy.",
      },
      {
        icon: <FaShoppingCart />,
        title: "Retail & E-commerce",
        desc: "Product and seller reviews are often the deciding factor between competing options at the point of purchase.",
      },
      {
        icon: <FaHandshake />,
        title: "Professional & B2B Services",
        desc: "Case studies, reviews, and search presence build the credibility needed before a business commits to a longer-term engagement.",
      },
    ],

    // Our process
    testimonials: [
      {
        step: "Step 1 — Reputation Audit",
        text: "We assess your current reviews, search results, mentions, and social presence to understand exactly where you stand today.",
      },
      {
        step: "Step 2 — Monitoring & Analysis",
        text: "We set up ongoing monitoring across the platforms most relevant to your business and audience.",
      },
      {
        step: "Step 3 — Risk Identification",
        text: "We flag existing and emerging reputation risks before they have a chance to affect customer perception.",
      },
      {
        step: "Step 4 — Reputation Strategy",
        text: "We build a plan for monitoring, response, and positive reputation building tied to your specific situation.",
      },
      {
        step: "Step 5 — Reputation Building & Response",
        text: "We respond to reviews and mentions and actively build positive signals across relevant channels.",
      },
      {
        step: "Step 6 — Monitoring, Reporting & Optimization",
        text: "We track sentiment and visibility over time, adjusting the strategy based on what the data shows.",
      },
    ],

    // Expected results
    whyEnh: [
      {
        num: "01",
        icon: <FaShieldAlt />,
        title: "Stronger Online Reputation",
        desc: "A more consistently monitored and actively managed presence across the platforms that shape how customers see your business.",
      },
      {
        num: "02",
        icon: <FaStar />,
        title: "Improved Review Sentiment",
        desc: "More responsive, professional handling of reviews, supporting a more balanced and accurate reflection of customer experience over time.",
      },
      {
        num: "03",
        icon: <FaSearch />,
        title: "Better Search Visibility",
        desc: "A stronger overall search footprint, with more authoritative, relevant content supporting how your brand appears in results.",
      },
      {
        num: "04",
        icon: <FaHandshake />,
        title: "Increased Customer Trust",
        desc: "A more consistent, well-managed online presence that gives new customers confidence before they ever make contact.",
      },
      {
        num: "05",
        icon: <FaEye />,
        title: "Faster Reputation Risk Response",
        desc: "Ongoing monitoring designed to catch and address reputation issues early, before they have room to spread.",
      },
      {
        num: "06",
        icon: <FaRocket />,
        title: "Greater Conversion Confidence",
        desc: "A stronger reputation that supports the trust customers need to move from researching your business to actually choosing it.",
      },
    ],
    resultsNote:
      "We don't promise the removal of specific negative reviews or guaranteed ranking positions, no agency can honestly guarantee either. What we can commit to is consistent monitoring, professional response, and a strategy built to strengthen your reputation over time.",

    // FAQs
    faqs: [
      {
        q: "What is online reputation management?",
        a: "Online reputation management is the ongoing process of monitoring, responding to, and shaping how a business is perceived across reviews, search results, and social media, helping ensure that what customers find reflects your business accurately and favorably.",
        img: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80",
        imgLabel: "What ORM covers",
      },
      {
        q: "What do online reputation management services include?",
        a: "Our services include reputation monitoring, review and ratings management, negative content and search result management, brand reputation building, social media reputation management, and ongoing reporting and strategy.",
        img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80",
        imgLabel: "Six connected services",
      },
      {
        q: "How can ORM help my business in Dubai?",
        a: "In a competitive market where most customers research online before making contact, a well-managed reputation builds the trust needed to convert that research into enquiries, bookings, or sales, rather than losing customers to better-reviewed competitors.",
        img: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=800&q=80",
        imgLabel: "Why ORM matters in Dubai",
      },
      {
        q: "Can you remove negative reviews?",
        a: "We can't guarantee removal of specific reviews or search results, no agency legitimately can. We focus on professional response, dispute processes where a review genuinely violates a platform's policies, and building a stronger overall reputation that puts negative content in context.",
        img: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80",
        imgLabel: "On review removal",
      },
      {
        q: "How do you handle negative search results?",
        a: "We build compliant strategies to strengthen your overall search footprint with more authoritative, relevant content, helping accurate and positive information rank more prominently over time, rather than attempting to guarantee removal of specific results.",
        img: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80",
        imgLabel: "Handling negative search results",
      },
      {
        q: "How long does reputation management take?",
        a: "Response to active issues can begin immediately, but building a stronger overall reputation, improved review sentiment, better search visibility, is a gradual process that typically develops over several months of consistent monitoring and activity.",
        img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80",
        imgLabel: "Timelines for reputation building",
      },
      {
        q: "How do you improve online reviews?",
        a: "We respond professionally to existing reviews, encourage genuine customers to share their experience, and address service issues that may be driving negative feedback, building a more accurate and balanced review profile over time.",
        img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80",
        imgLabel: "Improving review profiles",
      },
      {
        q: "How do you measure ORM success?",
        a: "We track review sentiment, rating trends, search visibility, and mention volume over time, reporting on how your online reputation is changing rather than relying on a single metric.",
        img: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=800&q=80",
        imgLabel: "Measuring ORM success",
      },
      {
        q: "Is online reputation management suitable for small businesses?",
        a: "Yes. Smaller businesses often have fewer reviews, which means each one carries more weight, making early, consistent reputation management especially valuable while a business is still building its online presence.",
        img: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80",
        imgLabel: "ORM for small businesses",
      },
      {
        q: "Why should I hire an ORM agency in Dubai?",
        a: "An agency brings continuous monitoring, response capacity, and reputation-building expertise that's difficult to maintain consistently in-house, along with an understanding of how Dubai and UAE customers specifically research and choose businesses.",
        img: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80",
        imgLabel: "Why hire an agency",
      },
    ],

    // Let's Talk Growth CTA banner
    growthTitle: "Let's Build a Stronger Online Reputation",
    growthText:
      "Your online reputation is already shaping how customers see your business, whether it's being actively managed or not. ENH Consulting can help you monitor reviews and mentions, respond to reputation risks, and build the kind of consistent trust that turns searches into customers.",
    growthNote: "Talk to ENH Consulting about your online reputation.",
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
                A strong online reputation isn't the result of one fix, it's
                built through consistent monitoring, response, and positive
                reputation-building working together. ENH Consulting
                structures that work into six connected services, covering
                everything from day-to-day monitoring to long-term strategy.
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
        "New businesses are often building their online reputation from close to zero, which makes every early review and mention disproportionately influential. We focus on establishing a consistent review presence, monitoring closely from the start, and building the kind of early positive signals that give new customers confidence in a business with limited track record.",
      number: "01",
    },
    {
      icon: <FaBriefcase />,
      title: "Small & Medium Businesses",
      description:
        "Growing businesses typically have an established reputation that needs active, ongoing management rather than occasional attention. We focus on consistent review response, monitoring across the channels your customers actually use, and steadily building positive reputation signals that keep pace as your customer base and visibility grow.",
      number: "02",
    },
    {
      icon: <FaGlobe />,
      title: "Enterprises",
      description:
        "Larger organizations often manage reputation across multiple locations, brands, or business units, with a higher volume of reviews and mentions to track. We handle structured monitoring at that scale, coordinated response processes, and reporting built for stakeholders who need visibility into reputation trends across the wider business.",
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
                Reputation Management Solutions for Businesses of Every Size
              </span>
            </h2>
          </motion.div>
          <motion.p className="services-subtitle mt-4" variants={fadeUp}>
            Reputation management needs shift with the size of the business
            and the volume of reviews and mentions to track. Here's how we
            tailor our approach for each.
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
      title: "Proactive Reputation Monitoring",
      description:
        "We track reviews, mentions, and search visibility continuously, so reputation risks are identified early rather than discovered after they've already affected customer trust.",
    },
    {
      title: "Data-Driven Reputation Strategies",
      description:
        "Every strategy is built around real monitoring data, sentiment, review trends, search visibility, rather than assumptions about what your reputation needs.",
    },
    {
      title: "Ethical Reputation Management",
      description:
        "We build reputation through legitimate monitoring, response, and content strategies, never through fake reviews, manipulation, or misleading suppression tactics.",
    },
    {
      title: "Cross-Channel Expertise",
      description:
        "We manage reputation across search, reviews, and social media together, so your presence stays consistent rather than strong in one place and neglected in another.",
    },
    {
      title: "Transparent Reporting",
      description:
        "You get clear visibility into sentiment, review trends, and reputation performance over time, so progress is measurable rather than assumed.",
    },
    {
      title: "Dubai & UAE Market Understanding",
      description:
        "Strategies reflect how Dubai and UAE audiences actually research and choose businesses, rather than applying a generic global approach to a local market.",
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
                Why Businesses Choose ENH for Online Reputation Management
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
            Industries We Help Protect Through Reputation Management
          </motion.h2>
          <motion.p className="mt-3 text-white" variants={fadeUp}>
            Reputation carries different weight in every industry, so what
            gets monitored and how it's responded to has to match how that
            audience actually researches and decides.
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
              Our Online Reputation Management Process
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
            A clear, repeatable process is what turns reputation management
            into a system instead of a reaction. Here's exactly how we take
            it from audit to ongoing results.
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
              Insights to Help You Protect Your Reputation
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
            What Results Can You Expect from Our ORM Services?
          </motion.h2>
          <motion.p className="svp-why-enh__lead" variants={fadeUp}>
            Every strategy we build is focused on outcomes that matter to
            your business, not vanity metrics. Here's what businesses
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

        {data.resultsNote && (
          <motion.p
            initial="hidden"
            whileInView="show"
            viewport={vp}
            variants={fadeUp}
            className="mt-4"
            style={{ color: "#532a06", fontSize: "0.95rem", fontStyle: "italic" }}
          >
            {data.resultsNote}
          </motion.p>
        )}
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
                Frequently Asked Questions About Online Reputation Management
                in Dubai
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
                Everything you need to know before partnering with an ORM
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
                Get in touch today to start protecting and strengthening your
                online reputation with expert guidance.
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
                      <option value="orm-monitoring">
                        Online Reputation Monitoring
                      </option>
                      <option value="review-management">
                        Review & Ratings Management
                      </option>
                      <option value="negative-content-management">
                        Negative Content & Search Result Management
                      </option>
                      <option value="brand-reputation-building">
                        Brand Reputation Building
                      </option>
                      <option value="social-reputation-management">
                        Social Media Reputation Management
                      </option>
                      <option value="orm-reporting">
                        ORM Reporting & Reputation Strategy
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
            Ready to Protect and Grow Your Online Reputation?
          </motion.h2>

          <motion.p className="svp-final-cta__text" variants={fadeUp}>
            Whether you're dealing with negative reviews, inconsistent search
            results, or simply want stronger visibility into how your
            business is perceived, ENH Consulting can build an online
            reputation management strategy designed around your business and
            your Dubai market.
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
export default function ORMServicesDubai() {
  const { slug } = useParams();
  const data = ORM_DATA[slug] || ORM_DATA["default"];

  return (
    <div className="service-view-page">
      <Helmet>
        <title>Online Reputation Management Services in Dubai | ENH Consulting</title>
        <meta
          name="description"
          content="Build trust and protect your brand with online reputation management services in Dubai from ENH Consulting. Monitor reviews and manage your online presence."
        />
        <link
          rel="canonical"
          href={`https://enh.consulting/online-reputation-management-services-in-dubai/`}
        />

        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="ENH Consulting" />
        <meta property="og:locale" content="en_US" />

        <meta
          property="og:title"
          content="Online Reputation Management Services in Dubai | ENH Consulting"
        />
        <meta
          property="og:description"
          content="Build trust and protect your brand with online reputation management services in Dubai from ENH Consulting. Monitor reviews and manage your online presence."
        />

        <meta
          property="og:url"
          content="https://enh.consulting/online-reputation-management-services-in-dubai/"
        />
        <meta
          property="og:image"
          content="https://enh.consulting/assets/service-hero-banner-BWwONeQz.webp"
        />
        <meta property="og:image:width" content="1935" />
        <meta property="og:image:height" content="813" />
        <meta
          property="og:image:alt"
          content="Online Reputation Management Services in Dubai | ENH Consulting"
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Online Reputation Management Services in Dubai | ENH Consulting"
        />
        <meta
          name="twitter:description"
          content="Build trust and protect your brand with online reputation management services in Dubai from ENH Consulting. Monitor reviews and manage your online presence."
        />

        <meta
          name="twitter:image"
          content="https://enh.consulting/assets/service-hero-banner-BWwONeQz.webp"
        />
        <script type="application/ld+json">{JSON.stringify(ormFaqSchema)}</script>
        <script type="application/ld+json">
          {JSON.stringify(ormServiceSchema)}
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
