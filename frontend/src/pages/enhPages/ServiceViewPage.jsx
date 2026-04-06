import React, { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import {
  FaArrowRight, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt,
  FaStar, FaQuoteLeft, FaFlask, FaLightbulb, FaSearch, FaRocket,
  FaShieldAlt, FaClock, FaHeadset, FaChevronLeft, FaChevronRight,
  FaPaperPlane,
} from "react-icons/fa";
import { FiArrowUpRight } from "react-icons/fi";
// import "../styles/_serviceViewPage.scss";

// ─── Breadcrumb Banner ────────────────────────────────────────────────────────
function BreadcrumbBanner({ title }) {
  return (
    <div className="svp-breadcrumb">
      <div className="svp-breadcrumb__overlay" />
      <Container>
        <div className="svp-breadcrumb__inner">
          <h1 className="svp-breadcrumb__title">{title}</h1>
          <nav className="svp-breadcrumb__nav">
            <Link to="/" className="svp-breadcrumb__link">Home</Link>
            <span className="svp-breadcrumb__sep">›</span>
            <Link to="/services" className="svp-breadcrumb__link">Services</Link>
            <span className="svp-breadcrumb__sep">›</span>
            <span className="svp-breadcrumb__current">{title}</span>
          </nav>
        </div>
      </Container>
    </div>
  );
}

// ─── Service data ─────────────────────────────────────────────────────────────
const SERVICE_DATA = {
  "it-consulting": {
    badge: "IT Consulting",
    headline: "Effective Blockchain PPC Marketing",
    subheadline: "Drive Conversions and Boost Performance",
    tagline: "Outsmart Blockchain Competition with Targeted PPC Campaigns",
    cta: "We're Your #1 PPC Agency · Get in Touch Today!",
    heroImg: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80",
    introTitle: "Introduction to IT FMS",
    introText: "In today's digital age, businesses rely heavily on technology to perform their daily operations. From managing customer data to maintaining inventory, technology has become an integral part of running a business. As a result, IT facility management services (FMS) have become increasingly important to ensure that technology infrastructure is reliable, efficient, and secure.",
    enquireText: "Get Free 30 Min DC Consultation",
    rdTitle: "We Offer a Wide Variety of Research and Development Services",
    rdCards: [
      { icon: <FaFlask />,     title: "Sprint R&D",       desc: "Give clients information, professional solution design, and roadmap suggestions." },
      { icon: <FaLightbulb />, title: "Prototype Concept", desc: "Deliver a complete working prototype that will advance your products." },
      { icon: <FaSearch />,    title: "Research",          desc: "Run brief experiments to validate concepts and technologies and establish expected value." },
    ],
    whyUs: [
      { icon: <FaClock />,     title: "We value your time",           desc: "On-time Delivery without any fail. With proper planning and effective project management, we deliver quality with punctuality." },
      { icon: <FaHeadset />,   title: "We are 24/7 here for Support", desc: "Our team of experts are always available in one call. Be it any failure or need any form of assistance we are always here with solutions." },
      { icon: <FaRocket />,    title: "We constantly innovate",       desc: "Our team is committed to bringing innovation to the table constantly. Innovative and new-age solutions increase the capabilities." },
      { icon: <FaShieldAlt />, title: "We have the Expertise",        desc: "We have been giving fantastic IT Solutions, DC, networking, Cyber Security, Surveillance and Softwares for more than a decade." },
    ],
    testimonials: [
      { name: "Raman Kant Aggarwal", role: "Doctor",                  stars: 5, text: "Dedicated, focused, genuine trustworthy and enterprising! Real good value for Customers." },
      { name: "Geeta Kadayaprath",   role: "The Breast Cancer Clinic", stars: 5, text: "This company has a great team which is able to create excellent content and post it at appropriate times. Response to queries and resolution of problems is also very quick. Thank you!" },
      { name: "Priya Sharma",        role: "Startup Founder",          stars: 5, text: "Absolutely brilliant team. They transformed our digital presence and we saw a 300% increase in qualified leads within 3 months." },
    ],
    blogs: [
      { tag: "Development", date: "24 March 2025",    title: "PHP vs Java: Which is Better for Web Development in 2025?",                    img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&q=80" },
      { tag: "Business",    date: "17 February 2025", title: "Beyond Design: How Powerful Websites Fuel Business Growth",                    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&q=80" },
      { tag: "Marketing",   date: "11 February 2025", title: "Smart Budgeting in Digital Marketing: How to Spend Wisely & Grow Sustainably", img: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400&q=80" },
    ],
  },
  "default": {
    badge: "Our Services",
    headline: "Expert Consulting Services",
    subheadline: "Drive Growth and Transformation",
    tagline: "Professional solutions tailored to solutions tailored to your business needs Professional solutions tailored to your business needs Professional solutions tailored to your business needs to your business needs Professional solutions tailored to your business needs Professional solutions tailored to your business needs",
    cta: "Get in Touch!",
    heroImg: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=600&q=80",
    introTitle: "Introduction to Our Service",
    introText: "We deliver expert consulting and strategic guidance to help businesses thrive in a competitive landscape. Our team brings decades of combined experience across industries, ensuring you receive the best possible advice and implementation support.",
    enquireText: "Get a Free 30 Min Consultation",
    rdTitle: "We Offer a Wide Variety of Research and Development Services",
    rdCards: [
      { icon: <FaFlask />,     title: "Sprint R&D",       desc: "Give clients information, professional solution design, and roadmap suggestions." },
      { icon: <FaLightbulb />, title: "Prototype Concept", desc: "Deliver a complete working prototype that will advance your products." },
      { icon: <FaSearch />,    title: "Research",          desc: "Run brief experiments to validate concepts and technologies and establish expected value." },
    ],
    whyUs: [
      { icon: <FaClock />,     title: "We value your time",           desc: "On-time Delivery without any fail. With proper planning and effective project management, we deliver quality with punctuality." },
      { icon: <FaHeadset />,   title: "We are 24/7 here for Support", desc: "Our team of experts are always available in one call. Be it any failure or need any form of assistance we are always here." },
      { icon: <FaRocket />,    title: "We constantly innovate",       desc: "Our team is committed to bringing innovation to the table constantly. New-age solutions increase the capabilities." },
      { icon: <FaShieldAlt />, title: "We have the Expertise",        desc: "We have been delivering fantastic solutions for more than a decade across industries and geographies." },
    ],
    testimonials: [
      { name: "Raman Kant Aggarwal", role: "Doctor",                  stars: 5, text: "Dedicated, focused, genuine trustworthy and enterprising! Real good value for Customers." },
      { name: "Geeta Kadayaprath",   role: "The Breast Cancer Clinic", stars: 5, text: "This company has a great team which is able to create excellent content and post it at appropriate times." },
      { name: "Priya Sharma",        role: "Startup Founder",          stars: 5, text: "Absolutely brilliant team. They transformed our digital presence and we saw a 300% increase in qualified leads." },
    ],
    blogs: [
      { date: "24 March 2025",    title: "PHP vs Java: Which is Better for Web Development in 2025?", img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&q=80" },
      { date: "17 February 2025", title: "Beyond Design: How Powerful Websites Fuel Business Growth", img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&q=80" },
      { date: "11 February 2025", title: "Smart Budgeting in Digital Marketing: How to Spend Wisely", img: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400&q=80" },
    ],
  },
};

// ─── Animation helpers ────────────────────────────────────────────────────────
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

// ─── SECTION 1 · Hero Banner ──────────────────────────────────────────────────
function HeroBanner({ data }) {
  const [form, setForm] = useState({ name: "", phone: "", email: "", website: "", message: "" });

  return (
    <section className="svp-hero">
      <span className="svp-blob svp-blob--1" />
      <span className="svp-blob svp-blob--2" />
      <span className="svp-blob svp-blob--3" />

      <Container>
        <Row className="align-items-center g-4">
          <Col lg={7}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* <span className="svp-badge">
                <span className="svp-badge__dot" />
                {data.badge}
              </span> */}

              <h1 className="svp-hero__h1" style={{color:'#422308'}}>{data.headline}</h1>
              <p className="svp-hero__sub">{data.subheadline}</p>
              <p className="svp-hero__tagline text-lead" style={{color:'#422308'}}>{data.tagline}</p>

              <div className="svp-hero__cta-bar" style={{background:'#ffae45e0'}}>
                <span className="svp-hero__cta-text">{data.cta}</span>
              </div>
{/* 
              <div className="svp-hero__stats">
                {[
                  { num: "500+", label: "Clients Served" },
                  { num: "10+",  label: "Years Experience" },
                  { num: "98%",  label: "Satisfaction Rate" },
                ].map((s, i) => (
                  <React.Fragment key={i}>
                    {i > 0 && <span className="svp-hero__stat-sep" />}
                    <div className="svp-hero__stat-item">
                      <span className="svp-hero__stat-num">{s.num}</span>
                      <span className="svp-hero__stat-label">{s.label}</span>
                    </div>
                  </React.Fragment>
                ))}
              </div> */}
            </motion.div>
          </Col>

          <Col lg={5}>
            <motion.div
              className="svp-hero__form"
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="svp-hero__form-accent" />
              <h3 className="svp-hero__form-title">Talk to An Expert</h3>
              <p className="svp-hero__form-sub">Free 30-min consultation, no strings attached</p>

              <div className="svp-hero__form-row">
                <input className="svp-hero__input" placeholder="Your Name*"         value={form.name}    onChange={e => setForm({ ...form, name: e.target.value })} />
                <input className="svp-hero__input" placeholder="Your Phone Number*" value={form.phone}   onChange={e => setForm({ ...form, phone: e.target.value })} type="tel" />
              </div>
              <div className="svp-hero__form-row">
                <input className="svp-hero__input" placeholder="Your E-Mail*"       value={form.email}   onChange={e => setForm({ ...form, email: e.target.value })} type="email" />
                <input className="svp-hero__input" placeholder="Your Website"       value={form.website} onChange={e => setForm({ ...form, website: e.target.value })} />
              </div>
              <textarea className="svp-hero__input svp-hero__textarea" placeholder="Message..." value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} rows={3} />

              <motion.button className="svp-hero__form-btn" whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }}>
                <FaPaperPlane /> Talk to An Expert
              </motion.button>
            </motion.div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

// ─── SECTION 2 · Intro (alternating) ─────────────────────────────────────────
function IntroSection({ data }) {
  return (
    <section className="svp-intro" style={{background:'linear-gradient(135deg, #fff4e1 0%, #fdedce 60%, #ffd78a 100%)'}}>
      <Container>
        <Row  className="align-items-center g-5 mt-5 p-3" style={{border: '1px solid rgba(212, 91, 8, 0.38)', borderRadius: '12px', boxShadow: '0 4px 16px rgba(212, 91, 8, 0.2)'}}>
          <Col lg={6}>
            <FadeUp>
              <div className="svp-intro__img-wrap">
                <img src={data.heroImg} alt={data.introTitle} className="svp-intro__img" />
                <div className="svp-intro__img-deco" />
              </div>
            </FadeUp>
          </Col>
          <Col lg={6}>
            <FadeUp delay={0.1}>
              <h2 className="svp-intro__title">{data.introTitle}</h2>
              <p className="svp-intro__text">{data.introText}</p>
              <p className="svp-intro__enquire-note">{data.enquireText}</p>
              <motion.button className="svp-enquire-btn" whileHover={{ scale: 1.03, x: 4 }} whileTap={{ scale: 0.97 }}>
                Enquire Now <FaArrowRight />
              </motion.button>
            </FadeUp>
          </Col>
        </Row>

        <Row className="align-items-center g-5 mt-5 p-3" style={{border: '1px solid rgba(212, 91, 8, 0.38)', borderRadius: '12px', boxShadow: '0 4px 16px rgba(212, 91, 8, 0.2)'}}>
          <Col lg={6} className="order-lg-2">
            <FadeUp>
              <div className="svp-intro__img-wrap">
                <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80" alt="Office" className="svp-intro__img" />
                <div className="svp-intro__img-deco svp-intro__img-deco--right" />
              </div>
            </FadeUp>
          </Col>
          <Col lg={6} className="order-lg-1">
            <FadeUp delay={0.1}>
              <h2 className="svp-intro__title">We will delever best services</h2>
              <p className="svp-intro__text">We deliver expert consulting and strategic guidance to help businesses thrive in a competitive landscape. Our team brings decades of combined experience across industries,</p>
              <p className="svp-intro__text">We deliver expert consulting and strategic guidance to help businesses thrive in a competitive landscape. Our team brings decades of combined experience across industries,</p>
              <p className="svp-intro__enquire-note">best possible advice and implementation support</p>
              <motion.button className="svp-enquire-btn" whileHover={{ scale: 1.03, x: 4 }} whileTap={{ scale: 0.97 }}>
                View more <FaArrowRight />
              </motion.button>
            </FadeUp>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

// ─── SECTION 3 · R&D Cards ────────────────────────────────────────────────────
function RDSection({ data }) {
  return (
    <section className="svp-rd">
      <Container>
        <Row className="align-items-center mb-5">
          <Col lg={8}>
            <FadeUp>
              <h2 className="svp-rd__title">{data.rdTitle}</h2>
            </FadeUp>
          </Col>
          <Col lg={4} className="text-lg-end mt-3 mt-lg-0">
            <FadeUp delay={0.1}>
              <motion.button className="svp-outline-btn" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                Talk to Us <FiArrowUpRight />
              </motion.button>
            </FadeUp>
          </Col>
        </Row>

        <Row className="g-4">
          {data.rdCards.map((card, i) => (
            <Col lg={4} md={6} key={i}>
              <ScaleIn delay={i * 0.1}>
                <motion.div
                  className="svp-rd__card"
                  whileHover={{ y: -8 }}
                  transition={{ type: "spring", stiffness: 320, damping: 22 }}
                >
                  <div className="svp-rd__icon">{card.icon}</div>
                  <h4 className="svp-rd__card-title">{card.title}</h4>
                  <p className="svp-rd__card-desc">{card.desc}</p>
                </motion.div>
              </ScaleIn>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}

// ─── SECTION 4 · Why Choose Us ────────────────────────────────────────────────
function WhyUsSection({ data }) {
  return (
    <section className="svp-whyus">
      <span className="svp-whyus__ring svp-whyus__ring--1" />
      <span className="svp-whyus__ring svp-whyus__ring--2" />

      <Container>
        <FadeUp>
          <p className="svp-whyus__eyebrow">→ WHY CHOOSE US FOR</p>
          <h2 className="svp-whyus__title">Research and Development</h2>
        </FadeUp>

        <Row className="g-4 mt-2">
          {data.whyUs.map((item, i) => (
            <Col lg={6} key={i}>
              <FadeUp delay={i * 0.08}>
                <div className="svp-whyus__card">
                  <div className="svp-whyus__icon-wrap">{item.icon}</div>
                  <div>
                    <h4 className="svp-whyus__card-title">{item.title}</h4>
                    <p className="svp-whyus__card-desc">{item.desc}</p>
                  </div>
                </div>
              </FadeUp>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}

// ─── SECTION 5 · Testimonials ─────────────────────────────────────────────────
function TestimonialsSection({ data }) {
  const [active, setActive] = useState(0);
  const total = data.testimonials.length;

  return (
    <section className="svp-testimonials">
      <Container>
        <FadeUp>
          <p className="svp-testimonials__eyebrow">→ CLIENTS TESTIMONIAL</p>
          <div className="svp-testimonials__header">
            <h2 className="svp-testimonials__title">Our Client Review</h2>
            <div className="svp-testimonials__nav">
              <button className="svp-testimonials__arrow" onClick={() => setActive((active - 1 + total) % total)}>
                <FaChevronLeft />
              </button>
              <button className="svp-testimonials__arrow" onClick={() => setActive((active + 1) % total)}>
                <FaChevronRight />
              </button>
            </div>
          </div>
        </FadeUp>

        <Row className="g-4 mt-2">
          {data.testimonials.map((t, i) => (
            <Col lg={4} md={6} key={i}>
              <motion.div
                className={`svp-testimonials__card${i === active ? " svp-testimonials__card--active" : ""}`}
                animate={{ opacity: i === active ? 1 : 0.65, scale: i === active ? 1 : 0.97 }}
                transition={{ duration: 0.35 }}
                onClick={() => setActive(i)}
              >
                <FaQuoteLeft className="svp-testimonials__quote-icon" />
                <div className="svp-testimonials__stars">
                  {[...Array(t.stars)].map((_, si) => <FaStar key={si} />)}
                </div>
                <p className="svp-testimonials__text">"{t.text}"</p>
                <div className="svp-testimonials__author">
                  <div className="svp-testimonials__avatar">{t.name.charAt(0)}</div>
                  <div>
                    <p className="svp-testimonials__name">{t.name}</p>
                    <p className="svp-testimonials__role">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            </Col>
          ))}
        </Row>

        <div className="svp-testimonials__dots">
          {data.testimonials.map((_, i) => (
            <button
              key={i}
              className={`svp-testimonials__dot${i === active ? " svp-testimonials__dot--active" : ""}`}
              onClick={() => setActive(i)}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}

// ─── SECTION 6 · Blog ─────────────────────────────────────────────────────────
function BlogSection({ data }) {
  return (
    <section className="svp-blog">
      <Container>
        <FadeUp>
          <p className="svp-blog__eyebrow">→ NEWS AND BLOG</p>
          <div className="svp-blog__header">
            <h2 className="svp-blog__title">Build your digital future</h2>
            <motion.button className="svp-outline-btn" whileHover={{ scale: 1.04 }}>
              View More <FiArrowUpRight />
            </motion.button>
          </div>
        </FadeUp>

        <Row className="g-4 mt-2">
          {data.blogs.map((post, i) => (
            <Col lg={4} md={6} key={i}>
              <FadeUp delay={i * 0.3}>
                <motion.div
                  className="svp-blog__card"
                  whileHover={{ y: -8 }}
                  transition={{ type: "spring", stiffness: 280, damping: 20 }}
                >
                    <Link to="#" className="svp-blog__lin">
                  <div className="svp-blog__img-wrap">
                    <img src={post.img} alt={post.title} className="svp-blog__img" />
                  </div>
                    </Link>
                  <div className="svp-blog__body">
                    <p className="svp-blog__date">{post.date}</p>
                    <h4 className="svp-blog__card-title">{post.title}</h4>
                  </div>
                </motion.div>
              </FadeUp>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}

// ─── SECTION 7 · Contact ──────────────────────────────────────────────────────
function ContactSection() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", service: "", message: "" });
  const [sent, setSent] = useState(false);
  const handleSubmit = () => { setSent(true); setTimeout(() => setSent(false), 3000); };

  return (
    <section className="svp-contact">
      <Container>
        <Row className="g-5">
          <Col lg={5}>
            <FadeUp>
              <p className="svp-contact__eyebrow">→ NEED ANY HELP?</p>
              <h2 className="svp-contact__title" style={{color:'#58300d'}}>Get in touch with us</h2>
              <p className="svp-contact__desc" style={{color:'#7a410fe3'}}>Get in touch today to start growing your digital presence with expert guidance.</p>

              <div className="svp-contact__items">
                {[
                  { icon: <FaPhoneAlt />,     label: "Have any question?", value: "+91-9212223317" },
                  { icon: <FaEnvelope />,     label: "Write email",        value: "info@innovativedigitalmarketing.in" },
                  { icon: <FaMapMarkerAlt />, label: "Our Location",       value: "Ramesh Nagar, New Delhi" },
                ].map((item, i) => (
                  <FadeUp delay={i * 0.08} key={i}>
                    <div className="svp-contact__item">
                      <div className="svp-contact__icon">{item.icon}</div>
                      <div>
                        <p className="svp-contact__item-label">{item.label}</p>
                        <p className="svp-contact__item-value">{item.value}</p>
                      </div>
                    </div>
                  </FadeUp>
                ))}
              </div>
            </FadeUp>
          </Col>

          <Col lg={7}>
            <FadeUp delay={0.1}>
              <div className="svp-contact__form">
                <h3 className="svp-contact__form-title">Send Message</h3>
                <Row className="g-3">
                  <Col md={6}>
                    <input className="svp-contact__field" placeholder="Full Name*" value={form.name}    onChange={e => setForm({ ...form, name: e.target.value })} />
                  </Col>
                  <Col md={6}>
                    <input className="svp-contact__field" placeholder="Phone*"     value={form.phone}   onChange={e => setForm({ ...form, phone: e.target.value })} type="tel" />
                  </Col>
                  <Col md={12}>
                    <input className="svp-contact__field" placeholder="Email*"     value={form.email}   onChange={e => setForm({ ...form, email: e.target.value })} type="email" />
                  </Col>
                  <Col md={12}>
                    <select className="svp-contact__field svp-contact__field--select" value={form.service} onChange={e => setForm({ ...form, service: e.target.value })}>
                      <option value="">Select Services</option>
                      <option>Digital Marketing</option>
                      <option>IT Consulting</option>
                      <option>Business Consulting</option>
                      <option>EdTech & AI</option>
                      <option>Finance Consulting</option>
                      <option>Property Consulting</option>
                    </select>
                  </Col>
                  <Col md={12}>
                    <textarea className="svp-contact__field svp-contact__field--textarea" placeholder="Message" rows={4} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} />
                  </Col>
                  <Col md={12}>
                    <motion.button
                      className={`svp-contact__submit${sent ? " svp-contact__submit--sent" : ""}`}
                      onClick={handleSubmit}
                      whileHover={!sent ? { scale: 1.02, y: -2 } : {}}
                      whileTap={{ scale: 0.98 }}
                    >
                      <FaPaperPlane />
                      <span>{sent ? "Message Sent!" : "Send Message"}</span>
                    </motion.button>
                  </Col>
                </Row>
              </div>
            </FadeUp>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

// ─── ROOT ─────────────────────────────────────────────────────────────────────
function ServiceViewPage() {
  const { slug } = useParams();
  const data = SERVICE_DATA[slug] || SERVICE_DATA["default"];

  return (
    <div className="service-view-page">
      <BreadcrumbBanner title={data.badge} />
      <HeroBanner data={data} />
      <IntroSection data={data} />
      <RDSection data={data} />
      <WhyUsSection data={data} />
      <TestimonialsSection data={data} />
      <BlogSection data={data} />
      <ContactSection />
    </div>
  );
}

export default ServiceViewPage;