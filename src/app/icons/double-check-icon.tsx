import React from "react";

type Props = {
  styles?: string;
  size?: number;
};

const DoubleCheckIcon = ({ styles, size = 24 }: Props) => {
  return (
    <svg
      className={styles}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_577_11243)">
        <path
          d="M18 7L16.59 5.59L10.25 11.93L11.66 13.34L18 7ZM22.24 5.59L11.66 16.17L7.48 12L6.07 13.41L11.66 19L23.66 7L22.24 5.59ZM0.410004 13.41L6 19L7.41 17.59L1.83 12L0.410004 13.41Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="clip0_577_11243">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default DoubleCheckIcon;