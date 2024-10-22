import React from "react";

type Props = {
  styles?: string;
  size?: number;
};

const MinusIcon = ({ styles = "text-dark", size = 24 }: Props) => {
  return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6 12H18"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
  );
};

export default MinusIcon;
