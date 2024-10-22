import React from "react";

type Props = {
  styles?: string;
  size?: number;
};

const CategoryIcon = ({ styles, size = 24 }: Props) => {
  return (
    <svg
      className={styles}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_262_2498)">
        <g clipPath="url(#clip1_262_2498)">
          <path d="M12 2L6.5 11H17.5L12 2Z" fill="currentColor" />
          <path
            d="M17.5 22C19.9853 22 22 19.9853 22 17.5C22 15.0147 19.9853 13 17.5 13C15.0147 13 13 15.0147 13 17.5C13 19.9853 15.0147 22 17.5 22Z"
            fill="currentColor"
          />
          <path d="M3 13.5H11V21.5H3V13.5Z" fill="currentColor" />
        </g>
      </g>
      <defs>
        <clipPath id="clip0_262_2498">
          <rect width="24" height="24" fill="white" />
        </clipPath>
        <clipPath id="clip1_262_2498">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default CategoryIcon;
