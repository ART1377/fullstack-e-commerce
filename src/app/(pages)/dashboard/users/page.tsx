import React from "react";
import type { Metadata } from "next";
import DashboardUsersPage from "@/app/components/dashboard/dashboard-users-page/dashboard-users-page";

export const metadata: Metadata = {
  title: "داشبورد - کاربران",
  description: "پنل مدیریت کاربران سایت هامتوسیتی",
};

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

const page = ({ searchParams }: Props) => {
  return <DashboardUsersPage searchParams={searchParams} />;
};

export default page;
