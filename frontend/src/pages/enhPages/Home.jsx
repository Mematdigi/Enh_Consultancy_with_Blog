import { useState, useEffect, useRef } from "react";
import Banner from "../../components/enhComponent/banner";
import { Container, Row, Col, Button } from "react-bootstrap";
import {
  FaArrowRight, FaLightbulb, FaBriefcase, FaGraduationCap,
  FaLaptopCode, FaWallet, FaBullseye, FaPlay, FaQuoteLeft,
  FaUsers, FaCalendarAlt, FaTrophy,
  FaAirFreshener,
} from "react-icons/fa";
import { FiArrowDownRight, FiArrowUpRight} from "react-icons/fi";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import api from "../../utils/api";

// ─── animation helpers ───────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

const fadeLeft = {
  hidden: { opacity: 0, x: -40 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const fadeRight = {
  hidden: { opacity: 0, x: 40 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const staggerFast = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 50, scale: 0.96 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.85 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

// ─── Reusable enquiry hook ───────────────────────────────────────────────────
function useEnquiry() {
  const [status, setStatus] = useState("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const submit = async (payload) => {
    setStatus("loading");
    setErrorMsg("");
    try {
      await api.post("/enquiries", payload);
      setStatus("success");
      setTimeout(() => setStatus("idle"), 4000);
      return true;
    } catch (err) {
      setErrorMsg(err?.response?.data?.message || "Something went wrong. Please try again.");
      setStatus("error");
      return false;
    }
  };

  const reset = () => { setStatus("idle"); setErrorMsg(""); };
  return { status, errorMsg, submit, reset };
}

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

// ─── Marquee / ticker strip ───────────────────────────────────────────────────
function MarqueeTicker() {
  const items = [
    "Ai Consulting", "Business Consulting", "Digital Marketing Consulting",
    "Ed tech Consulting", "IT Consulting", "Startup Consulting",
  ];

  return (
    <div className="marquee-ticker" style={{ borderBottom: "1px solid #fef0d6" }}>
      <div className="marquee-track">
        {[...items, ...items].map((item, i) => (
          <span key={i} className="marquee-item">
            <span className="marquee-dot" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

function MarqueeTicker2() {
  const items = [
    "Ai Consulting", "Business Consulting", "Digital Marketing Consulting",
    "Ed tech Consulting", "IT Consulting", "Startup Consulting",
  ];

  return (
    <div className="marquee-ticker-two">
      <div className="marquee-track-two">
        {[...items, ...items].map((item, i) => (
          <span key={i} className="marquee-item-two">
            <span className="marquee-dot-two" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
// ✅ Services Component
function Services() {
  const serviceList = [
    { icon: <FiArrowDownRight />, title: "AI Consulting", description: "We assist companies in Dubai in creating a straightforward, practical artificial intelligence plan and development road map, locating the appropriate opportunities, choosing the appropriate technology, and ensuring that every artificial intelligence project provides measurable business value from the very first step.", link: "/ai-consulting-services-in-dubai", number: "01" },
    { icon: <FiArrowDownRight />, title: "Business Consulting", description: "Dubai-based results-driven artificial intelligence and business consulting firm ENH helps businesses simplify processes, enhance decision-making, and create scalable systems fit for long-term growth. To provide every client a real competitive advantage in the Dubai and UAE market, our business consulting firm blends in-depth commercial knowledge with AI-powered insights.", link: "/business-consulting-services-in-dubai", number: "02" },
    { icon: <FiArrowDownRight />, title: "Digital Marketing Consulting", description: "Using data, automation, and AI-driven audience insights, our digital marketing consulting firm in Dubai assists companies in developing high-performance digital strategies that produce actual, quantifiable growth. From paid media and SEO to content strategy and conversion optimization, we create digital marketing systems that consistently deliver results and effectively scale across every platform.", link: "/digital-marketing-consulting-services-in-dubai", number: "03" },
    { icon: <FiArrowDownRight />, title: "EdTech Consulting", description: "EdTech Consulting in Dubai by ENH assists educational institutions, training organizations, and companies providing learning technologies in designing, developing, and expanding more sophisticated digital learning experiences supported by artificial intelligence and contemporary technological infrastructure.", link: "/edtech-consulting-services-in-dubai", number: "04" },
    { icon: <FiArrowDownRight />, title: "IT Consulting", description: "As a reputable IT consulting firm in Dubai, ENH assists companies in modernizing their technology infrastructure, enhancing system performance, and matching their IT investments to the strategic objectives that genuinely promote expansion. From system integration and digital transformation planning to cloud migration and cybersecurity concerns, our IT consulting team provides realistic answers that function in the actual world.", link: "/it-consulting-services-in-dubai", number: "05" },
    { icon: <FiArrowDownRight />, title: "Startup Consulting", description: "Our startup consulting business is especially designed for founders who need more than just guidance; they need a hands-on partner who knows the Dubai startup scene, acts swiftly, and assists them in developing the systems, processes, and technical foundations that give early-stage firms the finest possible chance of successfully growing.", link: "/Startup-consulting-services-in-dubai", number: "06" },
  ];

  return (
    <section className="services-section">
      {/* ── Floating particles on top of ballpit ── */}
      <FloatingParticles count={8} color="rgba(235,174,95,0.12)" />
      <FloatingParticles count={10} />

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
            What We Offer
          </motion.div>
          <motion.div className="services-title-row" variants={fadeUp}>
            <h2 className="services-main-title">
              <span className="title-accent" style={{ color: '#8a5520' }} >Explore Our Range of AI & Technology Solutions for Businesses in Dubai</span>
            </h2>
          </motion.div>
          <motion.p className="services-subtitle mt-4" variants={fadeUp}>
            Leading AI solutions company in Dubai, ENH Consulting provides a full range of AI strategy and development as well as technology consulting services meant to change the way that businesses run, compete, and expand throughout the UAE. Every answer we provide is customized, useful, and designed for actual results, not just theory.
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
            <motion.div
              key={index}
              className="service-card-wrap"
              variants={cardVariant}
            >
              <motion.div
                className="service-card"
                whileHover={{ y: -10, transition: { type: "spring", stiffness: 300, damping: 20 } }}
              >
                <span className="card-number">{service.number}</span>
                <div className="card-icon-wrap">
                  <div className="card-icon">{service.icon}</div>
                  <div className="icon-ring" />
                </div>
                <h3 className="card-title">{service.title}</h3>
                <p className="card-desc">{service.description}</p>
                <div className="card-divider" />
                <Link to={service.link} className="card-link">
                  Learn More
                  <span className="link-arrow"><FaArrowRight /></span>
                </Link>
                <div className="card-glow" />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}

// ✅ Tailored Section — with parallax image + animated underline reveal
function TailoredSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <section className="tailored-section" ref={ref}>
      <div className="tailored-mesh" aria-hidden="true" />

      <Container fluid>
        <Row className="align-items-center">
          <Col lg={6} className="text-content">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              variants={staggerContainer}
            >
              <motion.span variants={fadeUp} className="tailored-eyebrow">
                <span className="tailored-eyebrow-dot" />
                Why Choose Us
              </motion.span>
              <motion.h2 variants={fadeUp}>
                <span className="italic-text">Results We Have Delivered for Businesses in Dubai and the UAE</span>
              </motion.h2>
              <motion.div variants={fadeUp} className="underline-animated" />
              <motion.p variants={fadeUp}>
                Numbers tell the story more than any promise, and at ENH Consulting, we let our results speak most powerfully. This is a peek at the real, quantifiable influence we have provided for companies all over the UAE as a trusted artificial intelligence consulting company in Dubai and an AI solutions supplier in Dubai.<br></br>
                EnH is an integrated artificial intelligence and business consulting firm located in Dubai that provides impact across technology, strategy, and marketing at once because the greatest outcomes always come when all three move in concert toward the same objectives.
              </motion.p>
              <motion.div variants={fadeUp}>
                <Button variant="warning" className="learn-more mt-3">Learn more</Button>
              </motion.div>

              <motion.div className="tailored-pills" variants={staggerFast}>
                {["Data-Driven", "Expert Team", "Proven Results", "Always On"].map((pill, i) => (
                  <motion.span key={i} className="tailored-pill" variants={fadeUp}>
                    ✓ {pill}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>
          </Col>

          <Col lg={6} className="image-content">
            <motion.div
              className="image-container"
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.img
                src="./uniques.jpg"
                alt="Results ENH Have Delivered for Businesses in Dubai and the UAE"
                className="img-fluid"
                style={{ y: imgY }}
              />
              {/* <motion.div
                className="play-button"
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.92 }}
              > */}
                {/* <FaPlay />
              </motion.div> */}
              <motion.div
                className="tailored-badge"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.5 }}
                animate={{ y: [0, -6, 0] }}
              >
                <span className="tailored-badge-num">15+</span>
                <span className="tailored-badge-label">Years of Excellence</span>
              </motion.div>
            </motion.div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

// ✅ Showcases — with hover zoom + stagger
function Showcases() {
  const showcaseItems = [
    { title: "Retail & E-Commerce", category: "We assist retail and e-commerce companies all around Dubai in using artificial intelligence to customize customer experiences, maximize inventories, and increase conversion rates dramatically across every medium.", image: "./service1.png" },
    { title: "Healthcare", category: "Our artificial intelligence in UAE healthcare solutions assists clinics, hospitals, and health technology firms in simplifying patient management, enhancing diagnostic assistance, and creating more sophisticated, responsive healthcare systems.", image: "./service2.png" },
    { title: "Real Estate", category: "ENH provides AI for real estate in Dubai that aids firms, developers, and property platforms in automating lead management, improving property recommendations, and accelerating data-driven investment decisions.", image: "./service3.png" },
    { title: "Education & EdTech", category: "For noticeably improved results, we assist educational organizations and learning platforms throughout the UAE in including artificial intelligence into their curriculum delivery, student engagement systems, and operational procedures.", image: "./service4.png" },
    { title: "Finance & Fintech", category: "Our artificial intelligence systems for financial organizations help automate risk analysis, enhance fraud detection, and create clever customer-facing technologies that increase trust and speed development.", image: "./service5.png" },
    { title: "Hospitality & Tourism", category: "For hotels, travel platforms, and hospitality companies in Dubai, we assist them in using AI to customize guest experiences, improve pricing, and create loyalty programs to bring people back.", image: "./service6.png" },
  ];

  return (
    <section className="showcases">
      <Container>
        <motion.div
          className="section-header d-flex justify-content-between align-items-center"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
        >
          <h2 className="section-title">Industries We Serve Across Dubai and the UAE</h2>
          <motion.div variants={fadeRight}>
            <Button variant="warning" className="get-started">Discover more</Button>
          </motion.div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
        >
          <Row>
            {showcaseItems.map((item, index) => (
              <Col lg={4} md={6} key={index} className="mb-4">
                <motion.div
                  className="showcase-card p-3"
                  variants={cardVariant}
                  whileHover={{ y: -12, scale: 1.02, transition: { type: "spring", stiffness: 280, damping: 18 } }}
                >
                  <div className="showcase-img-wrap">
                    <img src={item.image} alt={item.title} className="img-fluid" style={{ height: '50px', width: '50px' }} />
                    {/* <div className="showcase-overlay">
                      <span className="showcase-view-btn">View Project <FiArrowUpRight /></span>
                    </div> */}
                  </div>
                  <div className="showcase-text">
                    <h4>{item.title}</h4>
                    <p className="category mt-2" style={{ color: '#8A5520' }}>{item.category}</p>
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

// ✅ Testimonials Carousel
function Testimonials() {
  const testimonials = [
    { name: "Raman Kant Aggarwal", role: "Doctor", company: "Apollo Hospitals", image: "./testimonial1.jpg", rating: 5, review: "ENH developed a system for us; they not only provided us with a plan. Our artificial intelligence tools are active; our marketing is working; and our staff at last possesses the operational clarity we have been seeking for two years. Best financial decision we have made as a company in Dubai. - CEO, SaaS Startup, Dubai" },
    { name: "Geeta Kadayaprath", role: "Director", company: "The Breast Cancer Clinic", image: "./testimonial2.jpg", rating: 5, review: "ENH stands out because they really get startups. They came in with useful, reasonably priced answers that fit where we really were, not an enterprise playbook. We are a totally different company six months later. - Founder, HealthTech Company, UAE" },
    { name: "David L.", role: "Entrepreneur", company: "FinStart Ventures", image: "./testimonial3.jpg", rating: 5, review: "The artificial intelligence roadmap ENH developed for us became the cornerstone of our whole digital transformation. An IT consulting partner in Dubai, precisely what we required: clear, actionable, and truly results-oriented. - Director of Operations, Retail Group, UAE" },
    { name: "Lisa B.", role: "Small Business Owner", company: "Bloom & Co.", image: "./testimonial1.jpg", rating: 5, review: "From branding to digital marketing, every solution felt tailor-made. My revenue grew by 60% in the first quarter alone. Absolutely outstanding partner!" },
    { name: "Carlos S.", role: "CTO", company: "NexaCloud", image: "./testimonial2.jpg", rating: 4, review: "Their IT consulting team is simply world-class. Cloud migration was flawless, zero downtime, and the cybersecurity audit uncovered issues we didn't even know existed." },
  ];

  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const totalVisible = 2;
  const maxIndex = testimonials.length - totalVisible;

  useEffect(() => {
    const t = setInterval(() => {
      if (!animating) {
        setAnimating(true);
        setCurrent((prev) => (prev >= maxIndex ? 0 : prev + 1));
        setTimeout(() => setAnimating(false), 450);
      }
    }, 5000);
    return () => clearInterval(t);
  }, [animating, maxIndex]);

  const goTo = (dir) => {
    if (animating) return;
    setAnimating(true);
    setCurrent((prev) => {
      const next = prev + dir;
      if (next < 0) return maxIndex;
      if (next > maxIndex) return 0;
      return next;
    });
    setTimeout(() => setAnimating(false), 450);
  };

  return (
    <section className="testimonials-v2">
      <FloatingParticles count={8} color="rgba(235,174,95,0.08)" />
      <Container>
        <motion.div
          className="tv2-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="tv2-left">
            <span className="tv2-eyebrow">
              <FaArrowRight className="tv2-arrow-icon" />
              Clients Testimonial
            </span>
            <h2 className="tv2-title">Our Client <span className="tv2-accent">Review</span></h2>
          </div>
          <div className="tv2-nav">
            <motion.button
              className={`tv2-nav-btn ${current === 0 ? "disabled" : ""}`}
              onClick={() => goTo(-1)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Previous"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6" /></svg>
            </motion.button>
            <motion.button
              className={`tv2-nav-btn ${current >= maxIndex ? "disabled" : ""}`}
              onClick={() => goTo(1)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Next"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6" /></svg>
            </motion.button>
          </div>
        </motion.div>

        <div className="tv2-viewport">
          <motion.div
            className="tv2-track"
            animate={{ x: `calc(-${current * 50}% - ${current * 20}px)` }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                className="tv2-card"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -8, transition: { type: "spring", stiffness: 280, damping: 20 } }}
              >
                <div className="tv2-card-top">
                  <div className="tv2-avatar-wrap">
                    <img src={t.image} alt={t.name} className="tv2-avatar" />
                    <div className="tv2-quote-badge"><FaQuoteLeft /></div>
                  </div>
                  <div className="tv2-meta">
                    <div className="tv2-stars">
                      {Array.from({ length: 5 }).map((_, si) => (
                        <svg key={si} width="15" height="15" viewBox="0 0 24 24" fill={si < t.rating ? "rgb(235,174,95)" : "none"} stroke="rgb(235,174,95)" strokeWidth="1.5">
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                      ))}
                    </div>
                    <h4 className="tv2-name">{t.name}</h4>
                    <p className="tv2-role">{t.role} &nbsp;·&nbsp; <span>{t.company}</span></p>
                  </div>
                </div>
                <div className="tv2-divider" />
                <p className="tv2-review">"{t.review}"</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div className="tv2-dots">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <motion.button
              key={i}
              className={`tv2-dot ${current === i ? "active" : ""}`}
              onClick={() => { if (!animating) { setAnimating(true); setCurrent(i); setTimeout(() => setAnimating(false), 450); } }}
              whileHover={{ scale: 1.3 }}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}

// ✅ Contact Section
function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const { status, errorMsg, submit } = useEnquiry();
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = async () => {
    if (!form.name || !form.email) return;
    const ok = await submit({ ...form, source: "home-contact" });
    if (ok) setForm({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  return (
    <section className="contact-section">
      <FloatingParticles count={6} color="rgba(235,174,95,0.1)" />
      <Container>
        <div className="cs-grid">
          <motion.div
            className="cs-form-card"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="cs-eyebrow"><span className="cs-eyebrow-dot" />Start a Conversation</span>
            <h2 className="cs-title" style={{ color: "#ebae5f" }}>Get in Touch Now</h2>
            <div className="cs-fields">
              <Row className="g-3">
                <Col sm={6}><div className="cs-field-wrap"><input type="text" name="name" placeholder="Name" value={form.name} onChange={handleChange} disabled={status === "loading"} /></div></Col>
                <Col sm={6}><div className="cs-field-wrap"><input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} disabled={status === "loading"} /></div></Col>
                <Col sm={6}><div className="cs-field-wrap"><input type="tel" name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} disabled={status === "loading"} /></div></Col>
                <Col sm={6}><div className="cs-field-wrap"><input type="text" name="subject" placeholder="Subject" value={form.subject} onChange={handleChange} disabled={status === "loading"} /></div></Col>
                <Col sm={12}><div className="cs-field-wrap"><textarea name="message" placeholder="Message" rows={2} value={form.message} onChange={handleChange} disabled={status === "loading"} /></div></Col>
              </Row>
            </div>
            {status === "error" && <p className="form-feedback form-feedback--error mt-2">{errorMsg}</p>}
            <button className="get-started btn mt-3 p-2" onClick={handleSubmit} disabled={status === "loading" || status === "success"}>
              {status === "loading" ? "Sending..." : status === "success" ? "✓ Message Sent!" : "Submit Now"}
            </button>
          </motion.div>

          <motion.div
            className="cs-info-card"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="cs-title p-4 pb-0" style={{ color: "#ebae5f" }}>Contact Info</h2>
            {[
              { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>, title: "Email Address", lines: ["info@enhconsultancy.com", "support@enhconsultancy.com"] },
              { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.26 12 19.79 19.79 0 0 1 1.17 3.2 2 2 0 0 1 3.14 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 8 8l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" /></svg>, title: "Phone Number", lines: ["+656 (354) 981 516", "+123 (458) 585 568"] },
              { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>, title: "Office Location", lines: ["8502 Preston Rd, Inglewood", "Maine 98380, USA"] },
            ].map((info, i) => (
              <motion.div
                key={i}
                className="cs-info-item"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: 0.2 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ x: 4, transition: { duration: 0.2 } }}
              >
                <div className="cs-info-icon">{info.icon}</div>
                <div className="cs-info-text">
                  <h5 style={{ color: "#ebae5f" }}>{info.title}</h5>
                  {info.lines.map((l, li) => <p key={li}>{l}</p>)}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

// ✅ Newsletter
function Newsletter() {
  const [form, setForm] = useState({ name: "", email: "", service: "" });
  const { status, errorMsg, submit } = useEnquiry();
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!form.name || !form.email) return;
    const ok = await submit({ ...form, source: "home-newsletter" });
    if (ok) setForm({ name: "", email: "", service: "" });
  };

  return (
    <motion.section
      className="newsletter-section"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="nl-blob nl-blob-1" />
      <div className="nl-blob nl-blob-2" />
      <Container className="position-relative">
        <div className="nl-inner">
          <motion.div className="nl-copy" initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}>
            <span className="nl-eyebrow"><span className="nl-eyebrow-dot" />Get on a Quick Call</span>
            <h2 className="nl-title">Build a Winning<br /><span className="nl-title-accent">Business Strategy</span></h2>
            <p className="nl-desc">Connect with our experts to discuss your goals and challenges. Build a winning business strategy that drives growth, innovation, and long-term success.</p>
          </motion.div>
          <motion.div className="nl-form-wrap" initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.55, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}>
            <div className="nl-fields">
              <div className="nl-field-wrap">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                <input type="text" name="name" placeholder="Your Name" value={form.name} onChange={handleChange} disabled={status === "loading"} autoComplete="off" />
              </div>
              <div className="nl-field-wrap">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                <input type="email" name="email" placeholder="Your Email Address" value={form.email} onChange={handleChange} disabled={status === "loading"} autoComplete="off" />
              </div>
              <div className="nl-field-wrap nl-select-wrap">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /></svg>
                <select name="service" value={form.service} onChange={handleChange} disabled={status === "loading"}>
                  <option value="" disabled>Select Services *</option>
                  <option value="ai">Ai Consulting</option>
                  <option value="business">Business Consulting</option>
                  <option value="digital">Digital Marketing Consulting</option>
                  <option value="it">IT Consulting</option>
                  <option value="startup">Startup Consulting</option>
                  <option value="ed-tech">EdTech Consulting</option>
                </select>
                <svg className="nl-chevron" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="6 9 12 15 18 9" /></svg>
              </div>
              {status === "error" && <p className="form-feedback form-feedback--error">{errorMsg}</p>}
              <button className={`nl-submit ${status === "success" ? "nl-sent" : ""}`} onClick={handleSubmit} disabled={status === "loading" || status === "success"}>
                {status === "loading" ? (<><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="spin-icon"><path d="M21 12a9 9 0 1 1-6.219-8.56" /></svg>Sending...</>) : status === "success" ? (<><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>Done!</>) : (<>Sign Up<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg></>)}
              </button>
            </div>
            <p className="nl-privacy">🔒 &nbsp;We respect your privacy. Unsubscribe anytime.</p>
          </motion.div>
        </div>
      </Container>
    </motion.section>
  );
}

// ✅ Stats Counter Section
function useCountUp(target, duration = 2000, inView = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = Math.ceil(target / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else { setCount(start); }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target, duration]);
  return count;
}

function CounterCard({ icon, target, suffix, label, delay }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setInView(true); }, { threshold: 0.4 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  const count = useCountUp(target, 2000, inView);

  return (
    <motion.div
      ref={ref}
      className="counter-card"
      initial={{ opacity: 0, y: 40, scale: 0.94 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
    >
      <div className="counter-icon-wrap">
        <div className="counter-icon">{icon}</div>
        <div className="counter-icon-ring" />
      </div>
      <div className="counter-body">
        <div className="counter-number">{count.toLocaleString()}<span className="counter-suffix">{suffix}</span></div>
        <div className="counter-label">{label}</div>
      </div>
    </motion.div>
  );
}

function StatsCounter() {
  const stats = [
    { icon: <FaUsers />, target: 800, suffix: "+", label: "Happy Clients", delay: 0 },
    { icon: <FaCalendarAlt />, target: 2011, suffix: "", label: "Established", delay: 0.1 },
    { icon: <FaBriefcase />, target: 1000, suffix: "+", label: "Complete Projects", delay: 0.2 },
    { icon: <FaTrophy />, target: 100, suffix: "+", label: "Winning Awards", delay: 0.3 },
  ];

  return (
    <section className="stats-counter-section">
      <div className="stats-counter-bg" />
      <Container className="position-relative">
        <div className="stats-counter-grid">
          {stats.map((s, i) => <CounterCard key={i} {...s} />)}
        </div>
      </Container>
    </section>
  );
}

// ✅ Home Blog Section (DYNAMIC)
function HomeBlogSection() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await api.get('/posts?limit=3');
        setPosts(data?.data ?? []);
      } catch (e) {
        console.error('Failed to fetch blog posts:', e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <section className="home-blog-section">
      <Container>
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          <motion.p variants={fadeUp} className="home-blog__eyebrow">→ NEWS AND BLOG</motion.p>
          <motion.div variants={fadeUp} className="home-blog__header">
            <h2 className="home-blog__title">Build your digital future</h2>
            <Link to="/blog">
              <motion.button className="home-blog__view-btn" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                View More <FiArrowUpRight />
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>

        <Row className="g-4 mt-2">
          {loading ? (
            [...Array(3)].map((_, i) => (
              <Col lg={4} md={6} key={i}>
                <div className="home-blog__card home-blog__card--skeleton">
                  <div className="home-blog__img-wrap home-blog__img-wrap--skeleton" />
                  <div className="home-blog__body">
                    <div className="home-blog__skeleton-line home-blog__skeleton-line--short" />
                    <div className="home-blog__skeleton-line" />
                    <div className="home-blog__skeleton-line home-blog__skeleton-line--med" />
                  </div>
                </div>
              </Col>
            ))
          ) : posts.length === 0 ? (
            <Col><p className="home-blog__empty">No blog posts available yet.</p></Col>
          ) : (
            posts.map((post, i) => (
              <Col lg={4} md={6} key={post._id}>
                <motion.div
                  className="home-blog__card"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.55, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -8, transition: { type: "spring", stiffness: 280, damping: 20 } }}
                >
                  <Link to={`/blog/${post.slug}`} className="home-blog__img-link">
                    <div className="home-blog__img-wrap">
                      <img src={post.featuredImage?.url || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&q=80'} alt={post.featuredImage?.alt || post.title} className="home-blog__img" />
                    </div>
                  </Link>
                  <div className="home-blog__body">
                    <p className="home-blog__date">
                      {post.category?.name && <span className="home-blog__cat">{post.category.name}</span>}
                      {formatDate(post.createdAt)}
                    </p>
                    <h4 className="home-blog__card-title">
                      <Link to={`/blog/${post.slug}`} className="home-blog__card-link">{post.title}</Link>
                    </h4>
                  </div>
                </motion.div>
              </Col>
            ))
          )}
        </Row>
      </Container>
    </section>
  );
}

// ✅ About Us Section
function AboutUs() {
  return (
    <section className="about-us" style={{ position: 'relative', minHeight: '600px' }}>
      <Container style={{ position: 'relative', zIndex: 1 }}>
        <Row className="align-items-center">
          <motion.h2
            className="italic-text mb-4"
            style={{ color: "#8a5520", fontSize: "2.8rem", fontWeight: "500" }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            Our AI Consulting & Development Company in Dubai Serves Startups, SMEs to Enterprises
          </motion.h2>

          <Col lg={6} className="about-text">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              variants={staggerContainer}
            >
              <motion.span variants={fadeUp} className="about-eyebrow">
                <span className="about-eyebrow-dot" />
                About ENH Consulting
              </motion.span>
              <motion.div variants={fadeUp} className="underline" />
              <motion.p variants={fadeUp}>
                In Dubai, ENH Consulting is a real AI-first business providing full-service artificial intelligence and business consulting to assist businesses of all sizes throughout the United Arab Emirates to compete, expand, and lead in a progressively intelligent society.
              </motion.p>
              <motion.p variants={fadeUp} className="mt-3">
                As a trusted provider of AI consulting services in Dubai, we cover everything your business needs to grow - with every solution built around real, measurable results from day one: AI consulting, business consulting, digital marketing consulting, EdTech consulting, IT consulting, and startup consulting, each meant to provide quantifiable results from day one.
              </motion.p>
              <motion.p variants={fadeUp} className="mt-3">
                Whether you are an established business ready to grow throughout the UAE or a first-year startup still finding your footing in the Dubai market, our artificial intelligence consulting and development company is here to meet you precisely where you are and guide you precisely where you need to be.
              </motion.p>

              <motion.hr variants={fadeUp} className="divider" />
              <motion.div variants={fadeUp}>
                <Row className="stats">
                  <button className="btn get-started m-2 w-25">
                    <Link to="/about">
                      Read more
                    </Link>
                  </button>

                </Row>
              </motion.div>
            </motion.div>
          </Col>

          <Col lg={6} className="about-image">
            <motion.div
              className="about-img-wrap"
              initial={{ opacity: 0, scale: 0.9, x: 40 }}
              whileInView={{ opacity: 1, scale: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <img src="./about.jpg" alt="About Us" className="img-fluid" />
              <div className="about-img-ring" />
              <motion.div
                className="about-badge"
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                animate={{ y: [0, -8, 0] }}
              >
                <span className="about-badge-num">98%</span>
                <span className="about-badge-label">Satisfaction</span>
              </motion.div>
            </motion.div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

// ✅ R&D Section — Why Choose Us for AI & Technology
function RDSection() {
  const [hovered, setHovered] = useState(null);

  // Define viewport and variants
  const vp = { once: true, amount: 0.2 };
  const vpMd = { once: true, amount: 0.3 };
  const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
  const cardV = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } } };

  const data = {
    rdTitle: "Why Businesses in Dubai Choose ENH Consulting for AI & Technology Solutions",
    rdCards: [
      { icon: <FaLightbulb />, title: "AI-First Approach", desc: "ENH Consulting develops practical AI tools, automation systems, and smart business solutions that help companies improve efficiency, reduce manual work, and achieve measurable business growth instead of offering only theoretical consulting advice." },
      { icon: <FaBriefcase />, title: "Multi-Service Expertise", desc: "We provide AI consulting, digital marketing, technology solutions, and business strategy services under one roof, helping businesses simplify communication, improve project execution, save time, and achieve stronger, faster, and more effective business results." },
      { icon: <FaLaptopCode />, title: "Startup & SME Focused", desc: "ENH Consulting supports startups and SMEs in Dubai with scalable AI solutions, flexible pricing models, faster implementation, and customized strategies designed to match the goals and operational needs of modern businesses." },
    ]
  };

  return (
    <section className="svp-rd">
      <FloatingParticles count={6} color="rgba(235,174,95,0.10)" />
      <Container>
        <motion.div initial="hidden" whileInView="show" viewport={vpMd} variants={stagger}>
          <Row className="align-items-center mb-5">
            <Col lg={10}>
              <motion.div variants={fadeUp} className="svp-rd__eyebrow">
                <span className="svp-rd__eyebrow-dot"></span>
              </motion.div>
              <motion.h2 className="svp-rd__title" style={{ color: '#8a5520' }} variants={fadeLeft}>{data.rdTitle}</motion.h2>
            </Col>
            <Col lg={2} className="text-lg-end mt-3 mt-lg-0">
              <motion.div variants={fadeRight}>
                <motion.button
                  className="svp-outline-btn"
                  whileHover={{ scale: 1.05, y: -2, backgroundColor: "rgb(235,174,95)", color: "#fff", borderColor: "rgb(235,174,95)" }}
                  whileTap={{ scale: 0.97 }}
                ><Link to="/contact">Talk to Us</Link> <FiArrowUpRight />
                </motion.button>
              </motion.div>
            </Col>
          </Row>
        </motion.div>

        <motion.p
          className="mb-5 fw-bold"
          style={{ color: '#8a5520' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          Businesses across Dubai and the UAE choose ENH Consulting because we don't just provide AI advice — we build, implement, and deliver real business results. This makes us a trusted AI consulting and development company in Dubai.
        </motion.p>

        <motion.div initial="hidden" whileInView="show" viewport={vp} variants={stagger}>
          <Row className="g-4">
            {data.rdCards.map((card, i) => (
              <Col lg={4} md={6} key={i}>
                <motion.div variants={cardV} onHoverStart={() => setHovered(i)} onHoverEnd={() => setHovered(null)}>
                  <motion.div
                    className="svp-rd__card"
                    animate={{ boxShadow: hovered === i ? "0 20px 52px rgba(133,86,25,0.18)" : "0 4px 6px rgba(133,86,25,0.06)" }}
                    whileHover={{ y: -10, transition: { type: "spring", stiffness: 300, damping: 18 } }}
                  >
                    <motion.div
                      className="svp-rd__icon"
                      animate={{ backgroundColor: hovered === i ? "linear-gradient(135deg,rgb(235,174,95),#d45b08)" : "rgba(235,174,95,0.2)" }}
                      whileHover={{ rotate: -8, scale: 1.12, backgroundColor: "rgb(235,174,95)", color: "#fff" }}
                      transition={{ type: "spring", stiffness: 280, damping: 14 }}
                    >
                      {card.icon}
                    </motion.div>
                    <h4 className="svp-rd__card-title">{card.title}</h4>
                    <p className="svp-rd__card-desc">{card.desc}</p>
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

// ✅ Home Page
function Home() {
  return (
    <div className="home-page">
      <Banner />
      <MarqueeTicker />
      <MarqueeTicker2 />
      <StatsCounter />
      <AboutUs />
      <Services />
      <Newsletter />
      <RDSection />
      <Showcases />
      <TailoredSection />
      <Testimonials />
      <HomeBlogSection />
      <ContactSection />
    </div>
  );
}

export default Home;