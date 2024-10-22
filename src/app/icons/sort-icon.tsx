import React from "react";

type Props = {
  styles?: string;
  size?: number;
};

const SortIcon = ({ styles = "text-dark", size = 24 }: Props) => {
  return (
    <div className={styles}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_250_1890)">
          <g clipPath="url(#clip1_250_1890)">
            <path
              d="M3 18H9V16H3V18ZM3 6V8H21V6H3ZM3 13H15V11H3V13Z"
              fill="currentColor"
            />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_250_1890">
            <rect width="24" height="24" fill="white" />
          </clipPath>
          <clipPath id="clip1_250_1890">
            <rect width="24" height="24" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
};

export default SortIcon;
