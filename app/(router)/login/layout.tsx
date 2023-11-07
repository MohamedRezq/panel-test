import { Box } from "@mui/material";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box component="main" className="login-page">
      {children}
    </Box>
  );
}
