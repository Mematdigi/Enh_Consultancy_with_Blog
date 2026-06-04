import React, { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence, } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import {
    FaArrowRight, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt,
    FaStar, FaQuoteLeft, FaFlask, FaLightbulb, FaSearch, FaRocket,
    FaShieldAlt, FaClock, FaHeadset, FaChevronLeft, FaChevronRight,
    FaPaperPlane, FaCheckCircle, FaBriefcase, FaGraduationCap, FaLaptopCode, FaWallet, FaBullseye,
    FaPlus, FaTools, FaHandshake,
} from "react-icons/fa";
import { FiArrowUpRight } from "react-icons/fi";
import api from "../../utils/api";

// ─── Shared variants ─────────────────────────────────────────────────────────
const fadeUp = { hidden: { opacity: 0, y: 44 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } } };
const fadeLeft = { hidden: { opacity: 0, x: -48 }, show: { opacity: 1, x: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } } };
const fadeRight = { hidden: { opacity: 0, x: 48 }, show: { opacity: 1, x: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } } };
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
const staggerSm = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } };
const cardV = { hidden: { opacity: 0, y: 40, scale: 0.95 }, show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } } };
const vp = { once: true, amount: 0.2 };
const vpMd = { once: true, amount: 0.3 };
const staggerContainer = { hidden: {}, show: { transition: { staggerChildren: 0.15 } } };

// ─── FadeUp wrapper ───────────────────────────────────────────────────────────
function FadeUp({ children, delay = 0, className = "" }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-80px" });
    return (
        <motion.div ref={ref} className={className}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}>
            {children}
        </motion.div>
    );
}

