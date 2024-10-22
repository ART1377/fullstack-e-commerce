import React from "react";

type Props = {
  styles?: string;
  size?: number;
};

const HeartEmptyIcon = ({ styles = "text-dark", size = 24 }: Props) => {
  return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M16.5 3C14.76 3 13.09 3.79455 12 5.05014C10.91 3.79455 9.24 3 7.5 3C4.42 3 2 5.37384 2 8.3951C2 12.103 5.4 15.1243 10.55 19.715L12 21L13.45 19.7052C18.6 15.1243 22 12.103 22 8.3951C22 5.37384 19.58 3 16.5 3ZM12.1 18.2534L12 18.3515L11.9 18.2534C7.14 14.0256 4 11.23 4 8.3951C4 6.43324 5.5 4.96185 7.5 4.96185C9.04 4.96185 10.54 5.93297 11.07 7.27684H12.94C13.46 5.93297 14.96 4.96185 16.5 4.96185C18.5 4.96185 20 6.43324 20 8.3951C20 11.23 16.86 14.0256 12.1 18.2534Z"
          fill="currentColor"
        />
      </svg>
  );
};

export default HeartEmptyIcon;
