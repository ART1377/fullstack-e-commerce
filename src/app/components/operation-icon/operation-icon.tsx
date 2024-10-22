import React from "react";

type Props = {
  children: React.ReactNode;
  color: "primary" | "success" | "error" | "warning" | "blue";
};

const OperationIcon = ({ children, color }: Props) => {
  return (
    <div
      className={`${
        color == "primary"
          ? "border border-primary-main text-primary-main hover:bg-primary-200"
          : color == "success"
          ? "border border-state-success text-state-success hover:bg-state-success-200"
          : color == "error"
          ? "border border-state-error text-state-error hover:bg-state-error-200"
          : color == "warning"
          ? "border border-state-warning text-state-warning hover:bg-state-warning-200"
          : color == "blue"
          ? "border border-blue-600 text-blue-600 hover:bg-blue-200"
          : ""
      } rounded-full size-9 flex-center cursor-pointer custom-transition`}
    >
      {children}
    </div>
  );
};

export default OperationIcon;
