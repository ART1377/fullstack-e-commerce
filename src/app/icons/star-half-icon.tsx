import React from "react";

type Props = {
  styles?: string;
  size?: number;
};

const StarHalfIcon = ({ styles , size = 24 }: Props) => {
  return (
      <svg
        className={styles}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_321_3232)">
          <g clipPath="url(#clip1_321_3232)">
            <path
              d="M22.3261 10.6745C22.9678 10.0882 22.6077 9.01886 21.742 8.94029L15.9806 8.41733C15.607 8.38342 15.2838 8.14329 15.1435 7.79541L12.9282 2.30163C12.5915 1.46671 11.4093 1.46702 11.0731 2.30212L8.85676 7.80666C8.71639 8.15528 8.39241 8.39577 8.01808 8.42919L2.26558 8.94292C1.39872 9.02034 1.03765 10.0914 1.68073 10.6779L6.12427 14.7299C6.38887 14.9712 6.50426 15.3356 6.42677 15.6852L5.10543 21.6473C4.9128 22.5165 5.86656 23.1852 6.618 22.7078L11.4638 19.6291C11.7911 19.4212 12.209 19.4212 12.5363 19.6291L17.3858 22.7101C18.1367 23.1872 19.09 22.5198 18.8986 21.6509L17.5843 15.6839C17.5074 15.335 17.6226 14.9715 17.8864 14.7305L22.3261 10.6745ZM12.463 17.221C12.1746 17.0375 12 16.7193 12 16.3775V10.0973C12 9.05029 13.4443 8.77079 13.835 9.74223C13.9682 10.0736 14.2758 10.3025 14.6315 10.335L17.0511 10.556C17.9165 10.635 18.2762 11.7043 17.6344 12.2903L15.7514 14.0098C15.487 14.2512 15.3719 14.6154 15.4494 14.9649L16.001 17.4497C16.194 18.3194 15.2392 18.9884 14.4877 18.51L12.463 17.221Z"
              fill="currentColor"
            />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_321_3232">
            <rect width="24" height="24" fill="white" />
          </clipPath>
          <clipPath id="clip1_321_3232">
            <rect width="24" height="24" fill="white" />
          </clipPath>
        </defs>
      </svg>
  );
};

export default StarHalfIcon;
