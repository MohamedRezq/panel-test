import Image from "next/image";
import logo from "@/public/images/temp.png";

const Loader = () => {
  return (
    <div className="d-flex justify-content-center align-items-center w-100 h-100">
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
    </div>
  );
};

export default Loader;
