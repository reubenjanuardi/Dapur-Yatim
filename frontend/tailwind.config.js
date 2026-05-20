/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#005DAC',
          light: '#D4E3FF',
          dark: '#004786',
          container: '#1976D2',
        },
        secondary: {
          DEFAULT: '#006E1C',
          light: '#98F994',
          dark: '#005313',
          container: '#43A047',
        },
        tertiary: {
          DEFAULT: '#884F00',
          light: '#FFDCBE',
          container: '#FF9800',
        },
        surface: {
          DEFAULT: '#F7F9FB',
          dim: '#D8DADC',
          bright: '#F7F9FB',
          low: '#F2F4F6',
          container: '#ECEEF0',
          high: '#E6E8EA',
          highest: '#E0E3E5',
        },
        'on-surface': '#191C1E',
        'on-surface-variant': '#414752',
        outline: '#717783',
        'outline-variant': '#C1C6D4',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '0.5rem',
        sm: '0.25rem',
        md: '0.75rem',
        lg: '1rem',
        xl: '1.5rem',
      },
      boxShadow: {
        card: '0 2px 12px rgba(25, 118, 210, 0.06)',
        'card-hover': '0 6px 24px rgba(25, 118, 210, 0.12)',
        button: '0 2px 8px rgba(0, 93, 172, 0.20)',
      },
    },
  },
  plugins: [],
}
