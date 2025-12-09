import React from 'react';
import { cn } from '../../utils/cn';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className, hoverEffect = false }) => {
  return (
    <motion.div 
      className={cn(
        "bg-card backdrop-blur-md border border-slate-800 rounded-xl shadow-lg overflow-hidden",
        hoverEffect && "hover:border-slate-600 hover:shadow-glass transition-all duration-300",
        className
      )}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
};
