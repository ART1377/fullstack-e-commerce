import React from "react";
import type { Metadata } from "next";
import ShoppingCartPage from "@/app/components/shopping-cart-page/shopping-cart-page";

export const metadata: Metadata = {
  title: "سبد خرید",
  description: "سبد خرید کاربر شامل محصولات سایت هامتوسیتی",
};
type Props = {};

const page = (props: Props) => {
  return <ShoppingCartPage />;
};

export default page;
