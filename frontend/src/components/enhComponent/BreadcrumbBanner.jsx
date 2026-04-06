import React from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom"; // Import Link from React Router

const BreadcrumbBanner = ({ title }) => {
  return (
    <div className="breadcrumb-banner">
      <Container className="text-center">
        <h1 className="banner-title">{title}</h1>
        <nav className="breadcrumb-nav">
          <Link to="/" className="breadcrumb-home">HOME</Link>
          <span className="breadcrumb-separator">›</span>
          <span className="breadcrumb-current">{title.toUpperCase()}</span>
        </nav>
      </Container>
    </div>
  );
};

export default BreadcrumbBanner;
