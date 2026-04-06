import React from "react";
import { motion } from 'framer-motion';
import AnimationWrapper from "../../animations/AnimationWrapper";
import BreadcrumbBanner from "../../components/enhComponent/BreadcrumbBanner";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaArrowRight, FaLightbulb, FaBriefcase, FaGraduationCap, FaLaptopCode, FaWallet, FaBullseye } from "react-icons/fa";

function Services() {
  const serviceList = [
    { icon: <FaLightbulb />, title: "Digital Marketing Consulting", description: "Providing expert advice and problem-solving strategies across multiple industries, helping businesses improve efficiency, innovation, and performance.", link: "/digital-marketing-consulting" },
    { icon: <FaBriefcase />, title: "Business & Management Consulting", description: "Guiding companies in optimizing operations, leadership, organizational structure, and overall business strategies to enhance productivity and profitability.", link: "/business-consultancy" },
    { icon: <FaGraduationCap />, title: "EdTech & AI Consulting", description: "Specializing in educational technology and artificial intelligence solutions to enhance learning experiences, student engagement, and adaptive learning models.", link: "/digital-marketing-consulting" },
    { icon: <FaLaptopCode />, title: "IT Consulting", description: "Helping businesses with IT strategy, software development, cybersecurity, cloud computing, and digital transformation to improve operational efficiency.", link: "/it-consulting" },
    { icon: <FaWallet />, title: "Finance Consulting", description: "Offering expertise in financial planning, risk management, investments, and corporate finance to optimize profitability and long-term financial health.", link: "/finance-consulting" },
    { icon: <FaBullseye />, title: "Property Consulting", description: "Focusing on business expansion, market entry, competitive positioning, and long-term strategic planning to drive sustainable growth.", link: "/property-consulting" },
  ];

  return (
    <div className="services-page">
      {/* Breadcrumb Section */}
      <BreadcrumbBanner title="Services" />

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
              >Our Services</motion.h2>
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

export default Services;
