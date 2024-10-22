import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        xxs: "340px",
        xs: "480px",
        bmlg: "900px",
        blgxl: "1150px",
      },
      colors: {
        dark: "var(--dark)",
        light: "var(--light)",
        customGray: {
          100: "var(--custom-gray-100)",
          200: "var(--custom-gray-200)",
          300: "var(--custom-gray-300)",
          400: "var(--custom-gray-400)",
          500: "var(--custom-gray-500)",
          600: "var(--custom-gray-600)",
          700: "var(--custom-gray-700)",
          800: "var(--custom-gray-800)",
          900: "var(--custom-gray-900)",
        },
        primary: {
          dark: "var(--primary-dark)",
          light: "var(--primary-light)",
          main: "var(--primary-main)",
          100: "var(--primary-100)",
          200: "var(--primary-200)",
          300: "var(--primary-300)",
          400: "var(--primary-400)",
          500: "var(--primary-500)",
        },
        state: {
          error: {
            DEFAULT: "var(--state-error)",
            200: "var(--state-error-200)",
            300: "var(--state-error-300)",
            400: "var(--state-error-400)",
          },
          success: {
            DEFAULT: "var(--state-success)",
            200: "var(--state-success-200)",
            300: "var(--state-success-300)",
            400: "var(--state-success-400)",
          },
          warning: {
            DEFAULT: "var(--state-warning)",
            200: "var(--state-warning-200)",
            300: "var(--state-warning-300)",
            400: "var(--state-warning-400)",
          },
        },
        gradientPrimary: "var(--gradient-primary)",
      },
      fontSize: {
        h1: ["56px", { fontWeight: "700" }],
        h2: ["48px", { fontWeight: "700" }],
        h3: ["40px", { fontWeight: "700" }],
        h4: ["32px", { fontWeight: "700" }],
        h5: ["24px", { fontWeight: "500" }],
        h6: ["20px", { fontWeight: "500" }],
        bodyMain: ["16px", { fontWeight: "400" }],
        bodySmall: ["14px", { fontWeight: "400" }],
        bodyMainBold: ["16px", { fontWeight: "700" }],
        bodySmallBold: ["14px", { fontWeight: "700" }],
        captionMain: ["12px", { fontWeight: "300" }],
        captionSmall: ["10px", { fontWeight: "300" }],
        buttonMain: ["16px", { fontWeight: "500" }],
        buttonSmall: ["14px", { fontWeight: "500" }],
      },
    },
  },
  plugins: [],
};
export default config;
