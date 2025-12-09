import React, { useState } from 'react';
import { EconomicEvent } from '../types';
import { DateTime } from 'luxon';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Star, ExternalLink, Activity } from 'lucide-react';
import { ImpactBadge } from './ui/Badge';
import { cn } from '../utils/cn';

interface EventRowProps {
  event: EconomicEvent;
  timezone: string;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}

export const EventRow: React.FC<EventRowProps> = ({ event, timezone, isFavorite, onToggleFavorite }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const localTime = DateTime.fromISO(event.time_utc).setZone(timezone);
  const isPast = localTime < DateTime.now().setZone(timezone);

  // Determine value colors based on forecast vs actual
  const getValueColor = (val: string | null, forecast: string | null, type: 'actual' | 'prev') => {
    if (!val) return 'text-slate-400';
    // This is a simplified logic. In real app, we'd parse numbers.
    // Assuming green for better than forecast, red for worse.
    // For now, just styling "Actual" if it exists.
    if (type === 'actual' && forecast) {
        return 'text-white font-bold'; // Neutral for mock, can be improved with parsing
    }
    return 'text-slate-300';
  };

  return (
    <motion.div 
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="border-b border-slate-800 last:border-0 hover:bg-slate-800/30 transition-colors group"
    >
      {/* Main Row */}
      <div 
        className="grid grid-cols-12 gap-2 p-4 items-center cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {/* Time & Currency */}
        <div className="col-span-3 md:col-span-2 flex flex-col justify-center border-l border-slate-800/50 pl-2">
          <span className="text-sm font-mono font-medium text-slate-200">
            {localTime.toFormat('HH:mm')}
          </span>
          <div className="flex items-center gap-1 mt-1">
             <span className="text-xs font-bold text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded">{event.currency}</span>
             <span className="text-[10px] text-slate-500 hidden sm:inline">{event.country}</span>
          </div>
        </div>

        {/* Title & Impact */}
        <div className="col-span-6 md:col-span-5 flex flex-col justify-center pr-2">
          <div className="flex items-center gap-2 mb-1">
             <ImpactBadge impact={event.impact} className="text-[10px] px-1.5 py-0">
               {event.impact === 'high' ? '!!!' : event.impact === 'medium' ? '!!' : '!'}
             </ImpactBadge>
             <h3 className={cn("text-sm font-medium truncate", isPast ? "text-slate-400" : "text-white")}>
               {event.title}
             </h3>
          </div>
        </div>

        {/* Data Columns (Hidden on very small screens) */}
        <div className="col-span-3 md:col-span-4 flex items-center justify-end md:justify-between gap-2 text-xs md:text-sm">
          <div className="hidden md:flex flex-col items-center w-16">
            <span className={getValueColor(event.actual, event.forecast, 'actual')}>{event.actual || '--'}</span>
          </div>
          <div className="hidden md:flex flex-col items-center w-16 text-slate-400">
            <span>{event.forecast || '--'}</span>
          </div>
          <div className="hidden md:flex flex-col items-center w-16 text-slate-500">
            <span>{event.previous || '--'}</span>
          </div>
          
          {/* Mobile Only Value */}
          <div className="md:hidden flex flex-col items-end">
             <span className={cn("font-bold", event.actual ? "text-white" : "text-slate-500")}>
                {event.actual || event.forecast || '--'}
             </span>
             <span className="text-[10px] text-slate-600">Actual</span>
          </div>
        </div>

        {/* Actions */}
        <div className="col-span-1 flex items-center justify-end">
           {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
        </div>
      </div>

      {/* Expanded Details */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden bg-slate-900/50"
          >
            <div className="p-4 border-t border-slate-800/50 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-xs font-semibold text-primary mb-2 flex items-center gap-2">
                  <Activity className="w-3 h-3" />
                  توضیحات
                </h4>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {event.description || 'توضیحات تکمیلی برای این رویداد در دسترس نیست، اما معمولاً این شاخص تاثیر مستقیمی بر نوسانات ارز مربوطه دارد.'}
                </p>
                <div className="mt-4 flex gap-4 text-xs">
                   <div>
                     <span className="block text-slate-500 mb-1">منبع</span>
                     <span className="text-slate-300">{event.source}</span>
                   </div>
                   <div>
                     <span className="block text-slate-500 mb-1">دسته‌بندی</span>
                     <span className="text-slate-300">{event.category}</span>
                   </div>
                </div>
              </div>

              <div className="flex flex-col items-end justify-between">
                 <div className="flex gap-8 text-center bg-slate-950/50 p-3 rounded-lg border border-slate-800 w-full md:w-auto">
                    <div>
                      <span className="block text-[10px] text-slate-500 uppercase">واقعی</span>
                      <span className="text-sm font-bold text-white">{event.actual || '--'}</span>
                    </div>
                    <div>
                      <span className="block text-[10px] text-slate-500 uppercase">پیش‌بینی</span>
                      <span className="text-sm font-medium text-primary">{event.forecast || '--'}</span>
                    </div>
                    <div>
                      <span className="block text-[10px] text-slate-500 uppercase">قبلی</span>
                      <span className="text-sm text-slate-400">{event.previous || '--'}</span>
                    </div>
                 </div>

                 <div className="flex gap-3 mt-4">
                   <button 
                     onClick={(e) => { e.stopPropagation(); onToggleFavorite(event.id); }}
                     className={cn(
                       "flex items-center gap-2 px-3 py-1.5 rounded-md text-xs border transition-colors",
                       isFavorite 
                        ? "bg-yellow-500/10 border-yellow-500/50 text-yellow-500" 
                        : "bg-slate-800 border-slate-700 text-slate-400 hover:text-white"
                     )}
                   >
                     <Star className={cn("w-3 h-3", isFavorite && "fill-current")} />
                     {isFavorite ? 'نشان شده' : 'افزودن به علاقه‌مندی‌ها'}
                   </button>
                   <button className="flex items-center gap-2 px-3 py-1.5 rounded-md text-xs border border-slate-700 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors">
                     <ExternalLink className="w-3 h-3" />
                     تحلیل کامل
                   </button>
                 </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
