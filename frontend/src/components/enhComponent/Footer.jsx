import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import {
  FaFacebookF,
  FaInstagram,
  FaDribbble,
  FaPinterestP,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const ENH_logo = "/ENH_logo.png";

function Footer() {
  return (
    <footer className="custom-footer">
      <Container>
        {/* Logo */}
        <div className="footer-logo-section d-flex justify-content-center">
          <img alt="ENH Logo" className="footer-logo-img" src={ENH_logo} />
        </div>

        {/* Divider */}
        <div className="footer-divider"></div>

        {/* Main Content */}
        <Row className="footer-content">
          {/* Quick Links */}
          <Col lg={2} md={3} sm={6} xs={12} className="footer-col">
            <h5 className="footer-heading">Quick Links</h5>
            <ul className="footer-list">
              <li><a href="/">Home</a></li>
              <li><a href="/about">About US</a></li>
              <li><a href="/consulting">Services</a></li>
              <li><a href="/contact">Contact US</a></li>
              <li><a href="/blog">Blogs</a></li>
            </ul>
          </Col>

          {/* Consulting Solution */}
          <Col lg={3} md={3} sm={6} xs={12} className="footer-col">
            <h5 className="footer-heading">Consulting Solution</h5>
            <ul className="footer-list">
              <li><a href="/ai-consulting-services-in-dubai" title="ai consulting services in dubai">AI Consulting</a></li>
              <li><a href="/business-consulting-services-in-dubai" title="business consulting services in dubai">Business Consulting</a></li>
              <li><a href="/digital-marketing-consulting-services-in-dubai" title="digital marketing services in dubai">Digital Marketing Consulting</a></li>
              <li><a href="/edtech-consulting-services-in-dubai" title="edTech consulting services in dubai">EdTech Consulting</a></li>
              <li><a href="/it-consulting-services-in-dubai" title="it consulting services in dubai">IT Consulting</a></li>
              <li><a href="/startup-consulting-services-in-dubai" title="startup consulting services in dubai">Startup Consulting</a></li>
            </ul>
          </Col>

          {/* Digital & IT Solutions */}
          <Col lg={3} md={3} sm={6} xs={12} className="footer-col">
            <h5 className="footer-heading">Digital &amp; IT Solutions</h5>
            <ul className="footer-list">
              <li><a href="/digital-marketing-agency-in-dubai">Digital Marketing Solution</a></li>
              <li><a href="/best-seo-agency-in-dubai">SEO Marketing Solution</a></li>
              <li><a href="/ppc-company-in-dubai">PPC Marketing Solution</a></li>
              <li><a href="/social-media-marketing-company-in-dubai">Social Media Marketing Solution</a></li>
              <li><a href="/content-marketing-services-in-dubai">Content Marketing Solution</a></li>
              <li><a href="/email-marketing-agency-in-dubai">Email Marketing Solution</a></li>
              <li><a href="/online-reputation-management-services-in-dubai">ORM Marketing Solution</a></li>
              <li><a href="/conversion-rate-optimization-agency-dubai">CRO Marketing Solution</a></li>
              <li><a href="/web-development-agency-in-dubai">Web Development Solution</a></li>
            </ul>
          </Col>
 
          {/* Contact US */}
          <Col lg={4} md={3} sm={6} xs={12} className="footer-col contact-col">
            <h5 className="footer-heading">Contact US</h5>
            <div className="contact-info">
              <p className="contact-phone">+971 505913055</p>
              <p className="contact-email">contact@enh.consulting</p>
              <div className="footer-divider-vertical d-none d-md-block"></div>
              <p className="contact-address-label">Address</p>
              <p className="contact-address">
                DSO-IFZA, IFZA Properties,<br />
                Dubai Silicon Oasis, Dubai
              </p>
            </div>
            {/* Google Map Embed */}
            <div className="footer-map">
              <iframe
                title="ENH Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3609.9!2d55.38!3d25.12!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjXCsDA3JzEyLjAiTiA1NcKwMjInNDguMCJF!5e0!3m2!1sen!2sae!4v1234567890"
                width="100%"
                height="130"
                style={{ border: 0, borderRadius: "6px" }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </Col>
        </Row>

        {/* Social Icons */}
        <div className="social-icons">
          <a href="/" aria-label="Facebook"><FaFacebookF /></a>
          <a href="/" aria-label="Instagram"><FaInstagram /></a>
          <a href="/" aria-label="X (Twitter)"><FaXTwitter /></a>
          <a href="/" aria-label="Dribbble"><FaDribbble /></a>
          <a href="/" aria-label="Pinterest"><FaPinterestP /></a>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <p>
            Powered by <a href="https://mematdigi.com">MematDigi</a>{" "}
            &nbsp;© 2026 all rights reserved. By ENH Consulting
          </p>
          <p className="footer-legal-links">
            <a href="/">Privacy Policy</a>
            <span className="divider-pipe"> | </span>
            <a href="/">Terms &amp; Condition</a>
          </p>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;