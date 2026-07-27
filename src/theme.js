import { createTheme } from "@mui/material/styles";

// Core brand palette — a calm, professional indigo/blue paired with a warm
// coral accent. Centralizing these here means every component that reads
// `theme.palette.*` (instead of the old raw hex Constants) stays in sync.
const brand = {
  primaryMain: "#3752D9",
  primaryDark: "#1F2F73",
  primaryLight: "#7C93F2",
  secondaryMain: "#FF6F59",
  secondaryDark: "#D9503D",
  secondaryLight: "#FFA491",
  surface: "#F5F7FB",
  surfaceAlt: "#EEF1F8",
  ink: "#161B33",
  inkMuted: "#68708B",
  border: "#E1E5F0",
};

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: brand.primaryMain,
      dark: brand.primaryDark,
      light: brand.primaryLight,
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: brand.secondaryMain,
      dark: brand.secondaryDark,
      light: brand.secondaryLight,
      contrastText: "#FFFFFF",
    },
    background: {
      default: brand.surface,
      paper: "#FFFFFF",
    },
    text: {
      primary: brand.ink,
      secondary: brand.inkMuted,
    },
    divider: brand.border,
    success: { main: "#2FA972" },
    error: { main: "#E5484D" },
  },
  shape: {
    borderRadius: 14,
  },
  typography: {
    fontFamily: '"Inter", "Poppins", "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    h1: { fontWeight: 700 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 700 },
    h4: { fontWeight: 700 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
    button: { textTransform: "none", fontWeight: 600 },
  },
  shadows: [
    "none",
    "0 1px 2px rgba(22,27,51,0.06)",
    "0 2px 6px rgba(22,27,51,0.07)",
    "0 4px 10px rgba(22,27,51,0.08)",
    "0 6px 14px rgba(22,27,51,0.09)",
    "0 8px 18px rgba(22,27,51,0.10)",
    "0 10px 22px rgba(22,27,51,0.10)",
    "0 12px 26px rgba(22,27,51,0.11)",
    "0 14px 30px rgba(22,27,51,0.11)",
    "0 16px 32px rgba(22,27,51,0.12)",
    "0 16px 32px rgba(22,27,51,0.12)",
    "0 16px 32px rgba(22,27,51,0.12)",
    "0 16px 32px rgba(22,27,51,0.12)",
    "0 16px 32px rgba(22,27,51,0.12)",
    "0 16px 32px rgba(22,27,51,0.12)",
    "0 16px 32px rgba(22,27,51,0.12)",
    "0 16px 32px rgba(22,27,51,0.12)",
    "0 16px 32px rgba(22,27,51,0.12)",
    "0 16px 32px rgba(22,27,51,0.12)",
    "0 16px 32px rgba(22,27,51,0.12)",
    "0 16px 32px rgba(22,27,51,0.12)",
    "0 16px 32px rgba(22,27,51,0.12)",
    "0 16px 32px rgba(22,27,51,0.12)",
    "0 16px 32px rgba(22,27,51,0.12)",
    "0 16px 32px rgba(22,27,51,0.12)",
  ],
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarWidth: "thin",
          scrollbarColor: `${brand.border} transparent`,
        },
        "*::-webkit-scrollbar": {
          width: 8,
          height: 8,
        },
        "*::-webkit-scrollbar-thumb": {
          backgroundColor: brand.border,
          borderRadius: 8,
        },
        "*::-webkit-scrollbar-track": {
          backgroundColor: "transparent",
        },
      },
    },
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: {
          borderRadius: 10,
          paddingInline: "1.25rem",
          paddingBlock: "0.6rem",
        },
        containedPrimary: {
          "&:hover": {
            backgroundColor: brand.primaryDark,
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          transition: "background-color 150ms ease, transform 150ms ease",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        rounded: {
          borderRadius: 16,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 18,
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: "outlined",
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 10,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 600,
        },
      },
    },
    MuiTooltip: {
      defaultProps: {
        arrow: true,
      },
    },
  },
});

export { brand };
export default theme;
