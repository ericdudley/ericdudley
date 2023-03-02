// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  corePlugins: {
    preflight: false, // disable Tailwind's reset
  },
  content: ["./src/**/*.{js,jsx,ts,tsx}", "../docs/**/*.mdx"], // my markdown stuff is in ../docs, not /src
  darkMode: ["class", '[data-theme="dark"]'], // hooks into docusaurus' dark mode settigns
  theme: {
    extend: {
      keyframes: {
        fadein: {
          "0%": { opacity: 0, filter: "blur(5px)", transform: "translateY(10px)" },
          "100%": { opacity: 1, filter: "blur(0)", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-in": "fadein 1.5s ease-in-out",
      },
    },
  },
  plugins: [],
};