// ─── ScaleIn wrapper ──────────────────────────────────────────────────────────
function ScaleIn({ children, delay = 0 }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-60px" });
    return (
        <motion.div ref={ref}
            initial={{ opacity: 0, scale: 0.88 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}>
            {children}
        </motion.div>
    );
}

// ─── Section eyebrow ─────────────────────────────────────────────────────────
function Eyebrow({ children, gold = false }) {
    return (
        <motion.div variants={fadeUp} className={`svp-eyebrow-tag${gold ? " svp-eyebrow-tag--gold" : ""}`}>
            <span className="svp-eyebrow-dot" />{children}
        </motion.div>
    );
}

// ─── Service Data ─────────────────────────────────────────────────────────────
const SERVICE_DATA = {
    "default": {
        badge: "Our Services",
        headline: "Startup Consulting Services in Dubai for Early-Stage & Growing Businesses",
        tagline: "Most of Dubai's founders have ambition, ideas, and drive, but even the most promising businesses will fail before they start without the right plan, systems, and execution partner. In addition to general advice, ENH is a hands-on startup consulting firm in Dubai that develops the business models, growth systems, and operational foundations that transform early-stage concepts into scalable, fundable, and commercially successful enterprises throughout the UAE. Whether you're in the pre-launch phase, after your MVP, or stuck at your initial income limit, our startup consultant team in Dubai is built for one goal: guiding your business the proper way from the beginning.",
        cta: "Request a Quote",
        heroImg: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=600&q=80",
        introTitle: "Build, Launch & Scale Your Startup with Dubai's Most Trusted Startup Consultants",
        introText: "Most startup consulting companies in Dubai provide strategic guidance and exit assistance; ENH combines business strategy, artificial intelligence integration, and performance marketing to deliver hands-on startup business consulting in Dubai that moves from planning to execution while maintaining momentum. As reliable startup advising services in Dubai, we have assisted an EdTech company in scaling from nothing to 12,000 active members in eight months, aided an e-commerce business in realizing 2.8 times income expansion in six months, and regularly supplied customer acquisition costs 54% lower than market averages.",
        enquireText: "Get a Free 30 Min Consultation",
        rdTitle: "Our Startup Consulting Services in Dubai",
        rdCards: [
            {
                icon: <FaFlask />,
                title: "Business Strategy Consulting",
                desc: "We help Dubai entrepreneurs develop clear, defensible business models, strong market positioning, intelligent price tactics, and long-term development plans, especially for the realities and possibilities of the UAE and GCC markets. As your startup business counselor in Dubai, ENH provides the strategic clarity and market knowledge required to guarantee that every commercial decision you take from day one is based on evidence, competitive insight, and a growth strategy that is really implementable."
            },
            {
                icon: <FaLightbulb />,
                title: "Go-to-Market Consulting",
                desc: "To start in Dubai, you need more than just a great product; you need a clear go-to-market plan that targets the appropriate consumers, channels, positioning, and acquisition technique for the particular UAE market. Our startup's go-to-market plan for consulting in Dubai covers product launch planning, consumer acquisition, competitive positioning, marketing channel selection, and early development execution, ensuring that your introduction gains momentum rather than fading quietly."
            },
            {
                icon: <FaSearch />,
                title: "Growth Strategy Consulting for Startups",
                desc: "Your company has gained early traction, but revenue development has stopped, and you can't figure out why. ENH's startup growth consulting practice in Dubai aims to identify roadblocks and create scalable systems that overcome them. We act as a real growth partner, finding the best chances to improve your operational efficiency, pricing, retention, and acquisition of new customers, and then creating the systems that turn those chances into more money that can be measured and grows over time."
            },
            {
                icon: <FaFlask />,
                title: "Startup Branding Consulting",
                desc: "A strong, unique brand is not a luxury in Dubai's competitive and crowded startup scene; it is a commercial need that directly influences market differentiation from your first touchpoint, investor confidence, and customer trust. The Dubai branding practice of our startup consulting services includes the development of brand identity, messaging architecture, visual direction, tone of voice, and market positioning strategy. These components combine to give your startup a noticeable presence and effectively communicate its value with clarity and assurance."
            },
            {
                icon: <FaLightbulb />,
                title: "Startup Technology Consulting",
                desc: "One of the most costly and time-consuming errors a founder can make is selecting the wrong technology stack at the beginning of a startup's journey, and ENH's tech startup consulting practice in Dubai exists expressly to prevent it. Based on your product roadmap, team capability, budget, and the scalability needs of the UAE and GCC markets you are building for, we assist firms in choosing the proper technical foundation, including custom development decisions, SaaS tools, cloud infrastructure, and AI-powered automation."
            },
            {
                icon: <FaSearch />,
                title: "Startup Scaling Consulting",
                desc: "To expand your business in a way that is good for the environment, you need more than just a bigger marketing budget. You need the right operational infrastructure, team structures, automated systems, and clear strategic direction to handle more volume without the business collapsing. Our growth consulting and scaling business helps founders navigate the specific difficulties of growing infrastructure, recruiting frameworks, marketing operations, and financial systems throughout Dubai and the UAE, therefore guaranteeing your growth is lucrative, repeatable, and founded on foundations that remain robust as the numbers increase."
            },
        ],
        whyUs: [
            {
                icon: <FaClock />,
                title: "Technology & SaaS",
                desc: "We assist tech companies in Dubai in developing scalable product plans, AI-powered features, and systems for increasing recurring revenue that allow them to successfully compete in the rapidly expanding technological scene of the UAE and GCC."
            },
            {
                icon: <FaHeadset />,
                title: "E-Commerce",
                desc: "We assist Dubai e-commerce companies in creating successful customer acquisition strategies, enhancing their operational technology stack, and developing growth frameworks that enable sustainable expansion throughout the rapidly expanding online retail scene in the UAE."
            },
            {
                icon: <FaRocket />,
                title: "Real Estate",
                desc: "We help founders of real estate startups in Dubai with go-to-market strategy, technology platform selection, lead generation systems, and business models suited to one of the most competitive and profitable property markets in the world."
            },
            {
                icon: <FaShieldAlt />,
                title: "FinTech",
                desc: "We assist FinTech entrepreneurs in Dubai in negotiating the regulatory environment of the UAE, creating business models ready for investors, and formulating go-to-market plans that place new financial technology products for adoption in a sector actively embracing financial innovation."
            },
            {
                icon: <FaHeadset />,
                title: "EdTech",
                desc: "From product idea through commercial launch and expansion, we collaborate with EdTech startup founders, creating AI-powered learning platforms, go-to-market strategies, and user acquisition systems that have yielded results as high as 12,000 customers in eight months in the UAE market."
            },
            {
                icon: <FaHeadset />,
                title: "Healthcare",
                desc: "We assist creators of healthcare startups in Dubai with the creation of business models, regulatory navigation, technology platform approaches, and go-to-market planning, which is especially suited to the particular compliance criteria and commercial dynamics of the UAE healthcare industry."
            },
        ],
        testimonials: [
            {
                step: "Step 1 — Discovery & Opportunity Mapping",
                text: "We delve into your business vision, target market, competitors, current traction, and major challenges to identify the most valuable possibilities and the quickest path to significant commercial growth in the Dubai and UAE markets."
            },
            {
                step: "Step 2 — Strategy & Roadmap",
                text: "We develop a precise, prioritized startup strategy and implementation roadmap addressing business model, go-to-market approach, technical basis, branding direction, and measurable KPIs so you always know precisely what you are aiming toward and why every choice matters."
            },
            {
                step: "Step 3 — Execution & Implementation",
                text: "We work closely with you to put systems in place, run campaigns, use technology, and build the operational foundations that will turn your startup's plan from paper into a functioning, profitable business in the Dubai market."
            },
            {
                step: "Step 4 — Scaling & Growth",
                text: "We evaluate performance, concentrate on what is effective, get rid of what isn't, and develop the infrastructure for scaling, including teams, systems, marketing engines, and operational frameworks, that will take your business from initial traction to long-term, compounding growth throughout the UAE and GCC region."
            },
        ],
        whyEnh: [
            {
                num: "01",
                icon: <FaTools />,
                title: "EdTech Startup, Dubai — Zero to 12,000 Active Users in Eight Months",
                desc: "An EdTech company, ENH, worked from zero to 12,000 active users in eight months after platform launch, obtaining a customer acquisition cost that was 54% lower than the industry average for digital learning platforms in the UAE. Performance marketing, go-to-market execution, AI-powered personalization architecture, and a combined startup business approach of ENH yielded this outcome."
            },
            {
                num: "02",
                icon: <FaMapMarkerAlt />,
                title: "E-Commerce Startup, Dubai — 2.8x Revenue Growth in Six Months",
                desc: "The company saw a 2.8x increase in revenue in six months and a 67% fall in acquisition cost after ENH rebuilt the go-to-market plan, deployed AI-powered customer personalization, and rebuilt the acquisition system for a Dubai e-commerce business. The startup consulting project included business strategy, digital marketing counseling, technology integration, and operational efficiency improvements, all carried out as one integrated program providing results quicker than any single-service project could have done on its own."
            },
            {
                num: "03",
                icon: <FaHandshake />,
                title: "SaaS Startup, UAE — 43% Improvement in Trial-to-Paid Conversion",
                desc: "ENH worked with a SaaS company based in the United Arab Emirates on a focused strategy for starting up and optimizing the onboarding process. This included changing how we onboarded users, adjusting product pricing, and adding an AI-powered system to track user behavior. In the first three months after these changes were made, the rate of converting trials to paid subscriptions went up by 43%, and the monthly rate of people cancelling their subscriptions went down by 38%."
            },
        ],
        faqs: [
            {
                q: "What are startup consulting services?",
                a: "From business model development, go-to-market strategy, and branding to technology stack selection, AI integration, growth system design, and investor-ready financial planning, startup consulting services in Dubai cover the full range of strategic and execution support that early-stage and growing companies require to successfully build, launch, and scale.",
                img: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80",
                imgLabel: "Full-stack startup consulting"
            },
            {
                q: "How much does a startup consultant cost in Dubai?",
                a: "The price of a startup consultant in Dubai varies a lot based on the scope, stage of the company, and type of engagement—a focused go-to-market plan session costs much more than a full six-month development consulting retainer or a complete startup build program. ENH provides a completely free initial startup consultation with no obligation, followed by a clearly defined and fairly priced engagement tailored to your startup's stage, needs, and financial constraints.",
                img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80",
                imgLabel: "Transparent, flexible pricing"
            },
            {
                q: "What stages of startups do you work with?",
                a: "The startup consulting practice of ENH in Dubai helps companies at every level of development, including pre-revenue founders confirming their business model and go-to-market approach to growth-stage startups ready to grow their income, staff, and operations throughout the UAE and GCC.",
                img: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=800&q=80",
                imgLabel: "Every stage of startup growth"
            },
            {
                q: "How is ENH different from other startup consulting firms in Dubai?",
                a: "Unlike other startup consulting companies in Dubai, ENH has actual execution ability outside advising, an AI-first approach to startup development, a fully integrated strategy and marketing under one roof, startup-friendly flexible pricing, and a team with extensive UAE and GCC market knowledge that most international startup consultants do not bring to Dubai engagements.",
                img: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80",
                imgLabel: "Built for Dubai startups"
            },
            {
                q: "How long does a startup consulting engagement take in Dubai?",
                a: "The extent of a startup consulting project relies completely on the goals and scope behind it. Usually, a concentrated go-to-market approach or business model consulting project takes two to four weeks to produce a definite, executable plan. Generally spanning eight to twelve weeks, a comprehensive startup launch program blends strategy, branding, technology, and go-to-market execution.",
                img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80",
                imgLabel: "Flexible engagement timelines"
            },
        ],
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
    const [form, setForm] = useState({ name: "", phone: "", email: "", website: "", message: "" });
    const [status, setStatus] = useState("idle");
    const [focusedField, setFocusedField] = useState(null);

    const handleSubmit = async () => {
        if (!form.name || !form.phone || !form.email) return;
        setStatus("loading");
        try {
            await api.post("/enquiries", { ...form, source: "svp-hero" });
            setStatus("success"); setForm({ name: "", phone: "", email: "", website: "", message: "" });
            setTimeout(() => setStatus("idle"), 4000);
        } catch { setStatus("error"); setTimeout(() => setStatus("idle"), 3000); }
    };

    const bannerStagger = { hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } } };

    return (
        <section className="svp-hero">
            <motion.span className="svp-blob svp-blob--1"
                animate={{ x: [0, 28, -18, 0], y: [0, -22, 32, 0], scale: [1, 1.1, 0.94, 1] }}
                transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }} />
            <motion.span className="svp-blob svp-blob--2"
                animate={{ x: [0, -24, 20, 0], y: [0, 30, -14, 0], scale: [1, 0.9, 1.08, 1] }}
                transition={{ duration: 17, repeat: Infinity, ease: "easeInOut", delay: 2 }} />
            <motion.span className="svp-blob svp-blob--3"
                animate={{ x: [0, 22, -28, 0], y: [0, -28, 12, 0], scale: [1, 1.14, 0.9, 1] }}
                transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 5 }} />

            <Container>
                <Row className="align-items-center g-4">
                    <Col lg={7}>
                        <motion.div variants={bannerStagger} initial="hidden" animate="show">

                            <motion.h1 className="svp-hero__h1" variants={fadeLeft} style={{ color: "#422308", lineHeight: 1.1, fontSize: "2.4rem" }}>
                                {data.headline}
                            </motion.h1>
                            <motion.p className="svp-hero__tagline" variants={fadeUp} style={{ color: "#422308" }}>
                                {data.tagline}
                            </motion.p>

                            <motion.div className="svp-hero__cta-bar" variants={fadeUp} style={{ background: "#ffae45e0" }}>
                                <motion.span className="svp-hero__cta-text"
                                    animate={{ opacity: [0.85, 1, 0.85] }} transition={{ duration: 2.5, repeat: Infinity }}>
                                    <Link to="/contact" style={{ color: "inherit", textDecoration: "none" }}>
                                        {data.cta}
                                    </Link>
                                </motion.span>
                            </motion.div>
                        </motion.div>
                    </Col>

                    <Col lg={5}>
                        <motion.div className="svp-hero__form"
                            initial={{ opacity: 0, x: 60, rotateY: 5 }}
                            animate={{ opacity: 1, x: 0, rotateY: 0 }}
                            transition={{ duration: 0.85, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                            style={{ perspective: 1000 }}>
                            <div className="svp-hero__form-accent" />
                            <div className="svp-hero__form-shimmer" aria-hidden="true" />

                            <motion.h3 className="svp-hero__form-title"
                                initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4, duration: 0.5 }}>
                                Talk to An Expert
                            </motion.h3>
                            <motion.p className="svp-hero__form-sub"
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                transition={{ delay: 0.5, duration: 0.4 }}>
                                Free 30-min consultation, no strings attached
                            </motion.p>

                            {[
                                [{ name: "name", placeholder: "Your Name*" }, { name: "phone", placeholder: "Your Phone Number*", type: "tel" }],
                                [{ name: "email", placeholder: "Your E-Mail*", type: "email" }, { name: "website", placeholder: "Your Website" }],
                            ].map((row, ri) => (
                                <motion.div key={ri} className="svp-hero__form-row"
                                    initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 + ri * 0.1, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}>
                                    {row.map(f => (
                                        <div key={f.name} className={`svp-input-wrap${focusedField === f.name ? " svp-input-wrap--focused" : ""}`}>
                                            <input className="svp-hero__input" placeholder={f.placeholder}
                                                value={form[f.name]} type={f.type || "text"}
                                                onChange={e => setForm({ ...form, [f.name]: e.target.value })}
                                                onFocus={() => setFocusedField(f.name)}
                                                onBlur={() => setFocusedField(null)}
                                                disabled={status === "loading"} />
                                            <motion.div className="svp-input-focus-bar"
                                                animate={{ scaleX: focusedField === f.name ? 1 : 0, opacity: focusedField === f.name ? 1 : 0 }}
                                                transition={{ duration: 0.25 }} />
                                        </div>
                                    ))}
                                </motion.div>
                            ))}

                            <motion.div className="svp-input-wrap"
                                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.72, duration: 0.4 }}>
                                <textarea className="svp-hero__input svp-hero__textarea"
                                    placeholder="Message..." value={form.message}
                                    onChange={e => setForm({ ...form, message: e.target.value })}
                                    rows={3} disabled={status === "loading"} />
                            </motion.div>

                            <motion.button className="svp-hero__form-btn"
                                onClick={handleSubmit}
                                disabled={status === "loading" || status === "success"}
                                whileHover={status === "idle" ? { scale: 1.02, y: -2, boxShadow: "0 12px 32px rgba(212,91,8,0.45)" } : {}}
                                whileTap={{ scale: 0.97 }}
                                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.82, duration: 0.4 }}>
                                <AnimatePresence mode="wait">
                                    {status === "loading" && <motion.span key="l" className="svp-btn-state" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}><FaPaperPlane className="svp-spin" /> Sending...</motion.span>}
                                    {status === "success" && <motion.span key="s" className="svp-btn-state" initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ type: "spring", stiffness: 280 }}><FaCheckCircle /> Request Sent!</motion.span>}
                                    {status === "error" && <motion.span key="e" className="svp-btn-state" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}><FaPaperPlane /> Try Again</motion.span>}
                                    {status === "idle" && <motion.span key="i" className="svp-btn-state" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}><FaPaperPlane /> Talk to An Expert</motion.span>}
                                </AnimatePresence>
                            </motion.button>
                        </motion.div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
}

