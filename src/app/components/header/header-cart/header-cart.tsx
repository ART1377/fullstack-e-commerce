import CartIcon from "@/app/icons/cart-icon";
import Link from "next/link";
import React from "react";

type Props = {};

const HeaderCart = (props: Props) => {
  return (
    <Link
      href={"/shopping-cart"}
      className="flex-center bg-customGray-100 rounded-full size-10 cursor-pointer hover:bg-customGray-200 custom-transition"
    >
      <CartIcon styles="size-6" />
    </Link>
  );
};

export default HeaderCart;
