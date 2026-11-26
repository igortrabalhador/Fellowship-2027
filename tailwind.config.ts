import type { Config } from 'tailwindcss';

const config: Config = {
  future: {
    hoverOnlyWhenSupported: true,
  },
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0F2340',
          deep: '#0A172D',
          ink: '#0B1C36',
          mid: '#142A4C',
          soft: '#1E3052',
        },
        brand: {
          blue: '#469ABB',
          'blue-light': '#5CAACA',
          'blue-text': '#6CB6D6',
          'blue-label': '#8CC4DE',
          'blue-deep': '#1A5A79',
        },
        mist: {
          DEFAULT: '#D4D5D7',
          white: '#F0F0F1',
          gray: '#787878',
          'gray-mid': '#5E636B',
          'gray-light': '#9A9B9E',
        },
      },
      fontFamily: {
        sans: ['Archivo', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      maxWidth: {
        editorial: '1200px',
      },
      borderRadius: {
        panel: '22px',
      },
    },
  },
  plugins: [],
};

export default config;
