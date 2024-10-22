import React from "react";

type Props = {
  styles?: string;
  size?: number;
};

const DeleteIcon = ({ styles , size = 24 }: Props) => {
  return (
    <svg
      className={styles}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_262_2071)">
        <g clipPath="url(#clip1_262_2071)">
          <path
            d="M6 19C6 20.1 6.9 21 8 21H16C17.1 21 18 20.1 18 19V7H6V19ZM8 9H16V19H8V9ZM15.5 4L14.5 3H9.5L8.5 4H5V6H19V4H15.5Z"
            fill="currentColor"
          />
        </g>
      </g>
      <defs>
        <clipPath id="clip0_262_2071">
          <rect width="24" height="24" fill="white" />
        </clipPath>
        <clipPath id="clip1_262_2071">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default DeleteIcon;
