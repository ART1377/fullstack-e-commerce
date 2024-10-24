"use client";

import CartIcon from "@/app/icons/cart-icon";
import { useAppSelector } from "@/app/redux/hooks/hook";
import Link from "next/link";
import React from "react";
import Spinner from "../../spinner/spinner";

type Props = {};

const HeaderCart = (props: Props) => {
  const cartStatus = useAppSelector((state) => state.cart.status);
  const cartItems = useAppSelector((state) => state.cart.items);
  const totalQuantity = cartItems?.reduce(
    (acc, item) => acc + item.quantity!,
    0
  );

  return (
    <Link
      href={"/shopping-cart"}
      className="relative flex-center bg-customGray-100 rounded-full size-10 cursor-pointer hover:bg-customGray-200 custom-transition"
    >
      <CartIcon styles="size-6" />

      <div className="rounded-full size-6 flex-center bg-state-error text-white text-captionMain absolute -top-2.5 -right-2.5">
        {cartStatus === "loading" ? <Spinner size={16} color="#fff" /> : totalQuantity}
      </div>
    </Link>
  );
};

export default HeaderCart;
