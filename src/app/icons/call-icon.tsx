import React from "react";

type Props = {
  styles?: string;
  size?: number;
};

const CallIcon = ({ styles , size = 24 }: Props) => {
  return (
    <svg
      className={styles}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17.0985 14.2517L13.6667 14.9167C11.3486 13.7532 9.91666 12.4167 9.08333 10.3333L9.72495 6.89159L8.5121 3.66667H5.38633C4.4467 3.66667 3.70678 4.44316 3.84711 5.37224C4.19745 7.69167 5.23044 11.8971 8.25 14.9167C11.421 18.0877 15.9881 19.4637 18.5017 20.0106C19.4723 20.2218 20.3333 19.4646 20.3333 18.4713V15.4843L17.0985 14.2517Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default CallIcon;
