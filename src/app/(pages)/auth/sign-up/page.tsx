import React from "react";
import type { Metadata } from "next";
import SighUpPage from "@/app/components/auth-page/sign-up-page/sign-up-page";

export const metadata: Metadata = {
  title: "صفحه ورود / ثبت نام",
  description:
    "صفحه اعتبارسنجی برای ثبت نام یا ورود کاربران به سایت فروشگاه هامتوسیتی",
};

type Props = {};

const page = (props: Props) => {
  return <SighUpPage />;
};

export default page;
