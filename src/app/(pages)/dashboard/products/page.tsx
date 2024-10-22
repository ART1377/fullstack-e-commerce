import DashboardProductsPage from "@/app/components/dashboard/dashboard-products-page/dashboard-products-page";
import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "داشبورد - محصولات",
  description: "پنل مدیریت محصولات سایت هامتوسیتی",
};

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

const page = ({ searchParams }: Props) => {
  return <DashboardProductsPage searchParams={searchParams} />;
};

export default page;
