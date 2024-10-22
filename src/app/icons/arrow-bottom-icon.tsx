import React from "react";

type Props = {
  styles?: string;
  size?: number;
};

const ArrowBottomIcon = ({ styles , size = 24 }: Props) => {
  return (
    <svg
      className={styles}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_72_530)">
        <path
          d="M7.41 8L12 12.58L16.59 8L18 9.41L12 15.41L6 9.41L7.41 8Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="clip0_72_530">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default ArrowBottomIcon;
