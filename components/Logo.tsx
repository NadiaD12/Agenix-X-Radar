import React from 'react';

const Logo: React.FC = () => (
  <svg width="32" height="32" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
    {/* Background Circle - Deep Navy */}
    <circle cx="100" cy="100" r="100" fill="#05164d" />
    
    {/* Right Leg - Dark Blue */}
    <path 
      d="M115 55 L155 125" 
      stroke="#1e3a8a" 
      strokeWidth="24" 
      strokeLinecap="round" 
    />
    
    {/* Left Leg - Cyan */}
    <path 
      d="M55 135 L90 75" 
      stroke="#00e5ff" 
      strokeWidth="24" 
      strokeLinecap="round" 
    />
    
    {/* Top Segment - White */}
    <path 
      d="M90 75 L115 55" 
      stroke="#ffffff" 
      strokeWidth="24" 
      strokeLinecap="round" 
    />
    
    {/* Crossbar - Light Blue */}
    <path 
      d="M80 115 L145 90" 
      stroke="#3b82f6" 
      strokeWidth="24" 
      strokeLinecap="round" 
    />
    
    {/* Distinctive accent dot at the end of the crossbar */}
    <circle cx="145" cy="90" r="12" fill="#3b82f6" />
  </svg>
);

export default Logo;
