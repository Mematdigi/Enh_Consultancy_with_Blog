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
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaPaintBrush,
  FaCalendarAlt,
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
const smmFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What social media platforms do you manage?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We manage Facebook, Instagram, LinkedIn and paid campaigns through Meta Ads. Which platforms make sense for your business depends on where your audience actually spends time, which we assess during discovery rather than managing every platform by default regardless of fit.",
      },
    },
    {
      "@type": "Question",
      name: "Which platform is best for my business?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It depends on your industry and audience. B2B businesses often see the strongest results on LinkedIn, while consumer brands tend to perform better on Instagram. We recommend platforms based on where your specific customers are active, not a one-size-fits-all approach applied to every client.",
      },
    },
    {
      "@type": "Question",
      name: "How long does social media marketing take to show results?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Engagement and brand awareness improvements often show within four to eight weeks of consistent activity. Lead generation and measurable business impact typically build over three to six months, as content, audience trust, and platform algorithms respond to sustained, strategic activity rather than short bursts.",
      },
    },
    {
      "@type": "Question",
      name: "Do you provide paid social media advertising?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, we manage paid campaigns primarily through Meta Ads Manager, covering Facebook and Instagram, focused on lead generation, conversions, and remarketing. Paid and organic strategy are built together, so advertising extends the reach of content that's already resonating rather than running in isolation.",
      },
    },
    {
      "@type": "Question",
      name: "Do you create content and creatives?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, content creation is core to what we do - graphics, carousel posts, reels planning, and copywriting are all produced in-house, built around your brand rather than generic templates. Every asset is planned ahead through a content calendar, not created last-minute before a posting deadline.",
      },
    },
    {
      "@type": "Question",
      name: "How do you measure campaign success?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We track engagement, reach, follower growth, website traffic, and conversions against your specific goals, not platform-native vanity metrics alone. Reporting ties activity back to real business outcomes, so it's always clear whether social media is actually contributing to growth, not just visibility.",
      },
    },
    {
      "@type": "Question",
      name: "Can social media generate leads?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, when it's approached strategically rather than just for visibility. Combining organic content with targeted paid campaigns and clear calls to action turns engaged followers into real inquiries, particularly on platforms like LinkedIn and Instagram where audience intent tends to be higher.",
      },
    },
    {
      "@type": "Question",
      name: "How often will you post on my accounts?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Posting frequency depends on your platforms, industry, and goals, and gets set during strategy development rather than applied as a fixed number across every client. What matters more than frequency is consistency and relevance - irregular posting or generic content rarely performs, regardless of volume.",
      },
    },
    {
      "@type": "Question",
      name: "Why should I hire a social media marketing company in Dubai?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "An agency brings dedicated strategy, creative, platform, and paid advertising expertise that's difficult to replicate with a single in-house hire. It also means execution stays consistent even as priorities shift internally, with local Dubai and UAE market insight built into every decision from day one.",
      },
    },
  ],
};

