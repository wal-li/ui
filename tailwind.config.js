const SEVERITIES = ['primary', 'secondary', 'success', 'danger', 'warning', 'info'];

export default {
  darkMode: 'class',
  content: ['index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  safelist: [...SEVERITIES.map((severity) => `bg-${severity}`)],
  theme: {
    extend: {
      colors: {
        white: 'var(--white)',
        black: 'var(--black)',
        purewhite: 'var(--purewhite)',
        pureblack: 'var(--pureblack)',
        ...SEVERITIES.map((severity) => ({
          [severity]: `var(--${severity}-500)`,
          [`${severity}-50`]: `var(--${severity}-50)`,
          [`${severity}-100`]: `var(--${severity}-100)`,
          [`${severity}-200`]: `var(--${severity}-200)`,
          [`${severity}-300`]: `var(--${severity}-300)`,
          [`${severity}-400`]: `var(--${severity}-400)`,
          [`${severity}-500`]: `var(--${severity}-500)`,
          [`${severity}-600`]: `var(--${severity}-600)`,
          [`${severity}-700`]: `var(--${severity}-700)`,
          [`${severity}-800`]: `var(--${severity}-800)`,
          [`${severity}-900`]: `var(--${severity}-900)`,
          [`${severity}-950`]: `var(--${severity}-950)`,
        })).reduce((t, c) => ({ ...t, ...c }), {}),
      },
    },
    fontFamily: {
      sans: ['"Poppins"', '"PoppinsVN"', 'sans-serif'],
      mono: ['monospace'],
      icon: ['primeicons'],
    },
  },
};
