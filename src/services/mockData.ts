import { EconomicEvent } from '../types';
import { DateTime } from 'luxon';

// Helper to generate dates relative to today
const getRelativeDate = (daysOffset: number, hour: number, minute: number) => {
  return DateTime.now().plus({ days: daysOffset }).set({ hour, minute }).toUTC().toISO() || '';
};

export const MOCK_EVENTS: EconomicEvent[] = [
  {
    id: '1',
    title: 'تصمیم‌گیری نرخ بهره فدرال رزرو',
    country: 'United States',
    currency: 'USD',
    time_utc: getRelativeDate(0, 19, 0),
    impact: 'high',
    actual: null,
    forecast: '5.50%',
    previous: '5.50%',
    category: 'Central Bank',
    source: 'Federal Reserve',
    is_favorite: true,
    description: 'کمیته بازار آزاد فدرال (FOMC) نرخ بهره را تعیین می‌کند. این مهم‌ترین رویداد برای ارزش دلار است.'
  },
  {
    id: '2',
    title: 'شاخص قیمت مصرف‌کننده (CPI) سالانه',
    country: 'United States',
    currency: 'USD',
    time_utc: getRelativeDate(0, 13, 30),
    impact: 'high',
    actual: '3.2%',
    forecast: '3.1%',
    previous: '3.4%',
    category: 'Inflation',
    source: 'Bureau of Labor Statistics',
    is_favorite: false,
    description: 'شاخص اصلی تورم که تغییرات قیمت کالاها و خدمات را اندازه‌گیری می‌کند.'
  },
  {
    id: '3',
    title: 'سخنرانی رئیس بانک مرکزی اروپا (Lagarde)',
    country: 'Eurozone',
    currency: 'EUR',
    time_utc: getRelativeDate(0, 15, 0),
    impact: 'medium',
    actual: null,
    forecast: null,
    previous: null,
    category: 'Central Bank',
    source: 'ECB',
    is_favorite: false
  },
  {
    id: '4',
    title: 'تولید ناخالص داخلی (GDP) فصلی',
    country: 'United Kingdom',
    currency: 'GBP',
    time_utc: getRelativeDate(1, 7, 0),
    impact: 'high',
    actual: null,
    forecast: '0.1%',
    previous: '-0.1%',
    category: 'GDP',
    source: 'ONS',
    is_favorite: false
  },
  {
    id: '5',
    title: 'نرخ بیکاری',
    country: 'Canada',
    currency: 'CAD',
    time_utc: getRelativeDate(1, 13, 30),
    impact: 'medium',
    actual: null,
    forecast: '5.8%',
    previous: '5.7%',
    category: 'Employment',
    source: 'Statistics Canada',
    is_favorite: false
  },
  {
    id: '6',
    title: 'تراز تجاری',
    country: 'Japan',
    currency: 'JPY',
    time_utc: getRelativeDate(-1, 23, 50),
    impact: 'low',
    actual: '-0.5T',
    forecast: '-0.4T',
    previous: '-0.6T',
    category: 'Trade',
    source: 'Ministry of Finance',
    is_favorite: false
  },
  {
    id: '7',
    title: 'شاخص خرده‌فروشی',
    country: 'Australia',
    currency: 'AUD',
    time_utc: getRelativeDate(2, 1, 30),
    impact: 'medium',
    actual: null,
    forecast: '0.5%',
    previous: '0.2%',
    category: 'Sales',
    source: 'ABS',
    is_favorite: false
  },
  {
    id: '8',
    title: 'شاخص مدیران خرید (PMI) بخش خدمات',
    country: 'Eurozone',
    currency: 'EUR',
    time_utc: getRelativeDate(0, 9, 0),
    impact: 'medium',
    actual: '49.8',
    forecast: '50.0',
    previous: '48.7',
    category: 'Business',
    source: 'S&P Global',
    is_favorite: false
  },
  {
    id: '9',
    title: 'مدعیان بیکاری هفتگی',
    country: 'United States',
    currency: 'USD',
    time_utc: getRelativeDate(2, 13, 30),
    impact: 'medium',
    actual: null,
    forecast: '215K',
    previous: '210K',
    category: 'Employment',
    source: 'DOL',
    is_favorite: false
  }
];

export const COUNTRIES = [
  { code: 'US', name: 'United States', currency: 'USD' },
  { code: 'EU', name: 'Eurozone', currency: 'EUR' },
  { code: 'GB', name: 'United Kingdom', currency: 'GBP' },
  { code: 'JP', name: 'Japan', currency: 'JPY' },
  { code: 'AU', name: 'Australia', currency: 'AUD' },
  { code: 'CA', name: 'Canada', currency: 'CAD' },
  { code: 'CH', name: 'Switzerland', currency: 'CHF' },
  { code: 'NZ', name: 'New Zealand', currency: 'NZD' },
];
