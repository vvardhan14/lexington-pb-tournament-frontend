/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          pastel: {
            blue: '#A3BFFA',    // Light pastel blue
            green: '#B5E4CA',   // Soft pastel green
            purple: '#C3AED6',  // Gentle pastel purple
            pink: '#F4C7C3',    // Subtle pastel pink
            yellow: '#FDFD96',  // Pale pastel yellow
            gray: '#E2E8F0',    // Light pastel gray
            darkGray: '#A0AEC0', // Darker pastel gray for text
          },
        },
      },
    },
    plugins: [],
  }