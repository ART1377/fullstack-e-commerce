import React from "react";

type Props = {
  styles?: string;
  size?: number;
};

const CheckIcon = ({ styles, size = 24 }: Props) => {
  return (
    <svg
      className={styles}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_267_2687)">
        <path
          d="M8.99999 16.2L4.79999 12L3.39999 13.4L8.99999 19L21 6.99998L19.6 5.59998L8.99999 16.2Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="clip0_267_2687">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default CheckIcon;
