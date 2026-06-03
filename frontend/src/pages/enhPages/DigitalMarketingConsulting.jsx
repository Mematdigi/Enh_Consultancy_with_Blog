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
        badge: "Our Services", headline: "Digital Marketing Consultant in Dubai for Businesses That Want Real Results",
        tagline: "Many businesses in Dubai pay high agency retainers but receive junior-level execution, unnecessary account management layers, and reports filled with vanity metrics that fail to drive real growth. ENH Consulting provides hands-on digital marketing consulting in Dubai with expert strategy, transparent communication, and results-focused execution. We help startups, SMEs, and enterprises across Dubai and the UAE achieve measurable business growth through SEO, paid advertising, branding, and performance-driven digital marketing solutions.",
        cta: "Request a Quote",
        heroImg: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=600&q=80",
        introTitle: "Hire a Results-Driven Digital Marketing Consultant in Dubai",
        introText: "Hiring a large agency often means paying for overhead costs, account managers, and junior-level execution instead of real expertise. ENH Consulting offers direct access to a senior Digital Marketing Consultant in Dubai, delivering hands-on strategy and performance-focused execution without inflated agency fees. Our transparent, remote-first approach helps businesses across Dubai and the UAE achieve higher conversions, lower customer acquisition costs, stronger ROI, and measurable long-term business growth through practical digital marketing solutions",
        // introText2: "Every week you wait is a week they get closer, and the difference is increasing more quickly than most business owners notice. You don't need to know more about artificial intelligence. You need a clear plan, the right execution, and a companion who has done it before. ENH's AI consulting services for business in Dubai address exactly these needs. ",
        enquireText: "Get a Free 30 Min Consultation",
        rdTitle: "End-to-End Digital Marketing Consulting Services BY ENH",
        rdCards: [
            { icon: <FaFlask />, title: "SEO Consulting", desc: "ENH Consulting provides keyword research, on-page SEO, technical audits, and content optimization to improve Google rankings and organic traffic. Our SEO consulting services in Dubai help businesses increase visibility, attract qualified visitors, improve conversions, and build sustainable long-term search engine growth across competitive industries." },
            { icon: <FaLightbulb />, title: "Performance Marketing Consulting", desc: "We manage ROI-focused Google Ads and Meta Ads campaigns with smart budget allocation, testing, and optimization strategies. ENH Consulting helps businesses in Dubai improve conversions, reduce acquisition costs, maximize advertising performance, and achieve scalable business growth through data-driven and results-oriented performance marketing solutions." },
            { icon: <FaSearch />, title: "Lead Generation Consulting", desc: "ENH Consulting builds complete lead generation systems using paid advertising, optimized landing pages, and conversion-focused email funnels. Our lead generation consulting services help businesses in Dubai attract qualified leads, increase inquiry volume, lower cost per lead, and generate measurable business growth with scalable marketing systems." },
            { icon: <FaFlask />, title: "Social Media Consulting", desc: "We create strategic social media marketing systems across Instagram, LinkedIn, and TikTok focused on real business growth and customer engagement. ENH Consulting helps Dubai businesses improve audience targeting, content planning, brand visibility, and lead generation through platform-specific social media growth and marketing strategies." },
            { icon: <FaLightbulb />, title: "Google Ads Consulting", desc: "ENH Consulting audits, restructures, and optimizes Google Ads campaigns to improve ROI, reduce wasted ad spend, and increase lead quality. Our Google Ads consulting services in Dubai help businesses build scalable PPC campaigns, improve performance metrics, and achieve stronger advertising results without expensive agency overheads." },
            { icon: <FaSearch />, title: "Content Marketing Consulting", desc: "We develop SEO-focused content marketing strategies with keyword mapping, topic clusters, and conversion-driven content creation tailored for Dubai businesses. ENH Consulting helps brands improve search visibility, target customer intent, increase organic traffic, and connect content marketing efforts directly to measurable business and marketing goals." },
        ],
        whyUs: [
            { icon: <FaClock />, title: "Retail & E-Commerce", desc: "Through data-driven strategy and optimized paid media, we assist retail and e-commerce companies in Dubai in creating high-performance digital acquisition systems, lowering the cost of acquiring new customers, and increasing conversion rates across all digital channels. " },
            { icon: <FaHeadset />, title: "Real Estate", desc: "We assist real estate companies and developers in Dubai with lead creation systems, Google Ads and Meta Ads campaigns, SEO tactics, and content initiatives tailored for the high-value, high-competition dynamics of the Dubai property market. " },
            { icon: <FaRocket />, title: "Healthcare ", desc: "Through ethical, credibility-focused digital marketing techniques customized for the healthcare industry in Dubai, we assist UAE healthcare practitioners and clinics in creating a trustworthy digital presence, producing qualified patient inquiries, and raising their internet visibility. " },
            { icon: <FaShieldAlt />, title: "Education & EdTech", desc: "We collaborate with EdTech companies and educational institutions throughout Dubai to develop performance marketing campaigns, SEO-driven content strategies, and student and learner acquisition systems that lower cost per enrollment and promote ongoing growth. " },
            { icon: <FaHeadset />, title: "Finance & FinTech", desc: "For finance and fintech companies in the UAE, we develop digital marketing plans that establish trust, produce qualified leads, and negotiate the particular compliance and communication limits of financial services marketing in the Dubai market." },
            { icon: <FaHeadset />, title: "Hospitality & Tourism", desc: "We use focused SEO, sponsored media, social media strategy, and conversion-focused content marketing to assist Dubai's hospitality and tourism companies in drawing more direct reservations, creating greater brand visibility, and generating qualified leads. " },
        ],
        testimonials: [
            { step: "Step 1 — Free Strategy Call", text: " In a focused, no-commitment approach conversation, we learn about your company, development objectives, and present marketing deficiencies and quickly spot the most valuable possibilities for your particular case. " },
            { step: "Step 2 — Marketing Audit ", text: "To find quick wins, weak spots, and the particular growth possibilities that should be given top priority in your custom marketing plan, we examine your current digital channels, campaigns, website performance, and competitors. " },
            { step: "Step 3 — Custom Marketing Roadmap", text: "We provide a customized digital marketing plan in line with your budget, timetable, and growth objectives—a clear, prioritized plan that shows you exactly what we will do, in what order, and what outcomes to expect at each milestone." },
            { step: "Step 4 — Execution and Implementation", text: "We launch and manage campaigns across SEO, paid media, content, and social with complete transparency — you always know what is running, what is being tested, and why every decision is being made on your behalf." },
            { step: "Step 5 — Reporting and Optimization", text: "We provide monthly performance reporting with simple language insights and constant optimization that increases ROI, lowers wasted spending, and compounds the results of every marketing channel we handle for you. " },
        ],
        whyEnh: [
            {
                num: "01",
                icon: <FaTools />,
                title: "Senior-Level Strategy, No Account Manager Middlemen ",
                desc: "Working with ENH means you interact directly with a senior digital marketing expert in Dubai who both develops and implements your plan; it's not an agency approach whereby senior consultants finalize the agreement, and junior employees carry out the tasks. "
            },
            {
                num: "02",
                icon: <FaMapMarkerAlt />,
                title: "100% Remote, Fully Transparent Delivery",
                desc: "ENH operates with a 100% remote delivery model, allowing Dubai and UAE businesses the flexibility of collaborating with a senior consultant without geographic constraints, office overhead expenses, or the communication delays that often accompany large agency teams. Every ENH engagement includes real-time reporting dashboards, direct messaging access, and total openness over every campaign and every dirham of ad expenditure. "
            },
            {
                num: "03",
                icon: <FaHandshake />,
                title: "ROI-Focused Not Vanity-Focused ",
                desc: "Every statistic we monitor, every campaign we run, and every suggestion we offer is connected to corporate results, not to impressions, follower counts, or engagement rates that seem fantastic in reports but never show up in your bank account. These outcomes include income, leads, cost per acquisition, and return on ad expenditure. "
            },
            {
                num: "04",
                icon: <FaMapMarkerAlt />,
                title: "Affordable Pricing Without Junior Execution ",
                desc: "ENH's reasonably priced digital marketing consultant Dubai pricing approach provides you with senior-level strategic and execution capability at a considerably more accessible price point than equivalent agency retainers—all without the trade-off of entrusting your marketing to junior employees. You have the best of both worlds: older knowledge and low rates."
            },
        ],
        faqs: [
            {
                q: "How much does a digital marketing consultant cost in Dubai?",
                a: "The price of an inexpensive digital marketing expert in Dubai relies on the services needed and the extent of the project. A concentrated SEO or Google Ads consultation retainer is priced quite differently from a whole multi-channel digital marketing campaign addressing strategy, paid media, content, and social management. ",
                img: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80",
                imgLabel: "Full-stack AI consulting"
            },
            {
                q: "Do you work with startups and small businesses in Dubai?",
                a: "Yes, most definitely. The digital marketing consultant for startups in Dubai and digital marketing adviser for small business techniques of ENH are geared towards the particular realities of smaller firms: few resources, the need for quick results, and no appetite for protracted minimum commitment periods or expensive agency retainers eating into runway. We provide flexible engagement models, clear pricing, no minimum contract requirements, and a startup-friendly consulting approach that gives top priority to the marketing activities with the highest return for your particular stage and market. ",
                img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80",
                imgLabel: "Transparent, flexible pricing"
            },
            {
                q: "Which industries do you serve as a digital marketing consultant?",
                a: "The digital marketing consultant UAE office of ENH serves companies in the retail and e-commerce, real estate, healthcare, banking and fintech, education and EdTech, hospitality and tourism, technology and SaaS, and professional services sectors throughout Dubai and the larger UAE. Our industry-specific knowledge guarantees that every digital marketing plan and campaign we develop is customized to your particular market dynamics, competitive environment, and client behavior. ",
                img: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=800&q=80",
                imgLabel: "Clear timelines & milestones"
            },
            {
                q: "How is working with a consultant different from hiring a digital marketing agency?",
                a: "Hiring a digital marketing consultant in Dubai through ENH gives you direct access to a senior strategist who plans and executes your marketing, getting rid of the account manager layers, high retainers, and junior execution that define most agency relationships in Dubai. ",
                img: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80",
                imgLabel: "Built for startups & SMEs"
            },
            {
                q: "Do you offer digital marketing consulting remotely across the UAE?",
                a: "Of course, ENH works as a fully remote digital marketing consultant in the UAE with no geographic restrictions on where we can work with clients throughout the country. Whether your company is located in Dubai, Abu Dhabi, Sharjah, Ras Al Khaimah, or elsewhere throughout the UAE, we provide the same high-quality senior-level strategy and execution through a 100% remote model with real-time reporting access, direct communication, and regular video calls that keep you totally informed and in charge of your marketing program at every stage.",
                img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80",
                imgLabel: "Six core industries across UAE & GCC"
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

                            <motion.h1 className="svp-hero__h1" variants={fadeLeft} style={{ color: "#422308", lineHeight: 1.1, fontSize: "2.4rem"}}>
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
                                ENH Consulting provides ROI-focused digital marketing consulting services for startups, SMEs, eCommerce brands, real estate companies, and enterprises across Dubai and the UAE. We combine strategic planning with hands-on execution across SEO, paid advertising, content marketing, and social media to deliver scalable online growth and measurable business results. 
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
        { icon: <FaLightbulb />, title: "Startups", description: "ENH Consulting helps startups in Dubai build lean, growth-focused digital marketing strategies designed for faster customer acquisition and measurable business traction. We focus on cost-effective marketing channels, practical execution, and scalable campaigns that help startups grow efficiently without overspending on ineffective advertising efforts.", number: "01" },
        { icon: <FaBriefcase />, title: "SMEs", description: "We help SMEs across Dubai and the UAE generate consistent leads, improve online visibility, and achieve measurable ROI through affordable and systemized digital marketing strategies. ENH Consulting focuses on SEO, paid advertising, and content marketing solutions that maximize results while working within limited budgets and smaller internal teams.", number: "02" },
        { icon: <FaGraduationCap />, title: "Enterprises", description: "ENH Consulting provides enterprise-level digital marketing consulting with multi-channel campaign management, performance reporting, and scalable growth strategies. We help large businesses in Dubai improve brand visibility, customer acquisition, and marketing efficiency through strategic planning, advanced execution, and long-term digital growth solutions.", number: "03" },
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
                            <span className="title-accent" style={{ color: '#8a5520' }} >Digital Marketing Consulting for Businesses of Every Size</span>
                        </h2>
                    </motion.div>
                    <motion.p className="services-subtitle mt-4" variants={fadeUp}>
                        ENH Consulting provides customized digital marketing strategies for startups, SMEs, and enterprises across Dubai and the UAE. Our approach focuses on business goals, budget, industry challenges, and scalable growth, helping companies achieve measurable online results through SEO, paid advertising, content marketing, and performance-driven digital strategies.
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
                    <Link to="/contact" style={{ color: "inherit", textDecoration: "none" }}>
                        <motion.button className="svp-enquire-btn mt-4 mt-md-5"
                            whileHover={{ scale: 1.04, x: 5, boxShadow: "0 8px 24px rgba(212,91,8,0.35)" }}
                            whileTap={{ scale: 0.97 }}>
                            Let’s Discuss Your Requirements
                        </motion.button>
                    </Link>
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
                    <Eyebrow gold>What We Serve</Eyebrow>
                    <motion.h2 className="svp-whyus__title" variants={fadeLeft}>Industries We Serve With Digital Marketing Consulting</motion.h2>
                    <motion.p className="mt-3 text-white" variants={fadeUp}>
                        With industry-specific knowledge that guarantees every plan, campaign, and content program we develop is appropriate for your particular market, client behavior, and competitive scene, ENH provides digital marketing advice in Dubai throughout the industries fueling the UAE economy. Our marketing consulting services are never one-size-fits-all; instead, they are created with your sector and target audience in mind. 
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
                    <Eyebrow>Our Process</Eyebrow>
                    <motion.div className="svp-testimonials__header" variants={fadeUp}>
                        <h2 className="svp-testimonials__title" style={{ color: '#532a06' }}>How Our Digital Marketing Consulting Works</h2>
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
                    <p className="mt-4" style={{ color: '#532a06' }}>Our consulting services for digital marketing are built for openness, speed, and measurable outcomes. The Dubai process offers you total insight at every level into what we are doing, why we are doing it, and exactly what it is bringing to your company. </p>
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
                        Why Choose ENH as Your Digital Marketing Consultant in Dubai
                    </motion.h2>
                    <motion.p className="svp-why-enh__lead" variants={fadeUp}>
                        Dubai has a lot of digital marketing consultants. Here is how ENH stands out from both big agencies and regular freelancers working in the same field. 
                    </motion.p>
                </motion.div>

                <motion.div initial="hidden" whileInView="show" viewport={vp} variants={stagger}>
                    <Row className="g-4">
                        {data.whyEnh.map((reason, i) => (
                            <Col lg={6} md={6} key={i}>
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
                                Frequently Asked Questions About AI Consulting in Dubai
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
                                Everything you need to know before partnering with an AI consulting firm in Dubai.
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
        { icon: <FaMapMarkerAlt />, label: "Our Location", value: "Ramesh Nagar, New Delhi" },
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
                                Get in touch today to start growing your digital presence with expert guidance.
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
                        Ready to Grow Your Business Online? Let's talk.
                    </motion.h2>

                    <motion.p className="svp-final-cta__text" variants={fadeUp}>
                        If you are ready to move past agency fees and junior execution and work straight with a senior digital marketing expert in Dubai who is really invested in your results, ENH provides a totally free, no-commitment strategy call that begins with understanding your company and finishes with a clear vision of precisely how we can assist you to expand. Book your free session today; the entire process is online, the first discussion is free, and the results speak for themselves. 
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
function DigitalMarketingConsultancy() {
    const { slug } = useParams();
    const data = SERVICE_DATA[slug] || SERVICE_DATA["default"];

    return (
        <div className="service-view-page">
            <HeroBanner data={data} />
            <IntroSection data={data} />
            <RDSection data={data} />
            <Services />
            <WhyUsSection data={data} />
            <TestimonialsSection data={data} />
            <BlogSection />
            <WhyChooseENH data={data} />
            <FAQSection data={data} />
            <ContactSection />
            <FinalCTA />
        </div>
    );
}

export default DigitalMarketingConsultancy;