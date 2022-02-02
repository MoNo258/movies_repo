import type { Theme } from "theme-ui";

export const theme: Theme = {
  fonts: {
    body: "system-ui, sans-serif",
    heading: '"Avenir Next", sans-serif',
    monospace: "Menlo, monospace",
  },
  colors: {
    text: "#000",
    background: "#fff",
    primary: "#2185d0",
    secondary: "#c600d4",
  },
  buttons: {
    primary: {
      cursor: "pointer",
    },
    secondary: {
      fontWeight: "bold",
      color: "white",
      bg: "secondary",
      "&:hover": {
        bg: "dark",
        cursor: "pointer",
      },
    },
  },
  cards: {
    primary: {
      padding: 2,
      borderRadius: 4,
      boxShadow: "0 0 4px 1px rgba(0, 0, 0, 0.5)",
    },
  },
};
