import React, { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import {
  FaArrowRight, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt,
  FaStar, FaQuoteLeft, FaFlask, FaLightbulb, FaSearch, FaRocket,
  FaShieldAlt, FaClock, FaHeadset, FaChevronLeft, FaChevronRight,
  FaPaperPlane, FaCheckCircle,
} from "react-icons/fa";
import { FiArrowUpRight } from "react-icons/fi";
import api from "../../utils/api";

// ─── Shared variants ─────────────────────────────────────────────────────────
const fadeUp   = { hidden:{opacity:0,y:44},  show:{opacity:1,y:0,  transition:{duration:0.6, ease:[0.22,1,0.36,1]}} };
const fadeLeft = { hidden:{opacity:0,x:-48}, show:{opacity:1,x:0,  transition:{duration:0.65,ease:[0.22,1,0.36,1]}} };
const fadeRight= { hidden:{opacity:0,x:48},  show:{opacity:1,x:0,  transition:{duration:0.65,ease:[0.22,1,0.36,1]}} };
const stagger  = { hidden:{}, show:{transition:{staggerChildren:0.1}} };
const staggerSm= { hidden:{}, show:{transition:{staggerChildren:0.07}} };
const cardV    = { hidden:{opacity:0,y:40,scale:0.95}, show:{opacity:1,y:0,scale:1,transition:{duration:0.55,ease:[0.22,1,0.36,1]}} };
const vp  = { once:true, amount:0.2 };
const vpMd= { once:true, amount:0.3 };

// ─── FadeUp wrapper ───────────────────────────────────────────────────────────
function FadeUp({ children, delay=0, className="" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once:true, margin:"-80px" });
  return (
    <motion.div ref={ref} className={className}
      initial={{opacity:0,y:40}}
      animate={inView?{opacity:1,y:0}:{}}
      transition={{duration:0.65,delay,ease:[0.22,1,0.36,1]}}>
      {children}
    </motion.div>
  );
}

// ─── ScaleIn wrapper ──────────────────────────────────────────────────────────
function ScaleIn({ children, delay=0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once:true, margin:"-60px" });
  return (
    <motion.div ref={ref}
      initial={{opacity:0,scale:0.88}}
      animate={inView?{opacity:1,scale:1}:{}}
      transition={{duration:0.55,delay,ease:[0.22,1,0.36,1]}}>
      {children}
    </motion.div>
  );
}

// ─── Section eyebrow ─────────────────────────────────────────────────────────
function Eyebrow({ children, gold=false }) {
  return (
    <motion.div variants={fadeUp} className={`svp-eyebrow-tag${gold?" svp-eyebrow-tag--gold":""}`}>
      <span className="svp-eyebrow-dot"/>{children}
    </motion.div>
  );
}

// ─── Floating particles ───────────────────────────────────────────────────────
function Particles({ count=10, color="rgba(235,174,95,0.14)" }) {
  const pts = useRef(
    Array.from({length:count},(_,i)=>({
      id:i, x:Math.random()*100, y:Math.random()*100,
      size:4+Math.random()*8, dur:7+Math.random()*9, del:Math.random()*6,
    }))
  ).current;
  return (
    <div className="svp-particles" aria-hidden="true">
      {pts.map(p=>(
        <div key={p.id} className="svp-particle"
          style={{left:`${p.x}%`,top:`${p.y}%`,width:p.size,height:p.size,
            background:color,animationDuration:`${p.dur}s`,animationDelay:`${p.del}s`}}/>
      ))}
    </div>
  );
}

