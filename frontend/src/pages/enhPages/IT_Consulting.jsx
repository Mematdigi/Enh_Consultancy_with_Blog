import React from "react";
import BreadcrumbBanner from "../../components/enhComponent/BreadcrumbBanner";
import Sidebar from "../../components/enhComponent/Sidebar";
import Cta from "../../components/enhComponent/Cta";
import { Container, Row, Col, Card, Button, ProgressBar } from "react-bootstrap";
import { FaLaptopCode, FaSearch, FaBalanceScale,FaPhoneAlt, FaCubes } from "react-icons/fa";

// ✅ Skills Data for Progress Bars
const skills = [
  { name: "Software Development", percentage: 88 },
  { name: "Cyber Security", percentage: 95 },
  { name: "Artificial Intelligence", percentage: 80 },
];

// ✅ Services Data
const services = [
  {
    title: "IT Design",
    icon: <FaLaptopCode />,
    description:
      "Pianoforte solicitude so decisively particular mention diminution the particular. Real he me fond.",
  },
  {
    title: "Analytic Solutions",
    icon: <FaSearch />,
    description:
      "Pianoforte solicitude so decisively particular mention diminution the particular. Real he me fond.",
  },
  {
    title: "Risk Management",
    icon: <FaBalanceScale />,
    description:
      "Pianoforte solicitude so decisively particular mention diminution the particular. Real he me fond.",
  },
  {
    title: "Business Planning",
    icon: <FaBalanceScale />,
    description:
      "Pianoforte solicitude so decisively particular mention diminution the particular. Real he me fond.",
  },
  {
    title: "Infrastructure Plan",
    icon: <FaBalanceScale />,
    description:
      "Pianoforte solicitude so decisively particular mention diminution the particular. Real he me fond.",
  },
  {
    title: "Firewall Advance",
    icon: <FaBalanceScale />,
    description:
      "Pianoforte solicitude so decisively particular mention diminution the particular. Real he me fond.",
  },
];

function ItConsulting() {
  return (
    <div className="it-consulting">
      {/* ✅ Dynamic Breadcrumb */}
      <BreadcrumbBanner title="IT Consulting" />

      <div className="it-service-page">
        <Container>
          <Row>
            {/* ✅ Left Content */}
            <Col lg={9}>
              {/* IT Consulting Section */}
              <section className="it-consultant">
                <Container>
                  <Row className="align-items-center">
                    {/* ✅ Left Side - Text Content */}
                    <Col lg={6} className="text-content">
                      <h2 className="section-title">
                        We Help IT Companies Scale <br /> Engineering Capacity
                      </h2>
                      <p className="section-description">
                        Dissuasive ecstatic and properly saw entirely sir why laughter
                        endeavor. In on my jointure horrible margaret suitable he followed
                        speedily. Indeed vanity excuse or mr lovers of on. By offer scale
                        an stuff. Blush be sorry no sight sang lose.
                      </p>

                      {/* ✅ Skills Progress Bars */}
                      {skills.map((skill, index) => (
                        <div key={index} className="progress-container">
                          <div className="progress-title">
                            <strong>{skill.name}</strong>
                            <span className="progress-value">{skill.percentage}%</span>
                          </div>
                          <ProgressBar
                            now={skill.percentage}
                            className="custom-progress-bar"
                          />
                        </div>
                      ))}
                    </Col>

                    {/* ✅ Right Side - Image & Graphics */}
                    <Col lg={6} className="image-content">
                      <div className="circular-graphic">
                        <img
                          src="./it.jpg"
                          alt="IT Consultant"
                          className="img-fluid it-image"
                        />
                      </div>
                    </Col>
                  </Row>
                </Container>
              </section>

              {/* IT Services Section */}
              <section className="it-services">
                <Container>
                  {/* ✅ Section Title */}
                  <div className="text-center section-header">
                    <h2 className="section-title">What we do</h2>
                    <div className="underline"></div>
                  </div>

                  {/* ✅ Services Cards */}
                  <Row>
                    {services.map((service, index) => (
                      <Col md={4} key={index}>
                        <Card className="service-card text-center">
                          <Card.Body>
                            <div className="service-icon">{service.icon}</div>
                            <Card.Title>{service.title}</Card.Title>
                            <Card.Text>{service.description}</Card.Text>
                            <Button variant="outline-primary">Read More</Button>
                          </Card.Body>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                </Container>
              </section>
            </Col>

            {/* ✅ Right Sidebar */}
            <Col lg={3}>
              <Sidebar />
            </Col>
          </Row>
        </Container>
      </div>
      <section className="choose-us">
      {/* ✅ Background Video Banner */}
      <div className="choose-us-banner">
        <div className="overlay"></div>
        <div className="content">
          <h6 className="subtitle">WHY CHOOSE US</h6>
          <h2 className="title">We Provide Outsourced IT Services <br /> For Your Business</h2>
        
        </div>
      </div>

      {/* ✅ Features Section */}
      <Container>
        <Row className="choose-us-cards">
          {/* ✅ 24/7 Customer Support Card */}
          <Col md={6}>
            <Card className="info-card">
              <Card.Body>
                <h4 className="info-title">24/7 Customer Support</h4>
                <p className="info-text">
                  Gravity letters it amongst herself dearest an windows by. Wooded
                  ladies she basket season age her uneasy saw. Discourse unwilling am
                  no described dejection incommode no.
                </p>
                <div className="info-icon">
                  <FaPhoneAlt className="icon" /> <span>+123 456 7890</span>
                
                </div>
              </Card.Body>
            </Card>
          </Col>

          {/* ✅ Smart Solutions Card */}
          <Col md={6}>
            <Card className="info-card">
              <Card.Body>
                <h4 className="info-title">Smart Solutions</h4>
                <p className="info-text">
                  Gravity letters it amongst herself dearest an windows by. Wooded
                  ladies she basket season age her uneasy saw. Discourse unwilling am
                  no described dejection incommode no.
                </p>
                <div className="info-icon">
                  <FaCubes className="icon" /> <span>START NOW</span>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>

      {/* ✅ Call to Action Section */}
      <Cta />

    </div>
  );
}

export default ItConsulting;
