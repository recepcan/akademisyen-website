const flowbite = require("flowbite-react/tailwind");


/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      fontFamily: {
        titillium: ['"Titillium Web"', 'Helvetica', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [ flowbite.plugin(),],
}