// ─── Service Data ─────────────────────────────────────────────────────────────
const SERVICE_DATA = {
  "it-consulting": {
    badge:"IT Consulting", headline:"Effective Blockchain PPC Marketing",
    subheadline:"Drive Conversions and Boost Performance",
    tagline:"Outsmart Blockchain Competition with Targeted PPC Campaigns",
    cta:"We're Your #1 PPC Agency · Get in Touch Today!",
    heroImg:"https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80",
    introTitle:"Introduction to IT FMS",
    introText:"In today's digital age, businesses rely heavily on technology to perform their daily operations. From managing customer data to maintaining inventory, technology has become an integral part of running a business. As a result, IT facility management services (FMS) have become increasingly important to ensure that technology infrastructure is reliable, efficient, and secure.",
    enquireText:"Get Free 30 Min DC Consultation",
    rdTitle:"We Offer a Wide Variety of Research and Development Services",
    rdCards:[
      {icon:<FaFlask/>, title:"Sprint R&D", desc:"Give clients information, professional solution design, and roadmap suggestions."},
      {icon:<FaLightbulb/>, title:"Prototype Concept", desc:"Deliver a complete working prototype that will advance your products."},
      {icon:<FaSearch/>, title:"Research", desc:"Run brief experiments to validate concepts and technologies and establish expected value."},
    ],
    whyUs:[
      {icon:<FaClock/>, title:"We value your time", desc:"On-time Delivery without any fail. With proper planning and effective project management, we deliver quality with punctuality."},
      {icon:<FaHeadset/>, title:"We are 24/7 here for Support", desc:"Our team of experts are always available in one call. Be it any failure or need any form of assistance we are always here with solutions."},
      {icon:<FaRocket/>, title:"We constantly innovate", desc:"Our team is committed to bringing innovation to the table constantly. Innovative and new-age solutions increase the capabilities."},
      {icon:<FaShieldAlt/>, title:"We have the Expertise", desc:"We have been giving fantastic IT Solutions, DC, networking, Cyber Security, Surveillance and Softwares for more than a decade."},
    ],
    testimonials:[
      {name:"Raman Kant Aggarwal",role:"Doctor",stars:5,text:"Dedicated, focused, genuine trustworthy and enterprising! Real good value for Customers."},
      {name:"Geeta Kadayaprath",role:"The Breast Cancer Clinic",stars:5,text:"This company has a great team which is able to create excellent content and post it at appropriate times. Response to queries and resolution of problems is also very quick. Thank you!"},
      {name:"Priya Sharma",role:"Startup Founder",stars:5,text:"Absolutely brilliant team. They transformed our digital presence and we saw a 300% increase in qualified leads within 3 months."},
    ],
  },
  "default": {
    badge:"Our Services", headline:"Expert Consulting Services",
    subheadline:"Drive Growth and Transformation",
    tagline:"Professional solutions tailored to your business needs Professional solutions tailored to your business needs..",
    cta:"Get in Touch!",
    heroImg:"https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=600&q=80",
    introTitle:"Introduction to Our Service",
    introText:"We deliver expert consulting and strategic guidance to help businesses thrive in a competitive landscape. Our team brings decades of combined experience across industries, ensuring you receive the best possible advice and implementation support.",
    enquireText:"Get a Free 30 Min Consultation",
    rdTitle:"We Offer a Wide Variety of Research and Development Services",
    rdCards:[
      {icon:<FaFlask/>, title:"Sprint R&D", desc:"Give clients information, professional solution design, and roadmap suggestions."},
      {icon:<FaLightbulb/>, title:"Prototype Concept", desc:"Deliver a complete working prototype that will advance your products."},
      {icon:<FaSearch/>, title:"Research", desc:"Run brief experiments to validate concepts and technologies and establish expected value."},
    ],
    whyUs:[
      {icon:<FaClock/>, title:"We value your time", desc:"On-time Delivery without any fail. With proper planning and effective project management, we deliver quality with punctuality."},
      {icon:<FaHeadset/>, title:"We are 24/7 here for Support", desc:"Our team of experts are always available in one call. Be it any failure or need any form of assistance we are always here."},
      {icon:<FaRocket/>, title:"We constantly innovate", desc:"Our team is committed to bringing innovation to the table constantly. New-age solutions increase the capabilities."},
      {icon:<FaShieldAlt/>, title:"We have the Expertise", desc:"We have been delivering fantastic solutions for more than a decade across industries and geographies."},
    ],
    testimonials:[
      {name:"Raman Kant Aggarwal",role:"Doctor",stars:5,text:"Dedicated, focused, genuine trustworthy and enterprising! Real good value for Customers."},
      {name:"Geeta Kadayaprath",role:"The Breast Cancer Clinic",stars:5,text:"This company has a great team which is able to create excellent content and post it at appropriate times."},
      {name:"Priya Sharma",role:"Startup Founder",stars:5,text:"Absolutely brilliant team. They transformed our digital presence and we saw a 300% increase in qualified leads."},
    ],
  },
};

