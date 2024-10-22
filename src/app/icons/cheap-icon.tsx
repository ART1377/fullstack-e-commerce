import React from "react";

type Props = {
  styles?: string;
  size?: number;
};

const CheapIcon = ({ styles = "text-dark", size = 24 }: Props) => {
  return (
    <div className={styles}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_250_3009)">
          <g clipPath="url(#clip1_250_3009)">
            <path
              d="M16 13H13V3H11V13H8L12 17L16 13ZM4 19V21H20V19H4Z"
              fill="currentColor"
            />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_250_3009">
            <rect width="24" height="24" fill="white" />
          </clipPath>
          <clipPath id="clip1_250_3009">
            <rect width="24" height="24" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
};

export default CheapIcon;
