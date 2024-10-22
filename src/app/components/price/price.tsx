import React from "react";
import { formatPrice, calculateDiscountedPrice } from "@/app/lib/functions";

type Props = {
  price: number;
  discountPercentage: number | undefined;
};

const Price = ({ price, discountPercentage }: Props) => {
  const currentPrice = discountPercentage
    ? calculateDiscountedPrice(price, discountPercentage)
    : price;

  return (
    <div className="flex flex-col gap-0.5">
      {discountPercentage && (
        <div className="flex items-center justify-end gap-3">
          <div className="size-6 flex-center bg-primary-main text-light text-captionSmall rounded-full">
            {discountPercentage}%
          </div>
          <span className="text-captionMain text-state-error line-through">
            {formatPrice(price)}
          </span>
        </div>
      )}
      <div className="text-bodyMain text-primary-main text-end">
        {formatPrice(currentPrice)} تومان
      </div>
    </div>
  );
};

export default Price;
