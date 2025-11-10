/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // 🎨 Elegant & Premium Palette
        peach: '#FFE1D7',
        lightblue: '#84AFFB',
        deepblue: '#0259DD',
        coral: '#FF6848',
      },
      
      fontFamily: {
        display: ['"Playfair Display"', "serif"],
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
