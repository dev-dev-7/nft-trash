import { createStyles, makeStyles } from "@mui/styles";

const useStyles = makeStyles(() =>
  createStyles({
    "@global": {
      "*": {
        boxSizing: "border-box",
        margin: 0,
        padding: 0,
      },
      html: {
        "-webkit-font-smoothing": "antialiased",
        "-moz-osx-font-smoothing": "grayscale",
        height: "100%",
        width: "100%",
        fontFamily: "IBMPlexMono-Regular",
      },
      body: {
        backgroundColor: "#ffffff",
        height: "100%",
        width: "100%",
      },
      a: {
        textDecoration: "none",
        color: "inherit",
      },
      "#root": {
        height: "100%",
        width: "100%",
      },

      // Mui Drop-Zone
      ".MuiDropzonePreviewList-root": {
        width: "100%",
      },
    },
  })
);

const GlobalStyles = () => {
  useStyles();
  return null;
};

export default GlobalStyles;
