import React from "react";
import { ClipLoader } from "react-spinners";

type Props = {
  size?: number;
  fullPage?: boolean;
  color?: string;
};

const Spinner = ({ fullPage = false, size = 50, color = "#6e24a8" }: Props) => {
  return (
    <>
      {fullPage ? (
        <div className="flex-center fixed top-0 bottom-0 left-0 right-0 w-screen h-screen z-50 bg-white bg-opacity-90 backdrop-blur-md">
          <ClipLoader color={color} size={size} />
        </div>
      ) : (
        <div className="m-auto flex-center w-full h-full">
          <ClipLoader color={color} size={size} />
        </div>
      )}
    </>
  );
};

export default Spinner;
