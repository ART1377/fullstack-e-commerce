"use client";

import React from "react";
import ColorItem from "@/app/components/color-item/color-item";
import { Color } from "../../../../../../next-type-models";

type Props = {
  colors: Color[];
  selectedColors: string[];
  handleColorSelection: (colorName: string) => void;
};

const FilterColors = ({
  colors,
  selectedColors,
  handleColorSelection,
}: Props) => {
  return (
    <div className="rounded-xl bg-white shadow px-3 py-4 flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <p className="text-bodyMain text-dark">رنگ ها</p>
        <button
          onClick={() => handleColorSelection("")} // Clear selected colors
          className="text-state-error text-bodySmall cursor-pointer custom-transition hover:opacity-60"
        >
          حذف فیلتر
        </button>
      </div>
      <div className="flex-center flex-wrap gap-2.5 max-w-[200px] mx-auto">
        {colors.map((color: Color) => {
          const isSelected = selectedColors.includes(color.persian);
          return (
            <ColorItem
              key={color.id}
              color={color}
              isSelected={isSelected}
              handleColorSelection={handleColorSelection}
            />
          );
        })}
      </div>
    </div>
  );
};

export default FilterColors;
