import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import FloatingButtons from './FloatingButtons';
import ConsultationModal from '../ui/ConsultationModal';
import { ConsultationProvider, useConsultation } from '../../context/ConsultationContext';

const LayoutShell = ({ children }) => {
  const location = useLocation();
  const { isOpen, closeConsultation } = useConsultation();

  useEffect(() => {
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
      <ConsultationModal isOpen={isOpen} onClose={closeConsultation} />
    </div>
  );
};

const Layout = ({ children }) => (
  <ConsultationProvider>
    <LayoutShell>{children}</LayoutShell>
  </ConsultationProvider>
);

export default Layout;
