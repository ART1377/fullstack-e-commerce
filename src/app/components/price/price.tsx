import React from "react";
import { formatPrice } from "@/app/lib/format-price";
import { calculateDiscountedPrice } from "@/app/lib/calculate-discount-price";

type Props = {
  price: number;
  discountPercentage: number | undefined;
  size?: "large" | "small";
};

const Price = ({ price, discountPercentage, size = "small" }: Props) => {
  const currentPrice = discountPercentage
    ? calculateDiscountedPrice(price, discountPercentage)
    : price;

  return (
    <>
      <div className="flex flex-col gap-0.5">
        {discountPercentage != undefined && discountPercentage > 0 && (
          <div className="flex items-center justify-end gap-2">
            <div className="size-6 flex-center bg-primary-main text-light text-captionSmall rounded-full">
              {discountPercentage}%
            </div>
            <span className="text-captionMain text-state-error line-through">
              {formatPrice(price)}
            </span>
          </div>
        )}
        <div
          className={`text-bodyMain text-primary-main text-end ${
            size === "large" && "md:text-xl"
          }`}
        >
          {formatPrice(currentPrice)} تومان
        </div>
      </div>
    </>
  );
};

export default Price;
