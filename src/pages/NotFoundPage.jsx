import React, { useEffect } from 'react';
import Button from '../components/ui/Button';
import './NotFoundPage.css';

const NotFoundPage = () => {
  useEffect(() => {
    document.title = '404 — Page Not Found — Codex Developers';
  }, []);

  return (
    <main className="not-found-page">
      <div className="container">
        <div className="not-found-content">
          <div className="error-code">404</div>
          <h1>Page Not Found</h1>
          <p>
            The page you are looking for does not exist or has been moved. Let us help you find what you need.
          </p>
          <div className="not-found-actions">
            <Button href="/" variant="primary">
              Go to Home
            </Button>
            <Button href="/contact" variant="secondary">
              Contact Us
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default NotFoundPage;
