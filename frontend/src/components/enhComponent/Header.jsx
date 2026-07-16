import { useState, useRef } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom"; // Import Link
import { FaPhoneAlt, FaEnvelope, FaChevronDown } from "react-icons/fa";

const ENH_logo = "/ENH_logo.png";

const serviceList = [
  { title: "AI Consulting", link: "/ai-consulting-services-in-dubai", number: "01", name: 'ai consulting service in dubai' },
  { title: "Business Consulting", link: "/business-consulting-services-in-dubai", number: "02", name: 'business consulting services in dubai' },
  { title: "Digital Marketing Consulting", link: "/digital-marketing-consulting-services-in-dubai", number: "03", name: 'digital marketing consulting services in dubai' },
  { title: "EdTech Consulting", link: "/edtech-consulting-services-in-dubai", number: "04", name: 'edTech consulting services in dubai' },
  { title: "IT Consulting", link: "/it-consulting-services-in-dubai", number: "05", name: 'it consulting services in dubai' },
  { title: "Startup Consulting", link: "/startup-consulting-services-in-dubai", number: "06", name: 'startup consulting services in dubai' },
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
      <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between p-2" style={{ backgroundColor: "#FEF0D5" }}>
        <div className="d-flex align-items-center flex-wrap justify-content-center gap-3">
          <div className="contact-item">
            <FaPhoneAlt className="contact-icon" />
            <a href="tel:+971505913055" style={{ color: "#371e05" }}>+971 505913055</a>
          </div>
          <div className="contact-item">
            <FaEnvelope className="contact-icon" />
            <a href="mailto:contact@enh.consulting" style={{ color: "#371e05" }}>contact@enh.consulting</a>
          </div>
        </div>
      </div>

      <Navbar expand="lg" className="custom-navbar">
        <Container>
          <Navbar.Brand as={Link} to="/" className="brand-logo">
            <img alt="ENH Consulting" className="footer-logo-img mb-2" src={ENH_logo} style={{ width: '150px' }} />
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="navbar-nav" style={{ backgroundColor: "wheat" }} />
          <Navbar.Collapse id="navbar-nav">
            <Nav className="ms-auto m-0">
              <Nav.Link as={Link} to="/" title="home page">Home</Nav.Link>
              <Nav.Link as={Link} to="/about" title="about page">About Us</Nav.Link>

              <div
                className="services-dropdown-wrapper nav-item"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <Link to="/consulting" className={`nav-link services-nav-link ${dropdownOpen ? "open" : ""}`}>
                  Consulting
                  <FaChevronDown className="chevron" />
                </Link>
                <div className={`services-dropdown-menu ${dropdownOpen ? "open" : ""}`}>
                  {serviceList.map((service, index) => (
                    <div key={service.number}>
                      <Link to={service.link} title={service.name} className="dropdown-service-item">
                        {service.title}
                      </Link>
                      {index < serviceList.length - 1 && (
                        <div className="dropdown-divider-line" />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <Nav.Link as={Link} to="/contact">Contact Us</Nav.Link>
              <Nav.Link as={Link} to="/blog">Blog</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;