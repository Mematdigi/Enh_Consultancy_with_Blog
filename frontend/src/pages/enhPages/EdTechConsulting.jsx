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
        badge: "Our Services", headline: "Best EdTech Consulting Services in Dubai ",
        tagline: "Businesses and educational institutions across Dubai are investing in technology, but without the right strategy, many platforms fail to deliver real results. ENH is a results-driven EdTech consulting firm that helps schools, companies, and startups build, implement, and scale effective digital learning solutions across the UAE. Our education technology consulting services in Dubai focus on improving learning experiences, employee training, and long-term growth with solutions that actually work.",
        cta: "Request a Quote",
        heroImg: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=600&q=80",
        introTitle: "Transform Learning Outcomes with  E-Learning Consulting in Dubai",
        introText: "Most EdTech companies in Dubai offer software; ENH provides e-learning advice that combines pedagogy, technology approach, and AI-powered personalization to produce actual, measurable learning results for every kind of institution and organization.",
        introText2: "As the leading digital learning solutions provider in Dubai, we combine LMS expertise, AI-powered learner personalization, and complete implementation support unequalled by rivals.",
        introText3: "Our e-learning consulting services in Dubai have helped clients scale from zero to 12,000 active users in just eight months, achieve customer acquisition costs 54% below industry average, and reduce training delivery costs by 43%-results that prove what outcome-focused EdTech consulting actually delivers.",
        enquireText: "Get a Free 30 Min Consultation",
        rdTitle: "Our Education Technology Consulting Services in Dubai",
        rdCards: [
            { icon: <FaFlask />, title: "LMS Consulting Services Dubai", desc: "ENH helps schools, institutions, and businesses choose, implement, and optimize LMS platforms across Dubai. From Moodle and custom LMS solutions to enterprise integrations, we handle vendor selection, platform setup, user training, and post-launch optimization to improve adoption, learner engagement, and measurable training outcomes." },
            { icon: <FaLightbulb />, title: "Corporate E-Learning Solutions", desc: "We build scalable corporate e-learning systems for businesses in Dubai, including LMS selection, learning infrastructure, content architecture, and employee training solutions. ENH helps HR and L&D teams deliver engaging, measurable, and cost-effective training programs that improve workforce performance across growing organizations." },
            { icon: <FaSearch />, title: "EdTech Consulting for Schools in Dubai", desc: "ENH helps schools modernize classrooms with teacher-friendly digital learning solutions that improve student engagement and academic performance. Our services include curriculum digitalization, smart classroom technology, teacher training systems, student engagement platforms, and parent communication tools aligned with Dubai’s education standards and learning requirements." },
            { icon: <FaFlask />, title: "AI-Powered Learning Consulting", desc: "We help universities and institutions build AI-powered online and hybrid learning systems that personalize content, assessments, and learning experiences. Our consulting includes digital learning infrastructure, student management integrations, and AI-driven education tools designed to improve learner outcomes, engagement, and long-term academic performance." },
            { icon: <FaLightbulb />, title: "EdTech Startup Consulting Dubai", desc: "ENH supports EdTech startups in Dubai with product strategy, AI learning architecture, go-to-market planning, and scalable platform development. We help founders transform ideas into investor-ready education platforms with sustainable growth systems, user acquisition strategies, and competitive digital learning solutions for the UAE and GCC market." },
            { icon: <FaSearch />, title: "EdTech Strategy & Roadmap Consulting", desc: "We provide strategic EdTech consulting for organizations planning digital learning investments in Dubai. Our services include technology assessment, vendor selection, implementation planning, and roadmap development focused on measurable learning goals, realistic timelines, and scalable education technology solutions that support long-term business and academic growth." },
        ],
        whyUs: [
            { icon: <FaClock />, title: "AI-Powered Learning Personalization", desc: "ENH includes artificial intelligence-driven personalization in every digital learning tool. We design adaptive learning experiences that cater to each student's behavior, performance, and pace in ways that static LMS systems just cannot match. Improved personalization leads to improved retention, increased participation, and improved learning results at every level." },
            { icon: <FaHeadset />, title: "Outcome-Focused Strategy, Not Software Sales ", desc: "We are not connected with any LMS provider or EdTech platform. Every recommendation we provide is motivated by what will produce the greatest learning outcomes for your particular organization, team, or student group." },
            { icon: <FaRocket />, title: "Full Implementation Support End-to-End", desc: "ENH does not provide an EdTech strategy paper and leaves our team to stay engaged during platform deployment, system integration, user training, and post-launch optimization to make sure every technology works. We advise your entire company to embrace the investment and guarantee it operates as intended." },
            { icon: <FaShieldAlt />, title: "Startup and Institution Accessible Pricing", desc: "We want our prices for education technology consulting in Dubai to be affordable for EdTech startups, independent schools, and training departments of small and medium-sized businesses, not just for big universities and businesses that have a lot of money to spend on tech. Flexible engagement approaches and clear pricing guarantee that every kind of organization can obtain senior-level EdTech consulting knowledge at a reasonable price." },
        ],
        testimonials: [
            { step: "Step 1 — Discovery & Needs Assessment ", text: "We do a detailed analysis of your institution's goals, learner needs, financial limits, and current learning technology environment to find the holes, possibilities, and quick successes that will define your EdTech plan." },
            { step: "Step 2 — EdTech Strategy & Roadmap", text: "Strategy with specified milestones, platform recommendations, integration requirements, and measurable learning outcome KPIs that guarantee every technology investment matches your educational and organizational objectives, we create a clear, prioritized EdTech strategy and technology roadmap." },
            { step: "Step 3 — Platform Implementation & Integration Strategy.", text: "We put the EdTech plan into action by setting up platforms, linking with administrative and HR systems, moving material, and giving training to guarantee quick adoption by teachers, trainers, students, and managers." },
            { step: "Step 4 — Optimization & Scaling", text: "We keep tabs on how well the platform is working and how engaged the students are, make changes to the learning experience based on real-world insights, and always expand your digital learning infrastructure as your institution or user base expands. This ensures that your EdTech investment continues to provide and improve with every new term or quarter." },
        ],
        whyEnh: [
            {
                num: "01",
                icon: <FaTools />,
                title: "EdTech Startup, Dubai",
                desc: "Scaled from 0 to 12,000 active users in 8 months while reducing customer acquisition costs by 54% through AI-powered personalization and growth-focused platform strategy."
            },
            {
                num: "02",
                icon: <FaMapMarkerAlt />,
                title: "Corporate Training Program, UAE",
                desc: "Reduced training delivery costs by 43% and increased course completion rates by 67% using a custom LMS and automated learning systems."
            },
            {
                num: "03",
                icon: <FaHandshake />,
                title: "K-12 School Group, Dubai",
                desc: "Improved student engagement scores by 38% and reduced teacher administrative workload by 29% through smart classroom technology and digital learning platforms."
            },
        ],
        faqs: [
            {
                q: "What are education technology consulting services?",
                a: "Consulting services for technology education in Dubai give all the professional guidance and assistance schools, universities, businesses, and EdTech startups need to effectively implement, deploy, and grow educational technologies. The service covers support with LMS selection, e-learning consulting, AI-powered personalization, creation of corporate training platforms, curriculum digitization, and EdTech startup product strategy.",
                img: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80",
                imgLabel: "Full-stack AI consulting"
            },
            {
                q: "How much do EdTech consulting services cost in Dubai?",
                a: "The cost of EdTech consulting services in Dubai differs based on the breadth, kind of organization, and intricacy of the project; a targeted LMS selection and strategy session is priced quite differently from a full-scale corporate e-learning platform construction or an EdTech startup product development program.",
                img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80",
                imgLabel: "Transparent, flexible pricing"
            },
            {
                q: "Which institutions do you serve with EdTech consulting in Dubai?",
                a: "ENH's educational technology consulting services in Dubai serve K–12 schools, institutions of higher learning, business LD teams, EdTech companies, and government training organizations all across Dubai and the larger UAE. Our e-learning consulting practice and LMS consulting services in Dubai are particularly developed to meet the particular technology issues of each kind of institution, including the digitization of school curricula, the infrastructure for hybrid learning at universities, platforms for corporate onboarding, and the product strategy for EdTech startups.",
                img: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=800&q=80",
                imgLabel: "Clear timelines & milestones"
            },
            {
                q: "How long does EdTech implementation take in Dubai?",
                a: "The scope and complexity of the project determine the timeline for an EdTech implementation. An EdTech strategy and roadmap engagement usually takes two to four weeks to produce a well-defined and prioritized technology plan. In four to eight weeks, an LMS installation for a business or school can be finished.",
                img: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80",
                imgLabel: "Built for startups & SMEs"
            },
            {
                q: "What is the difference between EdTech consulting and EdTech development?",
                a: "EdTech consulting helps institutions and organizations choose the right technology, use it correctly, and get real user adoption and measurable results by focusing on strategy, platform selection, execution advice, and learning outcome optimization. EdTech development is all about writing code to create bespoke software and platforms.",
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
                        text3: data.introText3,
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
                                    {/* <Eyebrow>Our Services</Eyebrow> */}
                                    <motion.h2 className="svp-intro__title" variants={fadeLeft}>{block.title}</motion.h2>
                                    <motion.p className="svp-intro__text" variants={fadeUp}>{block.text}</motion.p>
                                    <motion.p className="svp-intro__text" variants={fadeUp}>{block.text2}</motion.p>
                                    <motion.p className="svp-intro__text" variants={fadeUp}>{block.text3}</motion.p>
                                    {/* <motion.p className="svp-intro__enquire-note" variants={fadeUp}>{block.note}</motion.p> */}
                                    {/* <motion.div variants={fadeUp}>
                                        <motion.button className="svp-enquire-btn"
                                            whileHover={{ scale: 1.04, x: 5, boxShadow: "0 8px 24px rgba(212,91,8,0.35)" }}
                                            whileTap={{ scale: 0.97 }}>
                                            {block.btnLabel} <FaArrowRight />
                                        </motion.button>
                                    </motion.div> */}
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
                                ENH provides execution-focused EdTech consulting in Dubai for schools, universities, businesses, and startups across the UAE. From LMS implementation to AI-driven learning personalization and EdTech product strategy, our customized education technology solutions are designed around your learning goals, user engagement, and measurable business outcomes.
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
        { icon: <FaLightbulb />, title: "Schools & K-12 Institutions", description: "We help schools modernize classrooms with digital learning systems, smart education tools, teacher training platforms, and student engagement solutions that improve academic outcomes without adding unnecessary complexity for educators.", number: "01" },
        { icon: <FaBriefcase />, title: "Universities & Higher Education", description: "ENH supports universities with online and hybrid learning infrastructure, AI-powered student engagement systems, and scalable digital transformation strategies that improve learning experiences and position institutions as leaders in modern education.", number: "02" },
        { icon: <FaGraduationCap />, title: "Corporations & L&D Teams", description: "We create scalable corporate e-learning solutions for businesses in Dubai, helping HR and L&D teams deliver consistent employee training, onboarding systems, and measurable workforce development programs tied directly to business performance.", number: "03" },
        { icon: <FaLightbulb />, title: "Healthcare Training Institutions", description: "We help healthcare organizations implement digital training platforms, compliance learning systems, and continuous professional development solutions aligned with UAE healthcare standards and workforce training requirements.", number: "04" },
        { icon: <FaBriefcase />, title: "Government & Public Sector", description: "ENH works with government agencies and public sector organizations on large-scale e-learning platforms, workforce development systems, and digital training initiatives that improve institutional efficiency and employee capability across the UAE.", number: "05" },
        { icon: <FaGraduationCap />, title: "EdTech Startups", description: "We partner with EdTech startups from idea validation to commercial growth, providing product strategy, AI-powered learning personalization, go-to-market planning, and scalable platform development to help founders grow across the UAE and GCC markets.", number: "06" },
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
                            <span className="title-accent" style={{ color: '#8a5520' }} >Industries & Organizations We Serve</span>
                        </h2>
                    </motion.div>
                    <motion.p className="services-subtitle mt-4" variants={fadeUp}>
                        ENH provides EdTech consulting services in Dubai for schools, universities, corporations, government organizations, healthcare institutions, and EdTech startups across the UAE and GCC. We help organizations at every stage of digital learning transformation with customized, execution-focused solutions designed around their industry challenges, learning goals, and growth requirements.
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
                    <motion.h2 className="svp-whyus__title" variants={fadeLeft}>Why Choose ENH for EdTech Consulting Services in Dubai</motion.h2>
                    <motion.p className="mt-3 text-white" variants={fadeUp}>
                        Most EdTech companies in Dubai concentrate on selling software, while ENH focuses on delivering e-learning guidance that results in quantifiable learning results, real user adoption, and technology investments that show their worth in the real world. This is why ENH is the right education technology consulting firm for companies and institutions in Dubai committed to significant transformation.
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
                        <h2 className="svp-testimonials__title" style={{ color: '#532a06' }}>Step-by-Step Process of Our EdTech Consulting Solutions</h2>
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
                    <p className="mt-4" style={{ color: '#532a06' }}>In Dubai, our EdTech consulting services follow a proven four-step approach that takes you from a technology needs assessment to a fully implemented, optimized, and continuously improving digital learning environment with clear milestones, measurable learning outcomes, and no unnecessary complexity at any step of the journey.</p>
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
                        Real Results from Our EdTech Consulting Services in Dubai
                    </motion.h2>
                    <motion.p className="svp-why-enh__lead" variants={fadeUp}>
                        ENH delivers measurable results through outcome-focused digital learning solutions across the UAE.
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
                                Frequently Asked Questions
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
                        Ready to Transform Learning in Your Organization? Let's Talk.
                    </motion.h2>

                    <motion.p className="svp-final-cta__text" variants={fadeUp}>
                        Whether you're a school administrator ready to upgrade your classrooms, a business LD head aiming to expand staff training, or an EdTech founder creating the next major learning platform in the UAE, ENH's e-learning consulting team is prepared to assist. We provide a completely free, no-obligation first consultation to show you exactly what is achievable and how we can guide you there. Book your free session right now and start the journey towards digital learning that really delivers the results your learners and your business need.
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
function EdTechConsultancy() {
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

export default EdTechConsultancy;