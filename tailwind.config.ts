/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}', // Note the addition of the `app` directory.
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
 
    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#F5F5F5",
          foreground: "#F5F5F5",
        },
        secondary: {
          DEFAULT: "#0D096D",
          foreground: "#0D096D",
        },
        secondaryTwo: {
          DEFAULT: "#023e8a",
          foreground: "#023e8a",
        },
        secondaryThree:{
          DEFAULT: "#f8f9fa",
          foreground: "#f8f9fa",
        },
        destructive: {
          DEFAULT: "#e63946",
          foreground: "#e63946",
        },
        white: {
          DEFAULT: "#edf2f4",
          foreground: "#edf2f4",
        },
        whiteTwo: {
          DEFAULT: "#edf2f4",
          foreground: "#edf2f4",
        },
        gray:{
          DEFAULT: "#adb5bd",
          foreground: "#adb5bd",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      fontFamily: {
        horus: ["Horus", "sans-serif"],
      },
    },
  },
  plugins: [],
}