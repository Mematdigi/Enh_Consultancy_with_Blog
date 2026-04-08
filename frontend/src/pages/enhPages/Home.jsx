import { useState, useEffect, useRef } from "react";
import Banner from "../../components/enhComponent/banner";
import { Container, Row, Col, Button } from "react-bootstrap";
import {
  FaArrowRight, FaLightbulb, FaBriefcase, FaGraduationCap,
  FaLaptopCode, FaWallet, FaBullseye, FaPlay, FaQuoteLeft,
  FaUsers, FaCalendarAlt, FaTrophy,
} from "react-icons/fa";
import { FiArrowUpRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../../utils/api";

// ─── animation helpers ───────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show:   { opacity: 1, y: 0,  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

const staggerContainer = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.1 } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 50, scale: 0.96 },
  show:   { opacity: 1, y: 0,  scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

// ─── Reusable enquiry hook ───────────────────────────────────────────────────
function useEnquiry() {
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
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
      setErrorMsg(
        err?.response?.data?.message || "Something went wrong. Please try again."
      );
      setStatus("error");
      return false;
    }
  };

  const reset = () => { setStatus("idle"); setErrorMsg(""); };
  return { status, errorMsg, submit, reset };
}

// ✅ Services Component
function Services() {
  const serviceList = [
    {
      icon: <FaLightbulb />,
      title: "Digital Marketing Consulting",
      description:
        "Providing expert advice and problem-solving strategies across multiple industries, helping businesses improve efficiency, innovation, and performance.",
      link: "/digital-marketing-consulting",
      number: "01",
    },
    {
      icon: <FaBriefcase />,
      title: "Business & Management Consulting",
      description:
        "Guiding companies in optimizing operations, leadership, organizational structure, and overall business strategies to enhance productivity and profitability.",
      link: "/business-consultancy",
      number: "02",
    },
    {
      icon: <FaGraduationCap />,
      title: "EdTech & AI Consulting",
      description:
        "Specializing in educational technology and artificial intelligence solutions to enhance learning experiences, student engagement, and adaptive learning models.",
      link: "/digital-marketing-consulting",
      number: "03",
    },
    {
      icon: <FaLaptopCode />,
      title: "IT Consulting",
      description:
        "Helping businesses with IT strategy, software development, cybersecurity, cloud computing, and digital transformation to improve operational efficiency.",
      link: "/it-consulting",
      number: "04",
    },
    {
      icon: <FaWallet />,
      title: "Finance Consulting",
      description:
        "Offering expertise in financial planning, risk management, investments, and corporate finance to optimize profitability and long-term financial health.",
      link: "/finance-consulting",
      number: "05",
    },
    {
      icon: <FaBullseye />,
      title: "Property Consulting",
      description:
        "Focusing on business expansion, market entry, competitive positioning, and long-term strategic planning to drive sustainable growth.",
      link: "/property-consulting",
      number: "06",
    },
  ];

  return (
    <section className="services-section">
      <Container>
        {/* Header */}
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
              Our <span className="title-accent">Services</span>
            </h2>
            <Button className="services-discover-btn">
              Discover More <FaArrowRight />
            </Button>
          </motion.div>
          <motion.p className="services-subtitle" variants={fadeUp}>
            Comprehensive consulting solutions designed to accelerate your growth,
            streamline operations, and unlock new opportunities.
          </motion.p>
        </motion.div>

        {/* Cards Grid */}
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
              <div className="service-card">
                {/* Number watermark */}
                <span className="card-number">{service.number}</span>

                {/* Icon */}
                <div className="card-icon-wrap">
                  <div className="card-icon">{service.icon}</div>
                  <div className="icon-ring" />
                </div>

                {/* Content */}
                <h3 className="card-title">{service.title}</h3>
                <p className="card-desc">{service.description}</p>

                {/* Divider */}
                <div className="card-divider" />

                {/* Link */}
                <Link to={service.link} className="card-link">
                  Learn More
                  <span className="link-arrow">
                    <FaArrowRight />
                  </span>
                </Link>

                {/* Hover glow */}
                <div className="card-glow" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}

// ✅ Tailored Section
function TailoredSection() {
  return (
    <section className="tailored-section">
      <Container fluid>
        <Row className="align-items-center">
          <Col lg={6} className="text-content">
            <h2>
              Tailored to your <br />
              unique <span className="italic-text">needs</span>
            </h2>
            <div className="underline"></div>
            <p>
              Ready to embrace a future where finance meets technology? Join us today and experience
              the next level of financial innovation.
            </p>
            <Button variant="warning" className="learn-more">Learn more</Button>
          </Col>
          <Col lg={6} className="image-content">
            <div className="image-container">
              <img src="./unique.jpg" alt="Tailored Solution" className="img-fluid" />
              <div className="play-button">
                <FaPlay />
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

// ✅ Showcases
function Showcases() {
  const showcaseItems = [
    { title: "Empowering Businesses",              category: "Businesses", image: "./service1.jpg" },
    { title: "Innovation & Strategy",              category: "Strategy",   image: "./service2.jpg" },
    { title: "Service Industries",                 category: "Industries", image: "./service3.jpg" },
    { title: "Your Success, Our Expertise",        category: "Expertise",  image: "./service4.jpg" },
    { title: "Smart Solutions for a Smarter Business", category: "Business", image: "./service5.jpg" },
    { title: "Navigating Growth with Expert",      category: "Expert",     image: "./service6.jpg" },
  ];

  return (
    <section className="showcases">
      <Container>
        <div className="section-header d-flex justify-content-between align-items-center">
          <h2 className="section-title">Our Work</h2>
          <Button variant="warning" className="get-started">Discover more</Button>
        </div>
        <Row>
          {showcaseItems.map((item, index) => (
            <Col lg={4} md={6} key={index} className="mb-4">
              <div className="showcase-card p-2">
                <img src={item.image} alt={item.title} className="img-fluid" />
                <div className="showcase-text">
                  <h4>{item.title}</h4>
                  <p className="category">{item.category}</p>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}

// ✅ Testimonials Carousel
function Testimonials() {
  const testimonials = [
    {
      name: "Raman Kant Aggarwal",
      role: "Doctor",
      company: "Apollo Hospitals",
      image: "./testimonial1.jpg",
      rating: 5,
      review: "Dedicated, focused, genuinely trustworthy and enterprising. Real good value for customers — their consulting transformed our operational efficiency beyond expectations.",
    },
    {
      name: "Geeta Kadayaprath",
      role: "Director",
      company: "The Breast Cancer Clinic",
      image: "./testimonial2.jpg",
      rating: 5,
      review: "Prompt services with a great team which is able to create excellent content and post it at appropriate times. Response to queries and resolution of problems is also very quick. Thank you!",
    },
    {
      name: "David L.",
      role: "Entrepreneur",
      company: "FinStart Ventures",
      image: "./testimonial3.jpg",
      rating: 5,
      review: "Their financial consulting gave our startup a clear roadmap. The team's expertise in investment strategy helped us secure Series A funding in record time.",
    },
    {
      name: "Lisa B.",
      role: "Small Business Owner",
      company: "Bloom & Co.",
      image: "./testimonial4.jpg",
      rating: 5,
      review: "From branding to digital marketing, every solution felt tailor-made. My revenue grew by 60% in the first quarter alone. Absolutely outstanding partner!",
    },
    {
      name: "Carlos S.",
      role: "CTO",
      company: "NexaCloud",
      image: "./testimonial5.jpg",
      rating: 4,
      review: "Their IT consulting team is simply world-class. Cloud migration was flawless, zero downtime, and the cybersecurity audit uncovered issues we didn't even know existed.",
    },
  ];

  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const totalVisible = 2;
  const maxIndex = testimonials.length - totalVisible;

  const goTo = (dir) => {
    if (animating) return;
    setAnimating(true);
    setCurrent((prev) => {
      const next = prev + dir;
      if (next < 0) return 0;
      if (next > maxIndex) return maxIndex;
      return next;
    });
    setTimeout(() => setAnimating(false), 450);
  };

  return (
    <section className="testimonials-v2">
      <Container>
        {/* Header */}
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
            <button
              className={`tv2-nav-btn ${current === 0 ? "disabled" : ""}`}
              onClick={() => goTo(-1)}
              aria-label="Previous"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6"/></svg>
            </button>
            <button
              className={`tv2-nav-btn ${current >= maxIndex ? "disabled" : ""}`}
              onClick={() => goTo(1)}
              aria-label="Next"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>
            </button>
          </div>
        </motion.div>

        {/* Carousel viewport */}
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
                whileHover={{ y: -5, transition: { duration: 0.25 } }}
              >
                {/* Top: avatar + meta + stars */}
                <div className="tv2-card-top">
                  <div className="tv2-avatar-wrap">
                    <img src={t.image} alt={t.name} className="tv2-avatar" />
                    <div className="tv2-quote-badge"><FaQuoteLeft /></div>
                  </div>
                  <div className="tv2-meta">
                    <div className="tv2-stars">
                      {Array.from({ length: 5 }).map((_, si) => (
                        <svg
                          key={si}
                          width="15" height="15" viewBox="0 0 24 24"
                          fill={si < t.rating ? "rgb(235,174,95)" : "none"}
                          stroke="rgb(235,174,95)"
                          strokeWidth="1.5"
                        >
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                        </svg>
                      ))}
                    </div>
                    <h4 className="tv2-name">{t.name}</h4>
                    <p className="tv2-role">{t.role} &nbsp;·&nbsp; <span>{t.company}</span></p>
                  </div>
                </div>

                {/* Divider */}
                <div className="tv2-divider" />

                {/* Review text */}
                <p className="tv2-review">"{t.review}"</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Dot indicators */}
        <div className="tv2-dots">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              className={`tv2-dot ${current === i ? "active" : ""}`}
              onClick={() => { if (!animating) { setAnimating(true); setCurrent(i); setTimeout(() => setAnimating(false), 450); } }}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}

// ✅ Contact Section — wired to API
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
      <Container>
        <div className="cs-grid">

          {/* Left: Form card */}
          <motion.div
            className="cs-form-card"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="cs-eyebrow">
              <span className="cs-eyebrow-dot" />
              Start a Conversation
            </span>
            <h2 className="cs-title" style={{ color: "#ebae5f" }}>Get in Touch Now</h2>

            <div className="cs-fields">
              <Row className="g-3">
                <Col sm={6}>
                  <div className="cs-field-wrap">
                    <input
                      type="text"
                      name="name"
                      placeholder="Name"
                      value={form.name}
                      onChange={handleChange}
                      disabled={status === "loading"}
                    />
                  </div>
                </Col>
                <Col sm={6}>
                  <div className="cs-field-wrap">
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={form.email}
                      onChange={handleChange}
                      disabled={status === "loading"}
                    />
                  </div>
                </Col>
                <Col sm={6}>
                  <div className="cs-field-wrap">
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone"
                      value={form.phone}
                      onChange={handleChange}
                      disabled={status === "loading"}
                    />
                  </div>
                </Col>
                <Col sm={6}>
                  <div className="cs-field-wrap">
                    <input
                      type="text"
                      name="subject"
                      placeholder="Subject"
                      value={form.subject}
                      onChange={handleChange}
                      disabled={status === "loading"}
                    />
                  </div>
                </Col>
                <Col sm={12}>
                  <div className="cs-field-wrap">
                    <textarea
                      name="message"
                      placeholder="Message"
                      rows={2}
                      value={form.message}
                      onChange={handleChange}
                      disabled={status === "loading"}
                    />
                  </div>
                </Col>
              </Row>
            </div>

            {status === "error" && (
              <p className="form-feedback form-feedback--error mt-2">{errorMsg}</p>
            )}

            <button
              className="get-started btn mt-3 p-2"
              onClick={handleSubmit}
              disabled={status === "loading" || status === "success"}
            >
              {status === "loading"
                ? "Sending..."
                : status === "success"
                ? "✓ Message Sent!"
                : "Submit Now"}
            </button>
          </motion.div>

          {/* Right: Info card */}
          <motion.div
            className="cs-info-card"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="cs-title p-4 pb-0" style={{ color: "#ebae5f" }}>Contact Info</h2>
            {[
              {
                icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
                title: "Email Address",
                lines: ["info@enhconsultancy.com", "support@enhconsultancy.com"],
              },
              {
                icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.26 12 19.79 19.79 0 0 1 1.17 3.2 2 2 0 0 1 3.14 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 8 8l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>,
                title: "Phone Number",
                lines: ["+656 (354) 981 516", "+123 (458) 585 568"],
              },
              {
                icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
                title: "Office Location",
                lines: ["8502 Preston Rd, Inglewood", "Maine 98380, USA"],
              },
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

// ✅ Newsletter — wired to API
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
      {/* decorative blobs */}
      <div className="nl-blob nl-blob-1" />
      <div className="nl-blob nl-blob-2" />

      <Container className="position-relative">
        <div className="nl-inner">
          {/* Left: copy */}
          <motion.div
            className="nl-copy"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="nl-eyebrow">
              <span className="nl-eyebrow-dot" />
              Newsletter
            </span>
            <h2 className="nl-title">
              Get Updates &amp; <br />
              <span className="nl-title-accent">Latest News</span>
            </h2>
            <p className="nl-desc">
              Get the latest insights, offers, and consultancy news delivered
              straight to your inbox. No spam — ever.
            </p>
          </motion.div>

          {/* Right: form */}
          <motion.div
            className="nl-form-wrap"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="nl-fields">
              <div className="nl-field-wrap">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={form.name}
                  onChange={handleChange}
                  disabled={status === "loading"}
                  autoComplete="off"
                />
              </div>

              <div className="nl-field-wrap">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email Address"
                  value={form.email}
                  onChange={handleChange}
                  disabled={status === "loading"}
                  autoComplete="off"
                />
              </div>

              <div className="nl-field-wrap nl-select-wrap">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>
                <select
                  name="service"
                  value={form.service}
                  onChange={handleChange}
                  disabled={status === "loading"}
                >
                  <option value="">Consultancy Services</option>
                  <option value="digital">Digital Marketing</option>
                  <option value="business">Business &amp; Management</option>
                  <option value="it">IT Consulting</option>
                  <option value="finance">Finance Consulting</option>
                  <option value="property">Property Consulting</option>
                </select>
                <svg className="nl-chevron" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="6 9 12 15 18 9"/></svg>
              </div>

              {status === "error" && (
                <p className="form-feedback form-feedback--error">{errorMsg}</p>
              )}

              <button
                className={`nl-submit ${status === "success" ? "nl-sent" : ""}`}
                onClick={handleSubmit}
                disabled={status === "loading" || status === "success"}
              >
                {status === "loading" ? (
                  <>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="spin-icon"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
                    Sending...
                  </>
                ) : status === "success" ? (
                  <>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                    Done!
                  </>
                ) : (
                  <>
                    Sign Up
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                  </>
                )}
              </button>
            </div>

            <p className="nl-privacy">
              🔒 &nbsp;We respect your privacy. Unsubscribe anytime.
            </p>
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
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target, duration]);

  return count;
}

function CounterCard({ icon, target, suffix, label, delay }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.4 }
    );
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
        <div className="counter-number">
          {count.toLocaleString()}<span className="counter-suffix">{suffix}</span>
        </div>
        <div className="counter-label">{label}</div>
      </div>
    </motion.div>
  );
}

function StatsCounter() {
  const stats = [
    { icon: <FaUsers />,      target: 800,  suffix: "+", label: "Happy Clients",    delay: 0 },
    { icon: <FaCalendarAlt />,target: 2011, suffix: "",  label: "Established",      delay: 0.1 },
    { icon: <FaBriefcase />,  target: 1000, suffix: "+", label: "Complete Projects", delay: 0.2 },
    { icon: <FaTrophy />,     target: 100,  suffix: "+", label: "Winning Awards",   delay: 0.3 },
  ];

  return (
    <section className="stats-counter-section">
      <div className="stats-counter-bg" />
      <Container className="position-relative">
        <div className="stats-counter-grid">
          {stats.map((s, i) => (
            <CounterCard key={i} {...s} />
          ))}
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
    new Date(dateStr).toLocaleDateString('en-GB', {
      day: 'numeric', month: 'long', year: 'numeric',
    });

  return (
    <section className="home-blog-section">
      <Container>
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          <motion.p variants={fadeUp} className="home-blog__eyebrow">
            → NEWS AND BLOG
          </motion.p>
          <motion.div variants={fadeUp} className="home-blog__header">
            <h2 className="home-blog__title">Build your digital future</h2>
            <Link to="/blog">
              <motion.button
                className="home-blog__view-btn"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                View More <FiArrowUpRight />
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Cards */}
        <Row className="g-4 mt-2">
          {loading ? (
            // ── Skeleton placeholders ──
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
            <Col>
              <p className="home-blog__empty">No blog posts available yet.</p>
            </Col>
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
                  {/* Image */}
                  <Link to={`/blog/${post.slug}`} className="home-blog__img-link">
                    <div className="home-blog__img-wrap">
                      <img
                        src={post.featuredImage?.url || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&q=80'}
                        alt={post.featuredImage?.alt || post.title}
                        className="home-blog__img"
                      />
                    </div>
                  </Link>

                  {/* Body */}
                  <div className="home-blog__body">
                    <p className="home-blog__date">
                      {post.category?.name && (
                        <span className="home-blog__cat">{post.category.name}</span>
                      )}
                      {formatDate(post.createdAt)}
                    </p>
                    <h4 className="home-blog__card-title">
                      <Link to={`/blog/${post.slug}`} className="home-blog__card-link">
                        {post.title}
                      </Link>
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

// ✅ Home Page
function Home() {
  return (
    <div>
      <Banner />

      {/* About Us */}
      <section className="about-us">
        <Container>
          <Row className="align-items-center">
            <Col lg={6} className="about-text">
              <h2>
                Your financial well-being is <span className="italic-text">our priority.</span>
              </h2>
              <div className="underline"></div>
              <p>
                Stay ahead of the game with real-time insights into your finances. Our dynamic
                analytics provide you with a clear understanding of your financial health,
                empowering you to make informed decisions.
              </p>
              <hr className="divider" />
              <Row className="stats">
                <Button className="btn get-started m-2 w-50">Read more</Button>
              </Row>
            </Col>
            <Col lg={6} className="about-image">
              <img src="./about.jpg" alt="About Us" className="img-fluid" />
            </Col>
          </Row>
        </Container>
      </section>

      {/* Services */}
      <Services />

      {/* Newsletter */}
      <Newsletter />

      {/* Showcases */}
      <Showcases />

      {/* Stats Counter */}
      <StatsCounter />

      {/* Tailored */}
      <TailoredSection />

      {/* Testimonials Carousel */}
      <Testimonials />

      {/* Blog Section — Dynamic */}
      <HomeBlogSection />

      {/* Contact */}
      <ContactSection />
    </div>
  );
}

export default Home;