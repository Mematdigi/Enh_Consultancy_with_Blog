import React from "react";
import BreadcrumbBanner from "../../components/enhComponent/BreadcrumbBanner";
import Sidebar from "../../components/enhComponent/Sidebar";
import Cta from "../../components/enhComponent/Cta";
import { FaBed, FaBath, FaCar, FaRulerCombined, FaCheckDouble, FaHome, FaDollarSign, FaClipboardList} from "react-icons/fa";

import { Container, Row, Col, } from "react-bootstrap";
const propertyImages = [
  { id: 1, src: "./property-1.jpg", alt: "Modern Building", className: "large" },  // Large Center Image
  { id: 2, src: "./property-2.jpg", alt: "Architecture", className: "small top-left" },  // Top Left
  { id: 3, src: "./property-3.jpg", alt: "Living Room", className: "small top-middle" }, // Top Middle
  
];
const overviewData = [
  {
    icon: <FaBed />,
    title: "Bedrooms",
    description: "4 Bedrooms / 1 Guestroom",
  },
  {
    icon: <FaBath />,
    title: "Bathrooms",
    description: "4 Bedrooms / 1 Guestroom",
  },
  {
    icon: <FaCar />,
    title: "Parking",
    description: "Free Parking for 4 Cars",
  },
  {
    icon: <FaRulerCombined />,
    title: "Accommodation",
    description: "6 Guest / 2980 Sq Ft",
  },

];
const features = [
  "Air Conditioning",
  "Dishwasher",
  "Internet",
  "Supermarket/Store",
  "Build-In Wardrobes",
  "Fencing",
  "Park",
  "Swimming Pool",
  "Clinic",
  "Floor Coverings",
  "School",
  "Transportation Hub",
  "Gym Availability",
  "Lawn",
  "Security Guard",
];

const services = [
  {
    icon: <FaHome />,
    title: "Buy Property",
    description: "Haven the best theme for elit, sed do eiusmod tempor dolor sit amet, consectetuer adipiscing elit, sed do eiusmod tempor incididunt ut",
  },
  {
    icon: <FaDollarSign />,
    title: "Sale Property",
    description: "Haven the best theme for elit, sed do eiusmod tempor dolor sit amet, consectetuer adipiscing elit, sed do eiusmod tempor incididunt ut",
  },
  {
    icon: <FaClipboardList />,
    title: "Rent Property",
    description: "Haven the best theme for elit, sed do eiusmod tempor dolor sit amet, consectetuer adipiscing elit, sed do eiusmod tempor incididunt ut",
  },
];

function PropertyConsulting() {
  return (
    <div className="property-consulting">
      {/* Dynamic Breadcrumb */}
      <BreadcrumbBanner title="Property Consulting" />

      <div className="property-service-page">
        <Container>
          <Row>
            {/* Left Content */}
            <Col lg={9}>
            <section className="property-gallery">
              <div className="gallery-container">
                {propertyImages.map((image) => (
                  <div key={image.id} className={`gallery-item ${image.className}`}>
                    <img src={image.src} alt={image.alt} className="gallery-image" />
                  </div>
                ))}
              </div>
            </section>
            <section className="property-description">
                <div className="description-box">
                  <h3 className="description-title">Property Description</h3>
                  <p className="description-text">
                    Proin gravida nibh vel velit auctor aliquet. Aenean sollicitudin quis bibendum auctor, 
                    nislit consequat ipsum, nec sagittis sem nibh id elit. Duis sed odio sit amet nibh 
                    vulputate cursus a sit amet mauris. Morbi accumsan ipsum velit. Nam nec tellus a odio 
                    tincidunt auctor a ornare odio. Sed non mauris vitae erat consequat auctor eu in elit. 
                    Class aptent taciti sociosqu.
                  </p>
                  <p className="description-text">
                    Gravida nibh vel velit auctor aliquet. Aenean sollicitudin quis bibendum auctor, 
                    nislit consequat ipsum, nec sagittis sem nibh id elit. Duis sed odio sit amet nibh 
                    vulputate cursus a sit amet mauris. Morbi acnec tellus a odio tincidunt auctor a 
                    ornare odio.
                  </p>
                </div>
              </section>
              <section className="property-overview">
                <div className="overview-container">
                  <h3 className="overview-title">Property Overview</h3>
                  <div className="overview-grid">
                    {overviewData.map((item, index) => (
                      <div key={index} className="overview-card">
                        <div className="icon">{item.icon}</div>
                        <h4 className="card-title">{item.title}</h4>
                        <p className="card-description">{item.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
              <section className="facts-features">
                  <div className="features-container">
                    <h3 className="features-title">Facts And Features</h3>
                    <div className="features-grid">
                      {features.map((feature, index) => (
                        <div key={index} className="feature-item">
                          <FaCheckDouble className="feature-facts" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
            <section className="property-services">
                <div className="container">
                  {/* ✅ Section Title */}
                  <h2 className="section-title">OUR SERVICES</h2>
                  <p className="section-description">
                    Haven the best theme for elit, sed do eiusmod tempor dolor sit amet, consectetuer adipiscing elit, sed do eiusmod tempor incididunt ut labore et lorna aliquat minimam, quis nostrud exercitation.
                  </p>

                  {/* ✅ Services Cards */}
                  <div className="services-list">
                    {services.map((service, index) => (
                      <div key={index} className="service-card">
                        <div className="service-icon">{service.icon}</div>
                        <h3 className="service-title">{service.title}</h3>
                        <p className="service-description">{service.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
          </section>
            </Col>

            {/* Right Sidebar */}
            <Col lg={3}>
              <Sidebar />
            </Col>
          </Row>
        </Container>
      </div>
       
      {/* Call to Action Section */}
      <Cta />
    </div>
  );
}

export default PropertyConsulting;
