export default {
  darkMode: 'class',
  content: ['index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  safelist: ['bg-purple-500'],
  theme: {
    extend: {},
    fontFamily: {
      sans: ['"Poppins"', '"PoppinsVN"', 'sans-serif'],
      mono: ['monospace'],
      icon: ['primeicons'],
    },
  },
};
