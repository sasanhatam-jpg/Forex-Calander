import { EconomicEvent, FilterState } from '../types';
import { MOCK_EVENTS } from './mockData';
import { DateTime } from 'luxon';

export const fetchEvents = async (filters: FilterState): Promise<EconomicEvent[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 600));

  let events = [...MOCK_EVENTS];

  // Filter by Date
  const now = DateTime.now();
  let start: DateTime, end: DateTime;

  switch (filters.dateRange) {
    case 'today':
      start = now.startOf('day');
      end = now.endOf('day');
      break;
    case 'tomorrow':
      start = now.plus({ days: 1 }).startOf('day');
      end = now.plus({ days: 1 }).endOf('day');
      break;
    case 'week':
      start = now.startOf('week');
      end = now.endOf('week');
      break;
    default:
      start = now.minus({ years: 1 }); // Fallback for custom/all
      end = now.plus({ years: 1 });
  }

  events = events.filter(e => {
    const eventTime = DateTime.fromISO(e.time_utc);
    // Simple date filtering logic for mock
    if (filters.dateRange === 'custom') return true; 
    return eventTime >= start && eventTime <= end;
  });

  // Filter by Impact
  if (filters.impact.length > 0) {
    events = events.filter(e => filters.impact.includes(e.impact));
  }

  // Filter by Currency
  if (filters.currencies.length > 0) {
    events = events.filter(e => filters.currencies.includes(e.currency));
  }

  // Filter by Search
  if (filters.search) {
    const lowerSearch = filters.search.toLowerCase();
    events = events.filter(e => 
      e.title.toLowerCase().includes(lowerSearch) ||
      e.currency.toLowerCase().includes(lowerSearch) ||
      e.country.toLowerCase().includes(lowerSearch)
    );
  }

  // Filter Favorites
  if (filters.onlyFavorites) {
    events = events.filter(e => e.is_favorite);
  }

  // Sort by time
  events.sort((a, b) => DateTime.fromISO(a.time_utc).toMillis() - DateTime.fromISO(b.time_utc).toMillis());

  return events;
};
