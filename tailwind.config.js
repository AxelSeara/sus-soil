module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'pattern-bg': "url('/pattern.svg')",
      },
      fontFamily: {
        serif: ['Merriweather', 'serif'],
      }
    }
  },
  plugins: [],
}