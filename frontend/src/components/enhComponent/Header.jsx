import { useState, useRef } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
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

const serviceListTwo = [
  { title: "Digital Marketing Solution", link: "/digital-marketing-agency-in-dubai", number: "01", name: 'Digital Marketing Solution' },
  { title: "SEO Marketing Solution", link: "/best-seo-agency-in-dubai", number: "02", name: 'SEO Marketing Solution' },
  { title: "PPC Marketing Solution", link: "/ppc-company-in-dubai", number: "03", name: 'PPC Marketing Solution' },
  { title: "SMM Marketing Solution", link: "/social-media-marketing-company-in-dubai", number: "04", name: 'Social Marketing Solution' },
  { title: "Content Marketing Solution", link: "/content-marketing-services-in-dubai", number: "05", name: 'Content Marketing Solution' },
  { title: "Email Marketing Solution", link: "/email-marketing-agency-in-dubai", number: "06", name: '"Email Marketing Solution' },
  { title: "ORM Marketing Solution", link: "/online-reputation-management-services-in-dubai", number: "07", name: 'ORM Marketing Solution' },
  { title: "CRO Marketing Solution", link: "/conversion-rate-optimization-agency-dubai", number: "08", name: 'CRO Marketing Solution' },
  { title: "Web Development Solution", link: "/web-development-agency-in-dubai", number: "09", name: 'Web Development Solution' },
  { title: "E-Commerce Marketing Solution", link: "/ecommerce-website-development-company-in-dubai", number: "10", name: 'E-Commerce Marketing Solution' },
  { title: "Shopify Marketing Solution", link: "/shopify-web-development-company-in-dubai", number: "11", name: 'Shopify Marketing Solution' },
  { title: "Mobile App Development Solution", link: "/mobile-app-development-company-in-dubai", number: "12", name: 'Mobile App Development Solution' },
  { title: "Android App Development Solution", link: "/android-app-development-company-in-dubai", number: "12", name: 'Android App Development Solution' },
];

function Header() {
  // Separate state controls for Consulting and Solutions dropdowns
  const [consultingOpen, setConsultingOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);

  const consultingTimeoutRef = useRef(null);
  const solutionsTimeoutRef = useRef(null);

  const handleConsultingEnter = () => {
    clearTimeout(consultingTimeoutRef.current);
    setConsultingOpen(true);
  };

  const handleConsultingLeave = () => {
    consultingTimeoutRef.current = setTimeout(() => setConsultingOpen(false), 150);
  };

  const handleSolutionsEnter = () => {
    clearTimeout(solutionsTimeoutRef.current);
    setSolutionsOpen(true);
  };

  const handleSolutionsLeave = () => {
    solutionsTimeoutRef.current = setTimeout(() => setSolutionsOpen(false), 150);
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

              {/* Consulting Dropdown */}
              <div
                className="services-dropdown-wrapper nav-item"
                onMouseEnter={handleConsultingEnter}
                onMouseLeave={handleConsultingLeave}
              >
                <Link to="/consulting" className={`nav-link services-nav-link ${consultingOpen ? "open" : ""}`}>
                  Consulting
                  <FaChevronDown className="chevron" />
                </Link>
                <div className={`services-dropdown-menu ${consultingOpen ? "open" : ""}`}>
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

              {/* Solutions Dropdown */}
              <div
                className="services-dropdown-wrapper nav-item"
                onMouseEnter={handleSolutionsEnter}
                onMouseLeave={handleSolutionsLeave}
              >
                <Link to="/solutions" className={`nav-link services-nav-link ${solutionsOpen ? "open" : ""}`}>
                  Solutions
                  <FaChevronDown className="chevron" />
                </Link>
                <div className={`services-dropdown-menu ${solutionsOpen ? "open" : ""}`}>
                  {serviceListTwo.map((service, index) => (
                    <div key={service.number}>
                      <Link to={service.link} title={service.name} className="dropdown-service-item">
                        {service.title}
                      </Link>
                      {index < serviceListTwo.length - 1 && (
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