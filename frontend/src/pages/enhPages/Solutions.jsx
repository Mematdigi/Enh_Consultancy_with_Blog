import React from "react";
import { motion } from 'framer-motion';
import AnimationWrapper from "../../animations/AnimationWrapper";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaArrowRight} from "react-icons/fa";
import { FiArrowDownRight} from "react-icons/fi";
import { Helmet } from "react-helmet-async";

function Solutions() {
  const serviceList = [
    { icon: <FiArrowDownRight />, title: "AI Consulting", description: "We assist companies in Dubai in creating a straightforward, practical artificial intelligence plan and development road map, locating the appropriate opportunities, choosing the appropriate technology, and ensuring that every artificial intelligence project provides measurable business value from the very first step.", link: "/ai-consulting-services-in-dubai", number: "01" },
    { icon: <FiArrowDownRight />, title: "Business Consulting", description: "Dubai-based results-driven artificial intelligence and business consulting firm ENH helps businesses simplify processes, enhance decision-making, and create scalable systems fit for long-term growth. To provide every client a real competitive advantage in the Dubai and UAE market, our business consulting firm blends in-depth commercial knowledge with AI-powered insights.", link: "/business-consulting-services-in-dubai", number: "02" },
    { icon: <FiArrowDownRight />, title: "Digital Marketing Consulting", description: "Using data, automation, and AI-driven audience insights, our digital marketing consulting firm in Dubai assists companies in developing high-performance digital strategies that produce actual, quantifiable growth. From paid media and SEO to content strategy and conversion optimization, we create digital marketing systems that consistently deliver results and effectively scale across every platform.", link: "/digital-marketing-consulting-services-in-dubai", number: "03" },
    { icon: <FiArrowDownRight />, title: "EdTech Consulting", description: "EdTech Consulting in Dubai by ENH assists educational institutions, training organizations, and companies providing learning technologies in designing, developing, and expanding more sophisticated digital learning experiences supported by artificial intelligence and contemporary technological infrastructure.", link: "/edtech-consulting-services-in-dubai", number: "04" },
    { icon: <FiArrowDownRight />, title: "IT Consulting", description: "As a reputable IT consulting firm in Dubai, ENH assists companies in modernizing their technology infrastructure, enhancing system performance, and matching their IT investments to the strategic objectives that genuinely promote expansion. From system integration and digital transformation planning to cloud migration and cybersecurity concerns, our IT consulting team provides realistic answers that function in the actual world.", link: "/it-consulting-services-in-dubai", number: "05" },
    { icon: <FiArrowDownRight />, title: "Startup Consulting", description: "Our startup consulting business is especially designed for founders who need more than just guidance; they need a hands-on partner who knows the Dubai startup scene, acts swiftly, and assists them in developing the systems, processes, and technical foundations that give early-stage firms the finest possible chance of successfully growing.", link: "/startup-consulting-services-in-dubai", number: "06" },
  ];

  const postUrl = window.location.href;
  return (
    <div className="services-page">
      <Helmet>
        <title>ENH Consulting Solutions</title>
        <meta name="description" content="Explore ENH's major consulting services in Dubai, UAE, designed to support business growth, digital transformation, and long-term success." />
        <link rel="canonical" href={`https://enh.consulting/solutions`} />
      </Helmet>
      {/* Breadcrumb Section */}
      {/* <BreadcrumbBanner title="Services" /> */}

      {/* Services Section */}
      <AnimationWrapper className="stagger-children">
        <section className="services hover-lift">
          <Container>
            <div className="section-header text-center">
              <motion.h2
                className="section-title"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >Digital And It Solutions</motion.h2>
            </div>
            <Row>
              {serviceList.map((service, index) => (
                <Col lg={4} md={6} key={index} className="mb-4">
                  <motion.div
                    className="service-card hover-lift"
                    variants={{ hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0 } }}
                    transition={{ duration: 0.5 }}
                  >
                    <Card className="service-card">
                      <div className="service-icon">{service.icon}</div>
                      <Card.Body>
                        <Card.Title className="card-title-service">{service.title}</Card.Title>
                        <Card.Text className="card-description-service">{service.description}</Card.Text>
                        <Link to={service.link} className="service-link">
                          Learn More <FaArrowRight className="arrow-icon" />
                        </Link>
                      </Card.Body>
                    </Card>
                  </motion.div>
                </Col>
              ))}
            </Row>
          </Container>
        </section>
      </AnimationWrapper>
    </div>
  );
}

export default Solutions;
