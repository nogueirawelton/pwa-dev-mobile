/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      minHeight: {
        "home-content": "calc(100vh - 5rem - 1px)",
      },
    },
  },
  plugins: [],
};
