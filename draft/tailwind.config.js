module.exports = {
  purge: ["./src/**/*.html"],
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
            a: {
              color: theme("colors.red.600"),
              "&:hover": {
                color: theme("colors.red.500"),
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
          },
        },
        dark: {
          css: {
            color: theme("colors.gray.300"),
            a: {
              color: theme("colors.red.400"),
              "&:hover": {
                color: theme("colors.red.300"),
              },
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
