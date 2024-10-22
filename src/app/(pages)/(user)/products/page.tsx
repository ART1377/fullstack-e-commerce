import React from "react";
import type { Metadata } from "next";
import ProductsPageContent from "@/app/components/products-page-content/products-page-content";

export const metadata: Metadata = {
  title: "محصولات",
  description: "صفحه محصولات فروشگاه هامتوسیتی",
};

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};
const page = ({ searchParams }: Props) => {
  return (
    <>
      <ProductsPageContent searchParams={searchParams} />
    </>
  );
};

export default page;
