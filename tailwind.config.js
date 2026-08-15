/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html'],
  theme: {
    extend: {
      colors: {
        brand: {
          red: '#ea2127',
          navy: '#2c2f75'
        },
        ink: '#111827',
        muted: '#64748b',
        page: '#f7f8fc',
        surface: '#ffffff',
        border: '#e3e7ef'
      }
    }
  }
};
