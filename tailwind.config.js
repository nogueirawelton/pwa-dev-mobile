/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      keyframes: {
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
        "float-right": "float-right .3s forwards",
      },
      minHeight: {
        "home-content": "calc(100vh - 5rem - 1px)",
      },
    },
  },
  plugins: [],
};
