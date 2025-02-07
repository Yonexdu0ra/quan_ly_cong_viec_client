import withMT from "@material-tailwind/react/utils/withMT";

export default withMT({
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    colors: {
      primary: {
        50: "#ecf4ff",
        100: "#ddeaff",
        200: "#c2d8ff",
        300: "#9dbeff",
        400: "#7697ff",
        500: "#4d6bfe",
        600: "#3748f4",
        700: "#2b38d7",
        800: "#2530ae",
        900: "#263189",
        950: "#171c4f",
      },
      secondary: {
        50: "#f9f9f9",
        100: "#ececec",
        200: "#e3e3e3",
        300: "#cdcdcd",
        400: "#b4b4b4",
        500: "#9b9b9b",
        600: "#676767",
        700: "#424242",
        750: "#2f2f2f",
        800: "#212121",
        900: "#171717",
        950: "#0d0d0d",
      },
      "text-secondary": "#9b9b9b",
      bg: "#fff",
      error: {
        500: "#ef4444",
        700: "#b91c1c",
      },
      "brand-purple": "#ab68ff",
      warning: {
        900: "#927201",
      },
    },
    extend: {
      keyframes: {
        "show-toast": {
          "0%, 50%": { opacity: 0, transform: "translateX(10%)" },
          "100%": { opacity: 1, transform: "translateX(0)" },
        },
      },
      animation: {
        "show-toast": "show-toast 0.5s ease-in-out",
      },
      fontFamily: {
        mono: [
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "Consolas",
          "Liberation Mono",
          "Courier New",
          "monospace",
        ],
      },
    },
  },
  plugins: [
    function ({ addBase }) {
      addBase({
        ":root": {
          "--header-height": "64px",
          "--footer-height": "30px",
          "--sidebar-width": "300px",
        },
      });
    },
  ],
});
