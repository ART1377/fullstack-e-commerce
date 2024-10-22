import React from "react";
import type { Metadata } from "next";
import ProfilePage from "@/app/components/profile-page/profile-page";

export const metadata: Metadata = {
  title: "پروفایل",
  description: "پروفایل کاربران سایت هامتوسیتی",
};

type Props = {};

const page = (props: Props) => {
  return <ProfilePage />;
};

export default page;
