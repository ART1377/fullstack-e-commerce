import React from "react";
import ProductPageContent from "@/app/components/product-page-content/product-page-content";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import * as actions from "@/app/actions/product-actions/product-action";
import { getComments } from "@/app/actions/comment-actions/comment-actions";
import { getSortOptionValue } from "@/app/lib/get-sort-option-value";
import { Product } from "../../../../../../next-type-models";

type Props = {
  params: {
    id: string;
  };
  searchParams: { sort?: string }; // Capture the sort parameter
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

const ProductPage = async ({ params: { id }, searchParams }: Props) => {

  const { product } = await actions.getProductById(id);

  // Get comments based on the selected sort option
  const sortOption =
    (searchParams.sort && getSortOptionValue(searchParams.sort)) || "newest"; // Default to "newest" if not provided

  const { comments } = await getComments(id, sortOption);

  if (!product) {
    notFound();
  }
  return (
    <ProductPageContent
      product={product}
      productId={id}
      comments={comments ? comments : undefined}
    />
  );
};

export default ProductPage;

// Generate static paths (using the list of product IDs)
export async function generateStaticParams() {
  // Fetch all product IDs to generate paths for each
  const { products } = await actions.getAllProducts();

  return products?.map((product: Product) => ({
    id: product.id,
  }));
}
