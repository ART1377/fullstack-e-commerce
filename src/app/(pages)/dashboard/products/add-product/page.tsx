import DashboardAddProductPage from "@/app/components/dashboard/dashboard-add-product-page/dashboard-add-product-page";
import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "افزودن محصول",
  description: "پنل مدیریت محصولات سایت هامتوسیتی صفحه افزودن محصول جدید",
};

type Props = {};

const AddProduct = (props: Props) => {
  return <DashboardAddProductPage />;
};

export default AddProduct;
