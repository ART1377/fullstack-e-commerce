import React from "react";

type Props = {
  styles?: string;
  size?: number;
};

const ReplyIcon = ({ styles, size = 24 }: Props) => {
  return (
    <svg
      className={styles}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_1183_42)">
        <path
          d="M2 10C2 10 13 10 16 10C24 10 24 21 16 21M2 10L9 3M2 10L9 17"
          stroke="#252525"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_1183_42">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default ReplyIcon;
