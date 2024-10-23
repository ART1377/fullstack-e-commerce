import React from "react";
import Rating from "../../rating/rating";
import ChatIcon from "@/app/icons/chat-icon";
import ShareIcon from "@/app/icons/share-icon";
import HeartEmptyIcon from "@/app/icons/heart-empty-icon";
import ColorItem from "../../color-item/color-item";
import SizeItem from "../../size-item/size-item";
import OperationIcon from "../../operation-icon/operation-icon";
import ShopIcon from "@/app/icons/shop-icon";
import Price from "../../price/price";
import Button from "../../button/button";
import AddToCartOperator from "../../add-to-cart-operator/add-to-cart-operator";
import Stock from "../../stock/stock";
import { getSizesForColor, getUniqueColors } from "@/app/lib/functions";
import { Color, Product } from "../../../../../next-type-models";

type Props = {
  product: Product;
  selectedColor: string;
  selectedSize: string;
  handleColorSelection: (color: string) => void;
  handleSizeSelection: (size: string) => void;
};

const ProductPageContentInformation = ({
  product,
  selectedColor,
  selectedSize,
  handleColorSelection,
  handleSizeSelection,
}: Props) => {
  const { stock, description, price, rating, title, discount, comments } =
    product;

  const uniqueColors = getUniqueColors(stock!);

  const sizes = getSizesForColor(stock!, selectedColor);

  const quantityOfStock = stock?.find((stock) => {
    return stock.color?.persian === selectedColor && stock.size === selectedSize;
  })?.quantity;

  const totalQuantity = stock?.reduce(
    (acc, stockItem) => acc + stockItem.quantity,
    0
  );


  return (
    <div className="w-full md:w-1/2 flex flex-col lg:justify-between">
      {/* stock */}
      <Stock quantity={totalQuantity!} />
      {/* title */}
      <h1 className="my-3 text-dark text-bodyMainBold sm:text-h6">{title}</h1>
      {/* rating - comment(count) - share / favorite buttons */}
      <div className="flex justify-between flex-wrap items-baseline gap-3 max-w-[450px]">
        {rating ? (
          <div className="flex items-center gap-1">
            <Rating rating={rating} />
            <span className="text-dark text-bodySmall mt-1.5">({rating})</span>
          </div>
        ) : (
          <div className="flex items-center gap-1">
            <Rating rating={5} />
            <span className="text-dark text-bodySmall mt-1.5">({5})</span>
          </div>
        )}
        {/* need change */}
        <div className="flex items-center gap-1 text-customGray-500 text-bodySmall">
          <ChatIcon styles="size-6 mb-1" />
          <span>({comments?.length}) دیدگاه</span>
        </div>
        <div className="flex gap-2">
          <OperationIcon color="success">
            <ShareIcon styles="size-5" />
          </OperationIcon>
          <OperationIcon color="error">
            <HeartEmptyIcon styles="size-6" />
          </OperationIcon>
        </div>
      </div>
      {/* description */}
      <div className="line-clamp-2 text-bodySmall text-customGray-500 my-4">
        <h2>{description}</h2>
      </div>
      {/* colors */}
      <div className="flex flex-col gap-1">
        <p className="text-bodyMain text-customGray-700">رنگ</p>
        <div className="flex gap-3">
          {uniqueColors.map((color: Color) => {
            const isSelected = selectedColor === color.persian;
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
      {/* sizes */}
      <div className="flex flex-col gap-1 my-4">
        <p className="text-bodyMain text-customGray-700">سایز</p>
        <div className="flex gap-3">
          {sizes.sort().map((size: string) => {
            const isSelected = selectedSize === size;
            return (
              <SizeItem
                key={size}
                size={size}
                isSelected={isSelected}
                handleSizeSelection={handleSizeSelection}
                isInProductDetailPage
              />
            );
          })}
        </div>
      </div>
      {/* quantity */}
      <div className="mb-4 text-captionMain text-state-error">
        تعداد موجودی : {quantityOfStock}
      </div>
      {/* price and button */}
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-end">
          <AddToCartOperator isInCart={false} />
          <Price
            price={price}
            discountPercentage={discount ? discount : undefined}
          />
        </div>
        <div className="w-full">
          <Button
            size="large"
            color="primary-main"
            icon={<ShopIcon />}
            styles="w-full"
          >
            افزودن به سبد خرید
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductPageContentInformation;
