import React from "react";

type Props = {
  styles?: string;
  size?: number;
};

const HomeIcon = ({ styles, size = 24 }: Props) => {
  return (
    <svg
      className={styles}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17 21H7C4.79086 21 3 19.2091 3 17V10.7076C3 9.30887 3.73061 8.01175 4.92679 7.28679L9.92679 4.25649C11.2011 3.48421 12.7989 3.48421 14.0732 4.25649L19.0732 7.28679C20.2694 8.01175 21 9.30887 21 10.7076V17C21 19.2091 19.2091 21 17 21Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 17H15"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17 20.6614H7C4.79086 20.6614 3 18.8705 3 16.6614V10.369C3 8.97023 3.73061 7.67311 4.92679 6.94815L9.92679 3.91785C11.2011 3.14557 12.7989 3.14557 14.0732 3.91785L19.0732 6.94815C20.2694 7.67311 21 8.97023 21 10.369V16.6614C21 18.8705 19.2091 20.6614 17 20.6614Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default HomeIcon;
