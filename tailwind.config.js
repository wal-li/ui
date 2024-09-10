export default {
  darkMode: 'class',
  content: ['index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  safelist: [],
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary-500)',
        'primary-50': 'var(--primary-50)',
        'primary-100': 'var(--primary-100)',
        'primary-200': 'var(--primary-200)',
        'primary-300': 'var(--primary-300)',
        'primary-400': 'var(--primary-400)',
        'primary-500': 'var(--primary-500)',
        'primary-600': 'var(--primary-600)',
        'primary-700': 'var(--primary-700)',
        'primary-800': 'var(--primary-800)',
        'primary-900': 'var(--primary-900)',
        'primary-950': 'var(--primary-950)',
      },
    },
    fontFamily: {
      sans: ['"Poppins"', '"PoppinsVN"', 'sans-serif'],
      mono: ['monospace'],
      icon: ['primeicons'],
    },
  },
};
