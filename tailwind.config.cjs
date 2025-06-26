/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}',
    './public/**/*.html',
  ],
  theme: {
    extend: {
      fontFamily: {
        console: ['"Press Start 2P"', 'cursive'],
      },
    },
  },
  plugins: [],
};
