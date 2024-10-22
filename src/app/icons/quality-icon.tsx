import React from "react";

type Props = {
  styles?: string;
  size?: number;
};

const QualityIcon = ({ styles = "text-dark", size = 24 }: Props) => {
  return (
    <svg
      className={styles}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_190_2113)">
        <g clipPath="url(#clip1_190_2113)">
          <path
            d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1ZM10 17L6 13L7.41 11.59L10 14.17L16.59 7.58L18 9L10 17Z"
            fill="currentColor"
          />
        </g>
      </g>
      <defs>
        <clipPath id="clip0_190_2113">
          <rect width="24" height="24" fill="white" />
        </clipPath>
        <clipPath id="clip1_190_2113">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default QualityIcon;