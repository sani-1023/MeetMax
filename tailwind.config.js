/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: "#2563EB", // Primary button blue (Sign Up, Meetmax circle)
          light: "#F9FAFB", // Page background
          grayText: "#6B7280", // Lighter gray for subtitles
        },
      },
      fontFamily: {
        sans: ["Roboto", "system-ui", "sans-serif"], // Match screenshot clean font
      },
      boxShadow: {
        card: "0 4px 12px rgba(0,0,0,0.08)", // softer shadow like screenshot
      },
    },
  },
  plugins: [],
};
