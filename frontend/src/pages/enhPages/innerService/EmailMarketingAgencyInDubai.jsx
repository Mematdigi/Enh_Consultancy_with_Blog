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
  FaCalendarAlt,
  FaPaintBrush,
  FaSyncAlt,
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
const emailFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is email marketing and how can it help my business?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Email marketing is direct, permission-based communication with people who've already shown interest in your business. Used well, it nurtures leads, retains customers, and encourages repeat purchases - often at a lower cost than continuously acquiring new customers.",
      },
    },
    {
      "@type": "Question",
      name: "Why should I hire an email marketing agency in Dubai?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "An agency brings strategy, segmentation, automation, and design expertise that's difficult to maintain consistently in-house, along with the ongoing testing and analytics needed to keep improving results rather than campaigns depending on spare internal time.",
      },
    },
    {
      "@type": "Question",
      name: "What email marketing services do you provide?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We provide strategy and campaign management, design and copywriting, automation and personalization, e-commerce email marketing, deliverability and list management, and analytics, testing, and optimization - managed as one connected program.",
      },
    },
    {
      "@type": "Question",
      name: "Can you create automated email campaigns?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. We build welcome sequences, abandoned cart flows, post-purchase follow-ups, and re-engagement campaigns, so your business keeps nurturing leads and customers without manual sending.",
      },
    },
    {
      "@type": "Question",
      name: "Can you help segment and personalize email campaigns?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. We segment audiences by behavior, purchase history, engagement level, funnel stage, location, and interests, so campaigns reflect who's actually receiving them instead of treating the whole list the same way.",
      },
    },
    {
      "@type": "Question",
      name: "Which email marketing platforms do you work with?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We work with platforms including Mailchimp, HubSpot, Brevo, Salesforce Marketing Cloud, Zoho, and Klaviyo, chosen based on your existing systems and specific automation needs.",
      },
    },
    {
      "@type": "Question",
      name: "How do you measure email marketing performance?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We track click-through rate, conversions, revenue attribution, and campaign performance rather than relying on open rate alone, so reporting reflects actual business impact, not just activity.",
      },
    },
    {
      "@type": "Question",
      name: "How long does it take to see results from email marketing?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Engagement improvements from better segmentation and design can appear within the first few campaigns. Stronger, compounding results - retention, repeat purchases, automation performance - typically build over a couple of months as workflows mature.",
      },
    },
    {
      "@type": "Question",
      name: "How much do email marketing services cost in Dubai?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Cost depends on factors like database size, campaign frequency, automation complexity, platform requirements, and the number of campaigns involved, so pricing varies by scope rather than following a fixed rate. Get in touch with ENH Consulting for a quote based on your specific goals and current setup.",
      },
    },
  ],
};

