import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { FaFacebookF, FaInstagram, FaTimes, FaDribbble, FaPinterestP } from "react-icons/fa";
const ENX_logo = "./ENX_logo.png";

function Footer() {
  return (
    <footer className="custom-footer">
      <Container>
        {/* Logo and Divider */}
<div class="footer-logo text-center">
  <img alt="Consultancy Logo" class="footer-logo-img mb-2 " src={ENX_logo}/>
  <div class="footer-divider"></div>
</div>

        {/* Footer Content */}
        <Row className="footer-content">
          {/* Footer Navigation Links */}
          <Col lg={8} className="footer-links">
            <Row>
              <Col md={6}>
                <h5>Address</h5>
                <p>GI-34, First Floor, Lawrence Road,
                </p>
                <p>Delhi-110035</p>
              </Col>

              <Col md={3}>
                <h5>Quick Links</h5>
                <ul>
                  <li><a href="#">Home </a></li>
                  <li><a href="#">About US </a></li>
                  <li><a href="#">Services </a></li>
                  <li><a href="#">Contact US</a></li>
                </ul>
              </Col>
              <Col md={3}>
                <h5>Useful Links</h5>
                <ul>
                  <li><a href="#">Privacy Policy</a></li>
                  <li><a href="#">Terms & Condition</a></li>
                </ul>
              </Col>
            </Row>
          </Col>

          {/* Subscription Box */}
          <Col lg={4} className="subscribe-section">
            <h5>Say Hi!</h5>
            <Form>
              <Form.Group controlId="email">
                <Form.Control type="email" placeholder="Your email address" />
              </Form.Group>
              <Button variant="warning" className="subscribe-btn">
                Subscribe
              </Button>
            </Form>
          </Col>
        </Row>

        {/* Social Icons */}
        <div className="social-icons">
          <FaFacebookF />
          <FaInstagram />
          <FaTimes />
          <FaDribbble />
          <FaPinterestP />
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <p>© 2025 all rights reserved.</p>
          <p>
            Powered by <a href="https://mematdigi.com/">MematDigi</a>
          </p>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
