import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { FilterBar } from './components/FilterBar';
import { WeekSummary } from './components/WeekSummary';
import { EventRow } from './components/EventRow';
import { Card } from './components/ui/Card';
import { EconomicEvent, FilterState } from './types';
import { fetchEvents } from './services/api';
import { DateTime } from 'luxon';
import { Loader2, Clock } from 'lucide-react';

function App() {
  const [events, setEvents] = useState<EconomicEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [timezone, setTimezone] = useState('Asia/Tehran');
  const [favorites, setFavorites] = useState<string[]>([]);
  
  const [filters, setFilters] = useState<FilterState>({
    impact: [],
    currencies: [],
    countries: [],
    search: '',
    dateRange: 'today',
    onlyFavorites: false
  });

  // Load events when filters change
  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const data = await fetchEvents(filters);
        setEvents(data);
      } catch (error) {
        console.error("Failed to fetch events", error);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [filters]);

  // Handle Favorites
  const toggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(fid => fid !== id) : [...prev, id]
    );
  };

  const handleReset = () => {
    setFilters({
      impact: [],
      currencies: [],
      countries: [],
      search: '',
      dateRange: 'today',
      onlyFavorites: false
    });
  };

  // Group events by Date
  const groupedEvents = events.reduce((acc, event) => {
    const dateKey = DateTime.fromISO(event.time_utc).setZone(timezone).toFormat('yyyy-MM-dd');
    if (!acc[dateKey]) acc[dateKey] = [];
    acc[dateKey].push(event);
    return acc;
  }, {} as Record<string, EconomicEvent[]>);

  return (
    <div className="min-h-screen bg-background text-slate-200 p-4 md:p-8 font-sans selection:bg-primary/30">
      <div className="max-w-5xl mx-auto">
        
        <Header />
        
        <WeekSummary />

        <div className="flex flex-col md:flex-row justify-between items-end md:items-center mb-2 gap-4">
          <div className="text-sm text-slate-400">
             نمایش {events.length} رویداد
          </div>
          
          {/* Timezone Selector */}
          <div className="flex items-center gap-2 bg-slate-900/50 px-3 py-1.5 rounded-lg border border-slate-800 text-xs">
            <Clock className="w-3 h-3 text-primary" />
            <span className="text-slate-400">زمان:</span>
            <select 
              value={timezone} 
              onChange={(e) => setTimezone(e.target.value)}
              className="bg-transparent border-none text-slate-200 focus:ring-0 cursor-pointer"
            >
              <option value="Asia/Tehran">تهران (GMT+3:30)</option>
              <option value="UTC">جهانی (UTC)</option>
              <option value="America/New_York">نیویورک (EST)</option>
              <option value="Europe/London">لندن (GMT)</option>
            </select>
          </div>
        </div>

        <FilterBar filters={filters} setFilters={setFilters} onReset={handleReset} />

        <div className="space-y-6 min-h-[400px]">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-64 text-slate-500">
              <Loader2 className="w-8 h-8 animate-spin mb-2 text-primary" />
              <p>در حال بارگذاری رویدادها...</p>
            </div>
          ) : events.length === 0 ? (
            <Card className="p-12 text-center text-slate-500 border-dashed">
              <p>هیچ رویدادی با این فیلترها یافت نشد.</p>
              <button onClick={handleReset} className="text-primary mt-2 hover:underline">پاک کردن فیلترها</button>
            </Card>
          ) : (
            Object.entries(groupedEvents).map(([date, dayEvents]) => (
              <div key={date} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center gap-3 mb-3 px-2">
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-700 to-transparent"></div>
                  <span className="text-sm font-bold text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
                    {DateTime.fromISO(date).setLocale('fa').toFormat('cccc، d MMMM')}
                  </span>
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-700 to-transparent"></div>
                </div>
                
                <Card className="divide-y divide-slate-800/50">
                  {/* Table Header (Desktop) */}
                  <div className="hidden md:grid grid-cols-12 gap-2 p-3 bg-slate-900/50 text-xs text-slate-500 font-medium uppercase tracking-wider">
                    <div className="col-span-2 text-center">زمان</div>
                    <div className="col-span-5 pr-2">رویداد</div>
                    <div className="col-span-4 grid grid-cols-3 text-center">
                      <span>واقعی</span>
                      <span>پیش‌بینی</span>
                      <span>قبلی</span>
                    </div>
                    <div className="col-span-1"></div>
                  </div>

                  {dayEvents.map(event => (
                    <EventRow 
                      key={event.id} 
                      event={event} 
                      timezone={timezone}
                      isFavorite={favorites.includes(event.id)}
                      onToggleFavorite={toggleFavorite}
                    />
                  ))}
                </Card>
              </div>
            ))
          )}
        </div>

        <footer className="mt-12 pt-6 border-t border-slate-800 text-center text-slate-500 text-xs md:text-sm">
          <p className="mb-2">Forex Economic Calendar — Powered by <a href="https://brokerir.com" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-primary transition-colors">Brokerir.com</a></p>
          <p className="opacity-60">تمامی حقوق محفوظ است © {new Date().getFullYear()}</p>
        </footer>

      </div>
    </div>
  );
}

export default App;
