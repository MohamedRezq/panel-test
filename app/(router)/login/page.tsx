"use client";
import { setCookie } from "nookies";
import React, { useState } from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
// import { signIn } from "next-auth/react";
import Loader from "@/app/components/common/Loader";
import Image from "next/image";
import logo from "@/public/images/panda-logo.png";
import loginBanner from "@/public/images/login-banner.jpg";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { login } from "@/lib/auth/login";
import { ACCESS_TOKEN_LIFETIME, REFRESH_TOKEN_LIFETIME } from "@/config";

const LoginPage = (props: {
  searchParams?: Record<"callbackUrl" | "error", string>;
}) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>("");
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  const handleFormSubmit = async (e: any) => {
    setLoading(true);
    setError("");
    e.preventDefault();

    const username = e?.currentTarget?.elements["username"]?.value;
    const password = e?.currentTarget?.elements["password"]?.value;

    const res = await login(username, password);

    setLoading(false);

    //--> Check for auth keys for returned user
    if (res?.key) {
      // Set
      setCookie(null, "panda_console_session", JSON.stringify(res), {
        maxAge: REFRESH_TOKEN_LIFETIME, // Refresh token lifetime
        // path: "/",
      });
      setCookie(null, "panda_console_access_token", res.key.auth_key, {
        maxAge: ACCESS_TOKEN_LIFETIME, // Access token lifetime
        // path: "/",
      });
      setCookie(null, "panda_console_refresh_token", res.key.refresh_key, {
        maxAge: REFRESH_TOKEN_LIFETIME, // Refresh token lifetime
        // path: "/",
      });
      router.push(
        props.searchParams?.callbackUrl ?? `${window.location.origin}/dashboard`
      );
    } else {
      setError(res);
    }
  };

  return (
    <Container
      maxWidth="md"
      sx={{
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        display="flex"
        flexDirection={{ xs: "column", md: "row" }}
        alignContent="center"
        justifyContent="center"
        gap={1}
        bgcolor="white"
        paddingX={4}
        paddingY={{ xs: 2, md: 3, lg: 5 }}
        borderRadius={5}
        className="login-section"
      >
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          gap={2}
          sx={{ position: "relative" }}
        >
          <Box alignSelf={{ xs: "flex-end", md: "flex-start" }}>
            <Image
              style={{ width: "auto", height: "40px", alignSelf: "self-start" }}
              src={logo}
              alt="Panda"
            />
          </Box>
          <Box display={{ xs: "none", md: "block" }}>
            <Image
              style={{ width: "100%", height: "auto" }}
              src={loginBanner}
              alt="Login"
            />
          </Box>
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          gap={1}
          className="login-section-form-container"
        >
          <Typography
            fontSize={{ xs: "18pt", sm: "20pt", lg: "24pt" }}
            fontWeight="bold"
            sx={{ overflowY: "hidden" }}
          >
            Welcome Back!
          </Typography>
          <Typography color="textSecondary" mb={3}>
            Login to continue
          </Typography>
          {loading ? (
            <Box width={"90%"}>
              <Loader />
            </Box>
          ) : (
            <form onSubmit={handleFormSubmit}>
              <FormControl required fullWidth variant="outlined">
                <InputLabel htmlFor="username">Email</InputLabel>
                <OutlinedInput
                  id="username"
                  fullWidth
                  required
                  size="small"
                  sx={{ marginBottom: "10px", borderRadius: "5px", p: "3px" }}
                  type="text"
                  label="Email"
                />
              </FormControl>
              <FormControl required fullWidth variant="outlined">
                <InputLabel htmlFor="password">Password</InputLabel>
                <OutlinedInput
                  id="password"
                  fullWidth
                  required
                  size="small"
                  sx={{ marginBottom: "10px", borderRadius: "5px", p: "3px" }}
                  type={showPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                        sx={{ marginRight: "10px" }}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>
              {error && (
                <Typography
                  variant="body2"
                  color="error"
                  className="login-error"
                >
                  {JSON.stringify(error)}
                </Typography>
              )}
              <Button
                sx={{
                  marginTop: "10px",
                  borderRadius: "10px",
                  paddingY: "7px",
                  marginX: "3px",
                  fontSize: "12pt",
                }}
                variant="contained"
                color="success"
                type="submit"
                fullWidth
              >
                Login
              </Button>
            </form>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default LoginPage;
