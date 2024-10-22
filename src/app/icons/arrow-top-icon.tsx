import React from "react";

type Props = {
  styles?: string;
  size?: number;
};

const ArrowTopIcon = ({ styles = "text-dark", size = 24 }: Props) => {
  return (
    <div className={styles}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_72_534)">
          <path
            d="M7.41 15.41L12 10.83L16.59 15.41L18 14L12 8L6 14L7.41 15.41Z"
            fill="currentColor"
          />
        </g>
        <defs>
          <clipPath id="clip0_72_534">
            <rect width="24" height="24" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
};

export default ArrowTopIcon;
