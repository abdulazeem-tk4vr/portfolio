/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        canvas: "var(--canvas)",
        "canvas-muted": "#f7f5ef",
        "canvas-sidebar": "#ffffff",
        ink: "var(--ink)",
        "ink-muted": "var(--muted)",
        "ink-faint": "var(--faint)",
        line: "#e2e8f0",
        "accent-navy": "var(--link)",
        "accent-blue": "#2457e6",
        "accent-bright": "#3182ce",
        "accent-sky": "#60a5fa",
        "accent-wash": "#eff6ff",
        "accent-glow": "#dbeafe",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      fontSize: { xs: ["14px", "1.6"], sm: ["16px", "1.6"], base: ["18px", "1.6"] },
      maxWidth: {
        content: "1200px",
      },
      boxShadow: {
        card: "0 1px 3px rgba(26, 54, 93, 0.05), 0 1px 2px rgba(26, 54, 93, 0.03)",
        lift: "0 12px 40px rgba(37, 99, 235, 0.1), 0 4px 12px rgba(26, 54, 93, 0.06)",
        glow: "0 0 0 1px rgba(37, 99, 235, 0.12), 0 8px 32px rgba(37, 99, 235, 0.14)",
        "glow-sm": "0 0 0 1px rgba(37, 99, 235, 0.08), 0 4px 16px rgba(37, 99, 235, 0.08)",
      },
      backgroundImage: {
        "blue-mesh":
          "radial-gradient(ellipse 80% 60% at 10% 0%, rgba(219, 234, 254, 0.7), transparent 50%), radial-gradient(ellipse 60% 50% at 90% 10%, rgba(191, 219, 254, 0.45), transparent 45%), radial-gradient(ellipse 50% 40% at 50% 100%, rgba(239, 246, 255, 0.8), transparent 50%)",
        "blue-gradient": "linear-gradient(135deg, #1a365d 0%, #2563eb 50%, #3182ce 100%)",
        "blue-gradient-soft": "linear-gradient(135deg, #eff6ff 0%, #dbeafe 50%, #bfdbfe 100%)",
      },
      animation: {
        "fade-up": "fadeUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        "fade-in": "fadeIn 0.6s ease-out forwards",
        float: "float 8s ease-in-out infinite",
        shimmer: "shimmer 2.5s linear infinite",
        "cursor-blink": "cursorBlink 1s step-end infinite",
        "gradient-shift": "gradientShift 8s ease infinite",
        "slide-in-left": "slideInLeft 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "33%": { transform: "translate(12px, -16px) scale(1.04)" },
          "66%": { transform: "translate(-8px, 10px) scale(0.98)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "200% center" },
          "100%": { backgroundPosition: "-200% center" },
        },
        cursorBlink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        gradientShift: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        slideInLeft: {
          "0%": { opacity: "0", transform: "translateX(-12px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
      },
    },
  },
  plugins: [],
};
