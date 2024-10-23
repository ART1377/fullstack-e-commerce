import React from "react";
import ProductPageContent from "@/app/components/product-page-content/product-page-content";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getFilteredProducts,
  getProductById,
} from "@/app/actions/product-action";


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

const ProductPage = async ({ params: { id } }: Props) => {
  const { products } = await getFilteredProducts({});

  const { product } = await getProductById(id);
  if (!product) {
    notFound();
  }
  return <ProductPageContent product={product} relatedProducts={products} />;
};

export default ProductPage;

// Generate static paths (using the list of product IDs)
export async function generateStaticParams() {
  // Fetch all product IDs to generate paths for each
  const { products } = await getFilteredProducts({}); // Assumed function that fetches all product IDs

  return products.map((product: { id: string }) => ({
    params: { id: product.id },
  }));
}
