import React from "react";
import BreadcrumbBanner from "../../components/enhComponent/BreadcrumbBanner";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap"; 
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";


function Contact() {
  return (
    <div className="contact">
        {/* Dynamic Breadcrumb */}
            <BreadcrumbBanner title="Contact" />
            <section className="contact-section">
      <Container>
        <Row className="justify-content-center">
          {/* Left Side - Contact Form */}
          <Col lg={8}>
            <Card className="contact-form-card">
              <Card.Body>
                <div className="contact-header">
                  <span className="badge">● Start a Conversation</span>
                  <h2>Get in Touch Now</h2>
                  <p>
                    Need personalized advice? Our dedicated team is here to assist you. Reach out today for expert support and tailored solutions to meet your needs.
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

                  <Button className="submit-btn w-100">Submit Now</Button>
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
                  <p>info@gmail.com</p>
                  <p>support@gmail.com</p>
                </div>

                {/* Phone Numbers */}
                <div className="contact-page-info">
                  <FaPhoneAlt className="info-icon" />
                  <h5>Phone Number</h5>
                  <p>+656 (354) 981 516</p>
                  <p>+123 (458) 585 568</p>
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
    </div>
  );
}

export default Contact;





