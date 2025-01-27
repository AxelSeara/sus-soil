module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brown: {
          DEFAULT: "#5e3319",
          80: "rgba(94, 49, 25, 0.8)",
          60: "rgba(94, 49, 25, 0.6)",
          40: "rgba(94, 49, 25, 0.4)",
          20: "rgba(94, 49, 25, 0.2)",
        },
        darkGreen: {
          DEFAULT: "#6EBB78",
          80: "rgba(110, 187, 120, 0.8)",
          60: "rgba(110, 187, 120, 0.6)",
          40: "rgba(110, 187, 120, 0.4)",
          20: "rgba(110, 187, 120, 0.2)",
        },
        green: {
          DEFAULT: "#89C37B",
          80: "rgba(137, 195, 123, 0.8)",
          60: "rgba(137, 195, 123, 0.6)",
          40: "rgba(137, 195, 123, 0.4)",
          20: "rgba(137, 195, 123, 0.2)",
        },
        lightGreen: {
          DEFAULT: "#B0D392",
          80: "rgba(176, 211, 146, 0.8)",
          60: "rgba(176, 211, 146, 0.6)",
          40: "rgba(176, 211, 146, 0.4)",
          20: "rgba(176, 211, 146, 0.2)",
        },
        boreal: "#284B55",
        atlantic: "#2E8479",
        continental: "#B7543D",
        alpine: "#775786",
        pannonian: "#86884C",
        mediterranean: "#EE9C39",
        blackSea: "#5C81B5",
        anatolian: "#A02B16",
      },
      backgroundImage: {
        'pattern-bg': "url('/pattern.svg')",
      },
      fontFamily: {
        serif: ['Merriweather', 'serif'],
      },
    },
  },
  plugins: [],
};