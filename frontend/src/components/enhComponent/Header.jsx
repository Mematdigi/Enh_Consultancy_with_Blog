import { useState, useRef } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { FaPhoneAlt, FaEnvelope, FaChevronDown, FaInstagram, FaFacebook, FaTwitter } from "react-icons/fa";

const ENX_logo = "../../public/ENX_logo.png";

const serviceList = [
  { title: "AI Consulting", link: "/ai-consulting-services-in-dubai", number: "01" },
  { title: "Business Consulting", link: "/business-consulting-services-in-dubai", number: "02" },
  { title: "Digital Marketing Consulting", link: "/digital-marketing-consulting-services-in-dubai", number: "03" },
  { title: "EdTech Consulting", link: "/edtech-consulting-services-in-dubai", number: "04" },
  { title: "IT Consulting", link: "/it-consulting-services-in-dubai", number: "05" },
  { title: "Startup Consulting", link: "/Startup-consulting-services-in-dubai", number: "06" },
];

function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const timeoutRef = useRef(null);

  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current);
    setDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setDropdownOpen(false), 150);
  };

  return (
    <>
<div
  className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between p-2"
  style={{ backgroundColor: "#FEF0D5" }}
>
  {/* Left — Phone & Email */}
  <div className="d-flex align-items-center flex-wrap justify-content-center gap-3">
    <div className="contact-item">
      <FaPhoneAlt className="contact-icon" />
      <a href="tel:+971505913055" style={{ color: "#371E05" }}>+971 505913055</a>
    </div>
    <div className="contact-item">
      <FaEnvelope className="contact-icon" />
      <a href="mailto:contact@enh.consulting" style={{ color: "#371E05" }}>contact@enh.consulting</a>
    </div>
  </div>

  {/* Right — Social Icons */}
  <div className="d-flex align-items-center justify-content-center gap-3 mt-1 mt-md-0">
    <div className="contact-item">
      <FaInstagram className="contact-icon" />
      <a href="/" style={{ color: "#371E05" }}>Instagram</a>
    </div>
    <div className="contact-item">
      <FaFacebook className="contact-icon" />
      <a href="/" style={{ color: "#371E05" }}>Facebook</a>
    </div>
    <div className="contact-item">
      <FaTwitter className="contact-icon" />
      <a href="/" style={{ color: "#371E05" }}>Twitter</a>
    </div>
  </div>
</div>

      <Navbar expand="lg" className="custom-navbar">
        <Container>
          <Navbar.Brand href="/" className="brand-logo">
            <img alt="Consultancy Logo" className="footer-logo-img mb-2" src={ENX_logo} />
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav">
            <Nav className="ms-auto m-0">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/about">About Us</Nav.Link>

              <div
                className="services-dropdown-wrapper nav-item"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <a href="/services" className={`nav-link services-nav-link ${dropdownOpen ? "open" : ""}`}>
                  Consulting
                  <FaChevronDown className="chevron" />
                </a>
                <div className={`services-dropdown-menu ${dropdownOpen ? "open" : ""}`}>
                  {serviceList.map((service, index) => (
                    <div key={service.number}>
                      <a href={service.link} className="dropdown-service-item">
                        {service.title}
                      </a>
                      {index < serviceList.length - 1 && (
                        <div className="dropdown-divider-line" />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <Nav.Link href="/contact">Contact Us</Nav.Link>
              <Nav.Link href="/blog">Blog</Nav.Link>
            </Nav>

            {/* <div className="contact-info d-flex align-items-center">
              <div className="contact-item">
                <FaPhoneAlt className="contact-icon" />
                <a href="tel:+971505913055">+971 505913055</a>
              </div>
              <div className="contact-item">
                <FaEnvelope className="contact-icon" />
                <a href="mailto:contact@enh.consulting">contact@enh.consulting</a>
              </div>
            </div> */}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;