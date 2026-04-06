import React, { useState } from "react";
import BreadcrumbBanner from "../../components/enhComponent/BreadcrumbBanner";
import Sidebar from "../../components/enhComponent/Sidebar";
import Cta from "../../components/enhComponent/Cta";
import { Container, Row, Col, Card, Nav, Tab } from "react-bootstrap";
import { FaCheckCircle } from "react-icons/fa";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

// ✅ Digital Marketing Services Data
const services = [
  {
    image: "./seo.png",
    title: "SEO Analytics",
    description: "Get high rankings with multi-team collaboration help you optimize SEO.",
  },
  {
    image: "./smo.png",
    title: "Social Marketing",
    description: "Get high rankings with multi-team collaboration help you optimize SEO.",
  },
  {
    image: "./idea.png",
    title: "Creative Ideas",
    description: "Get high rankings with multi-team collaboration help you optimize SEO.",
  },
  {
    image: "./optimization.png",
    title: "SEO Optimization",
    description: "Get high rankings with multi-team collaboration help you optimize SEO.",
  },
];

// ✅ Case Studies Data
const caseStudies = [

  {
    image: "./case-1.jpg",
    title: "Built web faster & better",
    description: "Sales, SEO, Web",
  },
  {
    image: "./case-2.jpg",
    title: "Boosted Conversions",
    description: "Sales, Marketing, Ads",
  },
  {
    image: "./case-3.jpg",
    title: "Increased Organic Traffic",
    description: "SEO, Content, Branding",
  },
];

// ✅ Carousel Responsive Settings
const responsive = {
  desktop: { breakpoint: { max: 3000, min: 1024 }, items: 3 },
  tablet: { breakpoint: { max: 1024, min: 768 }, items: 2 },
  mobile: { breakpoint: { max: 768, min: 0 }, items: 1 },
};

function DigitalMarketingConsulting() {
  // ✅ State for Active Tab
  const [activeTab, setActiveTab] = useState("personalCare");

  return (
    <div className="digital-marketing">
      {/* ✅ Breadcrumb Section */}
      <BreadcrumbBanner title="Digital Marketing Consulting" />

      <Container>
        <Row>
          {/* ✅ Left Content */}
          <Col lg={9}>
            {/* ✅ Digital Marketing Introduction */}
            <section className="digital-marketing-intro">
              <Row>
                {/* ✅ Text Content */}
                <Col lg={6}>
                  <h2 className="section-title">
                    We Give the Best <span className="highlight-text">Digital Marketing</span> Services
                  </h2>
                  <p className="section-description">
                    Digital Marketing Business with Our SEO Agency on the search engine’s results page.
                    This means that when your target customers search for products and services that your
                    industry offers, they find your website.
                  </p>
                  <p className="section-description">
                    Our approach to SEO is uniquely built around what we know works…and what we know doesn’t work.
                    With over 200 verified factors in play within Google’s search algorithm, we ensure the most
                    effective strategies for growth.
                  </p>

                  {/* ✅ List of Services */}
                  <ul className="checklist">
                    <li><FaCheckCircle className="check-icon" /> User-Friendly Interface</li>
                    <li><FaCheckCircle className="check-icon" /> Role-based access control</li>
                    <li><FaCheckCircle className="check-icon" /> Advanced reporting and analytics</li>
                    <li><FaCheckCircle className="check-icon" /> Customizable branding options</li>
                    <li><FaCheckCircle className="check-icon" /> Start your journey to success</li>
                  </ul>
                </Col>

                {/* ✅ Right Image */}
                <Col lg={6} className="image-content">
                  <img src="./digital-marketing.jpg" alt="Digital Marketing" className="img-fluid" />
                </Col>
              </Row>
            </section>

            {/* ✅ Digital Marketing Services */}
            <section className="digital-marketing-services">
              <Row>
                {services.map((service, index) => (
                  <Col md={6} key={index} className="mb-4">
                    <Card className="service-card">
                      <Card.Body>
                        <img src={service.image} alt={service.title} className="service-icon" />
                        <Card.Title>{service.title}</Card.Title>
                        <Card.Text>{service.description}</Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </section>

            {/* ✅ Case Studies Section */}
            <section className="case-studies-section">
              <h2 className="section-title text-center">Our Case Studies</h2>

              <Carousel
                responsive={responsive}
                infinite={true}
                autoPlay={true}
                autoPlaySpeed={3000}
                arrows={false}
                showDots={true}
              >
                {caseStudies.map((study, index) => (
                  <div key={index} className="case-study-item">
                    <Card className="case-study-card">
                      <Card.Img variant="top" src={study.image} alt={study.title} />
                      <Card.Body className="text-center">
                        <Card.Title>{study.title}</Card.Title>
                        <Card.Text>{study.description}</Card.Text>
                      </Card.Body>
                    </Card>
                  </div>
                ))}
              </Carousel>
            </section>

            {/* ✅ Digital Marketing Support Tabs */}
            <section className="digital-marketing-support">
              <Tab.Container activeKey={activeTab} onSelect={(k) => setActiveTab(k)}>
                <Nav variant="tabs" className="support-tabs">
                  <Nav.Item><Nav.Link eventKey="personalCare">PERSONAL CARE</Nav.Link></Nav.Item>
                  <Nav.Item><Nav.Link eventKey="superSupport">SUPER SUPPORT</Nav.Link></Nav.Item>
                  <Nav.Item><Nav.Link eventKey="guaranteed">GUARANTEED</Nav.Link></Nav.Item>
                </Nav>

                <Tab.Content className="support-content">
                  <Tab.Pane eventKey="personalCare">
                    <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque lau dantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi archi tecto beatae vitae dicta sunt explicabo.

Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia conse quuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p>
                  </Tab.Pane>

                  <Tab.Pane eventKey="superSupport">
                    <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque lau dantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi archi tecto beatae vitae dicta sunt explicabo.

Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia conse quuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p>
                  </Tab.Pane>

                  <Tab.Pane eventKey="guaranteed">
                    <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque lau dantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi archi tecto beatae vitae dicta sunt explicabo.

Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia conse quuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p>
                  </Tab.Pane>
                </Tab.Content>
              </Tab.Container>
            </section>
          </Col>

          {/* ✅ Right Sidebar */}
          <Col lg={3}>
            <Sidebar />
          </Col>
        </Row>
      </Container>

      {/* ✅ Call to Action Section */}
      <Cta />
    </div>
  );
}

export default DigitalMarketingConsulting;
