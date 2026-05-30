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
        badge: "Our Services", headline: "Business Consulting Services in Dubai for Startups, SMEs & Enterprises",
        tagline: "Most companies in Dubai do not suffer from a lack of ambition; instead, they suffer from the absence of the proper plan, systems, and execution partners to convert that ambition into quantifiable, compounding development. Beyond guidance, ENH is a results-driven business consulting company in Dubai that develops plans, operational structures, and growth systems that enable startups, small and medium enterprises, and major corporations to scale more quickly and profitably across the UAE. Our business experts in Dubai are designed for one outcome: real results, regardless of whether you are stuck at a sales plateau, entering a new market, or developing from the ground up.",
        cta: "Request a Quote",
        heroImg: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=600&q=80",
        introTitle: "Scale Faster with Dubai's Most Trusted Business Management Consultants",
        introText: "Most companies in Dubai concentrate on business creation; ENH concentrates on everything following. As reputable business management consultants in Dubai, we provide integrated marketing, AI-powered insights, and business strategy consulting under one roof to produce quantifiable growth, not simply frameworks. Our business advising services in Dubai have helped clients cut lead follow-up time by 71%, boost conversion rates by 43%, and lower customer acquisition expenses by 54% below the industry norm. That is the ENH difference. ",
        // introText2: "Every week you wait is a week they get closer, and the difference is increasing more quickly than most business owners notice. You don't need to know more about artificial intelligence. You need a clear plan, the right execution, and a companion who has done it before. ENH's AI consulting services for business in Dubai address exactly these needs. ",
        enquireText: "Get a Free 30 Min Consultation",
        rdTitle: "Our Business Consulting Services in Dubai",
        rdCards: [
            { icon: <FaFlask />, title: "Business Strategy Consultant in Dubai", desc: "We develop clear, actionable corporate plans suited to the facts of the Dubai market, including competitive analysis, realistic objective setting, and detailed execution roadmaps your team can really follow and deliver on. Every plan we create is geared for implementation, not for the shelf, therefore guaranteeing that your company progresses with direction, confidence, and quantifiable momentum from day one." },
            { icon: <FaLightbulb />, title: "Business Growth Consulting Dubai", desc: "If your income has stalled and you cannot determine the cause, our corporate development consulting service in Dubai pinpoints the precise roadblocks inhibiting your company and develops scalable solutions meant to help you to overcome them. ENH is your business growth consultant in Dubai that provides both strategic insight and practical execution assistance to transform stagnation into ongoing, compounding income development throughout the UAE market." },
            { icon: <FaSearch />, title: "Market Entry Strategy Dubai", desc: "Our market entry approach for Dubai for international companies and brands entering the UAE market spans everything from competitor analysis and market research to go-to-market planning and regulatory navigation, which is unique to mainland operations and Dubai free zones. Our business consulting services in Dubai make sure you approach the UAE market with clarity, legality, and a strategy created to succeed from the first day of trade." },
            { icon: <FaFlask />, title: "Business Consulting for Startups Dubai", desc: "Early-stage business owners in Dubai require systems, procedures, and a hands-on execution partner that matches their speed rather than only guidance. That is precisely what our business consulting services in Dubai provide for startups—lean, pragmatic, and reasonably priced consulting support that helps founders lay the operational and strategic groundwork required to grow without draining money on guidance that never comes to fruition." },
            { icon: <FaLightbulb />, title: "Small Business Consulting Dubai", desc: "If you are an SME owner in Dubai, overwhelmed by day-to-day operations and unsure which growth decisions to prioritize, ENH provides affordable business consulting services in Dubai that give you access to senior-level strategic thinking without the agency overhead that makes most consulting firms inaccessible for smaller businesses. Our business consulting services for SMEs in Dubai are practical, results-focused, and built around the real constraints and opportunities of growing businesses in the UAE." },
            { icon: <FaSearch />, title: "Human Resources Consulting", desc: "Creating a high-performing team in Dubai calls for the proper HR systems, organized performance frameworks, and a people strategy in line with the direction of your company; it goes beyond simple hiring. From recruitment strategy and team structuring to performance management systems and HR process design, our HR consulting firm offers expanding Dubai companies the infrastructure they need to expand sustainably." },
        ],
        whyUs: [
            { icon: <FaClock />, title: "Retail & E-Commerce", desc: "We help retail and e-commerce organizations in Dubai create scalable growth plans, maximize client acquisition, and implement operational systems that support continuous expansion throughout the GCC and UAE areas." },
            { icon: <FaHeadset />, title: "Real Estate", desc: "We assist real estate firms and developers in improving their sales processes, managing leads, and creating growth plans custom-fit to their needs in Dubai, one of the most competitive real estate marketplaces worldwide." },
            { icon: <FaRocket />, title: "Healthcare ", desc: " For healthcare companies and technology startups in the UAE, we design operational efficiency, patient experience frameworks, and growth plans that function inside the particular regulatory environment of Dubai's healthcare sector." },
            { icon: <FaShieldAlt />, title: "Education & EdTech", desc: "We help educational institutions and learning platforms in Dubai create growth strategies, operational frameworks, and market entry plans to enable long-term growth in the changing education sector of the UAE." },
            { icon: <FaHeadset />, title: "Finance & FinTech", desc: "We provide strategic guidance, regulatory navigation, and growth systems specifically designed for the unique regulatory and competitive dynamics of the UAE financial services industry to finance and FinTech firms in Dubai." },
            { icon: <FaRocket />, title: "Logistics & Supply Chain", desc: "We help logistics companies and supply chain operators across the UAE with process improvement methods and operational advice that reduce expenses and raise delivery performance at scale." },
            { icon: <FaHeadset />, title: "Hospitality & Tourism", desc: "We help hotels and other travel-related companies in Dubai create revenue growth strategies, operational efficiency systems, and customer experience frameworks meant to boost repeat business and encourage long-term profitability." },
            { icon: <FaRocket />, title: "Marketing & Media", desc: "We collaborate with media organizations and marketing agencies in Dubai to create scalable business models, client acquisition channels, and operational frameworks that foster expansion beyond founder-led delivery." },
        ],
        testimonials: [
            { step: "Step 1 — Discovery", text: "To find the best growth chances unique to your Dubai firm, we delve deeply into your business—auditing operations, pinpointing pain areas, and understanding your market position." },
            { step: "Step 2 - Strategy & Roadmap ", text: "With clear priorities, an execution plan, set milestones, measurable key performance indicators (KPIs), and practical deadlines matched to your operational capacity and income targets, we help you create a clear business strategy." },
            { step: "Step 3 - Implementation", text: "We don't hand you a paper and leave; our staff remains engaged throughout execution, assisting you in putting the systems, processes, and growth ideas into practice that convert strategy into actual company outcomes." },
            { step: "Step 4 - Optimization & Scaling ", text: "We track performance, improve what is effective, and build on early successes to increase the results, guaranteeing that your company continues to expand long after the first consulting project has provided its first impact wave. results, ensuring that your company continues to expand long after the first consulting project has made its initial impact" },
        ],
        whyEnh: [
            {
                num: "01",
                icon: <FaTools />,
                title: "E-Commerce Brand, Dubai — 43% Conversion Rate Increase ",
                desc: "A Dubai e-commerce firm saw a 43% increase in conversion rate and a 67% fall in customer acquisition expense in only six months after ENH rebuilt its growth plan and included AI-powered marketing automation. This outcome came from performance marketing, artificial intelligence deployment, and business strategy consulting, acting as one integrated system rather than three distinct organizations working in opposition to each other."
            },
            {
                num: "02",
                icon: <FaMapMarkerAlt />,
                title: "Real Estate Agency, UAE — 71% Reduction in Lead Follow-Up Time ",
                desc: "For a real estate company in the UAE, ENH developed a unique AI-powered lead management and CRM automation solution that reduced manual lead follow-up time by 71% and raised qualified lead conversion by 38% in the first quarter following implementation. The business consulting engagement found the operational bottleneck, the AI consulting arm built the solution, and the integrated result was 22 more closed deals in one quarter."
            },
            {
                num: "03",
                icon: <FaHandshake />,
                title: "EdTech Startup, Dubai — Customer Acquisition Cost 54% Below Industry Average",
                desc: "From Ground Up cooperated with the EdTech company ENH to reach 12,000 active members in eight months after introduction, at a cost of acquiring consumers 54% lower than the industry average for digital learning platforms in the UAE. Together with performance marketing and AI-driven personalization, startup business advising produced this result, all from one cohesive team with a shared growth goal."
            },
        ],
        faqs: [
            {
                q: "What do business consulting services in Dubai include?",
                a: "From creating company strategy, planning market entry, and growth consulting to creating HR systems, raising operational effectiveness, and advising startups, business consulting services in Dubai span a wide spectrum of strategic and operational support. Our business consulting services at ENH are full-stack and execution-focused, so instead of only providing a strategy document, we remain engaged throughout implementation to ensure the results we envision actually materialize in the real world.",
                img: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80",
                imgLabel: "Full-stack AI consulting"
            },
            {
                q: "How much do business consultants in Dubai charge?",
                a: "The expense of business advisers in Dubai varies greatly depending on the extent, length, and intricacy of the project, from monthly advising retainers to project-based consulting packages. ENH provides a complimentary first appointment with no commitment, followed by a custom-scoped proposal priced honestly and openly in accordance with the needs of your company.",
                img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80",
                imgLabel: "Transparent, flexible pricing"
            },
            {
                q: "Are ENH's services affordable for small businesses and startups?",
                a: "Yes, ENH's low-cost business counseling services in Dubai are meant to make senior-level strategic consulting available for startups and small and medium-sized enterprises without demanding business-sized budgets or lengthy minimum commitment periods. We provide flexible engagement approaches, pricing based on projects, and a free first consultation to enable smaller companies to see the caliber of our work before committing any money.",
                img: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=800&q=80",
                imgLabel: "Clear timelines & milestones"
            },
            {
                q: "Which industries do you serve?",
                a: "ENH offers business consulting services throughout the UAE to firms in retail and e-commerce, real estate, healthcare, education and EdTech, banking and fintech, hospitality and tourism, logistics and supply chain, and marketing and media. Our knowledge of your industry ensures that every strategy and operational recommendation we propose is based on the particular business, regulatory, and competitive realities of your industry, rather than on general frameworks implemented out of context across all our clients.",
                img: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80",
                imgLabel: "Built for startups & SMEs"
            },
            {
                q: "How is ENH different from other business consulting firms in Dubai?",
                a: "AI-powered business insights, full-stack multi-service capability, real execution focus outside strategy delivery, startup- and SME-accessible pricing, and a team with extensive Dubai and UAE market knowledge all set ENH apart from other business consulting companies in Dubai. Most consulting companies in Dubai advise and leave; ENH stays through implementation, assesses results, and scales what is effective.",
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
                                From early-stage firms solidifying their footing to established businesses expanding across the UAE and the broader GCC, ENH offers customized, execution-focused business management consulting services tailored to each stage of development. Our management consulting services in Dubai are never constructed from general frameworks; rather, every project is developed in response to your particular company background, market conditions, and quantifiable growth goals. 
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
        { icon: <FaLightbulb />, title: "Startups", description: "We support early-stage business owners in Dubai in developing the plan, systems, and procedures required for quick expansion, free from the operational anarchy that destroys successful businesses prior to their establishment.", number: "01" },
        { icon: <FaBriefcase />, title: "SMEs", description: "We collaborate with developing small and medium-sized organizations that have moved beyond informal practices and now want an organized approach, more efficient processes, and a senior advising partner who provides actual results at fair prices.", number: "02" },
        { icon: <FaGraduationCap />, title: "Enterprises", description: "We assist major companies throughout the UAE with departmental-level strategy, AI-powered transformation, and cross-functional advice that boosts performance at scale without interfering with daily business.", number: "03" },
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
                            <span className="title-accent" style={{ color: '#8a5520' }} >Who We Work With</span>
                        </h2>
                    </motion.div>
                    <motion.p className="services-subtitle mt-4" variants={fadeUp}>
                        From first-year entrepreneurs to established corporations, ENH's business consulting services are meant to cater to every kind of company at every level of development throughout Dubai and the UAE. We cooperate with the following people and solve their unique difficulties for each.
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
                            Let’s Discuss Your Requirements
                        </Link>
                    </motion.button>
                </motion.div>
            </Container>
        </section>
    );
}

