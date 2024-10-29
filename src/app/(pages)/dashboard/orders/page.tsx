import React from "react";
import type { Metadata } from "next";
import DashboardOrdersPage from "@/app/components/dashboard/dashboard-orders-page/dashboard-orders-page";

export const metadata: Metadata = {
  title: "داشبورد - سفارشات",
  description: "پنل مدیریت سفارشات سایت هامتوسیتی",
};

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

const page = ({ searchParams }: Props) => {
  return <DashboardOrdersPage searchParams={searchParams} />;
};

export default page;
