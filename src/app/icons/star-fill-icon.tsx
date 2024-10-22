import React from "react";

type Props = {
  styles?: string;
  size?: number;
};

const StarFillIcon = ({ styles, size = 24 }: Props) => {
  return (
    <svg
      className={styles}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_320_3025)">
        <g clipPath="url(#clip1_320_3025)">
          <path
            d="M11.4637 19.6291C11.791 19.4212 12.209 19.4212 12.5363 19.6291L17.382 22.7078C18.1335 23.1852 19.0872 22.5165 18.8946 21.6473L17.5733 15.6852C17.4958 15.3356 17.6112 14.9712 17.8758 14.7299L22.3193 10.6779C22.9624 10.0915 22.6013 9.02035 21.7344 8.94294L15.982 8.42921C15.6076 8.39578 15.2836 8.15529 15.1433 7.80667L12.9276 2.30387C12.5913 1.46854 11.4087 1.46854 11.0724 2.30387L8.85672 7.80667C8.71636 8.1553 8.39238 8.39578 8.01805 8.42921L2.26555 8.94294C1.39869 9.02035 1.03762 10.0915 1.6807 10.6779L6.12423 14.7299C6.38884 14.9712 6.50422 15.3356 6.42674 15.6852L5.1054 21.6473C4.91277 22.5165 5.86652 23.1852 6.61796 22.7078L11.4637 19.6291Z"
            fill="currentColor"
          />
        </g>
      </g>
      <defs>
        <clipPath id="clip0_320_3025">
          <rect width="24" height="24" fill="white" />
        </clipPath>
        <clipPath id="clip1_320_3025">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default StarFillIcon;
