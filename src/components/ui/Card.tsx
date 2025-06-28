import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({ children, className = '', hoverable = false, onClick }) => {
  const hoverClasses = hoverable ? 'hover:shadow-2xl hover:scale-105 cursor-pointer' : '';
  
  return (
    <div 
      className={`bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 transition-all duration-300 ${hoverClasses} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};