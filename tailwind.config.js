/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        "zinc-50": "#FAFAFA",
      },
      keyframes: {
        "zoom-in": {
          from: {
            opacity: 0,
            transform: "translateX(-50%) translateY(-50%) scale(.75)",
          },
          to: {
            opacity: 1,
            transform: "translateX(-50%) translateY(-50%) scale(1) ",
          },
        },
        "float-right": {
          from: {
            opacity: 0,
            transform: "translateX(-160px)",
          },
          to: {
            opacity: 1,
            transform: "translateX(0)",
          },
        },
      },
      animation: {
        "zoom-in": "zoom-in .3s forwards",
        "float-right": "float-right .3s forwards",
      },
      minHeight: {
        "home-content": "calc(100vh - 5rem - 1px)",
      },
    },
  },
  plugins: [],
};
