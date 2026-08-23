import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ChevronRight, Globe, Code, Smartphone, Database, PenTool, LayoutDashboard, Search, Megaphone, ShoppingCart, Activity
} from 'lucide-react';
import './ServiceCard.css';

const iconMap = {
  Globe,
  Code,
  Smartphone,
  Database,
  PenTool,
  LayoutDashboard,
  Search,
  Megaphone,
  ShoppingCart,
  Activity,
};

const ServiceCard = ({ service }) => {
  const IconComponent = iconMap[service.icon] || Code;

  return (
    <div className="service-card">
      <div className="service-icon-wrapper">
        <IconComponent size={24} className="service-icon" />
      </div>
      <h3 className="service-title">{service.title}</h3>
      <p className="service-desc">{service.shortDescription}</p>
      <Link to={`/services#${service.id}`} className="service-link">
        Learn More
        <ChevronRight size={18} className="service-link-icon" />
      </Link>
    </div>
  );
};

export default ServiceCard;
