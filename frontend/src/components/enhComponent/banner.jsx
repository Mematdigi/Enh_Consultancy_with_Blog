import { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import api from "../../utils/api";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

function Banner() {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    service: "",
    message: "",
  });
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    if (e && e.preventDefault) e.preventDefault();

    // Basic client-side validation
    if (!formData.fullName.trim() || !formData.email.trim() || !formData.phone.trim()) {
      setErrorMsg("Please fill in Name, Phone and Email.");
      setStatus("error");
      return;
    }

    setStatus("loading");
    setErrorMsg("");

    try {
      await api.post("/enquiries", {
        ...formData,
        name: formData.fullName,
        source: "banner-quote",
      });

      setStatus("success");
      setFormData({ fullName: "", phone: "", email: "", service: "", message: "" });

      // Reset back to idle after 4 seconds
      setTimeout(() => setStatus("idle"), 4000);
    } catch (err) {
      setErrorMsg(
        err?.response?.data?.message || "Something went wrong. Please try again."
      );
      setStatus("error");
    }
  };

const postUrl = window.location.href;
  return (
    <section className="hero-banner">
      <Helmet>
        <title>AI Consulting and Development Company in Dubai | ENH Consulting</title>
        <meta name="description" content="ENH Consulting is an AI consulting and development company in Dubai helping startups & SMEs with strategy, custom tools & marketing. Book a free call today." />
        <link rel="canonical" href={`https://enh.consulting`} />
      </Helmet>
      {/* Animated background blobs */}
      <div className="bg-blob blob-1" />
      <div className="bg-blob blob-2" />
      <div className="bg-blob blob-3" />

      <Container className="position-relative">
        <Row className="align-items-center">

          {/* ── Left: Text + Buttons ── */}
          <Col lg={6} className="banner-text mb-4">
            {/* <div className="badge-pill">
              <span className="badge-dot" />
              ENH Consulting
            </div> */}

            <h1 className="italic-text" style={{ color: "rgb(235, 174, 95)", fontSize: "35px", fontWeight: "800", lineHeight: "1.1" }}>
              AI Consulting & Development Company in Dubai Helping Businesses Grow Faster
            </h1>

            <p>
              Leading artificial intelligence consulting and development firm in Dubai, ENH Consulting assists startups, small and medium enterprises (SMEs), and big businesses all over the United Arab Emirates in achieving actual business development via smart technology and data-driven strategy. We transform difficult problems into quantifiable outcomes more quickly, better, and more reasonably than you could have ever imagined, from automating operations to creating bespoke AI tools.
            </p>

            <div className="banner-buttons">
              <Button className="btn get-started m-2">
                <Link to="/contact">
                  Get started
                </Link>
              </Button>
              {/* <Button className="btn learn-more m-2">Learn more</Button> */}
            </div>

            {/* Floating stats strip */}
            {/* <div className="stats-strip">
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
            </div> */}
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
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                      <input
                        type="text"
                        name="fullName"
                        placeholder="Full Name*"
                        value={formData.fullName}
                        onChange={handleChange}
                        disabled={status === "loading"}
                        required
                      />
                    </div>
                  </Col>

                  <Col sm={6}>
                    <div className="input-wrap">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.26 12 19.79 19.79 0 0 1 1.17 3.2 2 2 0 0 1 3.14 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 8 8l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                      <input
                        type="tel"
                        name="phone"
                        placeholder="Phone*"
                        value={formData.phone}
                        onChange={handleChange}
                        disabled={status === "loading"}
                        required
                      />
                    </div>
                  </Col>

                  <Col sm={12}>
                    <div className="input-wrap">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                      <input
                        type="email"
                        name="email"
                        placeholder="Email*"
                        value={formData.email}
                        onChange={handleChange}
                        disabled={status === "loading"}
                        required
                      />
                    </div>
                  </Col>

                  <Col sm={12}>
                    <div className="input-wrap select-wrap">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /></svg>
                      <label className='label'>select</label>
                      <select
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        disabled={status === "loading"}
                        required
                      >
                        <option value="" disabled>Select Services *</option>
                        <option value="ai">Ai Consulting</option>
                        <option value="business">Business Consulting</option>
                        <option value="digital">Digital Marketing Consulting</option>
                        <option value="it">IT Consulting</option>
                        <option value="startup">Startup Consulting</option>
                        <option value="ed-tech">EdTech Consulting</option>
                      </select>
                      <svg className="chevron" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9" /></svg>
                    </div>
                  </Col>

                  <Col sm={12}>
                    <div className="input-wrap textarea-wrap">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
                      <textarea
                        name="message"
                        placeholder="Message"
                        rows={3}
                        value={formData.message}
                        onChange={handleChange}
                        disabled={status === "loading"}
                      />
                    </div>
                  </Col>

                  {/* Error message */}
                  {status === "error" && (
                    <Col sm={12}>
                      <p className="form-feedback form-feedback--error">{errorMsg}</p>
                    </Col>
                  )}

                  <Col sm={12}>
                    <button
                      className={`send-quote-btn ${status === "success" ? "sent" : ""}`}
                      onClick={handleSubmit}
                      disabled={status === "loading" || status === "success"}
                    >
                      {status === "loading" ? (
                        <>
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="spin-icon"><path d="M21 12a9 9 0 1 1-6.219-8.56" /></svg>
                          Sending...
                        </>
                      ) : status === "success" ? (
                        <>
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                          Message Sent!
                        </>
                      ) : (
                        <>
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>
                          Send Message!
                        </>
                      )}
                    </button>
                  </Col>
                </Row>
              </div>
            </div>
          </Col>

        </Row>
      </Container>
    </section>
  );
}

export default Banner;