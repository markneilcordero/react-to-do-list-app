import React from "react";

const Footer = () => {
  return (
    <footer className="mt-5 py-4 border-top bg-body-tertiary text-center">
      <div className="container">
        {/* Copyright */}
        <small className="d-block mb-2 text-body-secondary">
          &copy; {new Date().getFullYear()} Mark Neil Cordero. All rights reserved.
        </small>

        {/* Social links */}
        <div className="d-flex justify-content-center gap-4">
          <a
            href="https://github.com/markneilcordero"
            target="_blank"
            rel="noopener noreferrer"
            className="text-body"
          >
            <i className="bi bi-github me-1"></i> Github
          </a>
          <a
            href="mailto:mark.neil.u.cordero@gmail.com"
            className="text-body"
          >
            <i className="bi bi-envelope-fill me-1"></i> Email
          </a>
          <a
            href="https://www.linkedin.com/in/mark-neil-cordero/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-body"
          >
            <i className="bi bi-linkedin me-1"></i> LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
