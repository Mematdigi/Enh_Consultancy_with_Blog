import React, { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence, } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import secondSection from "../../../public/serviceSecondSection.webp";
import faqImage from "../../../public/faqImage.webp";
import serviceHeroBannerAi from "../../../public/serviceHeroBannerAi.webp";
import {
    FaArrowRight, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt,
    FaStar, FaQuoteLeft, FaFlask, FaLightbulb, FaSearch, FaRocket,
    FaShieldAlt, FaClock, FaHeadset, FaChevronLeft, FaChevronRight,
    FaPaperPlane, FaCheckCircle, FaBriefcase, FaGraduationCap, FaLaptopCode, FaWallet, FaBullseye,
    FaPlus, FaTools, FaHandshake,
} from "react-icons/fa";
import { FiArrowUpRight } from "react-icons/fi";
import api from "../../utils/api";
import { Helmet } from "react-helmet-async";

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
        badge: "Our Services", headline: "AI Consulting Services in Dubai for Digital Transformation",
        tagline: "ENH Consulting is an AI consulting company in Dubai helping startups, SMEs, and enterprises across the UAE and GCC achieve digital transformation through AI strategy, intelligent automation, and generative AI solutions. We don’t just provide guidance — we build, implement, and deliver measurable business results. From your first AI solution to complete business transformation, ENH is the trusted AI consultant in Dubai for long-term growth..",
        cta: "Request a Quote",
        heroImg: secondSection,
        introTitle: "Is Your Dubai Business Missing Out on the AI Advantage?",
        introText: "You know that AI is changing everything, but you don't know where to start, which tools are really worth your money, or why the ones you tried haven't given you any real return on investment. Your rivals in the UAE, on the other hand, are using AI systems that really work to automate processes, cut expenses, and grow more quickly. ",
        introText2: "Every week you wait is a week they get closer, and the difference is increasing more quickly than most business owners notice. You don't need to know more about artificial intelligence. You need a clear plan, the right execution, and a companion who has done it before. ENH's AI consulting services for business in Dubai address exactly these needs. ",
        enquireText: "Get a Free 30 Min Consultation",
        rdTitle: "Our Full-Stack AI Consulting Services in Dubai",
        rdCards: [
            { icon: <FaFlask />, title: "AI Strategy and Roadmap Consulting", desc: "We analyze your operations, identify high-impact AI opportunities, and create a practical AI roadmap tailored to your Dubai business goals. Every recommendation is focused on measurable ROI, faster execution, and scalable growth, helping businesses implement AI strategies that deliver long-term operational and business success." },
            { icon: <FaLightbulb />, title: "Generative AI Consulting in Dubai", desc: "ENH Consulting helps businesses implement ChatGPT, large language models, AI-generated content systems, and custom GenAI solutions tailored to their operations. Our hands-on generative AI consulting focuses on building practical AI tools, improving workflows, enhancing customer experiences, and delivering real business value across multiple industries.." },
            { icon: <FaSearch />, title: "AI Implementation and Integration Consulting", desc: "We integrate AI solutions directly into your CRM, ERP, HRMS, and existing business systems to ensure smooth adoption and operational efficiency. Our AI implementation consulting in Dubai helps businesses automate processes, improve workflows, reduce manual work, and maximize the value of every AI investment effectively." },
            { icon: <FaFlask />, title: "AI Automation Consulting for Dubai Businesses", desc: "ENH Consulting automates repetitive tasks, customer support workflows, and manual business operations using smart AI systems. Our AI automation consulting in Dubai helps businesses improve efficiency, save time, reduce operational costs, and create faster workflows that directly contribute to long-term business growth and scalability" },
            { icon: <FaLightbulb />, title: "AI Transformation Consulting for Enterprises and SMEs", desc: "We help enterprises and SMEs adopt AI across their operations through strategic planning, team enablement, and digital transformation consulting. Our AI transformation services in Dubai focus on sustainable implementation, operational efficiency, scalable growth, and building future-ready businesses powered by practical artificial intelligence solutions." },
            { icon: <FaSearch />, title: "AI Implementation and Integration Consulting", desc: "We design and deploy intelligent AI chatbots that manage customer support, qualify leads, book appointments, and improve customer engagement. Our AI chatbot consulting in Dubai includes conversational design, LLM integration, website deployment, and customized chatbot solutions tailored to your specific business operations and goals." },
        ],
        whyUs: [
            { icon: <FaClock />, title: "Retail & E-Commerce ", desc: "AI-powered personalization, inventory optimization, and customer journey automation, increasing conversions and lowering acquisition expenses for the rapidly changing retail scene in Dubai." },
            { icon: <FaHeadset />, title: "Healthcare ", desc: "Intelligent patient management, diagnostic support tools, and operational automation that enable UAE healthcare practitioners to deliver improved results with increased effectiveness and adherence." },
            { icon: <FaRocket />, title: "Real Estate", desc: "Artificial intelligence lead scoring, property recommendation engines, and automated client interaction systems created specifically for the high-volume, high-value real estate market dynamics of Dubai." },
            { icon: <FaShieldAlt />, title: "Education & EdTech ", desc: " Smart learning platforms, artificial intelligence-powered student engagement solutions, and operational automation for educational institutions and EdTech firms throughout the UAE and the larger GCC area." },
            { icon: <FaHeadset />, title: "Finance & FinTech", desc: "Automated risk assessment, fraud detection systems, and artificial intelligence-powered consumer tools enable Dubai's finance and fintech companies to run more quickly, intelligently, and securely." },
            { icon: <FaRocket />, title: "Hospitality & Tourism ", desc: "AI pricing optimization, personalized guest experience platforms, and automated booking and loyalty systems for the world-renowned hospitality and tourism sector of Dubai." },
        ],
        testimonials: [
            { step: "Step 1 - Free AI Readiness Assessment", text: "We evaluate your present AI preparedness, spot gaps, and expose fast-win chances especially relevant to your business in Dubai. Schedule your free evaluation right now." },
            { step: "Step 2 - AI Strategy and Roadmap", text: "To guarantee you always know precisely what you are creating toward and why, we create a customized AI roadmap matched to your company's objectives, operational timelines, and quantifiable ROI expectations." },
            { step: "Step 3 - Solution Design and Tool Selection", text: "Based on your particular operational demands, current systems, and scalability needs, we choose the right AI models, tools, and workflows-no generalized recommendations, only what suits your company." },
            { step: "Step 4 - Implementation and Integration ", text: "We guarantee seamless adoption with little disruption to your team and operations by implementing AI solutions and easily linking them with your current business systems and processes." },
            { step: "Step 5 - Optimization and Ongoing Support", text: " We monitor performance, make ongoing adjustments to your AI systems, and provide long-term support, as the best AI investment is one that improves in intelligence and value over time." },
        ],
        whyEnh: [
            {
                num: "01",
                icon: <FaTools />,
                title: "We Build AI Tools, Not Just Strategies",
                desc: "ENH Consulting has developed AI-powered HRMS and advanced AI content generation tools currently used by real businesses. Our hands-on experience building and deploying AI products allows us to provide practical AI consulting solutions backed by real implementation knowledge, technical expertise, and measurable business outcomes."
            },
            {
                num: "02",
                icon: <FaMapMarkerAlt />,
                title: "Dubai-Based AI Consultants Who Understand Your Market",
                desc: "ENH Consulting understands UAE regulations, Dubai business environments, GCC market trends, and Arabic AI capabilities. Our Dubai-based AI consultants combine local business understanding with advanced technical expertise to create AI solutions that align with regional operational requirements, customer expectations, and long-term business growth strategies."
            },
            {
                num: "03",
                icon: <FaRocket />,
                title: "Full-Stack AI Solutions From Strategy to Deployment",
                desc: "ENH Consulting manages the complete AI implementation process, including strategy, tool selection, development, integration, deployment, and optimization. Our full-stack AI consulting approach helps businesses avoid communication gaps, improve project efficiency, simplify execution, and achieve better long-term results through one centralized technology and consulting partner."
            },
            {
                num: "04",
                icon: <FaHandshake />,
                title: "Flexible AI Consulting for Startups and Enterprises",
                desc: "Whether you are a startup or a large enterprise, ENH Consulting provides flexible AI consulting services tailored to your business size, operational goals, budget, and growth stage. Our scalable engagement models ensure businesses receive the right level of AI support without unnecessary complexity or costs."
            },
            {
                num: "05",
                icon: <FaWallet />,
                title: "Affordable AI Consulting Without Compromising Quality",
                desc: "ENH Consulting delivers cost-effective AI consulting services in Dubai with transparent pricing, flexible packages, and practical business-focused solutions. We help startups, SMEs, and enterprises access high-quality AI expertise, implementation support, and scalable automation strategies without paying excessive consulting or agency-level service fees."
            },
        ],
        faqs: [
            {
                q: "What are AI consulting services and what do they include?",
                a: "AI consulting services in Dubai cover everything a company needs to successfully use and grow artificial intelligence, from early AI strategy and roadmap development to solution design, execution, automation consulting, and generative AI integration. AI readiness assessments, bespoke AI roadmaps, GenAI tool development, workflow automation, system integration, and continuous optimization support are among our artificial intelligence consulting services in Dubai at ENH — everything your company in Dubai needs to convert AI from an idea into a quantifiable competitive edge.",
                img: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80",
                imgLabel: "Full-stack AI consulting"
            },
            {
                q: "How much do AI consulting services cost in Dubai?",
                a: "The cost of artificial intelligence consulting services in Dubai differs based on the breadth, complexity, and length of the project — a targeted AI strategy session will have a totally different price than a comprehensive AI transformation. ENH provides a totally free initial AI readiness evaluation with no commitment; our continuous pricing is significantly lower than that of major international consulting companies without compromising on quality, experience, or delivery capability. To obtain a personalized quotation fitted to your particular needs and budget, get in touch with our staff.",
                img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80",
                imgLabel: "Transparent, flexible pricing"
            },
            {
                q: "How long does an AI consulting engagement take in Dubai?",
                a: "The timeframe for an AI consulting project depends completely on your goals. An AI roadmap consulting engagement usually takes two to four weeks to produce a definite, actionable plan and a prioritized use case list. AI implementation consulting in Dubai for a concentrated solution normally runs four to eight weeks, whereas more sophisticated, multi-system installations may take eight to twelve weeks, depending on the degree of integration and the number of corporate processes engaged.",
                img: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=800&q=80",
                imgLabel: "Clear timelines & milestones"
            },
            {
                q: "Do you provide AI consulting for startups and small businesses in Dubai?",
                a: "Definitely — ENH is designed to provide flexible engagement models, pricing that is friendly to startups, and no minimum engagement requirements that would force smaller companies into commitments they are not ready for. It is specifically built to serve both AI consulting for startups in Dubai and AI consulting for SMEs in Dubai. For smaller enterprises, every ENH engagement is designed from day one to be fast, provide practical results, and have predictable costs.",
                img: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80",
                imgLabel: "Built for startups & SMEs"
            },
            {
                q: "What industries do your AI consultants in Dubai serve?",
                a: "AI advising services provided by ENH in Dubai cover six main industries throughout the UAE and GCC: retail and e-commerce, healthcare, real estate, education and EdTech, finance and FinTech, and hospitality and tourism. At our AI consulting firm in Dubai, we bring in-depth, industry-specific knowledge to every project to make sure the AI solutions we develop and implement are pertinent to the particular commercial, regulatory, and operational realities of your sector instead of being generalized frameworks utilized out of context.",
                img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80",
                imgLabel: "Six core industries across UAE & GCC"
            },
            {
                q: "How is ENH different from other AI consulting firms in Dubai?",
                a: "The fact that ENH possesses its own artificial intelligence solutions, handles all sorts of consulting, is knowledgeable about the Dubai market, provides adaptable collaboration models for businesses of all sizes, and offers pricing that makes premium AI transformation consulting accessible for more than just large corporations sets it apart. We are the partner of choice for companies that want AI to actually operate, since we have developed real AI products, we grasp the UAE regulatory scene, and we offer end-to-end implementation, not only slide decks.",
                img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80",
                imgLabel: "End-to-end implementation partner"
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
        <section className="svp-hero" style={{ backgroundImage: `url(${serviceHeroBannerAi})`, backgroundSize: "cover", backgroundPosition: "center", position: "relative", overflow: "hidden"}}>
            {/* ── Gradient overlay ── */}
  <div style={{
    position: "absolute",
    inset: 0,
    background: "linear-gradient(to right, rgba(228, 198, 140, 0.81) 0%, rgba(255, 237, 200, 0.57) 10%, rgba(243, 200, 114, 0.28) 65%, rgba(255,237,200,0.0) 90%)",
    zIndex: 0,
    pointerEvents: "none",
  }} />
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

                            <motion.h1 className="svp-hero__h1" variants={fadeLeft} style={{ color: "#422308", lineHeight: 1.15 }}>
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
                                    <Eyebrow>Business Challenges</Eyebrow>
                                    <motion.h2 className="svp-intro__title" variants={fadeLeft}>{block.title}</motion.h2>
                                    <motion.p className="svp-intro__text" variants={fadeUp}>{block.text}</motion.p>
                                    <motion.p className="svp-intro__text" variants={fadeUp}>{block.text2}</motion.p>
                                    <motion.p className="svp-intro__enquire-note" variants={fadeUp}>{block.note}</motion.p>
                                    <motion.div variants={fadeUp}>
                                        <Link to="/contact">
                                            <motion.button className="svp-enquire-btn"
                                                whileHover={{ scale: 1.04, x: 5, boxShadow: "0 8px 24px rgba(212,91,8,0.35)" }}
                                                whileTap={{ scale: 0.97 }}>
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
                            <Eyebrow>What We Offer</Eyebrow>
                            <motion.h2 className="svp-rd__title" style={{ color: '#532a06' }}>{data.rdTitle}</motion.h2>
                            <p variants={fadeUp} style={{ color: '#532a06' }} className='mt-3'>
                                ENH is not merely a firm for strategy; we are a full-spectrum AI consulting company in Dubai that guides you from opportunity discovery through to implemented, optimized, and constantly enhancing AI systems. Every layer of the AI process is covered by our artificial intelligence consulting services in Dubai; therefore, you never have to put together several suppliers, companies, or consultants to get the entire picture.
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
        { icon: <FaLightbulb />, title: "AI Consulting for Startups", description: "ENH Consulting helps startups in Dubai build cost-effective AI solutions, MVP-ready systems, and scalable automation strategies. Our startup AI consulting focuses on faster execution, lean implementation, and practical AI adoption that helps businesses launch quickly, reduce costs, and compete effectively from the very beginning.", number: "01" },
        { icon: <FaBriefcase />, title: "AI Consulting for SMEs", description: "We help SMEs in Dubai implement practical AI tools, workflow automation, and smart business systems without overwhelming internal teams. Our AI consulting services focus on improving efficiency, reducing manual tasks, increasing productivity, and helping growing businesses achieve measurable operational and long-term business growth successfully.", number: "02" },
        { icon: <FaGraduationCap />, title: "Enterprise AI Consulting", description: "ENH Consulting provides enterprise AI consulting in Dubai with AI governance, automation planning, change management, and scalable transformation strategies. We help enterprises across the UAE and GCC integrate AI into core operations, improve efficiency, track measurable ROI, and achieve long-term digital transformation success.", number: "03" },
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
                        Who We Help
                    </motion.div>
                    <motion.div className="services-title-row" variants={fadeUp}>
                        <h2 className="services-main-title">
                            <span className="title-accent" style={{ color: '#8a5520' }} >AI Consulting in Dubai for Startups, SMEs and Enterprises</span>
                        </h2>
                    </motion.div>
                    <motion.p className="services-subtitle mt-4" variants={fadeUp}>
                        Whether you are a first-year business with a small budget, an expanding SME ready to automate, or a huge corporation organizing a complete AI makeover, ENH's AI consulting services in Dubai are developed around your actual needs rather than a universal framework created for someone else. Here is how we work with every kind of business.
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
                    <Eyebrow gold>Industries We Serve</Eyebrow>
                    <motion.h2 className="svp-whyus__title" variants={fadeLeft}>Industries We Serve With AI Consulting Services in Dubai</motion.h2>
                    <motion.p className="mt-3 text-white" variants={fadeUp}>
                        Profound industry understanding guarantees that every AI solution we create is pertinent, compliant, and developed for real-world performance in the Dubai and GCC marketplaces. ENH provides AI consulting services in Dubai throughout the industries, hence propelling the UAE's economy.
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
                        <h2 className="svp-testimonials__title" style={{ color: '#532a06' }}>How Our AI Consulting Process Works in Dubai</h2>
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
                    <p className="mt-4" style={{ color: '#532a06' }}>From where you are now to a completely implemented, optimized AI system, our artificial intelligence consulting services in Dubai follow a proven five-step approach with clear milestones, measurable results, and no needless complexity at every stage.</p>
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
                        Why Dubai Businesses Choose ENH as Their AI Consulting Partner
                    </motion.h2>
                    <motion.p className="svp-why-enh__lead" variants={fadeUp}>
                        Many businesses are providing AI consulting in Dubai. Here is what sets ENH apart from all of them — and why companies throughout the UAE rely on us as their long-term AI consultant partner in Dubai.
                    </motion.p>
                </motion.div>

                <motion.div initial="hidden" whileInView="show" viewport={vp} variants={stagger}>
                    <Row className="g-4">
                        {data.whyEnh.map((reason, i) => (
                            <Col lg={i < 2 ? 6 : 4} md={6} key={i}>
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

                            <motion.div className="svp-faq__media" variants={fadeUp}>
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        className="svp-faq__media-inner"
                                        initial={{ opacity: 0, scale: 1.04 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.97 }}
                                        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}>
                                        <img src={faqImage}
                                            alt={"FAQ visual"}
                                            className="svp-faq__media-img" />
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
                            {/* <motion.p className="svp-contact__eyebrow" variants={fadeUp}>→ NEED ANY HELP?</motion.p> */}
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
                                            <option value="" disabled>Select Services *</option>
                                            <option value="ai">Ai Consulting</option>
                                            <option value="business">Business Consulting</option>
                                            <option value="digital">Digital Marketing Consulting</option>
                                            <option value="it">IT Consulting</option>
                                            <option value="startup">Startup Consulting</option>
                                            <option value="ed-tech">EdTech Consulting</option>
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
                        Ready to Transform Your Business With AI?
                        <span className="svp-final-cta__title-accent"> Talk to an ENH consultant today.</span>
                    </motion.h2>

                    <motion.p className="svp-final-cta__text" variants={fadeUp}>
                        Dubai is adopting artificial intelligence faster than most business owners understand, and every month that you don't have a clear AI strategy is a chance for your competitors to get ahead. AI consulting services provided by ENH in Dubai are meant to help you move swiftly, with assurance, and with a definite strategy that produces actual, quantifiable outcomes from the first interaction.
                    </motion.p>

                    <motion.p className="svp-final-cta__text" variants={fadeUp}>
                        Book your free consultation today to talk directly to an AI expert in Dubai who knows your business, the problems you face, and everything you need to do to succeed with AI in the UAE.
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


const postUrl = window.location.href;

// ─── ROOT ─────────────────────────────────────────────────────────────────────
function AiConsulting() {
    const { slug } = useParams();
    const data = SERVICE_DATA[slug] || SERVICE_DATA["default"];

    return (
        <div className="service-view-page">
            <Helmet>
                <title>AI Consulting Services in Dubai | Hire an AI Consultant Today</title>
                <meta name="description" content="Looking to hire an AI consultant in Dubai? We deliver tailored AI consulting services that drive real business results. Book a free consultation today." />
                <link rel="canonical" href={`https://enh.consulting/ai-consulting-services-in-dubai`} />
            </Helmet>
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

export default AiConsulting;