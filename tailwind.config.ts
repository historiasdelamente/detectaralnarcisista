import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FDB913',
          50: '#fffef0',
          100: '#fffbcc',
          200: '#fff799',
          300: '#fff266',
          400: '#ffed33',
          500: '#FDB913',
          600: '#E5A711',
          700: '#998200',
          800: '#665700',
          900: '#332b00',
        },
        dark: {
          DEFAULT: '#0a0a0a',
          50: '#1E1E1E',
          100: '#121212',
          200: '#2a2a2a',
          300: '#333333',
          400: '#444444',
        },
        surface: {
          DEFAULT: '#1E1E1E',
          light: '#2a2a2a',
          dark: '#121212',
        },
        success: {
          DEFAULT: '#22c55e',
          light: '#dcfce7',
        },
        warning: {
          DEFAULT: '#f59e0b',
          light: '#fef3c7',
        },
        error: {
          DEFAULT: '#ef4444',
          light: '#fee2e2',
        },
        'bg-warm': '#FFFBF0',
        'text-dark': '#1A1A1A',
        'text-muted': '#555555',
        rose: '#D4A0A0',
        gold: '#C9A96E',
      },
      fontFamily: {
        sans: ['Montserrat', 'system-ui', 'sans-serif'],
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(253, 185, 19, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(253, 185, 19, 0.6)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
