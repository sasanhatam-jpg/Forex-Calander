import React from 'react';
import { BarChart3, Globe2 } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <div className="flex items-center gap-3 mb-1">
          <div className="p-2 bg-primary/10 rounded-lg">
            <BarChart3 className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
            تقویم اقتصادی <span className="text-primary">فارکس</span>
          </h1>
        </div>
        <p className="text-slate-400 text-sm md:text-base max-w-2xl">
          رویدادهای مهم اقتصادی را با جزئیات کامل و به وقت محلی دنبال کنید.
        </p>
      </div>
      
      <div className="flex items-center gap-2 text-xs text-slate-500 bg-slate-900/50 px-3 py-2 rounded-lg border border-slate-800">
        <Globe2 className="w-4 h-4" />
        <span>پشتیبانی شده توسط Brokerir</span>
      </div>
    </header>
  );
};
