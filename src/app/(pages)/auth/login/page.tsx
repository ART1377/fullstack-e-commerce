import React from "react";
import type { Metadata } from "next";
import LoginPage from "@/app/components/auth-page/login-page/login-page";

export const metadata: Metadata = {
  title: "صفحه ورود / ثبت نام",
  description:
    "صفحه اعتبارسنجی برای ثبت نام یا ورود کاربران به سایت فروشگاه هامتوسیتی",
};

type Props = {};

const page = (props: Props) => {
  return <LoginPage />;
};

export default page;
