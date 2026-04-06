import React from "react";
import { Container,Row,Form, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom"; // Import Link from React Router

const Cta = ({ title }) => {
  return (
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
  );
};

export default Cta;
