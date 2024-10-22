import React from "react";
import ProductPageContent from "@/app/components/product-page-content/product-page-content";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProductById } from "@/app/actions/product-action";

type Props = {
  params: {
    id: string;
  };
};

export async function generateMetadata({
  params: { id },
}: Props): Promise<Metadata> {
  const { product } = await getProductById(id);

  if (!product) {
    return {
      title: "محصولی یافت نشد",
      description: `محصولی با مشخصات مورد نظر شما یافت نشد`,
    };
  }

  return {
    title: product?.title,
    description: `این صفحه مربوط به جزئیات محصول با نام ${product?.title} است توضیحات محصول : ${product?.description}`,
  };
}

const Product = async ({ params: { id } }: Props) => {
  const { product } = await getProductById(id);
  if (!product) {
    notFound();
  }
  return <ProductPageContent product={product} />;
};

export default Product;
