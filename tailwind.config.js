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
        boreal: {
          DEFAULT: "#284B55",
          80: "rgba(40, 75, 85, 0.8)",
          60: "rgba(40, 75, 85, 0.6)",
          40: "rgba(40, 75, 85, 0.4)",
          20: "rgba(40, 75, 85, 0.2)",
        },
        pannonian: {
          DEFAULT: "#86884C",
          80: "rgba(134, 136, 76, 0.8)",
          60: "rgba(134, 136, 76, 0.6)",
          40: "rgba(134, 136, 76, 0.4)",
          20: "rgba(134, 136, 76, 0.2)",
        },
        atlantic: {
          DEFAULT: "#2E8479",
          80: "rgba(46, 132, 121, 0.8)",
          60: "rgba(46, 132, 121, 0.6)",
          40: "rgba(46, 132, 121, 0.4)",
          20: "rgba(46, 132, 121, 0.2)",
        },
        mediterranean: {
          DEFAULT: "#EE9C39",
          80: "rgba(238, 156, 57, 0.8)",
          60: "rgba(238, 156, 57, 0.6)",
          40: "rgba(238, 156, 57, 0.4)",
          20: "rgba(238, 156, 57, 0.2)",
        },
        continental: {
          DEFAULT: "#B7543D",
          80: "rgba(183, 84, 61, 0.8)",
          60: "rgba(183, 84, 61, 0.6)",
          40: "rgba(183, 84, 61, 0.4)",
          20: "rgba(183, 84, 61, 0.2)",
        },
        blackSea: {
          DEFAULT: "#5C81B5",
          80: "rgba(92, 129, 181, 0.8)",
          60: "rgba(92, 129, 181, 0.6)",
          40: "rgba(92, 129, 181, 0.4)",
          20: "rgba(92, 129, 181, 0.2)",
        },
        alpine: {
          DEFAULT: "#775786",
          80: "rgba(119, 87, 134, 0.8)",
          60: "rgba(119, 87, 134, 0.6)",
          40: "rgba(119, 87, 134, 0.4)",
          20: "rgba(119, 87, 134, 0.2)",
        },
        anatolian: {
          DEFAULT: "#A02B16",
          80: "rgba(160, 43, 22, 0.8)",
          60: "rgba(160, 43, 22, 0.6)",
          40: "rgba(160, 43, 22, 0.4)",
          20: "rgba(160, 43, 22, 0.2)",
        },
      },
      backgroundImage: {
        'pattern-bg': "url('/pattern.svg')",
      },
      fontFamily: {
        serif: ['Merriweather', 'serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};