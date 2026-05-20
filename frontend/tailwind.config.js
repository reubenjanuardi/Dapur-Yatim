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
        '2xl': '2rem',
        '3xl': '3rem',
      },
      boxShadow: {
        card: '0 2px 12px rgba(25, 118, 210, 0.06)',
        'card-hover': '0 6px 24px rgba(25, 118, 210, 0.12)',
        'card-elevated': '0 12px 40px rgba(25, 118, 210, 0.15)',
        button: '0 2px 8px rgba(0, 93, 172, 0.20)',
        'button-hover': '0 8px 24px rgba(0, 93, 172, 0.30)',
        'inner-sm': 'inset 0 2px 4px rgba(0, 0, 0, 0.06)',
        'inner-md': 'inset 0 4px 8px rgba(0, 0, 0, 0.08)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'slide-in': 'slideIn 0.4s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        shimmer: 'shimmer 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateX(-10px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
    },
  },
  plugins: [],
}
