import React from 'react';
import { FilterState, ImpactLevel } from '../types';
import { Search, Calendar, Filter, X } from 'lucide-react';
import { cn } from '../utils/cn';
import { motion, AnimatePresence } from 'framer-motion';

interface FilterBarProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  onReset: () => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({ filters, setFilters, onReset }) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  const toggleImpact = (level: ImpactLevel) => {
    setFilters(prev => ({
      ...prev,
      impact: prev.impact.includes(level) 
        ? prev.impact.filter(i => i !== level)
        : [...prev.impact, level]
    }));
  };

  const toggleCurrency = (curr: string) => {
    setFilters(prev => ({
      ...prev,
      currencies: prev.currencies.includes(curr)
        ? prev.currencies.filter(c => c !== curr)
        : [...prev.currencies, curr]
    }));
  };

  const dateOptions = [
    { id: 'today', label: 'امروز' },
    { id: 'tomorrow', label: 'فردا' },
    { id: 'week', label: 'این هفته' },
  ];

  const commonCurrencies = ['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD'];

  return (
    <div className="bg-card/50 backdrop-blur-md border border-slate-800 rounded-xl p-4 mb-6 sticky top-2 z-30 shadow-xl">
      <div className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center">
        
        {/* Search & Date */}
        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
          <div className="relative group w-full sm:w-64">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors" />
            <input 
              type="text" 
              placeholder="جستجو (مثلاً: CPI, USD...)" 
              value={filters.search}
              onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
              className="w-full bg-slate-900/80 border border-slate-700 rounded-lg py-2 pr-10 pl-4 text-sm text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-slate-500"
            />
          </div>
          
          <div className="flex bg-slate-900/80 rounded-lg p-1 border border-slate-700">
            {dateOptions.map(opt => (
              <button
                key={opt.id}
                onClick={() => setFilters(prev => ({ ...prev, dateRange: opt.id as any }))}
                className={cn(
                  "px-3 py-1.5 rounded-md text-xs font-medium transition-all",
                  filters.dateRange === opt.id 
                    ? "bg-slate-700 text-white shadow-sm" 
                    : "text-slate-400 hover:text-slate-200"
                )}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Filters Toggle (Mobile) & Actions */}
        <div className="flex items-center gap-2 w-full lg:w-auto justify-between lg:justify-end">
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className={cn(
              "flex items-center gap-2 px-3 py-2 rounded-lg text-sm border transition-all",
              isExpanded ? "bg-primary/10 border-primary text-primary" : "bg-slate-900/50 border-slate-700 text-slate-300 hover:border-slate-600"
            )}
          >
            <Filter className="w-4 h-4" />
            <span>فیلترها</span>
            {(filters.impact.length > 0 || filters.currencies.length > 0) && (
              <span className="flex h-2 w-2 rounded-full bg-primary"></span>
            )}
          </button>

          <button 
            onClick={onReset}
            className="text-xs text-slate-400 hover:text-white underline decoration-slate-600 underline-offset-4 transition-colors"
          >
            پاک کردن همه
          </button>
        </div>
      </div>

      {/* Expanded Filters */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="pt-4 mt-4 border-t border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Impact Filter */}
              <div>
                <label className="text-xs font-semibold text-slate-400 mb-2 block">درجه اهمیت</label>
                <div className="flex flex-wrap gap-2">
                  {(['low', 'medium', 'high'] as ImpactLevel[]).map(level => (
                    <button
                      key={level}
                      onClick={() => toggleImpact(level)}
                      className={cn(
                        "px-3 py-1.5 rounded-full text-xs border transition-all flex items-center gap-2",
                        filters.impact.includes(level) 
                          ? level === 'high' ? "bg-danger/20 border-danger text-danger" :
                            level === 'medium' ? "bg-warning/20 border-warning text-warning" :
                            "bg-success/20 border-success text-success"
                          : "bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-600"
                      )}
                    >
                      <span className={cn("w-2 h-2 rounded-full", 
                        level === 'high' ? "bg-danger" : level === 'medium' ? "bg-warning" : "bg-success"
                      )}></span>
                      {level === 'high' ? 'بالا' : level === 'medium' ? 'متوسط' : 'پایین'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Currency Filter */}
              <div>
                <label className="text-xs font-semibold text-slate-400 mb-2 block">ارزها</label>
                <div className="flex flex-wrap gap-2">
                  {commonCurrencies.map(curr => (
                    <button
                      key={curr}
                      onClick={() => toggleCurrency(curr)}
                      className={cn(
                        "px-3 py-1.5 rounded-md text-xs border transition-all",
                        filters.currencies.includes(curr)
                          ? "bg-primary/20 border-primary text-primary"
                          : "bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-600"
                      )}
                    >
                      {curr}
                    </button>
                  ))}
                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
