/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
      },
      fontSize: {
        h1: [
          '24px', 
          {
            '@screen sm': { fontSize: '24px' }, // sm ≥ 640px
            '@screen lg': { fontSize: '50px' }, // lg ≥ 1024px
          },
        ],
        h2: [
          '20px',
          {
            '@screen sm': { fontSize: '20px' },
            '@screen lg': { fontSize: '40px'},
          },
        ],
        h3: [
          '18px',
          {
            '@screen sm': { fontSize: '18px'},
            '@screen lg': { fontSize: '32px'},
          },
        ],
        p: [
          '14px',
          {
            '@screen sm': { fontSize: '14px'},
            '@screen lg': { fontSize: '18px'},
          },
        ],
      },
      colors: {
        'blue': '#152E52',
        'green':'#5EA4AF',
      },
    },
  },
  plugins: [],
};
