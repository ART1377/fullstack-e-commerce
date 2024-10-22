import React from "react";

type Props = {
  styles?: string;
  size?: number;
};

const DashboardIcon = ({ styles, size = 24 }: Props) => {
  return (
    <div>
      <svg
        className={styles}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_577_11231)">
          <path
            d="M3 13H11V3H3V13ZM3 21H11V15H3V21ZM13 21H21V11H13V21ZM13 3V9H21V3H13Z"
            fill="currentColor"
          />
        </g>
        <defs>
          <clipPath id="clip0_577_11231">
            <rect width="24" height="24" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
};

export default DashboardIcon;
