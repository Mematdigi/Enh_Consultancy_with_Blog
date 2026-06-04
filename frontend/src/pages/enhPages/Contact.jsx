import React from "react";
import BreadcrumbBanner from "../../components/enhComponent/BreadcrumbBanner";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

// Animation variants
const vpMd = { once: true, amount: 0.2 };

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const postUrl = window.location.href;

function Contact() {
  return (
    <div className="contact">
      <Helmet>
        <title>Contact ENH Consulting | AI & Digital Growth Experts </title>
        <meta name="description" content='Get in touch with ENH Consulting for AI consulting, digital transformation, and business growth solutions in Dubai and across the UAE. ' />
        <link rel="canonical" href={postUrl} />
      </Helmet>
      {/* Dynamic Breadcrumb */}
      {/* <BreadcrumbBanner title="Contact" /> */}
      <section className="contact-section">
        <Container>
          <Row className="justify-content-center">
            {/* Left Side - Contact Form */}
            <Col lg={8}>
              <Card className="contact-form-card">
                <Card.Body>
                  <div className="contact-header">
                    <span className="badge">● Get a 30 min Free Consulting </span>
                    <h2>Let's Build Something Extraordinary Together</h2>
                    <p>
                      Fill out the contact form, send us an email, or give us a call. Our team will get back to you promptly to discuss your requirements and explore how we can help your business grow.
                    </p>
                  </div>

                  <Form>
                    <Row>
                      <Col md={6} className="mb-3">
                        <Form.Control type="text" placeholder="Name" />
                      </Col>
                      <Col md={6} className="mb-3">
                        <Form.Control type="email" placeholder="Email" />
                      </Col>
                    </Row>

                    <Row>
                      <Col md={6} className="mb-3">
                        <Form.Control type="text" placeholder="Phone" />
                      </Col>
                      <Col md={6} className="mb-3">
                        <Form.Control type="text" placeholder="Subject" />
                      </Col>
                    </Row>

                    <Form.Group className="mb-3">
                      <Form.Control as="textarea" rows={4} placeholder="Message" />
                    </Form.Group>

                    <Button className="submit-btn w-25">Submit Now</Button>
                  </Form>
                </Card.Body>
              </Card>
            </Col>

            {/* Right Side - Contact Information */}
            <Col lg={4}>
              <Card className="contact-page-info-card">
                <Card.Body>
                  {/* Email Address */}
                  <div className="contact-page-info">
                    <FaEnvelope className="info-icon" />
                    <h5>Email Address</h5>
                    <p>contact@enh.consulting</p>
                  </div>

                  {/* Phone Numbers */}
                  <div className="contact-page-info">
                    <FaPhoneAlt className="info-icon" />
                    <h5>Phone Number</h5>
                    <p>+971 505913055</p>
                  </div>

                  {/* Office Location */}
                  <div className="contact-page-info">
                    <FaMapMarkerAlt className="info-icon" />
                    <h5>Office Location</h5>
                    <p>8502 Preston Rd, Inglewood, Maine 98380</p>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="svp-final-cta">
        <motion.span className="svp-final-cta__blob svp-final-cta__blob--1"
          animate={{ x: [0, 30, -15, 0], y: [0, -20, 25, 0], scale: [1, 1.1, 0.95, 1] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }} />
        <motion.span className="svp-final-cta__blob svp-final-cta__blob--2"
          animate={{ x: [0, -25, 18, 0], y: [0, 22, -16, 0], scale: [1, 0.92, 1.08, 1] }}
          transition={{ duration: 17, repeat: Infinity, ease: "easeInOut", delay: 3 }} />

        <Container>
          <motion.div initial="hidden" whileInView="show" viewport={vpMd}
            variants={stagger} className="svp-final-cta__inner">

            <motion.h2 className="svp-final-cta__title" variants={fadeUp}>
              Ready to Accelerate Growth with AI, Digital Transformation, and Marketing Solutions?
            </motion.h2>

            <motion.p className="svp-final-cta__text" variants={fadeUp}>
              Whether you're looking to implement AI solutions, improve your online presence, generate more leads, or transform your business with innovative technology, the team at ENH Consulting is here to help.
            </motion.p>
            <motion.p className="svp-final-cta__text" variants={fadeUp}>
              We work with startups, SMEs, and enterprise organizations across Dubai and the UAE to deliver customized AI consulting, digital marketing, web development, and business growth solutions. No matter the size of your project, our experts are ready to understand your goals and provide strategic recommendations tailored to your business.
            </motion.p>
          </motion.div>
        </Container>
      </section>
    </div>
  );
}

export default Contact;