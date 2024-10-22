import React from "react";
import { SizeCategory } from "../../../../next-type-d";

type Props = {
  size: string;
  isSelected: boolean;
  handleSizeSelection: (size: string) => void;
  isInProductDetailPage?: boolean;
};

const SizeItem = ({
  size,
  isSelected,
  handleSizeSelection,
  isInProductDetailPage,
}: Props) => {
  return (
    <div
      key={size}
      onClick={() => handleSizeSelection(size)}
      className={`flex-center rounded-lg size-8 cursor-pointer custom-transition ${
        isSelected
          ? "bg-primary-300 text-primary-main hover:bg-primary-400"
          : isInProductDetailPage
          ? "bg-customGray-200 text-dark hover:bg-customGray-300"
          : "bg-light text-dark hover:bg-customGray-300"
      }`}
    >
      {size}
    </div>
  );
};

export default SizeItem;
