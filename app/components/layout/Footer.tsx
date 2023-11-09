import React from "react";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import icon from "@/public/images/panda-icon.png";
import { VERSION_NUMBER } from "@/config";

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#f5f5f5",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "1rem",
        marginTop: "1rem",
      }}
    >
      <Image src={icon} alt="Logo" width={25} height={25} />
      <Typography color="grey" variant="body2" sx={{ marginLeft: "0.5rem" }}>
        &copy; {new Date().getFullYear()} Panda Console
      </Typography>
      <Typography color="grey" variant="body2" sx={{ marginLeft: "0.5rem" }}>
        Version {VERSION_NUMBER}
      </Typography>
    </Box>
  );
};

export default Footer;
