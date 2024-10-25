"use client";

import React from "react";
import ShoppingCartPageHeader from "./shopping-cart-page-header/shopping-cart-page-header";
import Checkout from "./checkout/checkout";
import ShoppingCartPageItem from "./shopping-cart-page-item/shopping-cart-page-item";
import { useAppSelector } from "@/app/redux/hooks/hook";
import { calculateDiscountedPrice } from "@/app/lib/functions";
import Button from "../button/button";
import Link from "next/link";

type Props = {};

const ShoppingCartPage = (props: Props) => {
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

  console.log(cartItems, !!cartItems);

  const cartIsEmpty = cartItems.length < 1;

  return (
    <section className="w-full mt-4 sm:mt-10 flex flex-col gap-y-8 bmlg:flex-row-reverse">
      {/* cart items - header */}
      <div
        className={`w-full flex flex-col gap-3 ${
          cartIsEmpty ?? "bmlg:w-[calc(100%-300px)]"
        }`}
      >
        {/* header */}
        <ShoppingCartPageHeader totalQuantity={totalQuantity!} />
        {cartIsEmpty && (
          <div className="w-full px-4 py-8 bg-state-error-200 text-state-error rounded-xl flex-center flex-col gap-4 text-center text-bodyMain">
            <p>سبد خرید شما خالی است</p>
            <Button color="state-error" outline>
              <Link href={'/products?page=1'}>صفحه محصولات</Link>
            </Button>
          </div>
        )}
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
      {!cartIsEmpty && (
        <Checkout
          totalQuantity={totalQuantity!}
          totalPrice={totalPrice}
          totalDiscount={totalDiscount}
          loading={status === "loading"}
        />
      )}
    </section>
  );
};

export default ShoppingCartPage;
