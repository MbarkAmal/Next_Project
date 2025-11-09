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
        premium: {
          navy: "#1E293B",     // Background / headers
          gold: "#D4AF37",     // Accents / buttons
          ivory: "#FAF9F6",    // Main background
          charcoal: "#374151", // Text / secondary
          wine: "#7C2D12",     // Highlights / offers
        },
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
