import DashboardHeader from "@/app/components/dashboard/dashboard-header/dashboard-header";
import DashboardSidebar from "@/app/components/dashboard/dashboard-sidebar/dashboard-sidebar";
import React from "react";
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "پنل ادمین",
  description: "پنل مدیریت ادمین سایت هامتوسیتی",
};


type Props = {
  children: React.ReactNode;
};

const DashboardLayout = ({ children }: Props) => {
  return (
    <>
      <div className="flex max-w-[1280px] mx-auto">
        <DashboardSidebar />
        <div className="flex flex-col w-full sm:w-[calc(100%-280px)]">
          <DashboardHeader />
          <main className="p-2 md:p-4 xl:!pl-0">{children}</main>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
