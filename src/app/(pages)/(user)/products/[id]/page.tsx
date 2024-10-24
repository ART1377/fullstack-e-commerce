import React from "react";
import ProductPageContent from "@/app/components/product-page-content/product-page-content";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import * as actions from "@/app/actions/product-action";
import { Product } from "../../../../../../next-type-models";
import { db } from "@/app/db/db";

type Props = {
  params: {
    id: string;
  };
};

export async function generateMetadata({
  params: { id },
}: Props): Promise<Metadata> {
  const { product } = await actions.getProductById(id);

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

const ProductPage = async ({ params: { id } }: Props) => {
  // await db.cart.deleteMany()
  // need change - get related products
  const { products } = await actions.getAllProducts();

  const { product } = await actions.getProductById(id);
  if (!product) {
    notFound();
  }
  return <ProductPageContent product={product} relatedProducts={products} />;
};

export default ProductPage;

// Generate static paths (using the list of product IDs)
export async function generateStaticParams() {
  // Fetch all product IDs to generate paths for each
  const { products } = await actions.getAllProducts();

  return products.map((product: Product) => ({
    id: product.id,
  }));
}
