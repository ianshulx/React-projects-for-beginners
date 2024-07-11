/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brightColor: "#8D5CF6",
        backgroundColor: "#FFF",
        textColor: "#9699A6",
      },
    },
  },
  plugins: [],
};
