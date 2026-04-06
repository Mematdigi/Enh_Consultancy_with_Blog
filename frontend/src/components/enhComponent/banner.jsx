import { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

function Banner() {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    service: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section className="hero-banner">
      {/* Animated background blobs */}
      <div className="bg-blob blob-1" />
      <div className="bg-blob blob-2" />
      <div className="bg-blob blob-3" />

      <Container className="position-relative">
        <Row className="align-items-center">

          {/* ── Left: Text + Buttons ── */}
          <Col lg={6} className="banner-text mb-4">
            <div className="badge-pill">
              <span className="badge-dot" />
              ENH Consulting
            </div>

            <h2>
              <span className="italic-text">Smarter Strategies
              for a Stronger Future</span>
            </h2>

            <p>
              Your trusted partner in the ever-evolving world of finance and
              technology. We bring cutting-edge solutions to empower you on your
              financial journey.
            </p>

            <div className="banner-buttons">
              <Button className="btn get-started m-2">Get started</Button>
              <Button className="btn learn-more m-2">Learn more</Button>
            </div>

            {/* Floating stats strip */}
            <div className="stats-strip">
              <div className="stat-item">
                <span className="stat-num">10K+</span>
                <span className="stat-label">Clients</span>
              </div>
              <div className="stat-divider" />
              <div className="stat-item">
                <span className="stat-num">98%</span>
                <span className="stat-label">Satisfaction</span>
              </div>
              <div className="stat-divider" />
              <div className="stat-item">
                <span className="stat-num">15+</span>
                <span className="stat-label">Years Exp.</span>
              </div>
            </div>
          </Col>

          {/* ── Right: Quote Form ── */}
          <Col lg={6} className="banner-form-col">
            <div className="quote-form-card">
              {/* Decorative corner accent */}
              <div className="card-accent" />

              <h3 className="form-card-title">Request A Quote</h3>
              <p className="form-card-sub">Get a free consultation today</p>

              <div className="quote-form">
                <Row className="g-3">
                  <Col sm={6}>
                    <div className="input-wrap">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                      <input
                        type="text"
                        name="fullName"
                        placeholder="Full Name*"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </Col>

                  <Col sm={6}>
                    <div className="input-wrap">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.26 12 19.79 19.79 0 0 1 1.17 3.2 2 2 0 0 1 3.14 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 8 8l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                      <input
                        type="tel"
                        name="phone"
                        placeholder="Phone*"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </Col>

                  <Col sm={12}>
                    <div className="input-wrap">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                      <input
                        type="email"
                        name="email"
                        placeholder="Email*"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </Col>

                  <Col sm={12}>
                    <div className="input-wrap select-wrap">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>
                      <select
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        required
                      >
                        <option value="" disabled>Select Services *</option>
                        <option value="financial-planning">Financial Planning</option>
                        <option value="investment">Investment Advisory</option>
                        <option value="insurance">Insurance Solutions</option>
                        <option value="tax">Tax Consulting</option>
                        <option value="wealth">Wealth Management</option>
                      </select>
                      <svg className="chevron" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
                    </div>
                  </Col>

                  <Col sm={12}>
                    <div className="input-wrap textarea-wrap">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                      <textarea
                        name="message"
                        placeholder="Message"
                        rows={3}
                        value={formData.message}
                        onChange={handleChange}
                      />
                    </div>
                  </Col>

                  <Col sm={12}>
                    <button
                      className={`send-quote-btn ${submitted ? "sent" : ""}`}
                      onClick={handleSubmit}
                    >
                      {submitted ? (
                        <>
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                          Message Sent!
                        </>
                      ) : (
                        <>
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                          Send Message!
                        </>
                      )}
                    </button>
                  </Col>
                </Row>
              </div>
            </div>
          </Col>

          {/* ── Image grid (commented out as requested) ── */}
          {/*
          <Col lg={6} className="banner-images">
            <div className="image-grid">
              <img src="./service1.jpg" className="img-one" alt="Fintech Image 1" />
              <img src="./service2.jpg" className="img-two" alt="Fintech Image 2" />
              <img src="./service3.jpg" className="img-three" alt="Fintech Image 3" />
              <img src="./service4.jpg" className="img-four" alt="Fintech Image 4" />
            </div>
          </Col>
          */}

        </Row>
      </Container>
    </section>
  );
}

export default Banner;