import { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { FaFacebookF, FaInstagram, FaTimes, FaDribbble, FaPinterestP } from "react-icons/fa";
import api from "../../utils/api";

const ENX_logo = "../../public/ENX_logo.png";

function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubscribe = async () => {
    if (!email.trim()) {
      setErrorMsg("Please enter your email address.");
      setStatus("error");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrorMsg("Please enter a valid email address.");
      setStatus("error");
      return;
    }

    setStatus("loading");
    setErrorMsg("");

    try {
      await api.post("/enquiries", {
        email,
        source: "footer-subscribe",
      });

      setStatus("success");
      setEmail("");
      setTimeout(() => setStatus("idle"), 4000);
    } catch (err) {
      setErrorMsg(
        err?.response?.data?.message || "Something went wrong. Please try again."
      );
      setStatus("error");
    }
  };

  return (
    <footer className="custom-footer">
      <Container>
        {/* Logo and Divider */}
        <div className="footer-logo-section d-flex justify-content-center">
          <img alt="Consultancy Logo" className="footer-logo-img mb-0" src={ENX_logo} />
        </div>
        <div className="footer-divider"></div>

        {/* Footer Content */}
        <Row className="footer-content">
          {/* Footer Navigation Links */}
          <Col lg={8} className="footer-links">
            <Row>
              <Col md={6}>
                <h5>Address</h5>
                <p>GI-34, First Floor, Lawrence Road,</p>
                <p>Delhi-110035</p>
              </Col>

              <Col md={3}>
                <h5>Quick Links</h5>
                <ul>
                  <li><a href="#">Home</a></li>
                  <li><a href="#">About US</a></li>
                  <li><a href="#">Services</a></li>
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
              <Form.Group controlId="footerEmail">
                <Form.Control
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status === "error") setStatus("idle");
                  }}
                  disabled={status === "loading" || status === "success"}
                />
              </Form.Group>

              {status === "error" && (
                <p className="footer-subscribe-error mt-1">{errorMsg}</p>
              )}

              <Button
                variant="warning"
                className="subscribe-btn"
                onClick={handleSubscribe}
                disabled={status === "loading" || status === "success"}
              >
                {status === "loading"
                  ? "Subscribing..."
                  : status === "success"
                  ? "✓ Subscribed!"
                  : "Subscribe"}
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
            Powered by <a href="/">MematDigi</a>
          </p>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;