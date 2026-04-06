import React from "react";
import { Card, ListGroup, Button } from "react-bootstrap";
import { FaChevronRight } from "react-icons/fa";

const services = [
  "Digital Marketing Consulting",
  "IT Consulting",
  "Finance Consulting",
  "Property Consulting",
];

const Sidebar = () => {
  return (
    <div className="sidebar-container">
      {/* Services List Section */}
      <Card className="sidebar-services">
        <Card.Body>
          {/* Sidebar Title */}
          <h5 className="sidebar-title">
            <span className="dot"></span> Our Services
          </h5>

          {/* Services List */}
          <ListGroup variant="flush">
            {services.map((service, index) => (
              <ListGroup.Item key={index} className="service-item">
                {service}
                <FaChevronRight className="arrow-icon" />
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card.Body>
      </Card>

      {/* Guide Download Card */}
      <Card className="guide-card text-center">
        <Card.Body>
          <h5 className="guide-title">A Complete Guide to Constancy</h5>
          <Button variant="light" className="download-btn">Download</Button>
          <div className="guide-image">
            <img src="./broucher-img.jpg" alt="Success HR Solution" className="img-fluid" />
          </div>
        </Card.Body>
      </Card>

      {/* Have Questions Card */}
      <Card className="question-card text-center">
        <Card.Body>
          <h6 className="question-title">Have Questions?</h6>
          <p className="question-text">Nothing prevents our being to what we like.</p>
          <div className="question-image">
            <img src="./service-sidebar-contact-bg.jpg" alt="Help" className="img-fluid" />
          </div>
          <p className="contact-info">
            +98 060 712 34 <br />
            sendmail@qetus.com
          </p>
          <Button className="appointment-btn">Appointment</Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Sidebar;
