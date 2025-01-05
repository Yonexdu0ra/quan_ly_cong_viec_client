import withMT from "@material-tailwind/react/utils/withMT";

export default withMT({
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    colors: {
      primary: {
        50: "#edfff3",
        100: "#d5ffe6",
        200: "#aeffcd",
        300: "#70ffa8",
        400: "#2bfd7b",
        500: "#00f55e",
        600: "#00c045",
        700: "#009639",
        800: "#067532",
        900: "#07602b",
        950: "#003716",
      },
      secondary: "#212121",
      accent: "#171717",
      neutral: "#424242",
      layer: "#383838",
      success: "#17B978",
      warning: "#FFB020",
      error: "#F77066",
      text: "#ECECEC",
    },
    extend: {
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
          "--footer-height": "25px",
        },
      });
    },
  ],
});
