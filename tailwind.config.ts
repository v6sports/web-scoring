import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        darkTextColor: "#200E3A",
        lightTextColor: "#38419D",
        extraLightTextColor: "#3887BE",
        danger: "#FF004D",
        orange: "#FE7A36",
        jugnu: "#BED754",
      },
    },
},
  plugins: [

	],
};
export default config;
