const SEVERITIES = ['primary', 'secondary', 'success', 'danger', 'warning', 'info'];

export default {
  darkMode: 'class',
  content: ['index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  safelist: [
    ...SEVERITIES.map((severity) => [
      `bg-${severity}`,
      `hover:bg-${severity}/10`,
      `text-${severity}`,
      `border-${severity}`,
    ]),
  ].flat(),
  theme: {
    extend: {
      colors: {
        white: 'rgb(var(--white))',
        black: 'rgb(var(--black))',
        purewhite: 'rgb(var(--purewhite))',
        pureblack: 'rgb(var(--pureblack))',
        ...SEVERITIES.map((severity) => ({
          [severity]: `rgb(var(--${severity}-500))`,
          [`${severity}-50`]: `rgb(var(--${severity}-50))`,
          [`${severity}-100`]: `rgb(var(--${severity}-100))`,
          [`${severity}-200`]: `rgb(var(--${severity}-200))`,
          [`${severity}-300`]: `rgb(var(--${severity}-300))`,
          [`${severity}-400`]: `rgb(var(--${severity}-400))`,
          [`${severity}-500`]: `rgb(var(--${severity}-500))`,
          [`${severity}-600`]: `rgb(var(--${severity}-600))`,
          [`${severity}-700`]: `rgb(var(--${severity}-700))`,
          [`${severity}-800`]: `rgb(var(--${severity}-800))`,
          [`${severity}-900`]: `rgb(var(--${severity}-900))`,
          [`${severity}-950`]: `rgb(var(--${severity}-950))`,
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
