const round = num =>
  num
    .toFixed(7)
    .replace(/(\.[0-9]+?)0+$/, "$1")
    .replace(/\.0$/, "");
const rem = px => `${round(px / 16)}rem`;
const em = (px, base) => `${round(px / base)}em`;

// comment
function foo(arg) {
  console.log(`hello ${arg}`);
}

module.exports = {
  purge: ["./src/**/*.html.ejs", "./build/**/*.html"],
  darkMode: "media", // false, 'media' or 'class'
  theme: {
    fontFamily: {
      mono: [
        "triplicate",
        "Menlo",
        "ui-monospace",
        "SFMono-Regular",
        "Monaco",
        "Consolas",
        "Liberation Mono",
        "Courier New",
        "monospace",
      ],
      "mono-caps": [
        "triplicate-caps",
        "triplicate",
        "Menlo",
        "ui-monospace",
        "SFMono-Regular",
        "Monaco",
        "Consolas",
        "Liberation Mono",
        "Courier New",
        "monospace",
      ],
    },
    extend: {
      screens: {
        "dark-mode": { raw: "(prefers-color-scheme: dark)" },
      },
      typography: theme => ({
        DEFAULT: {
          css: {
            "font-family": "triplicate",
            color: theme("colors.black"),
            a: {
              color: theme("colors.red.700"),
              "&:hover": {
                color: theme("colors.red.600"),
              },
              "&.anchor": {
                color: theme("colors.gray.100"),
                textDecoration: "none",
                marginLeft: rem(2),
                "&:hover": {
                  color: theme("colors.gray.300"),
                },
              },
            },
            h1: {
              "font-family": "triplicate-caps",
            },
            h2: {
              "font-family": "triplicate-caps",
            },
            h3: {
              "font-family": "triplicate-caps",
            },
            h4: {
              "font-family": "triplicate-caps",
            },
            h5: {
              "font-family": "triplicate-caps",
            },
            h6: {
              "font-family": "triplicate-caps",
            },
            blockquote: {
              color: theme("colors.gray.900"),
              borderLeftWidth: "0.25rem",
              borderLeftColor: theme("colors.red.700"),
              "border-bottom-left-radius": "9px 113px",
              "border-top-left-radius": "5px",
            },
            hr: {
              borderColor: theme("colors.red.700"),
              borderTopWidth: 2,
              "border-top-right-radius": "225px 5px",
              height: 20,
            },
            "ol > li::before": {
              content: "counter(list-counter)",
              color: theme("colors.red.700"),
              "line-height": "normal",
              borderColor: theme("colors.red.700"),
              borderRadius: "255px 15px 225px 15px/15px 225px 15px 255px",
              borderWidth: 2,
              padding: "2px 3px",
              top: "0.1em",
            },
            "ul > li::before": {
              backgroundColor: theme("colors.red.700"),
              // borderRadius: "50%",
              width: "0.75em !important",
              height: "0.25em !important",
              top: "0.8em !important",
              "border-radius": "initial",
              "border-bottom-right-radius": 7,
              "border-top-left-radius": 7,
            },
            "li:nth-child(5n+0)::before": {
              transform: "rotate(3deg)",
            },
            "li:nth-child(5n+1)::before": {
              transform: "rotate(-2deg)",
            },
            "li:nth-child(5n+2)::before": {
              transform: "rotate(2deg)",
            },
            "li:nth-child(5n+3)::before": {
              transform: "rotate(-3deg)",
            },
            "li:nth-child(5n+4)::before": {
              transform: "rotate(1deg)",
            },
            img: {
              borderRadius: "0.5rem",
            },
          },
        },
        dark: {
          css: {
            color: theme("colors.gray.300"),
            a: {
              color: theme("colors.red.600"),
              "&:hover": {
                color: theme("colors.red.500"),
              },
              // "&.anchor": {
              //   color: theme("colors.gray.800"),
              //   "&:hover": {
              //     color: theme("colors.gray.700"),
              //   },
              // },
            },
            blockquote: {
              color: theme("colors.gray.300"),
            },
            h1: {
              color: theme("colors.gray.300"),
            },
            h2: {
              color: theme("colors.gray.300"),
            },
            h3: {
              color: theme("colors.gray.300"),
            },
            h4: {
              color: theme("colors.gray.300"),
            },
            h5: {
              color: theme("colors.gray.300"),
            },
            h6: {
              color: theme("colors.gray.300"),
            },

            strong: {
              color: theme("colors.gray.300"),
            },

            code: {
              color: theme("colors.gray.300"),
            },

            figcaption: {
              color: theme("colors.gray.500"),
            },
          },
        },
      }),
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography")],
};
