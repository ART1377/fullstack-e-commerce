"use client";

import React from "react";
import SizeItem from "@/app/components/size-item/size-item";
import { SizeCategory } from "../../../../../../next-type-models";

type Props = {
  sizes: SizeCategory[];
  selectedSizeCategory: string;
  selectedSizes: string[];
  handleSizeSelection: (size: string) => void;
};

const FilterSizes = ({
  sizes,
  selectedSizeCategory,
  selectedSizes,
  handleSizeSelection,
}: Props) => {
  const sizeItems =
    sizes.find((size) => size.persian === selectedSizeCategory)?.sizes || [];

  return (
    <div className="rounded-xl bg-white shadow px-3 py-4 flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <p className="text-bodyMain text-dark">سایز ها</p>
        <button
          onClick={() => handleSizeSelection("")} // Clear all selected sizes
          className="text-state-error text-bodySmall cursor-pointer custom-transition hover:opacity-60"
        >
          حذف فیلتر
        </button>
      </div>
      {selectedSizeCategory ? (
        <div className="flex flex-col gap-3 w-full max-w-[200px] mx-auto">
          {/* Tabs */}
          <div className="w-full border-b border-customGray-200 pb-2 text-center">
            <small className="w-fit bg-primary-200 rounded-lg py-1 px-2 text-bodySmall text-primary-main">
              {selectedSizeCategory}
            </small>
          </div>
          {/* Size items */}
          <div className="flex-center flex-wrap gap-2.5">
            {sizeItems.map((size: string) => {
              const isSelected = selectedSizes.includes(size);
              return (
                <SizeItem
                  key={size}
                  isSelected={isSelected}
                  handleSizeSelection={handleSizeSelection}
                  size={size}
                />
              );
            })}
          </div>
        </div>
      ) : (
        <p className="text-bodyMain text-state-error py-2 px-3 rounded-lg bg-state-error-200">
          ابتدا دسته بندی را انتخاب کنید.
        </p>
      )}
    </div>
  );
};

export default FilterSizes;