// ─── Breadcrumb Banner ────────────────────────────────────────────────────────
function BreadcrumbBanner({ title }) {
  return (
    <div className="svp-breadcrumb">
      <div className="svp-breadcrumb__overlay"/>
      {/* animated scan lines */}
      <div className="svp-breadcrumb__scanlines" aria-hidden="true"/>
      <Container>
        <motion.div className="svp-breadcrumb__inner"
          initial={{opacity:0,y:-20}} animate={{opacity:1,y:0}}
          transition={{duration:0.6,ease:[0.22,1,0.36,1]}}>
          <motion.h1 className="svp-breadcrumb__title"
            initial={{opacity:0,x:-30}} animate={{opacity:1,x:0}}
            transition={{delay:0.1,duration:0.55,ease:[0.22,1,0.36,1]}}>
            {title}
          </motion.h1>
          <motion.nav className="svp-breadcrumb__nav"
            initial={{opacity:0,x:30}} animate={{opacity:1,x:0}}
            transition={{delay:0.2,duration:0.55,ease:[0.22,1,0.36,1]}}>
            <Link to="/" className="svp-breadcrumb__link">Home</Link>
            <span className="svp-breadcrumb__sep">›</span>
            <Link to="/services" className="svp-breadcrumb__link">Services</Link>
            <span className="svp-breadcrumb__sep">›</span>
            <span className="svp-breadcrumb__current">{title}</span>
          </motion.nav>
        </motion.div>
      </Container>
    </div>
  );
}