// ─── SECTION 2 · Intro ────────────────────────────────────────────────────────
function IntroSection({ data }) {
    return (
        <section className="svp-intro" style={{ background: "linear-gradient(135deg,#fff4e1 0%,#fdedce 60%,#ffd78a 100%)" }}>
            <FloatingParticles count={8} />
            <Container>
                {[
                    {
                        img: data.heroImg,
                        title: data.introTitle,
                        text: data.introText,
                        text2: data.introText2,
                        note: data.enquireText,
                        btnLabel: "Enquire Now",
                        decoClass: "",
                        reverse: false,
                    }
                ].map((block, bi) => (
                    <Row key={bi}
                        className={`align-items-center g-4 g-md-5 mt-3 mt-md-5 p-3 svp-intro-row`}
                        style={{ border: "1px solid rgba(212,91,8,0.28)", borderRadius: 14, boxShadow: "0 4px 16px rgba(212,91,8,0.14)" }}>
                        <Col lg={6} className={block.reverse ? "order-lg-2" : ""}>
                            <FadeUp>
                                <motion.div className="svp-intro__img-wrap"
                                    whileHover={{ scale: 1.02 }} transition={{ duration: 0.35 }}>
                                    <motion.img src={block.img} alt={block.title} className="svp-intro__img"
                                        initial={{ scale: 1.05, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }}
                                        viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }} />
                                    <div className={`svp-intro__img-deco ${block.decoClass}`} />
                                    <div className="svp-intro__img-shine" aria-hidden="true" />
                                </motion.div>
                            </FadeUp>
                        </Col>
                        <Col lg={6} className={block.reverse ? "order-lg-1" : ""}>
                            <FadeUp delay={0.1}>
                                <motion.div initial="hidden" whileInView="show" viewport={vp} variants={stagger}>
                                    <Eyebrow>Our Services</Eyebrow>
                                    <motion.h2 className="svp-intro__title" variants={fadeLeft}>{block.title}</motion.h2>
                                    <motion.p className="svp-intro__text" variants={fadeUp}>{block.text}</motion.p>
                                    <motion.p className="svp-intro__text" variants={fadeUp}>{block.text2}</motion.p>
                                    <motion.p className="svp-intro__enquire-note" variants={fadeUp}>{block.note}</motion.p>
                                    <motion.div variants={fadeUp}>
                                        <motion.button className="svp-enquire-btn"
                                            whileHover={{ scale: 1.04, x: 5, boxShadow: "0 8px 24px rgba(212,91,8,0.35)" }}
                                            whileTap={{ scale: 0.97 }}>
                                            {block.btnLabel} <FaArrowRight />
                                        </motion.button>
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

// ─── SECTION 3 · R&D Cards ────────────────────────────────────────────────────
function RDSection({ data }) {
    const [hovered, setHovered] = useState(null);

    return (
        <section className="svp-rd">
            <FloatingParticles count={6} color="#532a06" />
            <Container>
                <motion.div initial="hidden" whileInView="show" viewport={vpMd} variants={stagger}>
                    <Row className="align-items-center mb-4 mb-md-5">
                        <Col lg={12}>
                            <Eyebrow>Strategy and Roadmap</Eyebrow>
                            <motion.h2 className="svp-rd__title" style={{ color: '#532a06' }}>{data.rdTitle}</motion.h2>
                            <p variants={fadeUp} style={{ color: '#532a06' }} className='mt-3'>
                                ENH provides customized, execution-focused startup consulting services in Dubai across every stage of your journey—from early idea validation and business model development to go-to-market planning, technology selection, branding, and full-scale growth systems. Every engagement is based on your particular stage, industry, and measurable development goals rather than a generalized consulting framework meant for another company. Our tech startup consulting in Dubai and our consulting practice for startups cover everything to help you create faster and smarter than your competition.
                            </p>
                        </Col>
                    </Row>
                </motion.div>

                <motion.div initial="hidden" whileInView="show" viewport={vp} variants={stagger}>
                    <Row className="g-4">
                        {data.rdCards.map((card, i) => (
                            <Col lg={4} md={6} key={i}>
                                <motion.div variants={cardV}
                                    onHoverStart={() => setHovered(i)} onHoverEnd={() => setHovered(null)}>
                                    <motion.div className="svp-rd__card"
                                        animate={{ boxShadow: hovered === i ? "0 20px 52px rgba(133,86,25,0.18)" : "0 4px 6px rgba(133,86,25,0.06)" }}
                                        whileHover={{ y: -10, transition: { type: "spring", stiffness: 300, damping: 18 } }}>
                                        <motion.div className="svp-rd__icon"
                                            animate={{ backgroundColor: hovered === i ? "linear-gradient(135deg,rgb(235,174,95),#d45b08)" : "rgba(235,174,95,0.2)" }}
                                            whileHover={{ rotate: -8, scale: 1.12, backgroundColor: "rgb(235,174,95)", color: "#fff" }}
                                            transition={{ type: "spring", stiffness: 280, damping: 14 }}>
                                            {card.icon}
                                        </motion.div>
                                        <h4 className="svp-rd__card-title">{card.title}</h4>
                                        <p className="svp-rd__card-desc">{card.desc}</p>

                                        {/* Animated progress bar on hover */}
                                        <motion.div className="svp-rd__card-bar"
                                            animate={{ scaleX: hovered === i ? 1 : 0 }}
                                            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }} />
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
            icon: <FaLightbulb />,
            title: "Early-Stage Founders",
            description: "We support first-time and serial entrepreneurs in Dubai in validating their business model, developing their go-to-market plan, and establishing the operational groundwork required for a confident launch rather than depending on pricey assumptions.",
            number: "01"
        },
        {
            icon: <FaLaptopCode />,
            title: "Tech Startups",
            description: "We collaborate with tech startup consulting clients across SaaS, artificial intelligence, and platform companies to develop scalable technology strategies, AI-driven product features, and growth systems fit for the particular dynamics of Dubai's fast-changing tech scene.",
            number: "02"
        },
        {
            icon: <FaBriefcase />,
            title: "E-Commerce Startups",
            description: "We assist e-commerce founders in Dubai in developing customer acquisition systems, refining their technological infrastructure, and establishing operational frameworks that facilitate profitable growth free from the fulfillment and margin difficulties that plague so many early-stage e-commerce businesses.",
            number: "03"
        },
        {
            icon: <FaWallet />,
            title: "SaaS Startups",
            description: "In the UAE market, we collaborate with SaaS founders on product-market fit validation, pricing approach, onboarding optimization, churn reduction, and the growth systems that convert a SaaS company from early adopters into a really scalable recurring revenue engine.",
            number: "04"
        },
        {
            icon: <FaGraduationCap />,
            title: "Foreign Entrepreneurs Entering Dubai",
            description: "We help international founders set up businesses in Dubai by providing UAE market intelligence, advice on free zone setup, navigating cultural and regulatory aspects, and creating a go-to-market strategy specifically tailored to the unique commercial dynamics of launching a foreign business in the UAE.",
            number: "05"
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
                        What We Offer
                    </motion.div>
                    <motion.div className="services-title-row" variants={fadeUp}>
                        <h2 className="services-main-title">
                            <span className="title-accent" style={{ color: '#8a5520' }}>Who We Work With</span>
                        </h2>
                    </motion.div>
                    <motion.p className="services-subtitle mt-4" variants={fadeUp}>
                        ENH's startup consulting services in Dubai are designed to assist founders and startup teams at every level of their journey, from the initial idea validation stage to growth-stage expansion throughout the UAE and GCC. We collaborate with these individuals and address each particular difficulty.
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
                                <div className="card-glow" />
                            </motion.div>
                        </motion.div>
                    ))}
                </motion.div>

                <motion.div variants={fadeUp}>
                    <motion.button className="svp-enquire-btn mt-4 mt-md-5"
                        whileHover={{ scale: 1.04, x: 5, boxShadow: "0 8px 24px rgba(212,91,8,0.35)" }}
                        whileTap={{ scale: 0.97 }}>
                        <Link to="/contact" style={{ color: "inherit", textDecoration: "none" }}>
                            Let's Discuss Your Requirements
                        </Link>
                    </motion.button>
                </motion.div>
            </Container>
        </section>
    );
}

function Service2() {
    const serviceList = [
        {
            icon: <FaBullseye />,
            title: "AI-First Startup Advantage",
            description: "We are the only startup consulting firm in Dubai that incorporates artificial intelligence tools, automation, and intelligent systems into every startup engagement as a fundamental aspect of your growth plan, rather than an elective add-on. Since we developed our own unique artificial intelligence tools, we know precisely what it takes to develop, implement, and scale them successfully when we suggest it for your business.",
            number: "01"
        },
        {
            icon: <FaTools />,
            title: "Strategy, Marketing, and Technology Under One Roof",
            description: "One integrated team under one roof offers business strategy, AI integration, digital marketing, branding, and technology consulting to help your business develop concurrently. Working with ENH as your only integrated partner for startup business consulting in Dubai eliminates the fragmentation and misalignment that results from juggling several consultants, agencies, and advisers.",
            number: "02"
        },
        {
            icon: <FaRocket />,
            title: "Hands-On Execution Not Just Advisory",
            description: "We do not present a business strategy and then depart; instead, ENH remains engaged during the implementation, offering practical execution assistance that converts concepts into operational systems, live campaigns, and quantifiable commercial success. ENH gives you the strategic insight of a consulting company and the execution capacity of an in-house team at a fraction of the expense of constructing that team yourself.",
            number: "03"
        },
        {
            icon: <FaWallet />,
            title: "Startup-Friendly Pricing and Flexible Engagement",
            description: "The pricing approach for our startup consulting services in Dubai is designed to reflect the realities of early-stage companies, offering adaptable engagement models, clear pricing, and no minimum retainer requirements that would put a burden on a startup's financial resources.",
            number: "04"
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
                        What We Offer
                    </motion.div>
                    <motion.div className="services-title-row" variants={fadeUp}>
                        <h2 className="services-main-title">
                            <span className="title-accent" style={{ color: '#8a5520' }}>Why Choose ENH as Your Startup Consultant in Dubai</span>
                        </h2>
                    </motion.div>
                    <motion.p className="services-subtitle mt-4" variants={fadeUp}>
                        Most startup consultants in Dubai provide guidance in a conference room and let you handle the implementation on your own. However, ENH is the startup partner that stays with you throughout the entire process, from planning to achieving results. This approach is what makes us fundamentally different from any other startup consulting firm in the Dubai market.
                    </motion.p>
                </motion.div>

                <motion.div
                    className="services-grid"
                    style={{ gridTemplateColumns: "repeat(2,1fr)" }}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.1 }}
                    variants={staggerContainer}
                >
                    {serviceList.map((service, index) => (
                        <motion.div
                            key={index}
                            className="service-card-wrap"
                        >
                            <motion.div
                                className="service-card"
                                whileHover={{ y: -10, transition: { type: "spring", stiffness: 300, damping: 20 } }}
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

// ─── SECTION 4 · Why Choose Us ────────────────────────────────────────────────
function WhyUsSection({ data }) {
    return (
        <section className="svp-whyus">
            <motion.span className="svp-whyus__ring svp-whyus__ring--1"
                animate={{ rotate: [0, 360] }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }} />
            <motion.span className="svp-whyus__ring svp-whyus__ring--2"
                animate={{ rotate: [0, -360] }} transition={{ duration: 28, repeat: Infinity, ease: "linear" }} />
            <FloatingParticles count={8} color="rgba(235,174,95,0.08)" />

            <Container>
                <motion.div initial="hidden" whileInView="show" viewport={vpMd} variants={stagger}>
                    <Eyebrow gold>Industries We Serve</Eyebrow>
                    <motion.h2 className="svp-whyus__title" variants={fadeLeft}>Industries We Serve with Startup Consulting in Dubai</motion.h2>
                    <motion.p className="mt-3 text-white" variants={fadeUp}>
                        With in-depth industry expertise that guarantees every plan, system, and growth framework we develop is suited to the particular market dynamics, regulatory environment, and competitive environment of your industry, ENH's startup consulting business in Dubai helps entrepreneurs across industries, driving the most fascinating and high-growth possibilities in the UAE and GCC economies.
                    </motion.p>
                </motion.div>

                <motion.div initial="hidden" whileInView="show" viewport={vp} variants={stagger}>
                    <Row className="g-4 mt-2">
                        {data.whyUs.map((item, i) => (
                            <Col lg={6} key={i}>
                                <motion.div className="svp-whyus__card" variants={cardV}
                                    whileHover={{
                                        borderColor: "rgb(235,174,95)",
                                        backgroundColor: "rgba(235,174,95,0.06)",
                                        x: 4,
                                        transition: { duration: 0.25 },
                                    }}>
                                    <motion.div className="svp-whyus__icon-wrap"
                                        whileHover={{ backgroundColor: "rgb(235,174,95)", color: "#fff", rotate: -8, scale: 1.1 }}
                                        transition={{ type: "spring", stiffness: 280, damping: 14 }}>
                                        {item.icon}
                                    </motion.div>
                                    <div>
                                        <h4 className="svp-whyus__card-title">{item.title}</h4>
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

// ─── SECTION 5 · Testimonials ─────────────────────────────────────────────────
function TestimonialsSection({ data }) {
    const [active, setActive] = useState(0);
    const total = data.testimonials.length;

    // auto-advance
    useEffect(() => {
        const t = setInterval(() => setActive(p => (p + 1) % total), 5000);
        return () => clearInterval(t);
    }, [total]);

    return (
        <section className="svp-testimonials">
            <Container>
                <motion.div initial="hidden" whileInView="show" viewport={vpMd} variants={stagger}>
                    <Eyebrow>Startup Consulting Process</Eyebrow>
                    <motion.div className="svp-testimonials__header" variants={fadeUp}>
                        <h2 className="svp-testimonials__title" style={{ color: '#532a06' }}>Our Startup Consulting Process</h2>
                        <div className="svp-testimonials__nav">
                            {[-1, 1].map(dir => (
                                <motion.button key={dir} className="svp-testimonials__arrow"
                                    onClick={() => setActive(p => (p + dir + total) % total)}
                                    whileHover={{ scale: 1.12, backgroundColor: "rgb(235,174,95)", color: "#fff", borderColor: "rgb(235,174,95)" }}
                                    whileTap={{ scale: 0.88 }}>
                                    {dir === -1 ? <FaChevronLeft /> : <FaChevronRight />}
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>
                    <p className="mt-4" style={{ color: '#532a06' }}>In Dubai, our startup consulting approach is designed for speed, clarity, and commercial traction, guiding you from opportunity mapping to quantifiable growth results free from the delays, confusion, and squandered investment resulting from badly planned startup projects.</p>
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
                                whileHover={{ y: i === active ? -8 : -4, boxShadow: "0 14px 36px rgba(133,86,25,0.14)" }}>
                                <h3 className="svp-testimonials__step">{t.step}</h3>
                                <p className="svp-testimonials__text">"{t.text}"</p>
                            </motion.div>
                        </Col>
                    ))}
                </Row>

                <div className="svp-testimonials__dots">
                    {data.testimonials.map((_, i) => (
                        <motion.button key={i}
                            className={`svp-testimonials__dot${i === active ? " svp-testimonials__dot--active" : ""}`}
                            onClick={() => setActive(i)}
                            whileHover={{ scale: 1.4 }} whileTap={{ scale: 0.8 }} />
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
        api.get('/posts?limit=3').then(({ data }) => setPosts(data.data || [])).catch(() => { }).finally(() => setLoading(false));
    }, []);

    const fmt = (d) => new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

    return (
        <section className="svp-blog">
            <Container>
                <motion.div initial="hidden" whileInView="show" viewport={vpMd} variants={stagger}>
                    <Eyebrow>News &amp; Blog</Eyebrow>
                    <motion.div className="svp-blog__header" variants={fadeUp}>
                        <h2 className="svp-blog__title">Build your digital future</h2>
                        <Link to="/blog">
                            <motion.button className="svp-outline-btn"
                                whileHover={{ scale: 1.05, y: -2, backgroundColor: "rgb(235,174,95)", color: "#fff", borderColor: "rgb(235,174,95)" }}
                                whileTap={{ scale: 0.97 }}>
                                View More <FiArrowUpRight />
                            </motion.button>
                        </Link>
                    </motion.div>
                </motion.div>

                <Row className="g-4 mt-2">
                    {loading ? [...Array(3)].map((_, i) => (
                        <Col lg={4} md={6} key={i}>
                            <div className="svp-blog__card svp-blog__card--skeleton">
                                <div className="svp-blog__img-wrap" style={{ background: "#e8ddd0", height: 220 }} />
                                <div className="svp-blog__body" style={{ padding: 16 }}>
                                    <div style={{ height: 11, background: "#e8ddd0", borderRadius: 4, width: "45%", marginBottom: 10 }} />
                                    <div style={{ height: 15, background: "#e8ddd0", borderRadius: 4, width: "85%", marginBottom: 6 }} />
                                    <div style={{ height: 15, background: "#e8ddd0", borderRadius: 4, width: "65%" }} />
                                </div>
                            </div>
                        </Col>
                    )) : posts.length === 0 ? (
                        <Col><p style={{ color: "#888", textAlign: "center", padding: "40px 0" }}>No blog posts found.</p></Col>
                    ) : posts.map((post, i) => (
                        <Col lg={4} md={6} key={post._id}>
                            <FadeUp delay={i * 0.12}>
                                <motion.div className="svp-blog__card"
                                    whileHover={{ y: -10, boxShadow: "0 20px 52px rgba(133,86,25,0.16)", transition: { type: "spring", stiffness: 280, damping: 18 } }}>
                                    <Link to={`/blog/${post.slug}`} className="svp-blog__lin">
                                        <div className="svp-blog__img-wrap">
                                            <motion.img
                                                src={post.featuredImage?.url || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&q=80'}
                                                alt={post.featuredImage?.alt || post.title}
                                                className="svp-blog__img"
                                                whileHover={{ scale: 1.08 }} transition={{ duration: 0.5 }} />
                                        </div>
                                    </Link>
                                    <div className="svp-blog__body">
                                        <p className="svp-blog__date">
                                            {post.category?.name && (
                                                <span style={{ color: "#d45b08", marginRight: 8, fontWeight: 600 }}>{post.category.name}</span>
                                            )}
                                            {fmt(post.createdAt)}
                                        </p>
                                        <h4 className="svp-blog__card-title">
                                            <Link to={`/blog/${post.slug}`} style={{ color: "inherit", textDecoration: "none" }}>{post.title}</Link>
                                        </h4>
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

// ─── SECTION 7 · Why Choose ENH ──────────────────────────────────────────────
function WhyChooseENH({ data }) {
    return (
        <section className="svp-why-enh">
            <FloatingParticles count={8} color="rgba(235,174,95,0.12)" />
            <motion.span className="svp-why-enh__blob svp-why-enh__blob--1"
                animate={{ x: [0, 20, -10, 0], y: [0, -18, 14, 0], scale: [1, 1.08, 0.95, 1] }}
                transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }} />
            <motion.span className="svp-why-enh__blob svp-why-enh__blob--2"
                animate={{ x: [0, -16, 12, 0], y: [0, 14, -10, 0], scale: [1, 0.92, 1.06, 1] }}
                transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 3 }} />

            <Container>
                <motion.div initial="hidden" whileInView="show" viewport={vpMd} variants={stagger}
                    className="svp-why-enh__header">
                    <Eyebrow>Why ENH</Eyebrow>
                    <motion.h2 className="svp-why-enh__title" variants={fadeLeft}>
                        Real Results from Our Startup Consulting Services in Dubai
                    </motion.h2>
                    <motion.p className="svp-why-enh__lead" variants={fadeUp}>
                        What our customers have already developed and accomplished with our assistance is the strongest validation of ENH's startup consulting services in Dubai. Here are three actual outcomes from our tech startup consulting and startup growth counseling projects that show what hands-on, execution-focused startup consulting really provides.
                    </motion.p>
                </motion.div>

                <motion.div initial="hidden" whileInView="show" viewport={vp} variants={stagger}>
                    <Row className="g-4">
                        {data.whyEnh.map((reason, i) => (
                            <Col lg={4} md={6} key={i}>
                                <motion.div className="svp-why-enh__card" variants={cardV}
                                    whileHover={{ y: -10, transition: { type: "spring", stiffness: 280, damping: 18 } }}>
                                    <div className="svp-why-enh__card-head">
                                        <motion.div className="svp-why-enh__icon"
                                            whileHover={{ rotate: -8, scale: 1.12 }}
                                            transition={{ type: "spring", stiffness: 280, damping: 14 }}>
                                            {reason.icon}
                                        </motion.div>
                                        <span className="svp-why-enh__num">{reason.num}</span>
                                    </div>
                                    <h4 className="svp-why-enh__card-title">{reason.title}</h4>
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
                        <motion.div initial="hidden" whileInView="show" viewport={vpMd}
                            variants={stagger} className="svp-faq__intro">
                            <Eyebrow>FAQ</Eyebrow>
                            <motion.h2 className="svp-faq__title" variants={fadeLeft}>
                                Frequently Asked Questions About Startup Consulting in Dubai
                            </motion.h2>

                            {/* Dummy image preview — swaps with active FAQ */}
                            <motion.div className="svp-faq__media" variants={fadeUp}>
                                <AnimatePresence mode="wait">
                                    <motion.div key={openIdx >= 0 ? openIdx : "default"}
                                        className="svp-faq__media-inner"
                                        initial={{ opacity: 0, scale: 1.04 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.97 }}
                                        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}>
                                        <img src={activeFaq?.img}
                                            alt={activeFaq?.imgLabel || "FAQ visual"}
                                            className="svp-faq__media-img" />
                                        <div className="svp-faq__media-overlay" />
                                        <div className="svp-faq__media-tag">
                                            <span className="svp-faq__media-dot" />
                                            Q{(openIdx >= 0 ? openIdx : 0) + 1}
                                        </div>
                                        <p className="svp-faq__media-label">{activeFaq?.imgLabel}</p>
                                    </motion.div>
                                </AnimatePresence>
                            </motion.div>

                            <motion.p className="svp-faq__lead" variants={fadeUp}>
                                Everything you need to know before partnering with a startup consulting firm in Dubai.
                            </motion.p>
                            <motion.div className="svp-faq__cta-block" variants={fadeUp}>
                                <Link to="/contact" style={{ textDecoration: "none" }}>
                                    <motion.button className="svp-enquire-btn"
                                        whileHover={{ scale: 1.04, x: 5, boxShadow: "0 8px 24px rgba(212,91,8,0.35)" }}
                                        whileTap={{ scale: 0.97 }}>
                                        Talk to an Expert <FaArrowRight />
                                    </motion.button>
                                </Link>
                            </motion.div>
                        </motion.div>
                    </Col>

                    <Col lg={7}>
                        <motion.div initial="hidden" whileInView="show" viewport={vp}
                            variants={stagger} className="svp-faq__list">
                            {data.faqs.map((faq, i) => {
                                const isOpen = openIdx === i;
                                return (
                                    <motion.div key={i} variants={fadeUp}
                                        className={`svp-faq__item${isOpen ? " svp-faq__item--open" : ""}`}>
                                        <button type="button"
                                            className="svp-faq__q"
                                            onClick={() => setOpenIdx(isOpen ? -1 : i)}
                                            aria-expanded={isOpen}>
                                            <span className="svp-faq__q-text">{faq.q}</span>
                                            <motion.span className="svp-faq__q-icon"
                                                animate={{ rotate: isOpen ? 45 : 0 }}
                                                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}>
                                                <FaPlus />
                                            </motion.span>
                                        </button>
                                        <AnimatePresence initial={false}>
                                            {isOpen && (
                                                <motion.div key="answer"
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: "auto", opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                                                    className="svp-faq__a-wrap">
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

// ─── SECTION 9 · Contact ──────────────────────────────────────────────────────
function ContactSection() {
    const [form, setForm] = useState({ name: "", phone: "", email: "", service: "", message: "" });
    const [sent, setSent] = useState(false);
    const [loading, setLoading] = useState(false);
    const [focusedField, setFocusedField] = useState(null);

    const handleSubmit = async () => {
        if (!form.name || !form.phone || !form.email) return;
        setLoading(true);
        try {
            await api.post("/enquiries", { ...form, source: "svp-contact" });
            setSent(true); setForm({ name: "", phone: "", email: "", service: "", message: "" });
            setTimeout(() => setSent(false), 3000);
        } catch { } finally { setLoading(false); }
    };

    const contactItems = [
        { icon: <FaPhoneAlt />, label: "Have any question?", value: "+971 505913055" },
        { icon: <FaEnvelope />, label: "Write email", value: "contact@enh.consulting" },
        { icon: <FaMapMarkerAlt />, label: "Our Location", value: "DSO-IFZA, IFZA Properties, Dubai Silicon Oasis, Dubai" },
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
                        <motion.div initial="hidden" whileInView="show" viewport={vpMd} variants={stagger}>
                            <Eyebrow>Get in touch</Eyebrow>
                            <motion.p className="svp-contact__eyebrow" variants={fadeUp}>→ NEED ANY HELP?</motion.p>
                            <motion.h2 className="svp-contact__title" variants={fadeLeft} style={{ color: "#58300d" }}>
                                Get in touch with us
                            </motion.h2>
                            <motion.p className="svp-contact__desc" variants={fadeUp} style={{ color: "#7a410fe3" }}>
                                Get in touch today to start growing your startup with expert guidance.
                            </motion.p>

                            <motion.div className="svp-contact__items" variants={staggerSm}>
                                {contactItems.map((item, i) => (
                                    <motion.div key={i} className="svp-contact__item" variants={fadeUp}
                                        whileHover={{ x: 6, backgroundColor: "rgba(235,174,95,0.06)", transition: { duration: 0.2 } }}>
                                        <motion.div className="svp-contact__icon"
                                            whileHover={{ backgroundColor: "rgb(235,174,95)", color: "#fff", scale: 1.08 }}
                                            transition={{ duration: 0.25 }}>
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
                        <motion.div className="svp-contact__form"
                            initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }}
                            viewport={vp} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
                            <div className="svp-contact__form-shimmer" aria-hidden="true" />
                            <h3 className="svp-contact__form-title">Send Message</h3>
                            <Row className="g-3">
                                {fields.map((f, i) => (
                                    <Col md={f.md} key={f.name}>
                                        <motion.div
                                            className={`svp-contact-input-wrap${focusedField === f.name ? " svp-contact-input-wrap--focused" : ""}`}
                                            initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
                                            viewport={vp} transition={{ delay: 0.1 + i * 0.07, duration: 0.4 }}
                                            whileHover={{ scale: 1.01 }}>
                                            <input className="svp-contact__field" placeholder={f.placeholder}
                                                value={form[f.name]} type={f.type}
                                                onChange={e => setForm({ ...form, [f.name]: e.target.value })}
                                                onFocus={() => setFocusedField(f.name)}
                                                onBlur={() => setFocusedField(null)} />
                                            <motion.div className="svp-contact-focus-bar"
                                                animate={{ scaleX: focusedField === f.name ? 1 : 0, opacity: focusedField === f.name ? 1 : 0 }}
                                                transition={{ duration: 0.25 }} />
                                        </motion.div>
                                    </Col>
                                ))}
                                <Col md={12}>
                                    <motion.div whileHover={{ scale: 1.01 }}
                                        initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
                                        viewport={vp} transition={{ delay: 0.31, duration: 0.4 }}>
                                        <select className="svp-contact__field svp-contact__field--select"
                                            value={form.service} onChange={e => setForm({ ...form, service: e.target.value })}>
                                            <option value="">Select Services</option>
                                            <option>Digital Marketing</option>
                                            <option>IT Consulting</option>
                                            <option>Business Consulting</option>
                                            <option>EdTech &amp; AI</option>
                                            <option>Finance Consulting</option>
                                            <option>Property Consulting</option>
                                        </select>
                                    </motion.div>
                                </Col>
                                <Col md={12}>
                                    <motion.div whileHover={{ scale: 1.01 }}
                                        initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
                                        viewport={vp} transition={{ delay: 0.38, duration: 0.4 }}>
                                        <textarea className="svp-contact__field svp-contact__field--textarea"
                                            placeholder="Message" rows={4} value={form.message}
                                            onChange={e => setForm({ ...form, message: e.target.value })} />
                                    </motion.div>
                                </Col>
                                <Col md={12}>
                                    <motion.button
                                        className={`svp-contact__submit${sent ? " svp-contact__submit--sent" : ""}`}
                                        onClick={handleSubmit}
                                        whileHover={!sent && !loading ? { scale: 1.02, y: -2, boxShadow: "0 12px 28px rgba(212,91,8,0.35)" } : {}}
                                        whileTap={{ scale: 0.97 }}
                                        disabled={sent || loading}
                                        initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
                                        viewport={vp} transition={{ delay: 0.45, duration: 0.4 }}>
                                        <AnimatePresence mode="wait">
                                            {loading && <motion.span key="l" className="svp-btn-state" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><FaPaperPlane className="svp-spin" /> Sending...</motion.span>}
                                            {sent && <motion.span key="s" className="svp-btn-state" initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ type: "spring" }}><FaCheckCircle /> Message Sent!</motion.span>}
                                            {!sent && !loading && <motion.span key="i" className="svp-btn-state" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><FaPaperPlane /> Send Message</motion.span>}
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
            <motion.span className="svp-final-cta__blob svp-final-cta__blob--1"
                animate={{ x: [0, 30, -15, 0], y: [0, -20, 25, 0], scale: [1, 1.1, 0.95, 1] }}
                transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }} />
            <motion.span className="svp-final-cta__blob svp-final-cta__blob--2"
                animate={{ x: [0, -25, 18, 0], y: [0, 22, -16, 0], scale: [1, 0.92, 1.08, 1] }}
                transition={{ duration: 17, repeat: Infinity, ease: "easeInOut", delay: 3 }} />
            <FloatingParticles count={10} color="rgba(235,174,95,0.12)" />

            <Container>
                <motion.div initial="hidden" whileInView="show" viewport={vpMd}
                    variants={stagger} className="svp-final-cta__inner">

                    <motion.h2 className="svp-final-cta__title" variants={fadeUp}>
                        Ready to Build Your Startup the Right Way? Let's Talk.
                    </motion.h2>

                    <motion.p className="svp-final-cta__text" variants={fadeUp}>
                        Whether you're a founder with an idea ready to validate or a startup with early traction ready to scale, ENH's startup consulting services in Dubai start with a totally free, no-obligation consultation meant to show you exactly what your business needs to expand and how we can help you get there faster than you would on your own. Book your free session now and begin building your firm the proper way from the first meeting.
                    </motion.p>
                    <motion.div className="svp-final-cta__actions" variants={fadeUp}>
                        <Link to="/contact" style={{ textDecoration: "none" }}>
                            <motion.button className="svp-final-cta__btn"
                                whileHover={{ scale: 1.04, y: -3, boxShadow: "0 16px 40px rgba(212,91,8,0.55)" }}
                                whileTap={{ scale: 0.97 }}>
                                Book a Free Consultation <FaArrowRight />
                            </motion.button>
                        </Link>
                    </motion.div>
                </motion.div>
            </Container>
        </section>
    );
}

// ─── ROOT ─────────────────────────────────────────────────────────────────────
function StartupConsultancy() {
    const { slug } = useParams();
    const data = SERVICE_DATA[slug] || SERVICE_DATA["default"];

    return (
        <div className="service-view-page">
            <HeroBanner data={data} />
            <IntroSection data={data} />
            <RDSection data={data} />
            <Services />
            <WhyUsSection data={data} />
            <Service2 />
            <TestimonialsSection data={data} />
            <BlogSection />
            <WhyChooseENH data={data} />
            <FAQSection data={data} />
            <ContactSection />
            <FinalCTA />
        </div>
    );
}

export default StartupConsultancy;