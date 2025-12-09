import React from 'react';
import { cn } from '../../utils/cn';
import { ImpactLevel } from '../../types';

interface BadgeProps {
  impact?: ImpactLevel;
  children: React.ReactNode;
  className?: string;
}

export const ImpactBadge: React.FC<BadgeProps> = ({ impact, children, className }) => {
  const colors = {
    low: 'bg-success/10 text-success border-success/20',
    medium: 'bg-warning/10 text-warning border-warning/20',
    high: 'bg-danger/10 text-danger border-danger/20',
  };

  const baseClass = impact ? colors[impact] : 'bg-slate-800 text-slate-300';

  return (
    <span className={cn("px-2.5 py-0.5 rounded-full text-xs font-medium border", baseClass, className)}>
      {children}
    </span>
  );
};
