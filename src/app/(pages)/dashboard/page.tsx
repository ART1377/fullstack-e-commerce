import React from 'react'
import type { Metadata } from "next";
import DashboardPage from '@/app/components/dashboard/dashboard-page/dashboard-page';


export const metadata: Metadata = {
  title: "پنل ادمین",
  description: "پنل مدیریت ادمین سایت هامتوسیتی",
};


type Props = {}

const page = (props: Props) => {
  return (
    <DashboardPage/>
  )
}

export default page