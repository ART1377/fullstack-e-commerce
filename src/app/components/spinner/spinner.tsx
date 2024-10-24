import React from "react";
import { ClipLoader } from "react-spinners";

type Props = {
  size?: number;
  fullPage?: boolean;
  color?:
    | "primary-main"
    | "primary-light"
    | "light"
    | "dark"
    | "error"
    | "white";
};

const Spinner = ({
  fullPage = false,
  size = 50,
  color = "primary-main",
}: Props) => {
  const colorHex =
    color === "primary-main"
      ? "#6e24a8"
      : color === "dark"
      ? "#252525"
      : color === "light"
      ? "#f2f2f2"
      : color === "white"
      ? "#fff"
      : color === "primary-light"
      ? "#b96bf3"
      : color === "error"
      ? "#ff354d"
      : "#6e24a8";

  return (
    <>
      {fullPage ? (
        <div className="flex-center fixed top-0 bottom-0 left-0 right-0 w-screen h-screen z-50 bg-white bg-opacity-90 backdrop-blur-md">
          <ClipLoader color={colorHex} size={size} />
        </div>
      ) : (
        <div className="m-auto flex-center w-full h-full">
          <ClipLoader color={colorHex} size={size} />
        </div>
      )}
    </>
  );
};

export default Spinner;
