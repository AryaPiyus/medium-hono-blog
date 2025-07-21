// medium-blog-test/tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html", // <--- Make sure this is present and correct for Vite
    "./src/**/*.{js,ts,jsx,tsx}", // <--- Adjust if your files are .js/.jsx
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};