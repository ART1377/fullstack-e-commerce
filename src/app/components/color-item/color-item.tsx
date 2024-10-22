import CheckIcon from "@/app/icons/check-icon";
import React from "react";
import { Color } from "../../../../next-type-d";

type Props = {
  color: Color;
  isSelected: boolean;
  handleColorSelection: (colorName: string) => void;
};

const ColorItem = ({ color, isSelected, handleColorSelection }: Props) => {
  return (
    <div
      onClick={() => handleColorSelection(color.persian)}
      className={`rounded-lg size-8 flex-center custom-transition hover:opacity-60 cursor-pointer ${
        color.title === "white" && "border border-customGray-300"
      }`}
      style={{
        backgroundColor: color.hex,
      }}
    >
      {isSelected && (
        <CheckIcon
          styles={color.title === "white" ? "text-dark" : "text-white"}
        />
      )}
    </div>
  );
};

export default ColorItem;
