import { type Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";
import { fontFamily } from "tailwindcss/defaultTheme";
import plugin from "tailwindcss/plugin";

export default {
  darkMode: ["class"],
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      keyframes: {
        "match-card": {
          "0%": {
            boxShadow: "0 0 0 rgba(34, 197, 94, 0)",
            transform: "scale(1)",
          },
          "25%": {
            boxShadow: "0 0 12px rgba(34, 197, 94, 0.7)",
            transform: "scale(1.02)",
          },
          "50%": {
            boxShadow: "0 0 5px rgba(34, 197, 94, 0.3)",
            transform: "scale(1)",
          },
          "75%": {
            boxShadow: "0 0 10px rgba(34, 197, 94, 0.5)",
            transform: "scale(1.01)",
          },
          "100%": {
            boxShadow: "0 0 0 rgba(34, 197, 94, 0)",
            transform: "scale(1)",
          },
        },
        "error-card": {
          "0%, 100%": {
            transform: "translateX(0)",
            boxShadow: "0 0 0 rgba(239, 68, 68, 0)",
          },
          "20%": {
            transform: "translateX(-5px)",
            boxShadow: "0 0 10px rgba(239, 68, 68, 0.5)",
          },
          "40%": {
            transform: "translateX(5px)",
            boxShadow: "0 0 10px rgba(239, 68, 68, 0.5)",
          },
          "60%": {
            transform: "translateX(-5px)",
            boxShadow: "0 0 10px rgba(239, 68, 68, 0.5)",
          },
          "80%": {
            transform: "translateX(3px)",
            boxShadow: "0 0 15px rgba(239, 68, 68, 0.5)",
          },
        },
        heartbeat: {
          "0%, 20%, 50%, 80%, 100%": {
            transform: "scale(1)",
          },
          "40%": {
            transform: "scale(1.04)",
          },
          "60%": {
            transform: "scale(1.02)",
          },
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      animation: {
        "match-card": "match-card 0.65s ease-in-out",
        "error-card": "error-card 0.5s ease-in-out",
        heartbeat: "heartbeat 0.5s ease-in-out infinite",
      },
    },
  },
  plugins: [
    tailwindcssAnimate,
    // eslint-disable-next-line @typescript-eslint/unbound-method
    plugin(({ addUtilities }) => {
      addUtilities({
        ".transform-style-preserve-3d": {
          "transform-style": "preserve-3d",
        },
        ".backface-hidden": {
          "backface-visibility": "hidden",
        },
        ".perspective-1000": {
          perspective: "1000px",
        },
        ".rotate-y-180": {
          transform: "rotateY(180deg)",
        },
      });
    }),
  ],
} satisfies Config;