function Services2() {
    const serviceList = [
        { title: "Business consultants in Dubai", description: "Pay attention to setup and compliance; ENH is all about development, implementation, and clear outcomes from day one. We are the correct option for companies that really want to expand in the UAE for the following reasons."},
        { title: "AI-Powered Business Insights", description: "Every consulting project at ENH includes an AI-driven analysis, providing our clients with faster, more in-depth, and more precise business intelligence than traditional business strategy consultants in Dubai can provide via manual research and experience alone. Improved knowledge equals quicker results and improved decision-making."},
        { title: "Multi-Service Under One Roof", description: "Strategy AI, digital marketing, HR consulting, and startup advising are all provided under one roof, with a coordinated staff working together to achieve your development objectives. Most consulting companies in Dubai concentrate on one field and refer the others out, therefore generating gaps, delays, and coordination breakdowns that cost you money and time."},
        { title: "Online Business Consulting Services Available ", description: "Along with in-person meetings, ENH provides entirely flexible online business consulting services in Dubai, giving UAE and international clients the convenience of remote strategy sessions, digital workshops, and virtual advising without sacrificing the quality or depth of the consulting engagement."},
        { title: "Startup and SME Pricing Without Compromise", description: "Our pricing model was developed with the express purpose of making senior-level business management consulting available to startups and SMEs in Dubai, complete with flexible engagement arrangements, no unneeded retainer minimums, and a complimentary first appointment to help you see the value before you commit to anything."},
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
                            <span className="title-accent" style={{ color: '#8a5520' }} >Why Choose ENH as Your Business Consultant in Dubai</span>
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
                    <Eyebrow gold>What We Serve</Eyebrow>
                    <motion.h2 className="svp-whyus__title" variants={fadeLeft}>Business Consulting Services Across Industries in Dubai</motion.h2>
                    <motion.p className="mt-3 text-white" variants={fadeUp}>
                        Deep industry expertise ensures that every plan and system we create is pertinent, practical, and tailored for the particular business realities of your sector; hence, ENH offers business consulting services throughout Dubai and the UAE. Our business management consultants in Dubai provide genuine vertical expertise instead of generic frameworks applied out of context. 
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
                    <Eyebrow>Ai Consulting Process</Eyebrow>
                    <motion.div className="svp-testimonials__header" variants={fadeUp}>
                        <h2 className="svp-testimonials__title" style={{ color: '#532a06' }}>Our Business Consulting Process</h2>
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
                    <p className="mt-4" style={{ color: '#532a06' }}>Built for speed, clarity, and measurable results, our business consulting process guides you from where you are now to a completely implemented and improved plan with no pointless complexity at any step. At ENH, business transformation consulting really works this way.</p>
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
                        Real Results from ENH's Business Consulting Services in Dubai
                    </motion.h2>
                    <motion.p className="svp-why-enh__lead" variants={fadeUp}>
                        The best evidence of our business consulting services in Dubai is what our clients have accomplished, rather than what we have said. These three actual outcomes show what execution-focused company transformation consulting really provides.
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
                        Ready to Grow Your Business in Dubai? Let's talk.
                    </motion.h2>

                    <motion.p className="svp-final-cta__text" variants={fadeUp}>
                        Whether you're a startup developing your first strategy or an established company wanting to bust through your next growth barrier, ENH's business management specialists in Dubai are ready to assist—with a totally free, no-obligation initial consultation meant to expose precisely what is possible and how we might help you reach it. Make a reservation for your free appointment right now to start building a business that expands with purpose, speed, and quantifiable outcomes. 
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
function BusinessConsultancy() {
    const { slug } = useParams();
    const data = SERVICE_DATA[slug] || SERVICE_DATA["default"];

    return (
        <div className="service-view-page">
            <HeroBanner data={data} />
            <IntroSection data={data} />
            <RDSection data={data} />
            <Services />
            <WhyUsSection data={data} />
            <Services2/>
            <TestimonialsSection data={data} />
            <BlogSection />
            <WhyChooseENH data={data} />
            <FAQSection data={data} />
            <ContactSection />
            <FinalCTA />
        </div>
    );
}

export default BusinessConsultancy;