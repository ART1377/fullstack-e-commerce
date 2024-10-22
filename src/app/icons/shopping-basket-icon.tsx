import React from "react";

type Props = {
  styles?: string;
  size?: number;
};

const ShoppingBasketIcon = ({ styles = "text-dark", size = 24 }: Props) => {
  return (
    <div className={styles}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_577_11234)">
          <path
            d="M17.21 9L12.83 2.44C12.64 2.16 12.32 2.02 12 2.02C11.68 2.02 11.36 2.16 11.17 2.45L6.79 9H2C1.45 9 1 9.45 1 10C1 10.09 1.01 10.18 1.04 10.27L3.58 19.54C3.81 20.38 4.58 21 5.5 21H18.5C19.42 21 20.19 20.38 20.43 19.54L22.97 10.27L23 10C23 9.45 22.55 9 22 9H17.21ZM9 9L12 4.6L15 9H9ZM12 17C10.9 17 10 16.1 10 15C10 13.9 10.9 13 12 13C13.1 13 14 13.9 14 15C14 16.1 13.1 17 12 17Z"
            fill="currentColor"
          />
        </g>
        <defs>
          <clipPath id="clip0_577_11234">
            <rect width="24" height="24" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
};

export default ShoppingBasketIcon;
