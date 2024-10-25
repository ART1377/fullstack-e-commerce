"use client";

import React from "react";
import ShoppingCartPageHeader from "./shopping-cart-page-header/shopping-cart-page-header";
import Checkout from "./checkout/checkout";
import ShoppingCartPageItem from "./shopping-cart-page-item/shopping-cart-page-item";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks/hook";
import { calculateDiscountedPrice } from "@/app/lib/functions";

type Props = {};

const ShoppingCartPage = (props: Props) => {
  // need change
  const dispatch = useAppDispatch();
  const { items: cartItems, status } = useAppSelector((state) => state.cart);

  const totalQuantity = cartItems?.reduce(
    (acc, item) => acc + item.quantity!,
    0
  );
  const totalPrice = cartItems?.reduce(
    (acc, item) => acc + item.product?.price!,
    0
  );
  const totalDiscount = cartItems?.reduce(
    (acc, item) =>
      acc +
      calculateDiscountedPrice(item.product?.price!, item.product?.discount!),
    0
  );

  return (
    <section className="w-full mt-4 sm:mt-10 flex flex-col gap-y-8 bmlg:flex-row-reverse">
      {/* cart items - header */}
      <div className="w-full flex flex-col gap-3 bmlg:w-[calc(100%-300px)]">
        {/* header */}
        <ShoppingCartPageHeader totalQuantity={totalQuantity!} />
        {/* cart items */}
        <div className="flex flex-col gap-3">
          {cartItems.map((cartItem) => {
            return (
              <ShoppingCartPageItem key={cartItem.id} cartItem={cartItem} />
            );
          })}
        </div>
      </div>
      {/* checkout */}
      <Checkout
        totalQuantity={totalQuantity!}
        totalPrice={totalPrice}
        totalDiscount={totalDiscount}
        loading={status === "loading"}
      />
    </section>
  );
};

export default ShoppingCartPage;
