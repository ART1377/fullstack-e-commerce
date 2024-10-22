import React from "react";
import type { Metadata } from "next";
import DashboardEditProductPage from "@/app/components/dashboard/dashboard-edit-product-page/dashboard-edit-product-page";
import { getProductById } from "@/app/actions/product-action";
import { notFound } from "next/navigation";

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
    title: product.title,
    description: `این صفحه مربوط به ویرایش محصول با نام ${product.title} است توضیحات محصول : ${product.description}`,
  };
}

const EditProduct = async ({ params: { id } }: Props) => {
  const { product } = await getProductById(id);
  if (!product) {
    notFound();
  }

  return <DashboardEditProductPage product={product} />;
};

export default EditProduct;
