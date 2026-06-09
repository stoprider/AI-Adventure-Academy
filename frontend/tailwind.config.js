/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        nebula: {
          50: "#fff8ed",
          100: "#ffefcf",
          500: "#ff9f43",
          700: "#ff6b35"
        },
        aqua: {
          300: "#67e8f9",
          500: "#0ea5e9"
        }
      },
      fontFamily: {
        display: ["Trebuchet MS", "Verdana", "sans-serif"],
        body: ["Segoe UI", "Tahoma", "sans-serif"]
      },
      keyframes: {
        floaty: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" }
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 0 rgba(14,165,233,0.2)" },
          "50%": { boxShadow: "0 0 24px rgba(14,165,233,0.45)" }
        },
        slideUpFade: {
          "0%": { opacity: "0", transform: "translateY(18px) scale(0.96)" },
          "100%": { opacity: "1", transform: "translateY(0) scale(1)" }
        },
        pulseRing: {
          "0%": { boxShadow: "0 0 0 0 rgba(103,232,249,0.34)" },
          "100%": { boxShadow: "0 0 0 16px rgba(103,232,249,0)" }
        }
      },
      animation: {
        floaty: "floaty 4s ease-in-out infinite",
        pulseGlow: "pulseGlow 2.4s ease-in-out infinite",
        slideUpFade: "slideUpFade 220ms ease-out both",
        pulseRing: "pulseRing 900ms ease-out 1"
      }
    }
  },
  plugins: []
};
