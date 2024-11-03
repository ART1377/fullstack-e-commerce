"use client";

import { formatPrice } from "@/app/lib/format-price";
import React, { useState } from "react";

type Props = {
  minPrice: number;
  maxPrice: number;
  selectedMinPrice: number;
  selectedMaxPrice: number;
  setSelectedMinPrice: React.Dispatch<React.SetStateAction<number>>;
  setSelectedMaxPrice: React.Dispatch<React.SetStateAction<number>>;
};

const FilterPriceRange = ({
  minPrice,
  maxPrice,
  selectedMaxPrice,
  selectedMinPrice,
  setSelectedMaxPrice,
  setSelectedMinPrice,
}: Props) => {
  const handleMinPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value);
    if (value <= selectedMaxPrice) setSelectedMinPrice(value);
  };

  const handleMaxPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value);
    if (value >= selectedMinPrice) setSelectedMaxPrice(value);
  };

  const resetPriceRange = () => {
    setSelectedMinPrice(minPrice);
    setSelectedMaxPrice(maxPrice);
  };

  return (
    <div className="rounded-xl bg-white shadow px-3 py-4 flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <p className="text-bodyMain text-dark">قیمت</p>
        <button
          onClick={resetPriceRange}
          className="text-state-error text-bodySmall cursor-pointer custom-transition hover:opacity-60"
        >
          حذف فیلتر
        </button>
      </div>
      {/* price range */}
      <div className="flex flex-col gap-4">
        <div className="flex justify-between text-bodySmall text-primary-main mt-2">
          <div>
            <span>از</span>
            <span className="mx-1 border border-primary-main rounded py-0.5 px-1">
              {formatPrice(selectedMinPrice)}
            </span>
            <span>تومان</span>
          </div>
          <div>
            <span>تا</span>
            <span className="mx-1 border border-primary-main rounded py-0.5 px-1">
              {formatPrice(selectedMaxPrice)}
            </span>
            <span>تومان</span>
          </div>
        </div>
        <div className="relative flex justify-center my-2">
          {/* Min Price Slider */}
          <input
            type="range"
            min={minPrice}
            max={maxPrice}
            step={100000}
            value={selectedMinPrice}
            onChange={handleMinPriceChange}
            className="range-min absolute w-full h-1 appearance-none bg-primary-light outline-none pointer-events-auto"
            style={{
              zIndex: selectedMinPrice > selectedMaxPrice - 1 ? 2 : 1,
            }}
          />
          {/* Max Price Slider */}
          <input
            type="range"
            min={minPrice}
            max={maxPrice}
            step={100000}
            value={selectedMaxPrice}
            onChange={handleMaxPriceChange}
            className="range-max absolute w-full h-1 appearance-none bg-primary-light outline-none pointer-events-auto"
          />
        </div>

        <div className="flex justify-between text-bodySmall text-primary-main">
          <span>{formatPrice(selectedMinPrice)}</span>
          <span>{formatPrice(selectedMaxPrice)}</span>
        </div>
      </div>
    </div>
  );
};

export default FilterPriceRange;
