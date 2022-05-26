import { create } from "jss";
import React, { useEffect } from "react";
import { StylesProvider, jssPreset } from "@mui/styles";
import typography from "../src/assets/config/theme/typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const preset = create({
  plugins: [...jssPreset().plugins],
});

export default function Jss(props) {
  const secondaryColor = "#AF6C07";
  const primaryColor = "#933D3D";
  const black = "#000000";
  const accentBlue = "#0077BE";
  const secondaryColor_vip = "#B1A773";

  const theme = createTheme({
    components: {
      MuiButton: {
        styleOverrides: {
          contained: {
            borderRadius: "5px",
            fontFamily: "ElMessiri-Regular",
            textTransform: "capitalize",
            color: "#E2CBA6",
            fontSize: "26px",
            padding: "10px 55px",
            margin: "0% 0.5%",
            boxShadow:
              "0px 11px 29px 4px rgb(138 131 129 / 21%), inset 4px -4px 5px rgb(0 0 0 / 52%), inset -4px 5px 5px rgb(255 255 255 / 50%)",

            backgroundColor: "#933D3D",
            "&:hover": {
              // backgroundColor: primaryColor,
            },
          },
          outlined: {
            borderRadius: "20px",
            textTransform: "capitalize",
            fontFamily: "ElMessiri-Regular",
            borderColor: secondaryColor,
            fontSize: "18px",
            "&:hover": {
              borderColor: secondaryColor,
            },
            color: secondaryColor,
            padding: "10px 30px",
          },
          text: {
            color: "#E2CBA6",
            textTransform: "capitalize",
            fontFamily: "ElMessiri-Regular",
            fontSize: "18px",
          },
        },
      },

      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: "14px",
            fontFamily: "ElMessiri-Regular",
            backgroundColor: " #FFFFFF",
            color: " #000000",
            boxShadow: "0px 2px 6px 0px #13124212",
            margin: "12px",
          },
          input: {
            padding: "11.9px 14px",
            width: "32px",
          },
        },
      },
      Mui: {
        completed: {
          color: "#f9f9f9",
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            margin: "10px 0px",
          },
        },
      },
      MuiDialog: {
        styleOverrides: {
          paper: {
            borderRadius: "32px",
            width: "500px",
            padding: "2%",
            overflow: "hidden",
          },
        },
      },
    },
    palette: {
      background: {
        dark: "#E2E2E3",
        // default: "#303030",
        paper: "#ffffff",
        light: "#FFFFFE",
        black: black,
        blue: accentBlue,
        vip: secondaryColor_vip,
      },
      primary: {
        main: primaryColor,
      },
      secondary: {
        main: secondaryColor,
      },
      success: {
        main: "#C8BCFF",
      },
      warning: {
        main: "#BEFFBD",
      },
      text: {
        primary: "#E2CBA6",
      },
    },
    typography,
    overrides: {
      MuiCheckbox: {
        root: {
          color: secondaryColor,
        },
        colorPrimary: {
          checked: {
            color: secondaryColor,
          },
        },
      },
      MuiCard: {
        root: {
          backgroundColor: black,
          padding: "20px",
          borderRadius: "22px",
        },
      },
    },
  });

  return (
    <StylesProvider jss={preset}>
      <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
    </StylesProvider>
  );
}
