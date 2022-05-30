import { create } from "jss";
import React, { useEffect } from "react";
import { StylesProvider, jssPreset } from "@mui/styles";
import typography from "../src/assets/config/theme/typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const preset = create({
  plugins: [...jssPreset().plugins],
});

export default function Jss(props) {
  const secondaryColor = "#E35130";
  const primaryColor = "#FFFFFF";
  const black = "#000000";
  const accentBlue = "#0077BE";
  const secondaryColor_vip = "#B1A773";

  const theme = createTheme({
    components: {
      MuiButton: {
        styleOverrides: {
          contained: {
            borderRadius: "5px",
            fontFamily: "Inter-SemiBold",
            textTransform: "capitalize",
            color: primaryColor,
            fontSize: "20px",
            padding: "10px 35px",
            margin: "0% 0.5%",
            height: "48px",
            backgroundColor: secondaryColor,
            "&:hover": {
              backgroundColor: secondaryColor,
            },
          },
          outlined: {
            borderRadius: "20px",
            textTransform: "capitalize",
            borderColor: secondaryColor,
            fontSize: "20px",
            "&:hover": {
              borderColor: secondaryColor,
            },
            color: secondaryColor,
          },
          text: {
            color: "#272727",
            textTransform: "capitalize",
            fontFamily: "Inter-SemiBold",
            fontSize: "18px",
            padding: "10px 35px",
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: "14px",
            fontFamily: "Inter-Regular",
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
      MuiAppBar: {
        styleOverrides: {
          root: { border: "4px solid black", borderRadius: "10px" },
        },
      },
    },

    palette: {
      background: {
        dark: "#E2E2E3",
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
        primary: "#272727",
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
