/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: "media",
  theme: {
    extend: {
      fontFamily: {
        display: ["Archivo", "ui-sans-serif", "system-ui", "sans-serif"],
        body: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        navy: {
          DEFAULT: "#12283A",
          2: "#1B3A52",
        },
        amber: {
          DEFAULT: "#E2A63B",
          dark: "#B9821F",
        },
        success: "#2C7A50",
        danger: "#C1443C",
      },
    },
  },
  plugins: [],
};