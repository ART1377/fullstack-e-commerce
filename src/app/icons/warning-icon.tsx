import React from "react";

type Props = {
  styles?: string;
  size?: number;
};

const WarningIcon = ({ styles = "text-dark", size = 24 }: Props) => {
  return (
    <div className={styles}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_565_17164)">
          <path
            d="M1 21H23L12 2L1 21ZM13 18H11V16H13V18ZM13 14H11V10H13V14Z"
            fill="currentColor"
          />
        </g>
        <defs>
          <clipPath id="clip0_565_17164">
            <rect width="24" height="24" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
};

export default WarningIcon;
