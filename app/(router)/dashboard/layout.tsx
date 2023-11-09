"use client";
import { parseCookies, setCookie } from "nookies";
import { useEffect, useState } from "react";
import Header from "@/app/components/layout/Header";
import { Box, createTheme } from "@mui/material";
import Aside from "@/app/components/layout/Aside";
import { redirect } from "next/navigation";
import Loader from "@/app/components/common/Loader";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { refreshSession } from "@/lib/auth/session";
import { ACCESS_TOKEN_LIFETIME, REFRESH_TOKEN_LIFETIME } from "@/config";
import Footer from "@/app/components/layout/Footer";

const lightTheme = createTheme({
  palette: {
    mode: "light",
  },
});

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const [loading, setLoading] = useState(true);
  //--------------------------------------------------//
  const refreshTokens = async (refreshToken: string) => {
    const res = await refreshSession(refreshToken);
    if (res) {
      setCookie(null, "panda_console_access_token", res.auth_key, {
        maxAge: ACCESS_TOKEN_LIFETIME, // Access token lifetime
        // path: "/",
      });
      setCookie(null, "panda_console_refresh_token", res.refresh_key, {
        maxAge: REFRESH_TOKEN_LIFETIME, // Refresh token lifetime
        // path: "/",
      });
    }
    return res;
  };
  //--------------------------------------------------//
  useEffect(() => {
    setLoading(true);
    let {
      panda_console_access_token,
      panda_console_refresh_token,
      panda_console_session,
    } = parseCookies();
    //--> If no session stored in cookies
    if (!panda_console_session || !panda_console_refresh_token)
      redirect(`/login?callbackUrl=${window.location.href}`);
    //--> Check if auth_key is still valid
    if (!panda_console_access_token && panda_console_refresh_token) {
      const newKeys = refreshTokens(panda_console_refresh_token);
      if (!newKeys) redirect(`/login?callbackUrl=${window.location.href}`);
    }
    setLoading(false);
  }, []);

  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      {loading ? (
        <Loader />
      ) : (
        <main>
          <Header toggleSidebar={toggleSidebar} />
          <Box display="flex">
            {isSidebarOpen && <Aside />}
            <Box
              sx={{
                height: "100%",
                width: `${isSidebarOpen ? "80%" : "100%"}`,
              }}
            >
              {children}
            </Box>
          </Box>
          <Footer />
        </main>
      )}
    </ThemeProvider>
  );
}
