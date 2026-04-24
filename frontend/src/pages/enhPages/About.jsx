import React, { useRef, useState, useEffect } from "react";
import BreadcrumbBanner from "../../components/enhComponent/BreadcrumbBanner";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { FaBullseye, FaChartBar, FaEye, FaArrowRight } from "react-icons/fa";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

// ── Shared variants ──────────────────────────────────────────────────────────
const fadeUp   = { hidden:{opacity:0,y:44},   show:{opacity:1,y:0,  transition:{duration:0.6, ease:[0.22,1,0.36,1]}} };
const fadeLeft = { hidden:{opacity:0,x:-48},  show:{opacity:1,x:0,  transition:{duration:0.65,ease:[0.22,1,0.36,1]}} };
const fadeRight= { hidden:{opacity:0,x:48},   show:{opacity:1,x:0,  transition:{duration:0.65,ease:[0.22,1,0.36,1]}} };
const stagger  = { hidden:{}, show:{transition:{staggerChildren:0.1}} };
const staggerSm= { hidden:{}, show:{transition:{staggerChildren:0.07}} };
const cardV    = { hidden:{opacity:0,y:40,scale:0.95}, show:{opacity:1,y:0,scale:1,transition:{duration:0.55,ease:[0.22,1,0.36,1]}} };
const vp = { once:true, amount:0.2 };

// ── Animated count-up ────────────────────────────────────────────────────────
function CountUp({ target, suffix="" }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);
  const num = parseInt(String(target).replace(/\D/g,""), 10);
  const sfx = suffix || String(target).replace(/[0-9]/g,"");

  useEffect(() => {
    const obs = new IntersectionObserver(([e])=>{ if(e.isIntersecting) setStarted(true); },{threshold:0.5});
    if(ref.current) obs.observe(ref.current);
    return ()=>obs.disconnect();
  },[]);

  useEffect(()=>{
    if(!started) return;
    let f=0; const total=60;
    const t=setInterval(()=>{
      f++; const eased=1-Math.pow(1-f/total,3);
      setCount(Math.round(eased*num));
      if(f>=total){setCount(num);clearInterval(t);}
    },25);
    return ()=>clearInterval(t);
  },[started,num]);

  return <span ref={ref}>{count}{sfx}</span>;
}

const events = [
  { date:"MAY 02, 2018", title:"Best Employee Award",    description:"Right to find fault with a man who chooses to enjoy too much pleasure that has no annoying." },
  { date:"MAR 06, 2017", title:"International Branch",   description:"Right to find fault with a man who chooses to enjoy a pleasure that has no annoying." },
  { date:"JAN 01, 2017", title:"Our First Big Project",  description:"To take a trivial example, which undertakes physical exercise for some advantage." },
  { date:"DEC 12, 2019", title:"Global Expansion",       description:"Expanding into international markets and increasing brand presence worldwide." },
  { date:"SEP 22, 2020", title:"Innovation Award",       description:"Recognized for outstanding contributions in innovation and technology." },
];

const responsive = {
  desktop:{ breakpoint:{max:3000,min:1024}, items:3 },
  tablet: { breakpoint:{max:1024,min:768},  items:2 },
  mobile: { breakpoint:{max:768,min:0},     items:1 },
};

