import React from "react";
import { RotatingSquare } from "react-loader-spinner";

const RotatingSquareLoader = () => {
  return (
    <RotatingSquare
      height="100"
      width="100"
      color="#4fa94d"
      ariaLabel="rotating-square-loading"
      strokeWidth="4"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
    />
  );
};

export default RotatingSquareLoader;
