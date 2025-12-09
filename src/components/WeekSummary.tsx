import React from 'react';
import { Card } from './ui/Card';
import { TrendingUp, AlertTriangle, CalendarClock } from 'lucide-react';

export const WeekSummary: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <Card className="p-4 flex items-center gap-4 bg-gradient-to-br from-slate-900 to-slate-900/50">
        <div className="p-3 rounded-full bg-danger/10 text-danger">
          <AlertTriangle className="w-5 h-5" />
        </div>
        <div>
          <span className="block text-2xl font-bold text-white">12</span>
          <span className="text-xs text-slate-400">رویداد با اهمیت بالا (این هفته)</span>
        </div>
      </Card>

      <Card className="p-4 flex items-center gap-4 bg-gradient-to-br from-slate-900 to-slate-900/50">
        <div className="p-3 rounded-full bg-primary/10 text-primary">
          <TrendingUp className="w-5 h-5" />
        </div>
        <div>
          <span className="block text-2xl font-bold text-white">USD</span>
          <span className="text-xs text-slate-400">پرنوسان‌ترین ارز هفته</span>
        </div>
      </Card>

      <Card className="p-4 flex items-center gap-4 bg-gradient-to-br from-slate-900 to-slate-900/50">
        <div className="p-3 rounded-full bg-secondary/10 text-secondary">
          <CalendarClock className="w-5 h-5" />
        </div>
        <div>
          <span className="block text-2xl font-bold text-white">چهارشنبه</span>
          <span className="text-xs text-slate-400">شلوغ‌ترین روز معاملاتی</span>
        </div>
      </Card>
    </div>
  );
};