function About() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target:heroRef, offset:["start end","end start"] });
  const imgScale = useTransform(scrollYProgress,[0,0.5,1],[0.93,1,1.05]);

  const [ctaForm, setCtaForm] = useState({ name:"", email:"", service:"" });
  const [ctaStatus, setCtaStatus] = useState("idle");

  const handleCta = () => {
    if(!ctaForm.name||!ctaForm.email) return;
    setCtaStatus("loading");
    setTimeout(()=>{ setCtaStatus("success"); setCtaForm({name:"",email:"",service:""}); setTimeout(()=>setCtaStatus("idle"),3000); },900);
  };

  const values = [
    "✔️ Integrity","✔️ Commitment to excellence",
    "✔️ Consumer focus","✔️ Accountability","✔️ Inclusiveness",
  ];

  return (
    <div className="about-page">
      {/* Breadcrumb */}
      <BreadcrumbBanner title="About" />

      {/* ── About Us ── */}
      <section className="about-us about-us--page" ref={heroRef}>
        {/* floating particles */}
        <div className="about-particles" aria-hidden="true">
          {Array.from({length:12},(_,i)=>(
            <div key={i} className="about-particle"
              style={{
                left:`${Math.random()*100}%`, top:`${Math.random()*100}%`,
                width:4+Math.random()*8, height:4+Math.random()*8,
                animationDuration:`${7+Math.random()*8}s`,
                animationDelay:`${Math.random()*5}s`,
              }}/>
          ))}
        </div>

        <Container>
          <Row className="align-items-center">
            {/* Image */}
            <Col lg={6} className="about-image">
              <motion.div className="about-img-frame"
                initial={{opacity:0,x:-50}} whileInView={{opacity:1,x:0}}
                viewport={vp} transition={{duration:0.75,ease:[0.22,1,0.36,1]}}>
                <motion.img src="./about.jpg" alt="About Us" className="img-fluid"
                  style={{scale:imgScale, borderRadius:16}}/>
                <div className="about-img-ring"/>
                <div className="about-img-ring about-img-ring--2"/>
                <motion.div className="about-float-badge"
                  initial={{opacity:0,scale:0,rotate:-10}}
                  whileInView={{opacity:1,scale:1,rotate:0}}
                  viewport={{once:true}}
                  transition={{delay:0.5,type:"spring",stiffness:220}}
                  animate={{y:[0,-8,0]}}
                >
                  <span className="afb-num"><CountUp target={20} suffix="+"/></span>
                  <span className="afb-label">Years</span>
                </motion.div>
              </motion.div>
            </Col>

            {/* Text */}
            <Col lg={6} className="about-text">
              <motion.div initial="hidden" whileInView="show" viewport={vp} variants={stagger}>
                <motion.div variants={fadeUp} className="about-eyebrow-tag">
                  <span className="aet-dot"/>About Us
                </motion.div>
                <motion.h2 variants={fadeLeft}>
                  Your financial well-being is <span className="italic-text">our priority.</span>
                </motion.h2>
                <motion.div variants={fadeUp} className="underline about-underline-anim"/>
                <motion.p variants={fadeUp}>
                  Stay ahead of the game with real-time insights into your finances. Our dynamic analytics
                  provide you with a clear understanding of your financial health, empowering you to make
                  informed decisions.
                </motion.p>
                <motion.hr variants={fadeUp} className="divider"/>

                {/* Animated stats */}
                <motion.div className="about-stats-row" variants={staggerSm}>
                  {[
                    {val:384, sfx:"",  label:"Successful projects"},
                    {val:1000,sfx:"+", label:"Satisfied clients"},
                    {val:20,  sfx:"",  label:"Years working"},
                  ].map((s,i)=>(
                    <motion.div key={i} className="about-stat-pill" variants={fadeUp}
                      whileHover={{y:-5,boxShadow:"0 10px 28px rgba(212,91,8,0.18)"}}>
                      <h3><CountUp target={s.val} suffix={s.sfx}/></h3>
                      <p>{s.label}</p>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* ── Business / Stand Out ── */}
      <section className="business-section">
        <Container>
          <motion.div className="text-center" initial="hidden" whileInView="show" viewport={vp} variants={stagger}>
            <motion.div variants={fadeUp} className="about-eyebrow-tag mx-auto mb-3">
              <span className="aet-dot"/>What We Stand For
            </motion.div>
            <motion.h2 variants={fadeUp} className="section-title">Stand Out From The Rest</motion.h2>
          </motion.div>

          <motion.div initial="hidden" whileInView="show" viewport={vp} variants={stagger}>
            <Row className="gy-4 mt-4">
              {/* Mission */}
              <Col md={4} className="d-flex flex-column">
                <motion.div variants={cardV} whileHover={{y:-8,boxShadow:"0 20px 48px rgba(133,86,25,0.15)"}} className="image-card mb-4">
                  <div className="biz-img-wrap">
                    <img src="./mission.jpg" alt="Mission" className="img-fluid"/>
                    <div className="biz-img-overlay"/>
                  </div>
                </motion.div>
                <motion.div variants={cardV} whileHover={{y:-5}} className="info-card flex-grow-1">
                  <Card.Body className="text-center">
                    <motion.div
                      animate={{rotate:[0,-8,8,0]}}
                      transition={{duration:4,repeat:Infinity,ease:"easeInOut"}}>
                      <FaBullseye className="info-icon"/>
                    </motion.div>
                    <Card.Title>Our Mission</Card.Title>
                    <Card.Text>Equal blame belongs to those who fail in their duty through weakness of will.</Card.Text>
                  </Card.Body>
                </motion.div>
              </Col>

              {/* Core Values */}
              <Col md={4}>
                <motion.div variants={cardV} whileHover={{y:-5}} className="info-card text-center core">
                  <Card.Body>
                    <motion.div
                      animate={{scale:[1,1.12,1]}}
                      transition={{duration:2.5,repeat:Infinity,ease:"easeInOut"}}>
                      <FaChartBar className="info-icon"/>
                    </motion.div>
                    <Card.Title>Our Core Values</Card.Title>
                    <Card.Text>Equal blame belongs to those who fail in their duty through weakness of will.</Card.Text>
                    <ul className="values-list">
                      {values.map((v,i)=>(
                        <motion.li key={i}
                          initial={{opacity:0,x:-16}}
                          whileInView={{opacity:1,x:0}}
                          viewport={{once:true}}
                          transition={{delay:0.1+i*0.08,duration:0.4}}>
                          {v}
                        </motion.li>
                      ))}
                    </ul>
                  </Card.Body>
                </motion.div>
              </Col>

              {/* Vision */}
              <Col md={4} className="d-flex flex-column">
                <motion.div variants={cardV} whileHover={{y:-5}} className="info-card flex-grow-1 mb-4">
                  <Card.Body className="text-center">
                    <motion.div
                      animate={{rotateY:[0,180,360]}}
                      transition={{duration:5,repeat:Infinity,ease:"easeInOut"}}>
                      <FaEye className="info-icon"/>
                    </motion.div>
                    <Card.Title>Our Vision</Card.Title>
                    <Card.Text>Equal blame belongs to those who fail in their duty through weakness of will.</Card.Text>
                  </Card.Body>
                </motion.div>
                <motion.div variants={cardV} whileHover={{y:-8,boxShadow:"0 20px 48px rgba(133,86,25,0.15)"}} className="image-card">
                  <div className="biz-img-wrap">
                    <img src="./vision.jpg" alt="Vision" className="img-fluid"/>
                    <div className="biz-img-overlay"/>
                  </div>
                </motion.div>
              </Col>
            </Row>
          </motion.div>
        </Container>
      </section>

      {/* ── Event Timeline Carousel ── */}
      <section className="event-carousel">
        <Container className="text-center">
          <motion.div initial="hidden" whileInView="show" viewport={vp} variants={stagger}>
            <motion.div variants={fadeUp} className="about-eyebrow-tag mx-auto mb-3" style={{color:"rgb(235,174,95)"}}>
              <span className="aet-dot"/>Our Journey
            </motion.div>
            <motion.h2 variants={fadeUp} className="section-title">Events Timeline</motion.h2>
            <motion.p variants={fadeUp} className="section-description" style={{color:"#7a5030",maxWidth:600,margin:"0 auto 30px"}}>
              Consulting Events offer a range of opportunities for sponsors to reach qualified prospects including
              Recognition Dinners, Roundtables, Editorial Breakfasts, and our Annual Consulting Summit.
            </motion.p>
          </motion.div>

          <motion.div
            initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}}
            viewport={vp} transition={{duration:0.6}}>
            <Carousel responsive={responsive} infinite autoPlay autoPlaySpeed={3000} arrows>
              {events.map((event,index)=>(
                <div className="event-card" key={index}>
                  <motion.div
                    className="event-card-content"
                    whileHover={{y:-8,scale:1.02,boxShadow:"0 18px 44px rgba(133,86,25,0.18)"}}
                    transition={{type:"spring",stiffness:280,damping:18}}>
                    <Card.Body>
                      <motion.h5 className="event-date"
                        animate={{color:["#d45b08","#ebae5f","#d45b08"]}}
                        transition={{duration:3,repeat:Infinity,delay:index*0.4}}>
                        {event.date}
                      </motion.h5>
                      <Card.Title>{event.title}</Card.Title>
                      <Card.Text>{event.description}</Card.Text>
                      <motion.div whileHover={{x:4}}>
                        <Button variant="link" className="read-more">
                          Read More <FaArrowRight style={{fontSize:11,marginLeft:4}}/>
                        </Button>
                      </motion.div>
                    </Card.Body>
                  </motion.div>
                </div>
              ))}
            </Carousel>
          </motion.div>
        </Container>
      </section>

      {/* ── CTA / Newsletter ── */}
      <section className="cta-section">
        <Container>
          <Row className="align-items-center">
            <Col lg={5} className="cta-text">
              <motion.div initial="hidden" whileInView="show" viewport={vp} variants={stagger}>
                <motion.div variants={fadeUp} className="about-eyebrow-tag mb-2">
                  <span className="aet-dot"/>Stay Updated
                </motion.div>
                <motion.h3 variants={fadeUp}>Newsletter</motion.h3>
                <motion.h2 variants={fadeLeft}>Get Updates &amp; Latest News</motion.h2>
                <motion.p variants={fadeUp}>Get in your inbox the latest News and Offers from us.</motion.p>
              </motion.div>
            </Col>

            <Col lg={7}>
              <motion.div
                className="cta-form-wrap"
                initial={{opacity:0,x:40}} whileInView={{opacity:1,x:0}}
                viewport={vp} transition={{duration:0.65,ease:[0.22,1,0.36,1]}}>
                <Form className="cta-form d-flex">
                  {[
                    {type:"text",  placeholder:"Your Name",          name:"name"},
                    {type:"email", placeholder:"Your Email Address",  name:"email"},
                  ].map((f,i)=>(
                    <motion.div key={f.name} style={{flex:1}}
                      whileHover={{scale:1.02}} transition={{duration:0.2}}>
                      <Form.Control type={f.type} placeholder={f.placeholder}
                        className="input-field"
                        value={ctaForm[f.name]}
                        onChange={e=>setCtaForm({...ctaForm,[f.name]:e.target.value})}/>
                    </motion.div>
                  ))}
                  <motion.div style={{flex:1}} whileHover={{scale:1.02}}>
                    <Form.Select className="input-field" value={ctaForm.service}
                      onChange={e=>setCtaForm({...ctaForm,service:e.target.value})}>
                      <option>Consultancy Services</option>
                      <option>Business Strategy</option>
                      <option>Marketing Consulting</option>
                      <option>IT Solutions</option>
                      <option>Financial Advisory</option>
                    </Form.Select>
                  </motion.div>
                  <motion.div whileHover={{scale:1.05,y:-2}} whileTap={{scale:0.96}}>
                    <Button className="cta-btn" onClick={handleCta}
                      disabled={ctaStatus==="loading"||ctaStatus==="success"}>
                      <AnimatePresence mode="wait">
                        {ctaStatus==="loading" && <motion.span key="l" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>...</motion.span>}
                        {ctaStatus==="success" && <motion.span key="s" initial={{opacity:0,scale:0.7}} animate={{opacity:1,scale:1}} exit={{opacity:0}}>✓ Done!</motion.span>}
                        {(ctaStatus==="idle") && <motion.span key="i" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>Sign Up</motion.span>}
                      </AnimatePresence>
                    </Button>
                  </motion.div>
                </Form>
              </motion.div>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
}

export default About;