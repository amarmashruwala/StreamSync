import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  ...props 
}) => {
  const baseStyles = "font-semibold rounded transition-colors focus:outline-none focus:ring-2 focus:ring-brand-light focus:ring-offset-1 focus:ring-offset-dark-bg";
  
  const variants = {
    primary: "bg-brand hover:bg-brand-hover text-white",
    secondary: "bg-dark-card hover:bg-dark-hover text-white border border-transparent",
    ghost: "bg-transparent hover:bg-dark-hover text-white",
    danger: "bg-red-600 hover:bg-red-700 text-white"
  };

  const sizes = {
    sm: "px-2 py-1 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`} 
      {...props}
    >
      {children}
    </button>
  );
};