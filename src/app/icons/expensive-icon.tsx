import React from "react";

type Props = {
  styles?: string;
  size?: number;
};

const ExpensiveIcon = ({ styles, size = 24 }: Props) => {
  return (
    <svg
      className={styles}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_250_3015)">
        <g clipPath="url(#clip1_250_3015)">
          <path
            d="M8 11H11V21H13V11H16L12 7L8 11ZM4 3V5H20V3H4Z"
            fill="currentColor"
          />
        </g>
      </g>
      <defs>
        <clipPath id="clip0_250_3015">
          <rect width="24" height="24" fill="white" />
        </clipPath>
        <clipPath id="clip1_250_3015">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default ExpensiveIcon;
