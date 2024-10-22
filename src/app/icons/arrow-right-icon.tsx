import React from "react";

type Props = {
  styles?: string;
  size?: number;
};

const ArrowRightIcon = ({ styles, size = 24 }: Props) => {
  return (
    <svg
      className={styles}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_72_533)">
        <path
          d="M8.58997 16.59L13.17 12L8.58997 7.41L9.99997 6L16 12L9.99997 18L8.58997 16.59Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="clip0_72_533">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default ArrowRightIcon;
