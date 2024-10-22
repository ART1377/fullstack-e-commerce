import React from "react";
import OperationIcon from "../../operation-icon/operation-icon";
import DeleteIcon from "@/app/icons/delete-icon";
import Image from "next/image";
import HeartEmptyIcon from "@/app/icons/heart-empty-icon";
import ShareIcon from "@/app/icons/share-icon";
import AddToCartOperator from "../../add-to-cart-operator/add-to-cart-operator";
import Price from "../../price/price";
import Stock from "../../stock/stock";
import Link from "next/link";
import { getSizesForColor, getUniqueColors } from "@/app/lib/functions";
import { Product } from "../../../../../next-type-models";

type Props = {
  product: Product;
};

const ShoppingCartPageItem = ({ product }: Props) => {
  // need change
  const { title, id, images, stock, discount, price } = product;

  const uniqueColors = getUniqueColors(stock!);

  const sizes = getSizesForColor(stock!, uniqueColors[0].persian);


  return (
    <div className="relative bg-white rounded-xl shadow p-3 flex gap-3 flex-col sm:flex-row lg:gap-6">
      {/* in stock */}
      <div className="absolute left-1 top-5 -rotate-45">
        <Stock quantity={stock?.[0].quantity!} />
      </div>

      {/* product images */}
      <div className="flex gap-4">
        <Link
          href={`products/${id}`}
          className="relative w-32 aspect-square shadow rounded-xl overflow-hidden cursor-pointer custom-transition hover:opacity-60 xs:w-40"
        >
          <Image
            alt={title}
            src={images?.[0].url!}
            fill
            style={{
              objectFit: "cover",
            }}
          />
        </Link>
        {/* operators */}
        <div className="flex sm:hidden flex-col justify-end gap-2">
          <OperationIcon color={"primary"}>
            <HeartEmptyIcon styles="size-6" />
          </OperationIcon>
          <OperationIcon color={"success"}>
            <ShareIcon styles="size-5" />
          </OperationIcon>
          <OperationIcon color={"error"}>
            <DeleteIcon styles="size-6" />
          </OperationIcon>
        </div>
        {/* color - size */}
        <div className="flex sm:hidden flex-col items-center gap-4 mt-auto xs:mr-4">
          <div className="flex items-center gap-3">
            <small className="text-customGray-700 text-bodySmall">رنگ</small>
            <div
              className={`rounded-lg size-8  custom-transition hover:opacity-60 cursor-pointer ${
                uniqueColors[0].title === "white" && "border border-customGray-300"
              }`}
              style={{
                backgroundColor: uniqueColors[0].hex,
              }}
            ></div>
          </div>
          <div className="flex items-center gap-3">
            <small className="text-customGray-700 text-bodySmall">سایز</small>
            <div
              className={`flex-center rounded-lg size-8 cursor-pointer custom-transition bg-light text-dark hover:bg-customGray-300
                        `}
            >
              {sizes[0]}
            </div>
          </div>
        </div>
      </div>

      {/* product info */}
      <div className="flex flex-col gap-7 sm:w-[calc(100%-180px)]">
        {/* title */}
        <Link
          href={`products/${id}`}
          className="text-dark text-bodyMain cursor-pointer custom-transition hover:text-primary-main"
        >
          {title}
        </Link>
        {/* color - size */}
        <div className="hidden sm:flex items-center gap-10">
          <div className="flex items-center gap-3">
            <small className="text-customGray-700 text-bodySmall">رنگ</small>
            <div
              className={`rounded-lg size-8  custom-transition hover:opacity-60 cursor-pointer ${
                uniqueColors[0].title === "white" && "border border-customGray-300"
              }`}
              style={{
                backgroundColor: uniqueColors[0].hex,
              }}
            ></div>
          </div>
          <div className="flex items-center gap-3">
            <small className="text-customGray-700 text-bodySmall">سایز</small>
            <div
              className={`flex-center rounded-lg size-8 cursor-pointer custom-transition bg-light text-dark hover:bg-customGray-300
                        `}
            >
              {sizes[0]}
            </div>
          </div>
        </div>

        {/* operators - price */}
        <div className="flex items-end justify-between">
          {/* operators */}
          <div className="hidden sm:flex gap-2">
            <OperationIcon color={"primary"}>
              <HeartEmptyIcon styles="size-6" />
            </OperationIcon>
            <OperationIcon color={"success"}>
              <ShareIcon styles="size-5" />
            </OperationIcon>
            <OperationIcon color={"error"}>
              <DeleteIcon styles="size-6" />
            </OperationIcon>
          </div>
          {/* price */}
          <div className="w-full flex items-end justify-between gap-5 sm:justify-end">
            <AddToCartOperator isInCart={true} />
            <Price price={price} discountPercentage={discount!} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCartPageItem;
