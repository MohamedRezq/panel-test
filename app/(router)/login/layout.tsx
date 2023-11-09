"use client";
import { Box, CssBaseline, ThemeProvider, createTheme } from "@mui/material";

const lightTheme = createTheme({
  palette: {
    mode: "light",
  },
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <Box component="main" className="login-page">
        {children}
      </Box>
    </ThemeProvider>
  );
}
