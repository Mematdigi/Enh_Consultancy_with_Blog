import React from "react";
import BreadcrumbBanner from "../../components/enhComponent/BreadcrumbBanner";
import Sidebar from "../../components/enhComponent/Sidebar";
import { Container, Row, Col, Card } from "react-bootstrap";
import { FaCheckCircle, FaUserTie, FaChartBar, FaHandHoldingUsd } from "react-icons/fa"; 
import Cta from "../../components/enhComponent/Cta";

function BusinessConsultancy() {
  return (
    <>
      <div className="Business-Consultancy">
        <BreadcrumbBanner title="Business Consultancy" />
        <div className="business-service-page py-5">
          <Container>
            <Row>
              {/* Left Content */}
              <Col lg={9}>
                <Card className="border-0 shadow-sm p-4">
                  <img
                    src="/public/Business_Consultancy_img1.png" // Replace with your actual image path
                    alt="Business Consultancy"
                    className="img-fluid rounded"
                  />
                  <h2 className="mt-4">Business Consultancy Strategy</h2>
                  <p className="text-muted">
                  Business consultancy is essential for organizations aiming for sustainable growth, operational efficiency, and strategic advantage. A well-planned business consultancy strategy helps businesses identify challenges, streamline operations, and create data-driven solutions for long-term success. Consultants provide insights, strategies, and expertise to drive transformation and optimize business performance.
                  </p>

                  <h4 className="mt-4 fw-bold">Benefits of Business Consultancy:</h4>
                  <p className="text-muted">
                  Business consultancy strategies focus on analyzing key areas such as financial planning, marketing, operations, and management to enhance business outcomes. With expert guidance, companies can mitigate risks, boost productivity, and improve profitability.
                  </p>

                  <ul className="list-unstyled">
                    <li className="d-flex align-items-center mb-2">
                      <FaCheckCircle className="text-success me-2" />
                      Expert Guidance & Insights
                    </li>
                    <li className="d-flex align-items-center mb-2">
                      <FaCheckCircle className="text-success me-2" />
                      Cost & Time Efficiency
                    </li>
                    <li className="d-flex align-items-center mb-2">
                      <FaCheckCircle className="text-success me-2" />
                      Strategic Planning & Growth
                    </li>
                    <li className="d-flex align-items-center mb-2">
                      <FaCheckCircle className="text-success me-2" />
                      Risk Management & Problem-Solving
                    </li>
                    <li className="d-flex align-items-center mb-2">
                      <FaCheckCircle className="text-success me-2" />
                      Market & Competitive Analysis
                    </li>
                    <li className="d-flex align-items-center mb-2">
                      <FaCheckCircle className="text-success me-2" />
                      Operational Improvements & Innovation
                    </li>
                  </ul>
                </Card>

                {/* New Section - How We Boost Marketing */}
                <Card className="border-0 shadow-sm p-4 mt-5">
                  <Row className="align-items-center">
                    <Col md={6}>
                      <img
                        src="/public/Business_Consultancy_img2.png" // Replace with actual image path
                        alt="Business Consultancy"
                        className="img-fluid rounded"
                      />
                    </Col>
                    <Col md={6}>
                      <div className="experience-badge p-3 bg-success text-white rounded">
                        <h4 className="mb-0 fw-bold">24</h4>
                        <p className="mb-0">Years of Experience</p>
                      </div>
                      <h3 className="mt-3">Our Main Goal Is To Uplift Business</h3>
                      <p>
                      In today's competitive market, businesses need a well-structured marketing strategy to maximize growth and customer engagement. Our primary goal is to empower businesses with innovative marketing strategies that enhance brand visibility, improve customer reach, and drive higher conversions.  
                      </p>
                    </Col>
                  </Row>

                  <h4 className="mt-4 fw-bold">How We Boost Marketing?</h4>
                  <p className="text-muted">
                  We enhance marketing efforts by integrating advanced digital strategies, customer-centric approaches, and data-driven insights. Our team focuses on leveraging market trends, analyzing customer behavior, and optimizing business positioning to create high-impact marketing campaigns. Through a combination of strategic SEO, engaging content, and social media optimization, we ensure that businesses maintain a strong online presence.
                  </p>

                  {/* Features Section */}
                  <Row className="mt-4">
                    <Col md={4}>
                      <Card className="text-center shadow-sm p-3 border-0">
                        <FaUserTie className="text-success" size={50} />
                        <h5 className="mt-3">Qualified Consultant</h5>
                        <p className="text-muted">
                        Our team of experienced consultants provides expert guidance.
                        </p>
                      </Card>
                    </Col>

                    <Col md={4}>
                      <Card className="text-center shadow-sm p-3 border-0">
                        <FaChartBar className="text-success" size={50} />
                        <h5 className="mt-3">Best Business Analysis</h5>
                        <p className="text-muted">
                        We conduct in-depth market research and performance analysis to identify opportunities.
                        </p>
                      </Card>
                    </Col>

                    <Col md={4}>
                      <Card className="text-center shadow-sm p-3 border-0">
                        <FaHandHoldingUsd className="text-success" size={50} />
                        <h5 className="mt-3">Affordable Services</h5>
                        <p className="text-muted">
                        Get high-quality business consulting services at competitive rates and ensuring value-driven solutions.
                        </p>
                      </Card>
                    </Col>
                  </Row>
                </Card>
              </Col>

              {/* Right Sidebar */}
              <Col lg={3}>
                <Sidebar />
              </Col>
            </Row>
          </Container>
        </div>
          {/* ✅ Call to Action Section */}
            <Cta />
      </div>
    </>
  );
}

export default BusinessConsultancy;
