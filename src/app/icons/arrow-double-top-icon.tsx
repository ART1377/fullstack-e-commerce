import React from "react";

type Props = {
  styles?: string;
  size?: number;
};

const ArrowDoubleTopIcon = ({ styles = "text-dark", size = 24 }: Props) => {
  return (
    <div className={styles}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_109_765)">
          <path
            d="M18 11L12 5L6 11"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M18 19L12 13L6 19"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
        <defs>
          <clipPath id="clip0_109_765">
            <rect width="24" height="24" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
};

export default ArrowDoubleTopIcon;
