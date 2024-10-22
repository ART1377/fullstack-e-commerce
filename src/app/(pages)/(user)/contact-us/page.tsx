import React from "react";
import ContactUsPage from "@/app/components/contact-us-page/contact-us-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "تماس با ما",
  description: "صفحه تماس با ما فروشگاه هامتوسیتی",
};

type Props = {};

const page = (props: Props) => {
  return <ContactUsPage />;
};

export default page;
