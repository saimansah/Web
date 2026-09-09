import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./hooks/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#09090b",
        foreground: "#f4f4f5",
        obsidian: {
          950: "#050507",
          900: "#09090b",
          850: "#0f0f13",
          800: "#14141a",
          700: "#1c1c24",
          600: "#272732",
        },
        cyber: {
          cyan: "#00f3ff",
          violet: "#8b5cf6",
          purple: "#a855f7",
          amber: "#f59e0b",
          emerald: "#10b981",
          rose: "#f43f5e",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "mesh-glow": "radial-gradient(circle at 50% 0%, rgba(0, 243, 255, 0.12) 0%, rgba(139, 92, 246, 0.08) 35%, transparent 70%)",
        "card-glass": "linear-gradient(135deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.01) 100%)",
      },
      animation: {
        "pulse-glow": "pulseGlow 3s ease-in-out infinite",
        "float": "floatSlow 6s ease-in-out infinite",
        "scanline": "scanline 8s linear infinite",
      },
      keyframes: {
        pulseGlow: {
          "0%, 100%": { opacity: "0.4", transform: "scale(1)" },
          "50%": { opacity: "0.8", transform: "scale(1.03)" },
        },
        floatSlow: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        scanline: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(1000%)" },
        },
      },
      boxShadow: {
        "glow-cyan": "0 0 25px -5px rgba(0, 243, 255, 0.3)",
        "glow-violet": "0 0 25px -5px rgba(139, 92, 246, 0.3)",
        "glow-amber": "0 0 25px -5px rgba(245, 158, 11, 0.3)",
        "glass-sm": "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
      },
    },
  },
  plugins: [],
};

export default config;
