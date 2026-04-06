import React from "react";
import BreadcrumbBanner from "../../components/enhComponent/BreadcrumbBanner";
import Sidebar from "../../components/enhComponent/Sidebar";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import {
  FaBriefcase,
  FaTrophy,
  FaChartPie,
  FaSearch,
  FaLightbulb,
  FaRocket,
} from "react-icons/fa";

// Steps Data
const steps = [
  {
    step: "Step – 1",
    icon: <FaSearch />,
    title: "Research Your Problem",
    description: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut",
  },
  {
    step: "Step – 2",
    icon: <FaLightbulb />,
    title: "Identifying Problem",
    description: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut",
  },
  {
    step: "Step – 3",
    icon: <FaRocket />,
    title: "Solutions Your Problem",
    description: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut",
  },
  {
    step: "Step – 4",
    icon: <FaRocket />,
    title: "Success Your Business",
    description: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut",
  },
];

function FinanceConsulting() {
  return (
    <div className="finance-consulting">
      {/* Dynamic Breadcrumb */}
      <BreadcrumbBanner title="Finance Consulting" />

      <div className="finance-service-page">
        <Container>
          <Row>
            {/* Left Content */}
            <Col lg={9}>
              {/* Banner Image */}
              <img
                src="./finance.jpg"
                alt="finance"
                className="banner-image img-fluid"
              />

              {/* Title & Description */}
              <h2 className="section-title">
                Providing World-Class Service Experiences
              </h2>
              <p className="section-description">
                Strategic planning is the process of documenting and
                establishing a direction of your small business by assessing
                both where you are and where you're going. The strategic plan
                gives you a place to record your mission, vision, and values, as
                well as your long-term goals and the action plans you'll use to
                reach them.
                Strategic planning is the process of documenting and
                establishing a direction of your small business by assessing
                both where you are and where you're going. The strategic plan
                gives you a place to record your mission, vision, and values, as
                well as your long-term goals and the action plans you'll use to
                reach them.
              </p>
              <p className="section-description">
                Strategic planning is the process of documenting and
                establishing a direction of your small business by assessing
                both where you are and where you're going. The strategic plan
                gives you a place to record your mission, vision, and values, as
                well as your long-term goals and the action plans you'll use to
                reach them.
                Strategic planning is the process of documenting and
                establishing a direction of your small business by assessing
                both where you are and where you're going. The strategic plan
                gives you a place to record your mission, vision, and values, as
                well as your long-term goals and the action plans you'll use to
                reach them.
              </p>

              {/* Finance Investment Section */}
              <section className="finance-investment-section">
                <Container>
                  <Row className="align-items-center">
                    {/* Left Side - Text & Features */}
                    <Col lg={6}>
                      <h2 className="section-title">
                        An <span className="highlight">investment</span> in
                        knowledge pays the best interest.
                      </h2>
                      <p className="section-description">
                        Why money’s in that office, right? If she starts giving
                        means some information, then it's valuable.
                      </p>

                      {/* Feature List */}
                      <div className="feature-list">
                        <div className="feature-item">
                          <div>
                            <h5>Personal Finance & Business</h5>
                            <p>
                              Why money’s in that office, right? If she starts
                              giving some valuable insights.
                            </p>
                          </div>
                        </div>

                        <div className="feature-item">
                          <div>
                            <h5>Professional Data Analysis</h5>
                            <p>
                              Get accurate market insights with professional
                              data analysis.
                            </p>
                          </div>
                        </div>

                        <div className="feature-item">
                          <div>
                            <h5>Business Strategy</h5>
                            <p>
                              Plan your growth with well-researched business
                              strategies.
                            </p>
                          </div>
                        </div>
                      </div>
                    </Col>

                    {/* Right Side - Investment Categories */}
                    <Col lg={6} className="investment-boxes">
                      <Row>
                        <Col md={6}>
                          <Card className="investment-card">
                            <Card.Body>
                              <div className="investment-icon">
                                <img src="./taxes.png" alt="Taxation" />
                              </div>
                              <h5>Taxation</h5>
                              <p>Get expert taxation advice to save money.</p>
                            </Card.Body>
                          </Card>
                        </Col>
                        <Col md={6}>
                          <Card className="investment-card dark">
                            <Card.Body>
                              <div className="investment-icon">
                                <img src="./taxes.png" alt="Trades & Stocks" />
                              </div>
                              <h5>Trades & Stocks</h5>
                              <p>
                                Invest wisely with our expert stock market
                                insights.
                              </p>
                            </Card.Body>
                          </Card>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={6}>
                          <Card className="investment-card">
                            <Card.Body>
                              <div className="investment-icon">
                                <img
                                  src="./taxes.png"
                                  alt="Corporate Finance"
                                />
                              </div>
                              <h5>Corporate Finance</h5>
                              <p>Manage your company finances efficiently.</p>
                            </Card.Body>
                          </Card>
                        </Col>
                        <Col md={6}>
                          <Card className="investment-card">
                            <Card.Body>
                              <div className="investment-icon">
                                <img
                                  src="./taxes.png"
                                  alt="Risk Management"
                                />
                              </div>
                              <h5>Risk Management</h5>
                              <p>Identify risks and safeguard your assets.</p>
                            </Card.Body>
                          </Card>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Container>
              </section>

            
            </Col>

            {/* Right Sidebar */}
            <Col lg={3}>
              <Sidebar />
            </Col>
          </Row>
        </Container>
      </div>
        {/* Services Work Section */}
        <section className="services-work-section">
                <Container>
                  <div className="text-center section-header">
                    <h2 className="section-title">How Our Services Work</h2>
                  </div>

                  <Row className="justify-content-center">
                    {steps.map((step, index) => (
                      <Col md={3} key={index}>
                        <Card className="service-step-card">
                          <div className="step-header">
                            <div className="step-icon">{step.icon}</div>
                            <div className="step-number">{step.step}</div>
                          </div>
                          <Card.Body>
                            <Card.Title>{step.title}</Card.Title>
                            <Card.Text>{step.description}</Card.Text>
                          </Card.Body>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                </Container>
              </section>
      {/* Call to Action Section */}
      <section className="cta-section">
        <Container>
          <Row className="align-items-center">
            <Col lg={5} className="cta-text">
              <h3>Newsletter</h3>
              <h2>Get Updates & Latest News</h2>
              <p>Get in your inbox the latest News and Offers from us.</p>
            </Col>

            <Col lg={7}>
              <Form className="cta-form d-flex">
                <Form.Control
                  type="text"
                  placeholder="Your Name"
                  className="input-field"
                />
                <Form.Control
                  type="email"
                  placeholder="Your Email Address"
                  className="input-field"
                />
                <Form.Select className="input-field">
                  <option>Consultancy Services</option>
                  <option>Business Strategy</option>
                  <option>Marketing Consulting</option>
                  <option>IT Solutions</option>
                  <option>Financial Advisory</option>
                </Form.Select>
                <Button className="cta-btn">Sign Up</Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
}

export default FinanceConsulting;
