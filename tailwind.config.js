/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/parts/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "tatil-gradient": `linear-gradient(83.54deg, #000000 0%, #EE2127 52.6%, #EE2127 100%)`,
      },
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
      },
      colors: {
        tatil: {
          red: "#EE2127",
          green: "#58A325",
          grey: "#D9D9D9",
          lightgrey: "#FAFAFA",
          black: "#000000",
          white: "#FFFFFF",
          palette: {
            red: {
              50: "#FFE9E9",
              100: "#FFB7BA",
              200: "#FF868A",
              300: "#FF555A",
              400: "#EE2127",
              500: "#CC1016",
              600: "#AA0308",
              700: "#880004",
              800: "#660003",
              900: "#440002",
            },
            neutrals: {
              50: "#E0E0E0",
              100: "#CCCCCC",
              200: "#B8B8B8",
              300: "#A3A3A3",
              400: "#8F8F8F",
              500: "#7A7A7A",
              600: "#666666",
              700: "#525252",
              800: "#3D3D3D",
              900: "#000000",
            },
          },
        },
      },
    },
  },
  plugins: [],
};