// ─── JSON-LD: Service schema ──────────────────────────────────────────────────
const smmServiceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://enh.consulting/social-media-marketing-company-in-dubai#service",
  name: "Social Media Marketing Services in Dubai",
  serviceType: "Social Media Marketing",
  url: "https://enh.consulting/social-media-marketing-company-in-dubai",
  description:
    "ENH Consulting provides social media marketing services in Dubai to help businesses increase brand awareness, audience engagement, qualified leads, website traffic, customer relationships, and conversion opportunities through social media strategy, social media management, content creation, platform-specific marketing, paid social advertising, community management, and performance analytics.",
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
    name: "Social Media Marketing Services",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Social Media Strategy" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Social Media Management" } },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Content Creation and Creative Design",
        },
      },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Facebook Marketing" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Instagram Marketing" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "LinkedIn Marketing" } },
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "Social Media Advertising (Meta Ads)" },
      },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Community Management" } },
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "Social Media Analytics and Reporting" },
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
const SMM_DATA = {
  default: {
    badge: "SMM Company",
    headline:
      "Best Social Media Marketing Company in Dubai for Brand Growth & Customer Engagement",
    tagline:
      "Your customers are already judging your business on social media before they ever visit your website. A weak social presence costs trust, engagement, and sales. As the best social media marketing company in Dubai, ENH Consulting creates data-driven social media strategies that increase brand awareness, customer engagement, and qualified leads across every major platform.",
    cta: "Get a Free Consultation",
    heroImg: secondSection,
    heroImgTwo: thirdSection,

    // Business challenges / intro
    introTitle: "Is Your Business Struggling to Build a Strong Social Media Presence?",
    introText:
      "Many Dubai businesses post consistently but still struggle with low engagement, limited reach, inconsistent branding, and difficulty turning followers into qualified leads. These challenges often arise when social media marketing in Dubai is managed without a clear strategy, defined content pillars, or measurable business goals.",
    introText2:
      "Posting regularly alone doesn't guarantee results. Businesses need content built around audience interests, platform behavior, brand positioning, and conversion opportunities. ENH Consulting takes a strategic approach to social media marketing in Dubai, combining audience research, content planning, creative execution, and performance tracking. With a data-driven strategy, businesses can turn social media into a consistent growth channel and improve ROI over time.",
    enquireText: "Get a Free Consultation",

    // Why partner with ENH
    partnerTitle: "Partner with a Results-Driven Social Media Marketing Company in Dubai",
    partnerText1:
      "Running social media well takes more time and range of skills than most internal teams have available - strategy, content creation, design, copywriting, community management, and paid campaigns, all running at once. A professional agency brings that full setup without the hiring curve.",
    partnerText2:
      "Working with ENH Consulting means dedicated specialists per platform, not one person managing five accounts. Creative content gets produced consistently rather than assembled last-minute, and each platform gets handled according to what actually works there - Instagram isn't managed like LinkedIn, and neither is managed like TikTok. Every campaign is reported against real outcomes - qualified leads, website traffic, engagement, conversions, and brand awareness - not follower counts or vanity numbers.",

    // Services we offer
    rdTitle: "Result-Driven Social Media Marketing Services in Dubai",
    rdCards: [
      {
        icon: <FaLightbulb />,
        title: "Social Media Strategy",
        desc: "Before anything gets posted, we map out audience research, competitor analysis, content pillars, and a posting schedule built around what your specific audience responds to. The result is a campaign roadmap that gives every post a purpose, instead of content decided week to week with no direction behind it.",
      },
      {
        icon: <FaCalendarAlt />,
        title: "Social Media Management",
        desc: "Day-to-day account management - publishing, scheduling, profile optimization, and responding to engagement - keeps your presence active and consistent without eating into your team's time. We handle the operational side so your brand voice stays steady across every post, comment, and update.",
      },
      {
        icon: <FaPaintBrush />,
        title: "Content Creation & Creative Design",
        desc: "Graphics, carousel posts, reels planning, and copywriting built around your brand rather than generic templates. We work from a content calendar so creativity doesn't get produced in a scramble, and storytelling ties each post back to what your business actually wants people to remember.",
      },
      {
        icon: <FaFacebook />,
        title: "Facebook Marketing",
        desc: "Organic growth and business page optimization keep your Facebook presence credible, while audience engagement and lead generation campaigns turn that presence into actual pipeline. Community building on Facebook still matters for a lot of Dubai audiences, particularly for local and repeat-customer businesses.",
      },
      {
        icon: <FaInstagram />,
        title: "Instagram Marketing",
        desc: "Reels, stories, and carousel posts built around what's actually performing on the platform right now, not what worked a year ago. Profile optimization and, where relevant, influencer collaborations extend reach beyond your existing followers and keep engagement genuinely active rather than passive.",
      },
      {
        icon: <FaLinkedin />,
        title: "LinkedIn Marketing",
        desc: "For B2B brands, LinkedIn is where executive positioning and employer branding do real work. We build content and lead generation campaigns aimed at decision makers, using professional networking and thought leadership to build credibility that a sales pitch alone can't.",
      },
      {
        icon: <FaBullhorn />,
        title: "Social Media Advertising (Meta Ads)",
        desc: "Paid Facebook and Instagram campaigns built for lead generation and conversions, not just reach. Remarketing brings back people who've already engaged, and every campaign gets optimized against ROI, so ad spend keeps working harder rather than plateauing after the first few weeks.",
      },
      {
        icon: <FaComments />,
        title: "Community Management",
        desc: "Comments, direct messages, and day-to-day customer engagement get handled promptly and on-brand, which matters more than most businesses realize - an ignored comment or slow reply damages trust quietly. This also covers reputation management, keeping relationships with your audience active and positive.",
      },
      {
        icon: <FaChartLine />,
        title: "Social Media Analytics & Reporting",
        desc: "We track engagement, reach, follower growth, and conversions against your actual goals, not just platform-native metrics that look impressive but don't mean much. That data feeds back into strategy continuously, so campaigns keep improving instead of running the same playbook indefinitely.",
      },
    ],

    // Industries we serve
    whyUs: [
      {
        icon: <FaHeartbeat />,
        title: "Healthcare",
        desc: "Building patient trust through credible, consistent content that supports longer research-driven decisions.",
      },
      {
        icon: <FaGraduationCap />,
        title: "Education",
        desc: "Reaching prospective students and parents with content aligned to enrollment cycles and academic milestones.",
      },
      {
        icon: <FaBuilding />,
        title: "Real Estate",
        desc: "Showcasing listings and market expertise to attract serious buyer and investor engagement.",
      },
      {
        icon: <FaHotel />,
        title: "Hospitality",
        desc: "Driving bookings and visibility through visual content tied to seasonal demand and experience.",
      },
      {
        icon: <FaShoppingCart />,
        title: "Ecommerce & Retail",
        desc: "Turning product content and engagement directly into traffic and online sales.",
      },
      {
        icon: <FaIndustry />,
        title: "Manufacturing & B2B",
        desc: "Building credibility and reach with decision makers across longer, relationship-driven sales cycles.",
      },
    ],

    // Our process
    testimonials: [
      {
        step: "Step 1 — Discovery & Brand Analysis",
        text: "We review your current presence, brand voice, and goals to understand where the real opportunity sits.",
      },
      {
        step: "Step 2 — Audience Research",
        text: "We identify who your audience actually is and how they behave on each relevant platform.",
      },
      {
        step: "Step 3 — Strategy Development",
        text: "Findings shape a content and platform strategy built around your specific business goals.",
      },
      {
        step: "Step 4 — Content Planning & Creative Production",
        text: "Content calendars and creative assets get built ahead of schedule, not last-minute.",
      },
      {
        step: "Step 5 — Campaign Launch & Community Management",
        text: "Content goes live and engagement gets managed actively across every platform.",
      },
      {
        step: "Step 6 — Performance Monitoring & Optimization",
        text: "Results get tracked continuously, with strategy adjusted based on what's actually working.",
      },
    ],

    // Expected results
    whyEnh: [
      {
        num: "01",
        icon: <FaBullseye />,
        title: "Increased Brand Awareness",
        desc: "More people recognizing and remembering your business across platforms.",
      },
      {
        num: "02",
        icon: <FaComments />,
        title: "Higher Audience Engagement",
        desc: "Real interaction, not just passive impressions or scroll-past views.",
      },
      {
        num: "03",
        icon: <FaHandshake />,
        title: "Better Lead Generation",
        desc: "Social activity that actually feeds your sales pipeline.",
      },
      {
        num: "04",
        icon: <FaGlobe />,
        title: "More Website Traffic",
        desc: "Social platforms driving visitors who are already primed to engage.",
      },
      {
        num: "05",
        icon: <FaShieldAlt />,
        title: "Stronger Customer Relationships",
        desc: "Consistent, responsive presence that builds ongoing trust.",
      },
      {
        num: "06",
        icon: <FaRocket />,
        title: "Higher Conversion Opportunities",
        desc: "Engaged audiences that convert more readily than cold traffic.",
      },
    ],

    // FAQs
    faqs: [
      {
        q: "What social media platforms do you manage?",
        a: "We manage Facebook, Instagram, LinkedIn and paid campaigns through Meta Ads. Which platforms make sense for your business depends on where your audience actually spends time, which we assess during discovery rather than managing every platform by default regardless of fit.",
        img: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80",
        imgLabel: "Platforms we manage",
      },
      {
        q: "Which platform is best for my business?",
        a: "It depends on your industry and audience. B2B businesses often see the strongest results on LinkedIn, while consumer brands tend to perform better on Instagram. We recommend platforms based on where your specific customers are active, not a one-size-fits-all approach applied to every client.",
        img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80",
        imgLabel: "Choosing the right platform",
      },
      {
        q: "How long does social media marketing take to show results?",
        a: "Engagement and brand awareness improvements often show within four to eight weeks of consistent activity. Lead generation and measurable business impact typically build over three to six months, as content, audience trust, and platform algorithms respond to sustained, strategic activity rather than short bursts.",
        img: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=800&q=80",
        imgLabel: "Timelines for results",
      },
      {
        q: "Do you provide paid social media advertising?",
        a: "Yes, we manage paid campaigns primarily through Meta Ads Manager, covering Facebook and Instagram, focused on lead generation, conversions, and remarketing. Paid and organic strategy are built together, so advertising extends the reach of content that's already resonating rather than running in isolation.",
        img: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80",
        imgLabel: "Paid and organic together",
      },
      {
        q: "Do you create content and creatives?",
        a: "Yes, content creation is core to what we do - graphics, carousel posts, reels planning, and copywriting are all produced in-house, built around your brand rather than generic templates. Every asset is planned ahead through a content calendar, not created last-minute before a posting deadline.",
        img: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80",
        imgLabel: "In-house content creation",
      },
      {
        q: "How do you measure campaign success?",
        a: "We track engagement, reach, follower growth, website traffic, and conversions against your specific goals, not platform-native vanity metrics alone. Reporting ties activity back to real business outcomes, so it's always clear whether social media is actually contributing to growth, not just visibility.",
        img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80",
        imgLabel: "Metrics that matter",
      },
      {
        q: "Can social media generate leads?",
        a: "Yes, when it's approached strategically rather than just for visibility. Combining organic content with targeted paid campaigns and clear calls to action turns engaged followers into real inquiries, particularly on platforms like LinkedIn and Instagram where audience intent tends to be higher.",
        img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80",
        imgLabel: "From engagement to leads",
      },
      {
        q: "How often will you post on my accounts?",
        a: "Posting frequency depends on your platforms, industry, and goals, and gets set during strategy development rather than applied as a fixed number across every client. What matters more than frequency is consistency and relevance - irregular posting or generic content rarely performs, regardless of volume.",
        img: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=800&q=80",
        imgLabel: "Posting frequency",
      },
      {
        q: "Why should I hire a social media marketing company in Dubai?",
        a: "An agency brings dedicated strategy, creative, platform, and paid advertising expertise that's difficult to replicate with a single in-house hire. It also means execution stays consistent even as priorities shift internally, with local Dubai and UAE market insight built into every decision from day one.",
        img: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80",
        imgLabel: "Why hire an agency",
      },
    ],

    // Let's Talk Growth CTA banner
    growthTitle: "Let's Build a Stronger Social Media Presence",
    growthText:
      "Inconsistent posting and flat engagement usually come down to missing strategy, not a lack of effort. Talk to ENH Consulting about your social media goals, and we'll map out where your brand actually has room to grow across the platforms your audience uses most.",
    growthNote:
      "Discover how a strategic social media approach can turn followers into qualified leads.",
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
                Social media that actually grows a business combines
                strategy, creative execution, audience engagement,
                advertising, and ongoing optimization. Skip any one of those
                and the rest tends to underperform. Here's how we structure
                that work across each platform and discipline.
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
              <Col lg={4} md={6} key={i}>
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
        "Startups need to build brand recognition and community quickly, often with a limited budget and no existing following to work from. We prioritize consistent content and organic engagement first, layering in targeted paid campaigns once there's a foundation worth building on, so early spend goes toward traction that compounds rather than one-off visibility.",
      number: "01",
    },
    {
      icon: <FaBriefcase />,
      title: "Small & Medium Businesses",
      description:
        "Growing businesses need social media that scales as the brand does, without needing a full strategy rebuild every time reach or ambitions increase. We expand content output and platform coverage gradually, keeping quality consistent as your following and campaign complexity grow, so results improve steadily rather than plateauing.",
      number: "02",
    },
    {
      icon: <FaGlobe />,
      title: "Enterprises",
      description:
        "Larger organizations often need multi-platform, multi-market social media managed under one coherent brand voice, sometimes across several business units or regions at once. We bring structured governance and reporting to that complexity, keeping every account aligned with the same standards while still allowing platform-specific execution where it matters.",
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
                Social Media Solutions for Businesses of Every Size
              </span>
            </h2>
          </motion.div>
          <motion.p className="services-subtitle mt-4" variants={fadeUp}>
            Every business has different goals, audiences, and resources, so
            a strategy built for a startup rarely fits an enterprise, and the
            reverse is just as true. Here's how we tailor our approach for
            each.
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
      title: "ROI-Focused Social Media Strategies",
      description:
        "Every platform and campaign gets measured against real business outcomes, not follower counts or engagement numbers that don't translate into growth.",
    },
    {
      title: "Creative Content That Builds Engagement",
      description:
        "Content is built around what your specific audience responds to, not generic templates recycled across every client account we manage.",
    },
    {
      title: "Platform-Specific Marketing Specialists",
      description:
        "Each platform gets handled by someone who understands how it actually works, instead of one person managing every account the same way.",
    },
    {
      title: "Data-Driven Campaign Optimization",
      description:
        "Strategy adjusts continuously based on real performance data, keeping content and ad spend focused on what's genuinely working.",
    },
    {
      title: "Transparent Reporting",
      description:
        "You see exactly what's driving engagement, traffic, and leads, with reporting tied to outcomes rather than vague monthly summaries.",
    },
    {
      title: "Deep Understanding of Dubai & UAE Markets",
      description:
        "Local audience behavior and platform trends shape every strategy, giving your business an edge generic, market-agnostic approaches can't match.",
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
                Why Businesses Choose ENH Consulting for Social Media
                Marketing
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
            Industries We Help Grow Through Social Media Marketing
          </motion.h2>
          <motion.p className="mt-3 text-white" variants={fadeUp}>
            Every industry engages differently on social media, so strategy
            has to reflect how that specific audience actually behaves
            online.
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
              Our Social Media Marketing Process
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
            A clear, repeatable process is what turns posting into a growth
            channel. Here's exactly how we take a brand from discovery to
            measurable results.
          </p>
        </motion.div>

        <Row className="g-4 mt-2">
          {data.testimonials.map((t, i) => (
            <Col lg={12} md={6} key={i}>
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
              Insights to Help You Grow on Social
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
            What Results Can You Expect from Our Social Media Marketing
            Services?
          </motion.h2>
          <motion.p className="svp-why-enh__lead" variants={fadeUp}>
            Every strategy we build is focused on outcomes that matter to
            your business, not follower counts. Here's what businesses
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
                Frequently Asked Questions About Social Media Marketing in
                Dubai
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
                Everything you need to know before partnering with a social
                media marketing company in Dubai.
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
                Get in touch today to start building a stronger, more
                engaged social media presence with expert guidance.
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
                      <option value="social-strategy">
                        Social Media Strategy
                      </option>
                      <option value="social-management">
                        Social Media Management
                      </option>
                      <option value="content-creation">
                        Content Creation & Creative Design
                      </option>
                      <option value="facebook-marketing">
                        Facebook Marketing
                      </option>
                      <option value="instagram-marketing">
                        Instagram Marketing
                      </option>
                      <option value="linkedin-marketing">
                        LinkedIn Marketing
                      </option>
                      <option value="meta-ads">
                        Social Media Advertising (Meta Ads)
                      </option>
                      <option value="community-management">
                        Community Management
                      </option>
                      <option value="social-analytics">
                        Social Media Analytics & Reporting
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
            Ready to Grow with the Best Social Media Marketing Company in
            Dubai?
          </motion.h2>

          <motion.p className="svp-final-cta__text" variants={fadeUp}>
            Stronger brand awareness, real engagement, and qualified leads
            start with a strategy built around your audience, not a generic
            posting calendar. Let's talk about your social media goals and
            build an approach across Instagram, LinkedIn, Facebook, and
            beyond that drives customer loyalty and long-term business
            growth, not just impressions.
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
export default function SMMCompanyDubai() {
  const { slug } = useParams();
  const data = SMM_DATA[slug] || SMM_DATA["default"];

  return (
    <div className="service-view-page">
      <Helmet>
        <title>Best Social Media Marketing Company in Dubai | ENH Consulting</title>
        <meta
          name="description"
          content="Boost your brand with a trusted Social Media Marketing Company in Dubai. ENH Consulting increases engagement, visibility, and leads with proven strategies."
        />
        <link
          rel="canonical"
          href={`https://enh.consulting/social-media-marketing-company-in-dubai`}
        />

        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="ENH Consulting" />
        <meta property="og:locale" content="en_US" />

        <meta
          property="og:title"
          content="Best Social Media Marketing Company in Dubai | ENH Consulting"
        />
        <meta
          property="og:description"
          content="Boost your brand with a trusted Social Media Marketing Company in Dubai. ENH Consulting increases engagement, visibility, and leads with proven strategies."
        />

        <meta
          property="og:url"
          content="https://enh.consulting/social-media-marketing-company-in-dubai"
        />
        <meta
          property="og:image"
          content="https://enh.consulting/assets/service-hero-banner-BWwONeQz.webp"
        />
        <meta property="og:image:width" content="1935" />
        <meta property="og:image:height" content="813" />
        <meta
          property="og:image:alt"
          content="Best Social Media Marketing Company in Dubai | ENH Consulting"
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Best Social Media Marketing Company in Dubai | ENH Consulting"
        />
        <meta
          name="twitter:description"
          content="Boost your brand with a trusted Social Media Marketing Company in Dubai. ENH Consulting increases engagement, visibility, and leads with proven strategies."
        />

        <meta
          name="twitter:image"
          content="https://enh.consulting/assets/service-hero-banner-BWwONeQz.webp"
        />
        <script type="application/ld+json">{JSON.stringify(smmFaqSchema)}</script>
        <script type="application/ld+json">
          {JSON.stringify(smmServiceSchema)}
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
