/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: "#020617",
        card: "rgba(15, 23, 42, 0.85)",
        primary: "#38bdf8", // Sky blue
        secondary: "#6366f1", // Indigo
        success: "#22c55e", // Green
        warning: "#facc15", // Yellow
        danger: "#ef4444", // Red
        accent: "#f97316", // Orange
      },
      fontFamily: {
        sans: ['Vazirmatn', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glass': '0 4px 30px rgba(0, 0, 0, 0.1)',
        'neon': '0 0 10px rgba(56, 189, 248, 0.5)',
      },
      backdropBlur: {
        'xs': '2px',
      }
    },
  },
  plugins: [],
}
