/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"IBM Plex Sans"', '"IBM Plex Sans Arabic"', ...defaultTheme.fontFamily.sans],
        display: ['"Space Grotesk"', '"IBM Plex Sans Arabic"', ...defaultTheme.fontFamily.sans],
        arabic: ['"IBM Plex Sans Arabic"', '"IBM Plex Sans"', ...defaultTheme.fontFamily.sans],
        mono: ['"JetBrains Mono"', ...defaultTheme.fontFamily.mono],
      },
      colors: {
        os: {
          bg: '#050505',
          surface: '#111111',
          elevated: '#1A1A1A',
          code: '#0D0D0D',
          border: '#222222',
          muted: '#888888',
          text: '#FFFFFF',
        },
        accent: {
          yellow: '#FFE500',
          hover: '#E6CE00',
          // aliases used across components
          blue: '#FFE500',
          cyan: '#FFE500',
          glow: '#FFE500',
        },
        syntax: {
          comment: '#6A9955',
          keyword: '#C586C0',
          string: '#CE9178',
          fn: '#DCDCAA',
        },
        primary: {
          50: '#fffde6',
          100: '#fff9b3',
          200: '#fff480',
          300: '#ffef4d',
          400: '#ffe91a',
          500: '#FFE500',
          600: '#E6CE00',
          700: '#b3a100',
          800: '#807300',
          900: '#4d4500',
        },
        secondary: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#888888',
          600: '#666666',
          700: '#333333',
          800: '#1a1a1a',
          900: '#050505',
        },
      },
      maxWidth: {
        os: '1280px',
      },
      boxShadow: {
        glow: '0 0 48px rgba(255, 229, 0, 0.22)',
        'glow-sm': '0 0 24px rgba(255, 229, 0, 0.18)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.7s ease-out',
        float: 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out 1.5s infinite',
        marquee: 'marquee 25s linear infinite',
        pingSoft: 'pingSoft 2s ease-out infinite',
        blink: 'blink 1s step-end infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        pingSoft: {
          '0%': { transform: 'scale(1)', opacity: '0.8' },
          '75%, 100%': { transform: 'scale(2.2)', opacity: '0' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
