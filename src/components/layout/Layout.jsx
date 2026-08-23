import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import FloatingButtons from './FloatingButtons';

const Layout = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    // Only scroll to top if there's no hash in the URL
    if (!location.hash) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    }
  }, [location.pathname, location.hash]);

  return (
    <div className="layout-wrapper">
      <Header />
      <main id="main-content" style={{ paddingTop: '72px' }}>
        {children}
      </main>
      <FloatingButtons />
      <Footer />
    </div>
  );
};

export default Layout;
