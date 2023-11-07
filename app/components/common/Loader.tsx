import Image from "next/image";
import logo from "@/public/images/panda-icon.png";
import { Box } from "@mui/material";

const Loader = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      width={"100%"}
      height={"100%"}
    >
      <div className="blink">
        <Image
          src={logo}
          alt=""
          priority
          className="h-20"
          width="70"
          height="70"
          style={{ width: "auto", height: "auto" }}
        />
      </div>
    </Box>
  );
};

export default Loader;
