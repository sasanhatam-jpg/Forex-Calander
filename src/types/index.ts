export type ImpactLevel = 'low' | 'medium' | 'high';

export interface EconomicEvent {
  id: string;
  title: string;
  country: string;
  currency: string;
  time_utc: string; // ISO 8601
  impact: ImpactLevel;
  actual: string | null;
  forecast: string | null;
  previous: string | null;
  category: string;
  source: string;
  detailUrl?: string | null;
  is_favorite: boolean;
  description?: string; // For the expanded view
}

export interface FilterState {
  impact: ImpactLevel[];
  currencies: string[];
  countries: string[];
  search: string;
  dateRange: 'today' | 'tomorrow' | 'week' | 'custom';
  customStartDate?: string; // ISO Date
  customEndDate?: string; // ISO Date
  onlyFavorites: boolean;
}

export interface CalendarStats {
  highImpactUsd: number;
  highImpactEur: number;
  busiestDay: string;
}
