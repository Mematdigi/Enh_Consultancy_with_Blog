import React from "react";
import BreadcrumbBanner from "../../components/enhComponent/BreadcrumbBanner";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap"; 
import { FaBullseye, FaChartBar, FaEye } from "react-icons/fa";
import Carousel from "react-multi-carousel"; // ✅ Import multi-carousel
import "react-multi-carousel/lib/styles.css"; // ✅ Import styles

const events = [
  { date: "MAY 02, 2018", title: "Best Employee Award", description: "Right to find fault with a man who chooses to enjoy too much pleasure that has no annoying." },
  { date: "MAR 06, 2017", title: "International Branch", description: "Right to find fault with a man who chooses to enjoy a pleasure that has no annoying." },
  { date: "JAN 01, 2017", title: "Our First Big Project", description: "To take a trivial example, which undertakes physical exercise for some advantage." },
  { date: "DEC 12, 2019", title: "Global Expansion", description: "Expanding into international markets and increasing brand presence worldwide." },
  { date: "SEP 22, 2020", title: "Innovation Award", description: "Recognized for outstanding contributions in innovation and technology." },
];

// ✅ Responsive Carousel Settings
const responsive = {
  desktop: { breakpoint: { max: 3000, min: 1024 }, items: 3 },
  tablet: { breakpoint: { max: 1024, min: 768 }, items: 2 },
  mobile: { breakpoint: { max: 768, min: 0 }, items: 1 },
};

function About() {
  return (
    <div className="about-page">
      {/* Dynamic Breadcrumb */}
      <BreadcrumbBanner title="About" />

      {/* About Us Section */}
      <section className="about-us">
        <Container>
          <Row className="align-items-center">
            <Col lg={6} className="about-image">
              <img src="./about.jpg" alt="About Us" className="img-fluid" />
            </Col>
            <Col lg={6} className="about-text">
              <h2>Your financial well-being is <span className="italic-text">our priority.</span></h2>
              <div className="underline"></div>
              <p>Stay ahead of the game with real-time insights into your finances. Our dynamic analytics provide you with a clear understanding of your financial health, empowering you to make informed decisions.</p>
              <hr className="divider" />
              <Row className="stats">
                <Col md={4}><h3>384</h3><p>Successful projects</p></Col>
                <Col md={4}><h3>1000+</h3><p>Satisfied clients</p></Col>
                <Col md={4}><h3>20</h3><p>Years working</p></Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Business Section */}
      <section className="business-section">
        <Container>
          <div className="text-center">
            <h2 className="section-title">Stand Out From The Rest</h2>
          </div>
          <Row className="gy-4 mt-4">
            {/* Left Image + Mission */}
            <Col md={4} className="d-flex flex-column">
              <Card className="image-card mb-4">
                <Card.Img src="./mission.jpg" alt="Mission" className="img-fluid" />
              </Card>
              <Card className="info-card flex-grow-1">
                <Card.Body className="text-center">
                  <FaBullseye className="info-icon" />
                  <Card.Title>Our Mission</Card.Title>
                  <Card.Text>Equal blame belongs to those who fail in their duty through weakness of will.</Card.Text>
                </Card.Body>
              </Card>
            </Col>

            {/* Core Values */}
            <Col md={4}>
              <Card className="info-card text-center core">
                <Card.Body>
                  <FaChartBar className="info-icon" />
                  <Card.Title>Our Core Values</Card.Title>
                  <Card.Text>Equal blame belongs to those who fail in their duty through weakness of will.</Card.Text>
                  <ul className="values-list">
                    <li>✔️ Integrity</li>
                    <li>✔️ Commitment to excellence</li>
                    <li>✔️ Consumer focus</li>
                    <li>✔️ Accountability</li>
                    <li>✔️ Inclusiveness</li>
                  </ul>
                </Card.Body>
              </Card>
            </Col>

            {/* Vision */}
            <Col md={4} className="d-flex flex-column">
              <Card className="info-card flex-grow-1 mb-4">
                <Card.Body className="text-center">
                  <FaEye className="info-icon" />
                  <Card.Title>Our Vision</Card.Title>
                  <Card.Text>Equal blame belongs to those who fail in their duty through weakness of will.</Card.Text>
                </Card.Body>
              </Card>
              <Card className="image-card">
                <Card.Img src="./vision.jpg" alt="Vision" className="img-fluid" />
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Event Timeline Carousel */}
      <section className="event-carousel">
        <Container className="text-center">
          <h2 className="section-title">Events Timings</h2>
          <p className="section-description">
            Consulting Events offer a range of opportunities for sponsors to reach qualified prospects including
            Recognition Dinners, Roundtables, Editorial Breakfasts, and our Annual Consulting Summit.
          </p>

          {/* Multi-Item Carousel (3 Items Per Slide) */}
          <Carousel responsive={responsive} infinite autoPlay autoPlaySpeed={3000} arrows>
            {events.map((event, index) => (
              <div className="event-card" key={index}>
                <Card className="event-card-content">
                  <Card.Body>
                    <h5 className="event-date">{event.date}</h5>
                    <Card.Title>{event.title}</Card.Title>
                    <Card.Text>{event.description}</Card.Text>
                    <Button variant="link" className="read-more">Read More →</Button>
                  </Card.Body>
                </Card>
              </div>
            ))}
          </Carousel>
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
                <Form.Control type="text" placeholder="Your Name" className="input-field" />
                <Form.Control type="email" placeholder="Your Email Address" className="input-field" />
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

export default About;