// ─── SECTION 1 · Hero Banner ──────────────────────────────────────────────────
function HeroBanner({ data }) {
  const [form, setForm] = useState({name:"",phone:"",email:"",website:"",message:""});
  const [status, setStatus] = useState("idle");
  const [focusedField, setFocusedField] = useState(null);

  const handleSubmit = async () => {
    if(!form.name||!form.phone||!form.email) return;
    setStatus("loading");
    try {
      await api.post("/enquiries",{...form,source:"svp-hero"});
      setStatus("success"); setForm({name:"",phone:"",email:"",website:"",message:""});
      setTimeout(()=>setStatus("idle"),4000);
    } catch { setStatus("error"); setTimeout(()=>setStatus("idle"),3000); }
  };

  const bannerStagger = { hidden:{}, show:{transition:{staggerChildren:0.1,delayChildren:0.05}} };

  return (
    <section className="svp-hero">
      <motion.span className="svp-blob svp-blob--1"
        animate={{x:[0,28,-18,0],y:[0,-22,32,0],scale:[1,1.1,0.94,1]}}
        transition={{duration:13,repeat:Infinity,ease:"easeInOut"}}/>
      <motion.span className="svp-blob svp-blob--2"
        animate={{x:[0,-24,20,0],y:[0,30,-14,0],scale:[1,0.9,1.08,1]}}
        transition={{duration:17,repeat:Infinity,ease:"easeInOut",delay:2}}/>
      <motion.span className="svp-blob svp-blob--3"
        animate={{x:[0,22,-28,0],y:[0,-28,12,0],scale:[1,1.14,0.9,1]}}
        transition={{duration:11,repeat:Infinity,ease:"easeInOut",delay:5}}/>

      <Container>
        <Row className="align-items-center g-4">
          <Col lg={7}>
            <motion.div variants={bannerStagger} initial="hidden" animate="show">

              <motion.h1 className="svp-hero__h1" variants={fadeLeft} style={{color:"#422308"}}>
                {data.headline}
              </motion.h1>
              <motion.p className="svp-hero__sub" variants={fadeUp}>{data.subheadline}</motion.p>
              <motion.p className="svp-hero__tagline" variants={fadeUp} style={{color:"#422308"}}>
                {data.tagline}
              </motion.p>

              <motion.div className="svp-hero__cta-bar" variants={fadeUp} style={{background:"#ffae45e0"}}>
                <motion.span className="svp-hero__cta-text"
                  animate={{opacity:[0.85,1,0.85]}} transition={{duration:2.5,repeat:Infinity}}>
                  {data.cta}
                </motion.span>
              </motion.div>

              {/* Trust pills */}
              <motion.div className="svp-hero-trust" variants={staggerSm}>
                {["Certified Experts","Free Consultation","24/7 Support","Proven Results"].map((t,i)=>(
                  <motion.span key={i} className="svp-hero-trust__pill" variants={fadeUp}
                    whileHover={{scale:1.08,backgroundColor:"rgba(235,174,95,0.25)"}}>
                    <FaCheckCircle/> {t}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>
          </Col>

          <Col lg={5}>
            <motion.div className="svp-hero__form"
              initial={{opacity:0,x:60,rotateY:5}}
              animate={{opacity:1,x:0,rotateY:0}}
              transition={{duration:0.85,delay:0.15,ease:[0.22,1,0.36,1]}}
              style={{perspective:1000}}>
              <div className="svp-hero__form-accent"/>
              <div className="svp-hero__form-shimmer" aria-hidden="true"/>

              <motion.h3 className="svp-hero__form-title"
                initial={{opacity:0,y:-12}} animate={{opacity:1,y:0}}
                transition={{delay:0.4,duration:0.5}}>
                Talk to An Expert
              </motion.h3>
              <motion.p className="svp-hero__form-sub"
                initial={{opacity:0}} animate={{opacity:1}}
                transition={{delay:0.5,duration:0.4}}>
                Free 30-min consultation, no strings attached
              </motion.p>

              {[
                [{name:"name",placeholder:"Your Name*"},{name:"phone",placeholder:"Your Phone Number*",type:"tel"}],
                [{name:"email",placeholder:"Your E-Mail*",type:"email"},{name:"website",placeholder:"Your Website"}],
              ].map((row,ri)=>(
                <motion.div key={ri} className="svp-hero__form-row"
                  initial={{opacity:0,y:16}} animate={{opacity:1,y:0}}
                  transition={{delay:0.5+ri*0.1,duration:0.4,ease:[0.22,1,0.36,1]}}>
                  {row.map(f=>(
                    <div key={f.name} className={`svp-input-wrap${focusedField===f.name?" svp-input-wrap--focused":""}`}>
                      <input className="svp-hero__input" placeholder={f.placeholder}
                        value={form[f.name]} type={f.type||"text"}
                        onChange={e=>setForm({...form,[f.name]:e.target.value})}
                        onFocus={()=>setFocusedField(f.name)}
                        onBlur={()=>setFocusedField(null)}
                        disabled={status==="loading"}/>
                      <motion.div className="svp-input-focus-bar"
                        animate={{scaleX:focusedField===f.name?1:0,opacity:focusedField===f.name?1:0}}
                        transition={{duration:0.25}}/>
                    </div>
                  ))}
                </motion.div>
              ))}

              <motion.div className="svp-input-wrap"
                initial={{opacity:0,y:16}} animate={{opacity:1,y:0}}
                transition={{delay:0.72,duration:0.4}}>
                <textarea className="svp-hero__input svp-hero__textarea"
                  placeholder="Message..." value={form.message}
                  onChange={e=>setForm({...form,message:e.target.value})}
                  rows={3} disabled={status==="loading"}/>
              </motion.div>

              <motion.button className="svp-hero__form-btn"
                onClick={handleSubmit}
                disabled={status==="loading"||status==="success"}
                whileHover={status==="idle"?{scale:1.02,y:-2,boxShadow:"0 12px 32px rgba(212,91,8,0.45)"}:{}}
                whileTap={{scale:0.97}}
                initial={{opacity:0,y:16}} animate={{opacity:1,y:0}}
                transition={{delay:0.82,duration:0.4}}>
                <AnimatePresence mode="wait">
                  {status==="loading" && <motion.span key="l" className="svp-btn-state" initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-8}}><FaPaperPlane className="svp-spin"/> Sending...</motion.span>}
                  {status==="success" && <motion.span key="s" className="svp-btn-state" initial={{opacity:0,scale:0.6}} animate={{opacity:1,scale:1}} exit={{opacity:0}} transition={{type:"spring",stiffness:280}}><FaCheckCircle/> Request Sent!</motion.span>}
                  {status==="error"   && <motion.span key="e" className="svp-btn-state" initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-8}}><FaPaperPlane/> Try Again</motion.span>}
                  {status==="idle"    && <motion.span key="i" className="svp-btn-state" initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-8}}><FaPaperPlane/> Talk to An Expert</motion.span>}
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
    <section className="svp-intro" style={{background:"linear-gradient(135deg,#fff4e1 0%,#fdedce 60%,#ffd78a 100%)"}}>
      <Particles count={8}/>
      <Container>
        {[
          {
            img: data.heroImg,
            title: data.introTitle,
            text: data.introText,
            note: data.enquireText,
            btnLabel: "Enquire Now",
            decoClass: "",
            reverse: false,
          },
          {
            img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80",
            title: "We will deliver best services",
            text: "We deliver expert consulting and strategic guidance to help businesses thrive in a competitive landscape. Our team brings decades of combined experience across industries.",
            note: "Best possible advice and implementation support",
            btnLabel: "View more",
            decoClass: "svp-intro__img-deco--right",
            reverse: true,
          },
        ].map((block, bi) => (
          <Row key={bi}
            className={`align-items-center g-5 mt-5 p-3 svp-intro-row`}
            style={{border:"1px solid rgba(212,91,8,0.28)",borderRadius:14,boxShadow:"0 4px 16px rgba(212,91,8,0.14)"}}>
            <Col lg={6} className={block.reverse?"order-lg-2":""}>
              <FadeUp>
                <motion.div className="svp-intro__img-wrap"
                  whileHover={{scale:1.02}} transition={{duration:0.35}}>
                  <motion.img src={block.img} alt={block.title} className="svp-intro__img"
                    initial={{scale:1.05,opacity:0}} whileInView={{scale:1,opacity:1}}
                    viewport={{once:true}} transition={{duration:0.7,ease:[0.22,1,0.36,1]}}/>
                  <div className={`svp-intro__img-deco ${block.decoClass}`}/>
                  <div className="svp-intro__img-shine" aria-hidden="true"/>
                </motion.div>
              </FadeUp>
            </Col>
            <Col lg={6} className={block.reverse?"order-lg-1":""}>
              <FadeUp delay={0.1}>
                <motion.div initial="hidden" whileInView="show" viewport={vp} variants={stagger}>
                  <Eyebrow>Our Services</Eyebrow>
                  <motion.h2 className="svp-intro__title" variants={fadeLeft}>{block.title}</motion.h2>
                  <motion.p className="svp-intro__text" variants={fadeUp}>{block.text}</motion.p>
                  <motion.p className="svp-intro__enquire-note" variants={fadeUp}>{block.note}</motion.p>
                  <motion.div variants={fadeUp}>
                    <motion.button className="svp-enquire-btn"
                      whileHover={{scale:1.04,x:5,boxShadow:"0 8px 24px rgba(212,91,8,0.35)"}}
                      whileTap={{scale:0.97}}>
                      {block.btnLabel} <FaArrowRight/>
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
      <Particles count={6} color="rgba(235,174,95,0.10)"/>
      <Container>
        <motion.div initial="hidden" whileInView="show" viewport={vpMd} variants={stagger}>
          <Row className="align-items-center mb-5">
            <Col lg={8}>
              <Eyebrow>Research & Development</Eyebrow>
              <motion.h2 className="svp-rd__title" variants={fadeLeft}>{data.rdTitle}</motion.h2>
            </Col>
            <Col lg={4} className="text-lg-end mt-3 mt-lg-0">
              <motion.div variants={fadeRight}>
                <motion.button className="svp-outline-btn"
                  whileHover={{scale:1.05,y:-2,backgroundColor:"rgb(235,174,95)",color:"#fff",borderColor:"rgb(235,174,95)"}}
                  whileTap={{scale:0.97}}>
                  Talk to Us <FiArrowUpRight/>
                </motion.button>
              </motion.div>
            </Col>
          </Row>
        </motion.div>

        <motion.div initial="hidden" whileInView="show" viewport={vp} variants={stagger}>
          <Row className="g-4">
            {data.rdCards.map((card,i)=>(
              <Col lg={4} md={6} key={i}>
                <motion.div variants={cardV}
                  onHoverStart={()=>setHovered(i)} onHoverEnd={()=>setHovered(null)}>
                  <motion.div className="svp-rd__card"
                    animate={{boxShadow:hovered===i?"0 20px 52px rgba(133,86,25,0.18)":"0 4px 6px rgba(133,86,25,0.06)"}}
                    whileHover={{y:-10,transition:{type:"spring",stiffness:300,damping:18}}}>
                    <motion.div className="svp-rd__icon"
                      animate={{backgroundColor:hovered===i?"linear-gradient(135deg,rgb(235,174,95),#d45b08)":"rgba(235,174,95,0.2)"}}
                      whileHover={{rotate:-8,scale:1.12,backgroundColor:"rgb(235,174,95)",color:"#fff"}}
                      transition={{type:"spring",stiffness:280,damping:14}}>
                      {card.icon}
                    </motion.div>
                    <h4 className="svp-rd__card-title">{card.title}</h4>
                    <p className="svp-rd__card-desc">{card.desc}</p>

                    {/* Animated progress bar on hover */}
                    <motion.div className="svp-rd__card-bar"
                      animate={{scaleX:hovered===i?1:0}}
                      transition={{duration:0.5,ease:[0.22,1,0.36,1]}}/>
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

// ─── SECTION 4 · Why Choose Us ────────────────────────────────────────────────
function WhyUsSection({ data }) {
  return (
    <section className="svp-whyus">
      <motion.span className="svp-whyus__ring svp-whyus__ring--1"
        animate={{rotate:[0,360]}} transition={{duration:40,repeat:Infinity,ease:"linear"}}/>
      <motion.span className="svp-whyus__ring svp-whyus__ring--2"
        animate={{rotate:[0,-360]}} transition={{duration:28,repeat:Infinity,ease:"linear"}}/>
      <Particles count={8} color="rgba(235,174,95,0.08)"/>

      <Container>
        <motion.div initial="hidden" whileInView="show" viewport={vpMd} variants={stagger}>
          <Eyebrow gold>Why Choose Us</Eyebrow>
          {/* <motion.p className="svp-whyus__eyebrow" variants={fadeUp}>→ WHY CHOOSE US FOR</motion.p> */}
          <motion.h2 className="svp-whyus__title" variants={fadeLeft}>Research and Development</motion.h2>
        </motion.div>

        <motion.div initial="hidden" whileInView="show" viewport={vp} variants={stagger}>
          <Row className="g-4 mt-2">
            {data.whyUs.map((item,i)=>(
              <Col lg={6} key={i}>
                <motion.div className="svp-whyus__card" variants={cardV}
                  whileHover={{
                    borderColor:"rgb(235,174,95)",
                    backgroundColor:"rgba(235,174,95,0.06)",
                    x:4,
                    transition:{duration:0.25},
                  }}>
                  <motion.div className="svp-whyus__icon-wrap"
                    whileHover={{backgroundColor:"rgb(235,174,95)",color:"#fff",rotate:-8,scale:1.1}}
                    transition={{type:"spring",stiffness:280,damping:14}}>
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
  useEffect(()=>{
    const t=setInterval(()=>setActive(p=>(p+1)%total),5000);
    return ()=>clearInterval(t);
  },[total]);

  return (
    <section className="svp-testimonials">
      <Particles count={6} color="rgba(235,174,95,0.07)"/>
      <Container>
        <motion.div initial="hidden" whileInView="show" viewport={vpMd} variants={stagger}>
          <Eyebrow>Client Reviews</Eyebrow>
          <motion.div className="svp-testimonials__header" variants={fadeUp}>
            <h2 className="svp-testimonials__title">Our Client Review</h2>
            <div className="svp-testimonials__nav">
              {[-1,1].map(dir=>(
                <motion.button key={dir} className="svp-testimonials__arrow"
                  onClick={()=>setActive(p=>(p+dir+total)%total)}
                  whileHover={{scale:1.12,backgroundColor:"rgb(235,174,95)",color:"#fff",borderColor:"rgb(235,174,95)"}}
                  whileTap={{scale:0.88}}>
                  {dir===-1?<FaChevronLeft/>:<FaChevronRight/>}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </motion.div>

        <Row className="g-4 mt-2">
          {data.testimonials.map((t,i)=>(
            <Col lg={4} md={6} key={i}>
              <motion.div
                className={`svp-testimonials__card${i===active?" svp-testimonials__card--active":""}`}
                animate={{
                  opacity:i===active?1:0.6,
                  scale:i===active?1:0.97,
                  y:i===active?0:4,
                }}
                transition={{duration:0.4,ease:[0.22,1,0.36,1]}}
                onClick={()=>setActive(i)}
                whileHover={{y:i===active?-8:-4,boxShadow:"0 14px 36px rgba(133,86,25,0.14)"}}>

                <motion.div
                  animate={{color:i===active?"rgba(235,174,95,0.6)":"rgba(235,174,95,0.18)"}}
                  transition={{duration:0.3}}>
                  <FaQuoteLeft className="svp-testimonials__quote-icon"/>
                </motion.div>

                <div className="svp-testimonials__stars">
                  {[...Array(t.stars)].map((_,si)=>(
                    <motion.div key={si}
                      initial={{opacity:0,scale:0}}
                      whileInView={{opacity:1,scale:1}}
                      viewport={{once:true}}
                      transition={{delay:si*0.07,type:"spring",stiffness:300}}>
                      <FaStar/>
                    </motion.div>
                  ))}
                </div>

                <p className="svp-testimonials__text">"{t.text}"</p>

                <div className="svp-testimonials__author">
                  <motion.div className="svp-testimonials__avatar"
                    animate={{
                      background:i===active
                        ?"linear-gradient(135deg,rgb(235,174,95),#d45b08)"
                        :"linear-gradient(135deg,#9a6030,#5a3010)",
                    }}
                    transition={{duration:0.4}}>
                    {t.name.charAt(0)}
                  </motion.div>
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
          {data.testimonials.map((_,i)=>(
            <motion.button key={i}
              className={`svp-testimonials__dot${i===active?" svp-testimonials__dot--active":""}`}
              onClick={()=>setActive(i)}
              whileHover={{scale:1.4}} whileTap={{scale:0.8}}/>
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

  useEffect(()=>{
    api.get('/posts?limit=3').then(({data})=>setPosts(data.data||[])).catch(()=>{}).finally(()=>setLoading(false));
  },[]);

  const fmt=(d)=>new Date(d).toLocaleDateString('en-GB',{day:'numeric',month:'long',year:'numeric'});

  return (
    <section className="svp-blog">
      <Container>
        <motion.div initial="hidden" whileInView="show" viewport={vpMd} variants={stagger}>
          <Eyebrow>News &amp; Blog</Eyebrow>
          <motion.div className="svp-blog__header" variants={fadeUp}>
            <h2 className="svp-blog__title">Build your digital future</h2>
            <Link to="/blog">
              <motion.button className="svp-outline-btn"
                whileHover={{scale:1.05,y:-2,backgroundColor:"rgb(235,174,95)",color:"#fff",borderColor:"rgb(235,174,95)"}}
                whileTap={{scale:0.97}}>
                View More <FiArrowUpRight/>
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>

        <Row className="g-4 mt-2">
          {loading ? [...Array(3)].map((_,i)=>(
            <Col lg={4} md={6} key={i}>
              <div className="svp-blog__card svp-blog__card--skeleton">
                <div className="svp-blog__img-wrap" style={{background:"#e8ddd0",height:220}}/>
                <div className="svp-blog__body" style={{padding:16}}>
                  <div style={{height:11,background:"#e8ddd0",borderRadius:4,width:"45%",marginBottom:10}}/>
                  <div style={{height:15,background:"#e8ddd0",borderRadius:4,width:"85%",marginBottom:6}}/>
                  <div style={{height:15,background:"#e8ddd0",borderRadius:4,width:"65%"}}/>
                </div>
              </div>
            </Col>
          )) : posts.length===0 ? (
            <Col><p style={{color:"#888",textAlign:"center",padding:"40px 0"}}>No blog posts found.</p></Col>
          ) : posts.map((post,i)=>(
            <Col lg={4} md={6} key={post._id}>
              <FadeUp delay={i*0.12}>
                <motion.div className="svp-blog__card"
                  whileHover={{y:-10,boxShadow:"0 20px 52px rgba(133,86,25,0.16)",transition:{type:"spring",stiffness:280,damping:18}}}>
                  <Link to={`/blog/${post.slug}`} className="svp-blog__lin">
                    <div className="svp-blog__img-wrap">
                      <motion.img
                        src={post.featuredImage?.url||'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&q=80'}
                        alt={post.featuredImage?.alt||post.title}
                        className="svp-blog__img"
                        whileHover={{scale:1.08}} transition={{duration:0.5}}/>
                    </div>
                  </Link>
                  <div className="svp-blog__body">
                    <p className="svp-blog__date">
                      {post.category?.name && (
                        <span style={{color:"#d45b08",marginRight:8,fontWeight:600}}>{post.category.name}</span>
                      )}
                      {fmt(post.createdAt)}
                    </p>
                    <h4 className="svp-blog__card-title">
                      <Link to={`/blog/${post.slug}`} style={{color:"inherit",textDecoration:"none"}}>{post.title}</Link>
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

// ─── SECTION 7 · Contact ──────────────────────────────────────────────────────
function ContactSection() {
  const [form, setForm] = useState({name:"",phone:"",email:"",service:"",message:""});
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const handleSubmit = async () => {
    if(!form.name||!form.phone||!form.email) return;
    setLoading(true);
    try {
      await api.post("/enquiries",{...form,source:"svp-contact"});
      setSent(true); setForm({name:"",phone:"",email:"",service:"",message:""});
      setTimeout(()=>setSent(false),3000);
    } catch {} finally { setLoading(false); }
  };

  const contactItems = [
    {icon:<FaPhoneAlt/>, label:"Have any question?", value:"+971 505913055"},
    {icon:<FaEnvelope/>, label:"Write email",         value:"contact@enh.consulting"},
    {icon:<FaMapMarkerAlt/>, label:"Our Location",    value:"Ramesh Nagar, New Delhi"},
  ];

  const fields = [
    {md:6,  name:"name",    placeholder:"Full Name*",  type:"text"},
    {md:6,  name:"phone",   placeholder:"Phone*",       type:"tel"},
    {md:12, name:"email",   placeholder:"Email*",       type:"email"},
  ];

  return (
    <section className="svp-contact">
      <Particles count={8} color="rgba(235,174,95,0.07)"/>
      <Container>
        <Row className="g-5">
          {/* Left info */}
          <Col lg={5}>
            <motion.div initial="hidden" whileInView="show" viewport={vpMd} variants={stagger}>
              <Eyebrow>Get in touch</Eyebrow>
              <motion.p className="svp-contact__eyebrow" variants={fadeUp}>→ NEED ANY HELP?</motion.p>
              <motion.h2 className="svp-contact__title" variants={fadeLeft} style={{color:"#58300d"}}>
                Get in touch with us
              </motion.h2>
              <motion.p className="svp-contact__desc" variants={fadeUp} style={{color:"#7a410fe3"}}>
                Get in touch today to start growing your digital presence with expert guidance.
              </motion.p>

              <motion.div className="svp-contact__items" variants={staggerSm}>
                {contactItems.map((item,i)=>(
                  <motion.div key={i} className="svp-contact__item" variants={fadeUp}
                    whileHover={{x:6,backgroundColor:"rgba(235,174,95,0.06)",transition:{duration:0.2}}}>
                    <motion.div className="svp-contact__icon"
                      whileHover={{backgroundColor:"rgb(235,174,95)",color:"#fff",scale:1.08}}
                      transition={{duration:0.25}}>
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
              initial={{opacity:0,x:50}} whileInView={{opacity:1,x:0}}
              viewport={vp} transition={{duration:0.7,ease:[0.22,1,0.36,1]}}>
              <div className="svp-contact__form-shimmer" aria-hidden="true"/>
              <h3 className="svp-contact__form-title">Send Message</h3>
              <Row className="g-3">
                {fields.map((f,i)=>(
                  <Col md={f.md} key={f.name}>
                    <motion.div
                      className={`svp-contact-input-wrap${focusedField===f.name?" svp-contact-input-wrap--focused":""}`}
                      initial={{opacity:0,y:14}} whileInView={{opacity:1,y:0}}
                      viewport={vp} transition={{delay:0.1+i*0.07,duration:0.4}}
                      whileHover={{scale:1.01}}>
                      <input className="svp-contact__field" placeholder={f.placeholder}
                        value={form[f.name]} type={f.type}
                        onChange={e=>setForm({...form,[f.name]:e.target.value})}
                        onFocus={()=>setFocusedField(f.name)}
                        onBlur={()=>setFocusedField(null)}/>
                      <motion.div className="svp-contact-focus-bar"
                        animate={{scaleX:focusedField===f.name?1:0,opacity:focusedField===f.name?1:0}}
                        transition={{duration:0.25}}/>
                    </motion.div>
                  </Col>
                ))}
                <Col md={12}>
                  <motion.div whileHover={{scale:1.01}}
                    initial={{opacity:0,y:14}} whileInView={{opacity:1,y:0}}
                    viewport={vp} transition={{delay:0.31,duration:0.4}}>
                    <select className="svp-contact__field svp-contact__field--select"
                      value={form.service} onChange={e=>setForm({...form,service:e.target.value})}>
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
                  <motion.div whileHover={{scale:1.01}}
                    initial={{opacity:0,y:14}} whileInView={{opacity:1,y:0}}
                    viewport={vp} transition={{delay:0.38,duration:0.4}}>
                    <textarea className="svp-contact__field svp-contact__field--textarea"
                      placeholder="Message" rows={4} value={form.message}
                      onChange={e=>setForm({...form,message:e.target.value})}/>
                  </motion.div>
                </Col>
                <Col md={12}>
                  <motion.button
                    className={`svp-contact__submit${sent?" svp-contact__submit--sent":""}`}
                    onClick={handleSubmit}
                    whileHover={!sent&&!loading?{scale:1.02,y:-2,boxShadow:"0 12px 28px rgba(212,91,8,0.35)"}:{}}
                    whileTap={{scale:0.97}}
                    disabled={sent||loading}
                    initial={{opacity:0,y:14}} whileInView={{opacity:1,y:0}}
                    viewport={vp} transition={{delay:0.45,duration:0.4}}>
                    <AnimatePresence mode="wait">
                      {loading && <motion.span key="l" className="svp-btn-state" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}><FaPaperPlane className="svp-spin"/> Sending...</motion.span>}
                      {sent    && <motion.span key="s" className="svp-btn-state" initial={{opacity:0,scale:0.7}} animate={{opacity:1,scale:1}} exit={{opacity:0}} transition={{type:"spring"}}><FaCheckCircle/> Message Sent!</motion.span>}
                      {!sent&&!loading && <motion.span key="i" className="svp-btn-state" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}><FaPaperPlane/> Send Message</motion.span>}
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

// ─── ROOT ─────────────────────────────────────────────────────────────────────
function ServiceViewPage() {
  const { slug } = useParams();
  const data = SERVICE_DATA[slug] || SERVICE_DATA["default"];

  return (
    <div className="service-view-page">
      <BreadcrumbBanner title={data.badge}/>
      <HeroBanner data={data}/>
      <IntroSection data={data}/>
      <RDSection data={data}/>
      <WhyUsSection data={data}/>
      <TestimonialsSection data={data}/>
      <BlogSection/>
      <ContactSection/>
    </div>
  );
}

export default ServiceViewPage;