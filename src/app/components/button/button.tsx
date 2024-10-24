import React from "react";

type Props = {
  styles?: string;
  size?: "small" | "large";
  outline?: boolean;
  icon?: React.ReactNode;
  color?:
    | "primary-main"
    | "primary-dark"
    | "primary-light"
    | "dark"
    | "state-error";
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "reset" | "submit";
  disabled?: boolean;
  loading?: React.ReactNode;
};

const Button = ({
  styles,
  size = "small",
  outline = false,
  icon = false,
  color = "primary-main",
  children,
  onClick,
  type = "button",
  disabled = false,
  loading,
}: Props) => {
  const sizeStyles =
    size === "small"
      ? "px-3 py-2 text-buttonSmall rounded-xl sm:px-4 sm:py-3 sm:text-base sm:rounded-2xl"
      : "px-4 py-3 text-buttonMain rounded-2xl";
  const baseColorStyles = outline
    ? `outline-2 outline-${color} text-${color} bg-transparent `
    : `bg-${color} text-light outline-2 outline-${color}`;

  const hoverStyles = outline
    ? `hover:bg-${color} hover:text-light`
    : `hover:bg-transparent hover:text-${color} hover:outline-2 hover:outline-${color}`;

  const iconStyles = icon ? "flex items-center gap-2" : "";

  const shadowStyles = `shadow-md shadow-${color}/50`;

  const disabledStyles = disabled ? `cursor-not-allowed opacity-60` : "";

  return (
    <button
      type={type}
      className={`${styles} ${sizeStyles} ${baseColorStyles} ${
        !disabled && hoverStyles
      } ${iconStyles} ${shadowStyles} ${disabledStyles} custom-transition text-center flex-center outline hover:shadow-none`}
      onClick={onClick}
      disabled={disabled}
    >
      {loading ? (
        loading
      ) : (
        <>
          <div className="-mt-1">{icon}</div>
          {children}
        </>
      )}
    </button>
  );
};

export default Button;
