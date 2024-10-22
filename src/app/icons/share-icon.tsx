import React from "react";

type Props = {
  styles?: string;
  size?: number;
};

const ShareIcon = ({ styles, size = 24 }: Props) => {
  return (
    <svg
      className={styles}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_338_3460)">
        <g clipPath="url(#clip1_338_3460)">
          <path
            d="M20 16.9639C18.9867 16.9639 18.08 17.3253 17.3867 17.8916L7.88 12.8916C7.94667 12.6145 8 12.3373 8 12.0482C8 11.759 7.94667 11.4819 7.88 11.2048L17.28 6.25301C18 6.85542 18.9467 7.22892 20 7.22892C22.2133 7.22892 24 5.61446 24 3.61446C24 1.61446 22.2133 0 20 0C17.7867 0 16 1.61446 16 3.61446C16 3.90361 16.0533 4.18072 16.12 4.45783L6.72 9.40964C6 8.80723 5.05333 8.43373 4 8.43373C1.78667 8.43373 0 10.0482 0 12.0482C0 14.0482 1.78667 15.6627 4 15.6627C5.05333 15.6627 6 15.2892 6.72 14.6867L16.2133 19.6988C16.1467 19.9518 16.1067 20.2169 16.1067 20.4819C16.1067 22.4217 17.8533 24 20 24C22.1467 24 23.8933 22.4217 23.8933 20.4819C23.8933 18.5422 22.1467 16.9639 20 16.9639Z"
            fill="currentColor"
          />
        </g>
      </g>
      <defs>
        <clipPath id="clip0_338_3460">
          <rect width="24" height="24" fill="white" />
        </clipPath>
        <clipPath id="clip1_338_3460">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default ShareIcon;
