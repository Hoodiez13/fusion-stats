export const devStyle = {
  palette: {
    mode: "dark",
    background: {
      default: "#23272A",
      hover: "#333",
    },
    primary: {
      main: "#26A69A",
      dark: "#2B6863",
      light: "#62BEB5",
    },
  },
  components: {
    MuiAppBar: {
      defaultProps: {
        enableColorOnDark: true,
      },
    },
  },
};
