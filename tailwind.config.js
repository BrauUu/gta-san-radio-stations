/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    "bg-[url(../../public/images/background1.png)]",
    "bg-[url(../../public/images/background2.png)]",
    "bg-[url(../../public/images/background3.png)]",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)"
      },
      textColor: {
        "font-color-primary": "var(--font-color-primary)",
        "font-color-secondary": "var(--font-color-secondary)"
      },
    },
  },
  plugins: [],
};
