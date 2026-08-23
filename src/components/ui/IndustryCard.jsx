import React from 'react';
import { 
  Building2, 
  ShoppingCart, 
  Stethoscope, 
  GraduationCap, 
  Utensils, 
  Truck, 
  Home, 
  Briefcase,
  Heart,
  Plane,
  Monitor
} from 'lucide-react';
import './IndustryCard.css';

const iconMap = {
  Building2,
  ShoppingCart,
  Stethoscope,
  GraduationCap,
  Utensils,
  Truck,
  Home,
  Briefcase,
  Heart,
  Plane,
  Monitor
};

const IndustryCard = ({ industry }) => {
  const IconComponent = iconMap[industry.icon] || Building2;

  return (
    <div className="industry-card">
      <div className="industry-icon-wrapper">
        <IconComponent size={32} />
      </div>
      <h3 className="industry-title">{industry.title}</h3>
      <p className="industry-desc">{industry.description}</p>
    </div>
  );
};

export default IndustryCard;