// ─── JSON-LD: Service schema ──────────────────────────────────────────────────
const emailServiceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://enh.consulting/email-marketing-agency-in-dubai#service",
  name: "Email Marketing Services in Dubai",
  serviceType: "Email Marketing",
  url: "https://enh.consulting/email-marketing-agency-in-dubai",
  description:
    "ENH Consulting provides email marketing services in Dubai to help businesses generate qualified leads, improve customer engagement, increase conversions, strengthen customer retention, and drive repeat purchases through strategic campaigns, email design, automation, personalization, e-commerce email marketing, deliverability management, analytics, testing, and optimization.",
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
    name: "Email Marketing Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Email Marketing Strategy and Campaign Management",
        },
      },
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "Email Design and Copywriting" },
      },
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "Email Automation and Personalization" },
      },
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "E-commerce Email Marketing" },
      },
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "Email Deliverability and List Management" },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Email Analytics, A/B Testing and Optimization",
        },
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
const EMAIL_DATA = {
  default: {
    badge: "Email Marketing Agency",
    headline: "Email Marketing Agency in Dubai for Customer Engagement & Business Growth",
    tagline:
      "Most Dubai businesses already have something valuable sitting in their email databases: subscribers, leads, and past customers who've shown interest before. An email marketing agency in Dubai puts that existing database to work, nurturing leads that aren't ready to buy yet, encouraging repeat purchases, and keeping communication personalized and automated instead of manual and inconsistent. Rather than always paying to reach someone new, it's a channel built around the people who already know your business.",
    cta: "Get a Free Consultation",
    heroImg: secondSection,
    heroImgTwo: thirdSection,

    // Business challenges / intro
    introTitle: "Is Your Business Struggling to Generate Results from Email Marketing?",
    introText:
      "Many Dubai businesses send emails regularly but still struggle with low open rates, weak click-throughs, poor deliverability, and limited conversions. These challenges often arise when email marketing in Dubai lacks proper segmentation, automation, personalization, and a consistent strategy.",
    introText2:
      "Sending the same message to every subscriber rarely produces strong results. Effective email marketing requires understanding where customers are in their journey, delivering relevant content, and using automated workflows to nurture prospects and encourage action. ENH Consulting takes a strategic approach to email marketing, combining audience segmentation, personalized campaigns, automation, and performance tracking to help Dubai businesses improve engagement, generate qualified leads, increase conversions, and build stronger customer relationships.",
    enquireText: "Get a Free Consultation",

    // Why partner with ENH
    partnerTitle: "Partner with a Results-Driven Email Marketing Agency in Dubai",
    partnerText1:
      "Email marketing looks simple from the outside, but performing well requires strategy, segmentation, personalization, automation, copywriting, design, testing, analytics, and deliverability management working together, not a newsletter sent whenever there's time. Most in-house teams can manage a piece of that consistently, rarely all of it.",
    partnerText2:
      "As an email marketing agency in Dubai, ENH Consulting builds that as one connected system. We start with your business goals and customer journey, then build automated workflows and personalized campaigns designed around how your specific audience actually behaves, not a generic template. Every campaign is built to convert and measured against real outcomes, so you always know what's working and why. If your email marketing has been ad hoc, this is the shift: from occasional sends to a structured system focused on revenue.",

    // Services we offer
    rdTitle: "Email Marketing Services in Dubai",
    rdCards: [
      {
        icon: <FaCalendarAlt />,
        title: "Email Marketing Strategy & Campaign Management",
        desc: "We start with your business goals, audience research, and customer journey, then build a campaign calendar that separates newsletters, promotional campaigns, seasonal sends, and lead-nurturing sequences so nothing competes for attention in the same week. As your email marketing agency, we handle the scheduling and execution behind that plan too, so campaigns go out consistently rather than whenever there's spare time.",
      },
      {
        icon: <FaPaintBrush />,
        title: "Email Design & Copywriting",
        desc: "Responsive email design that holds up across inboxes and screen sizes, paired with subject lines, preheader text, and body copy built to be read and acted on. CTAs, visual hierarchy, and brand consistency are treated as conversion tools, not finishing touches, since most email opens happen on mobile first, so every layout is built mobile-first rather than adapted afterward.",
      },
      {
        icon: <FaSyncAlt />,
        title: "Email Automation & Personalization",
        desc: "Welcome sequences, lead nurturing, abandoned cart reminders, post-purchase follow-ups, and re-engagement campaigns, built around where each subscriber actually sits in the customer lifecycle. Segmentation behind these workflows is based on behavior, purchase history, location, interests, and funnel stage, so messaging reflects who's receiving it rather than treating the whole list the same way.",
      },
      {
        icon: <FaShoppingCart />,
        title: "E-commerce Email Marketing",
        desc: "Abandoned cart recovery, personalized product recommendations, new product launch campaigns, and cross-sell and upsell sequences, layered alongside post-purchase emails built to bring customers back. For online stores, this is one of the more direct ways email marketing contributes to revenue, turning existing customers into repeat purchases and stronger retention.",
      },
      {
        icon: <FaShieldAlt />,
        title: "Email Deliverability & List Management",
        desc: "List hygiene, bounce management, unsubscribe handling, and spam prevention, alongside sender reputation fundamentals like SPF, DKIM, and DMARC, with consent management built in from the start. We can't promise guaranteed inbox placement, but every factor within our control is actively managed to support strong deliverability and keep a list clean and useful over time.",
      },
      {
        icon: <FaChartLine />,
        title: "Email Analytics, A/B Testing & Optimization",
        desc: "Ongoing testing across subject lines, CTAs, content, layouts, and send times, with results tracked against click-through rate, conversions, revenue, and campaign attribution, open rate is one input, not the main measure of success. Testing and reporting run continuously, so each campaign feeds directly into how the next one is built.",
      },
    ],

    // Industries we serve
    whyUs: [
      {
        icon: <FaShoppingCart />,
        title: "E-commerce & Retail",
        desc: "Abandoned cart recovery, product recommendations, and promotions that turn browsers into repeat buyers.",
      },
      {
        icon: <FaBuilding />,
        title: "Real Estate",
        desc: "Property launch updates and lead nurturing that keep buyers and investors engaged through long decision cycles.",
      },
      {
        icon: <FaHeartbeat />,
        title: "Healthcare",
        desc: "Appointment reminders and educational newsletters that keep patients engaged between visits.",
      },
      {
        icon: <FaGraduationCap />,
        title: "Education",
        desc: "Enrollment nurturing and event communication aligned to admissions and academic calendars.",
      },
      {
        icon: <FaHotel />,
        title: "Hospitality",
        desc: "Booking confirmations and loyalty campaigns that encourage direct, repeat bookings.",
      },
      {
        icon: <FaWallet />,
        title: "Financial Services",
        desc: "Compliant, trust-building communication that nurtures leads through longer decision-making.",
      },
      {
        icon: <FaLaptopCode />,
        title: "SaaS & Technology",
        desc: "Onboarding sequences and churn-reduction campaigns aimed at existing users.",
      },
      {
        icon: <FaHandshake />,
        title: "Professional Services",
        desc: "Relationship-building newsletters that shorten the trust-building stage of a sale.",
      },
    ],

    // Our process
    testimonials: [
      {
        step: "Step 1 — Discovery & Goal Setting",
        text: "We define what success looks like for your business, so every later step is built toward a specific outcome.",
      },
      {
        step: "Step 2 — Audience & Database Analysis",
        text: "We review your existing list and engagement history, so you know exactly what you're starting from.",
      },
      {
        step: "Step 3 — Strategy & Campaign Planning",
        text: "We build a campaign calendar tied to your goals, so activity has a clear purpose behind it.",
      },
      {
        step: "Step 4 — Segmentation & Personalization",
        text: "We split your audience into meaningful segments, so messaging matches who's actually receiving it.",
      },
      {
        step: "Step 5 — Email Design & Content Creation",
        text: "We design and write every campaign, so each send is built to convert, not just inform.",
      },
      {
        step: "Step 6 — Automation, Testing & Campaign Launch",
        text: "We build workflows and test key variables before launch, so nothing goes live on a guess.",
      },
      {
        step: "Step 7 — Performance Analysis & Optimization",
        text: "We track results and refine ongoing campaigns, so performance keeps improving over time.",
      },
    ],

    // Expected results
    whyEnh: [
      {
        num: "01",
        icon: <FaBullseye />,
        title: "Higher Customer Engagement",
        desc: "Relevant, segmented messaging is designed to earn more attention than a generic send to your entire list.",
      },
      {
        num: "02",
        icon: <FaHandshake />,
        title: "Better Lead Nurturing",
        desc: "Automated sequences are built to keep prospects moving toward a decision without manual follow-up.",
      },
      {
        num: "03",
        icon: <FaRocket />,
        title: "More Conversions",
        desc: "Personalized, well-timed campaigns are optimized to turn engagement into actual enquiries and sales.",
      },
      {
        num: "04",
        icon: <FaShieldAlt />,
        title: "Higher Customer Retention",
        desc: "Consistent, relevant communication helps keep your business front of mind well after the first purchase.",
      },
      {
        num: "05",
        icon: <FaShoppingCart />,
        title: "More Repeat Purchases",
        desc: "Post-purchase and recommendation campaigns are built to encourage customers to return and buy again.",
      },
      {
        num: "06",
        icon: <FaWallet />,
        title: "Better Marketing ROI",
        desc: "Focusing effort on your existing database helps generate more value from contacts you've already earned.",
      },
    ],

    // FAQs
    faqs: [
      {
        q: "What is email marketing and how can it help my business?",
        a: "Email marketing is direct, permission-based communication with people who've already shown interest in your business. Used well, it nurtures leads, retains customers, and encourages repeat purchases, often at a lower cost than continuously acquiring new customers.",
        img: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80",
        imgLabel: "What email marketing does",
      },
      {
        q: "Why should I hire an email marketing agency in Dubai?",
        a: "An agency brings strategy, segmentation, automation, and design expertise that's difficult to maintain consistently in-house, along with the ongoing testing and analytics needed to keep improving results rather than campaigns depending on spare internal time.",
        img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80",
        imgLabel: "Why hire an agency",
      },
      {
        q: "What email marketing services do you provide?",
        a: "We provide strategy and campaign management, design and copywriting, automation and personalization, e-commerce email marketing, deliverability and list management, and analytics, testing, and optimization, managed as one connected program.",
        img: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=800&q=80",
        imgLabel: "One connected program",
      },
      {
        q: "Can you create automated email campaigns?",
        a: "Yes. We build welcome sequences, abandoned cart flows, post-purchase follow-ups, and re-engagement campaigns, so your business keeps nurturing leads and customers without manual sending.",
        img: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80",
        imgLabel: "Automation that keeps working",
      },
      {
        q: "Can you help segment and personalize email campaigns?",
        a: "Yes. We segment audiences by behavior, purchase history, engagement level, funnel stage, location, and interests, so campaigns reflect who's actually receiving them instead of treating the whole list the same way.",
        img: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80",
        imgLabel: "Segmentation that matters",
      },
      {
        q: "Which email marketing platforms do you work with?",
        a: "We work with platforms including Mailchimp, HubSpot, Brevo, Salesforce Marketing Cloud, Zoho, and Klaviyo, chosen based on your existing systems and specific automation needs.",
        img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80",
        imgLabel: "Platforms we work with",
      },
      {
        q: "How do you measure email marketing performance?",
        a: "We track click-through rate, conversions, revenue attribution, and campaign performance rather than relying on open rate alone, so reporting reflects actual business impact, not just activity.",
        img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80",
        imgLabel: "Metrics that matter",
      },
      {
        q: "How long does it take to see results from email marketing?",
        a: "Engagement improvements from better segmentation and design can appear within the first few campaigns. Stronger, compounding results, retention, repeat purchases, automation performance, typically build over a couple of months as workflows mature.",
        img: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=800&q=80",
        imgLabel: "Timelines for results",
      },
      {
        q: "How much do email marketing services cost in Dubai?",
        a: "Cost depends on factors like database size, campaign frequency, automation complexity, platform requirements, and the number of campaigns involved, so pricing varies by scope rather than following a fixed rate.",
        img: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80",
        imgLabel: "Pricing built around scope",
      },
    ],

    // Let's Talk Growth CTA banner
    growthTitle: "Let's Build an Email Strategy That Drives Business Growth",
    growthText:
      "Your existing subscriber and customer database already holds real potential for lead nurturing, retention, and repeat purchases, the question is whether it's being used strategically. ENH Consulting can build the automation and campaigns needed to turn that database into a measurable growth channel.",
    growthNote: "Talk to ENH Consulting about your email marketing strategy.",
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
                ENH Consulting provides a complete email marketing system
                covering strategy, campaign management, design, automation,
                personalization, e-commerce email, deliverability, and
                ongoing optimization. Rather than offering these as
                disconnected add-ons, we build them into one program designed
                around your business and audience.
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
        "Early-stage businesses usually need to generate engagement without a large marketing team or budget behind it. We focus on lead nurturing with limited resources, setting up automated communication that keeps working in the background, and building customer relationships from a smaller list without requiring constant manual input to maintain them.",
      number: "01",
    },
    {
      icon: <FaBriefcase />,
      title: "Small & Medium Businesses",
      description:
        "Growing businesses typically need email that supports customer retention and repeat purchases as reliably as it supports promotions. We focus on consistent campaigns that don't depend on spare time, database growth alongside your customer base, and scalable automation that keeps working as your list grows larger and more complex.",
      number: "02",
    },
    {
      icon: <FaGlobe />,
      title: "Enterprises",
      description:
        "Larger organizations are often managing large databases, multiple customer segments, and an existing CRM that email needs to work alongside. We handle CRM integration, advanced segmentation across those different audiences, and the reporting structure needed to keep campaigns consistent and accountable across teams and stakeholders.",
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
                Email Marketing Solutions for Businesses in Dubai & UAE
              </span>
            </h2>
          </motion.div>
          <motion.p className="services-subtitle mt-4" variants={fadeUp}>
            Email marketing priorities shift with business size, database
            size, and growth stage. Here's how we tailor our approach for
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
      title: "Strategy-First Email Marketing",
      description:
        "Every campaign starts with a plan tied to your business goals, so activity is aimed at leads and revenue rather than filling a content calendar.",
    },
    {
      title: "Personalized Campaigns",
      description:
        "We segment audiences by behavior, purchase history, and funnel stage, so your customers receive relevant messages instead of generic campaigns that are easy to ignore.",
    },
    {
      title: "Automation & Lifecycle Marketing",
      description:
        "Welcome flows, abandoned cart sequences, and re-engagement campaigns run continuously in the background, so leads and customers keep getting nurtured without manual effort.",
    },
    {
      title: "Conversion-Focused Copy & Design",
      description:
        "Every email is written and designed around a specific action, so campaigns are built to move recipients toward a click or a purchase, not just an open.",
    },
    {
      title: "Data-Driven Optimization",
      description:
        "Campaigns are refined using real performance data, so decisions are based on what's actually working for your audience, not general assumptions.",
    },
    {
      title: "Understanding of Dubai & UAE Audiences",
      description:
        "Strategies account for the mix of local, international, B2B, and B2C audiences common across Dubai businesses, so messaging is built for who you actually serve.",
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
                Why Businesses Choose ENH Consulting for Email Marketing
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
            Industries We Serve with Email Marketing
          </motion.h2>
          <motion.p className="mt-3 text-white" variants={fadeUp}>
            Every industry uses email differently, so campaigns and
            automation have to reflect how that specific audience actually
            moves through their decision cycle.
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
              Our Email Marketing Process
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
            A clear, repeatable process is what turns a database into a
            revenue channel. Here's exactly how we take email marketing from
            discovery to measurable results.
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
              Insights to Help You Grow with Email
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
            What Results Can You Expect from Email Marketing?
          </motion.h2>
          <motion.p className="svp-why-enh__lead" variants={fadeUp}>
            Every campaign we build is focused on outcomes that matter to
            your business, not open rates alone. Here's what businesses
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
                Frequently Asked Questions About Email Marketing in Dubai
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
                Everything you need to know before partnering with an email
                marketing agency in Dubai.
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
                Get in touch today to start turning your existing database
                into a measurable growth channel with expert email marketing.
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
                      <option value="email-strategy">
                        Email Marketing Strategy & Campaign Management
                      </option>
                      <option value="email-design">
                        Email Design & Copywriting
                      </option>
                      <option value="email-automation">
                        Email Automation & Personalization
                      </option>
                      <option value="ecommerce-email">
                        E-commerce Email Marketing
                      </option>
                      <option value="email-deliverability">
                        Email Deliverability & List Management
                      </option>
                      <option value="email-analytics">
                        Email Analytics, A/B Testing & Optimization
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
            Ready to Grow with an Email Marketing Agency in Dubai?
          </motion.h2>

          <motion.p className="svp-final-cta__text" variants={fadeUp}>
            Whether you need automated lead nurturing, e-commerce email
            campaigns, stronger customer retention, or a complete email
            marketing strategy, ENH Consulting helps Dubai businesses turn
            their existing audience into measurable revenue opportunities.
            Get in touch to discuss your email marketing goals.
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
export default function EmailMarketingDubai() {
  const { slug } = useParams();
  const data = EMAIL_DATA[slug] || EMAIL_DATA["default"];

  return (
    <div className="service-view-page">
      <Helmet>
        <title>Email Marketing Agency in Dubai | ENH Consulting</title>
        <meta
          name="description"
          content="Email marketing in Dubai that generates more leads, increases sales, and builds lasting customer relationships. Partner with ENH Consulting - Get started today!"
        />
        <link
          rel="canonical"
          href={`https://enh.consulting/email-marketing-agency-in-dubai`}
        />

        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="ENH Consulting" />
        <meta property="og:locale" content="en_US" />

        <meta
          property="og:title"
          content="Email Marketing Agency in Dubai | ENH Consulting"
        />
        <meta
          property="og:description"
          content="Email marketing in Dubai that generates more leads, increases sales, and builds lasting customer relationships. Partner with ENH Consulting - Get started today!"
        />

        <meta
          property="og:url"
          content="https://enh.consulting/email-marketing-agency-in-dubai"
        />
        <meta
          property="og:image"
          content="https://enh.consulting/assets/service-hero-banner-BWwONeQz.webp"
        />
        <meta property="og:image:width" content="1935" />
        <meta property="og:image:height" content="813" />
        <meta
          property="og:image:alt"
          content="Email Marketing Agency in Dubai | ENH Consulting"
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Email Marketing Agency in Dubai | ENH Consulting"
        />
        <meta
          name="twitter:description"
          content="Email marketing in Dubai that generates more leads, increases sales, and builds lasting customer relationships. Partner with ENH Consulting - Get started today!"
        />

        <meta
          name="twitter:image"
          content="https://enh.consulting/assets/service-hero-banner-BWwONeQz.webp"
        />
        <script type="application/ld+json">{JSON.stringify(emailFaqSchema)}</script>
        <script type="application/ld+json">
          {JSON.stringify(emailServiceSchema)}
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
