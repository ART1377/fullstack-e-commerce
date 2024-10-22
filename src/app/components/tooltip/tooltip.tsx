"use client";

import React, { ReactNode, useState } from "react";

type Props = {
  content: string;
  position?: "top" | "bottom" | "left" | "right"; // Optional position prop
  children: ReactNode; // Children will be the component that the tooltip wraps around
  color?:
    | "primary-main"
    | "primary-dark"
    | "primary-light"
    | "dark"
    | "state-error";
};

const Tooltip = ({
  content,
  position = "top",
  children,
  color = "primary-main",
}: Props) => {
  const [isVisible, setIsVisible] = useState(false);

  const tooltipPositionClasses = () => {
    switch (position) {
      case "top":
        return "bottom-full left-1/2 transform -translate-x-1/2 mb-2";
      case "bottom":
        return "top-full left-1/2 transform -translate-x-1/2 mt-2";
      case "left":
        return "right-full top-1/2 transform -translate-y-1/2 mr-2";
      case "right":
        return "left-full top-1/2 transform -translate-y-1/2 ml-2";
      default:
        return "";
    }
  };


  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div
          className={`absolute z-[2] px-3 py-2 text-sm text-white rounded-xl shadow-lg w-max bg-${color} ${tooltipPositionClasses()}`}
        >
          {content}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
