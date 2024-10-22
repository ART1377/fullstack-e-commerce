import React from "react";
import type { Metadata } from "next";
import DashboardNotificationsPage from "@/app/components/dashboard/dashboard-notifications-page/dashboard-notifications-page";

export const metadata: Metadata = {
  title: "داشبورد - اعلانات",
  description: "پنل مدیریت اعلانات سایت هامتوسیتی",
};

type Props = {};

const page = (props: Props) => {
  return <DashboardNotificationsPage />;
};

export default page;
