import React from "react";

type Props = {
  styles?: string;
  size?: number;
};

const ShopIcon = ({ styles = "text-dark", size = 24 }: Props) => {
  return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M19.2609 9.69589L20.6455 18.6959C20.8319 19.9074 19.8945 21 18.6688 21H5.33121C4.10544 21 3.16808 19.9074 3.35447 18.6959L4.73908 9.69589C4.88919 8.72022 5.72869 8 6.71583 8H17.2842C18.2713 8 19.1108 8.72022 19.2609 9.69589Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14 5C14 3.89543 13.1046 3 12 3C10.8954 3 10 3.89543 10 5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
  );
};

export default ShopIcon;
