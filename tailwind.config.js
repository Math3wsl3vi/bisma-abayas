export default {
  content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      colors: {
        emerald: {
          DEFAULT: '#0D5C46',
          light: '#167D61',
          dark: '#083F30',
        },
        burgundy: {
          DEFAULT: '#800020',
          light: '#A30028',
          dark: '#5C0018',
        },
        navy: {
          DEFAULT: '#0A2342',
          light: '#0E3259',
          dark: '#06152B',
        },
        gold: {
          DEFAULT: '#D4AF37',
          light: '#E6C86E',
          dark: '#BF9B30',
        },
        cream: {
          DEFAULT: '#FDF5E6',
          light: '#FFF9F0',
          dark: '#F5EAD7',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['"Poppins"', 'sans-serif'],
      },
      backgroundImage: {
        'pattern-light': "url('https://images.unsplash.com/photo-1619252584172-a83a949b6efd?q=80&w=1000&auto=format&fit=crop')",
        'pattern-dark': "url('https://images.unsplash.com/photo-1558244661-d248897f7bc4?q=80&w=1000&auto=format&fit=crop')",
      },
    },
  },
  plugins: [],
}