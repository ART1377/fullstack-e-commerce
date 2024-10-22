import React from 'react'
import type { Metadata } from "next";
import AuthPage from '@/app/components/auth-page/auth-page';

export const metadata: Metadata = {
  title: "صفحه ورود / ثبت نام",
  description:
    "صفحه اعتبارسنجی برای ثبت نام یا ورود کاربران به سایت فروشگاه هامتوسیتی",
};


type Props = {}

const page = (props: Props) => {
  return (
    <AuthPage/>
  )
}

export default page