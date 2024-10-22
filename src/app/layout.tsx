import type { Metadata } from "next";
import "./globals.css";
import MainLayout from "./layout/main-layout";

import localFont from "next/font/local";

// Font files can be colocated inside of `app`
const dana = localFont({
  src: "../../public/font/DanaFaNum-Medium.woff",
  display: "swap",
});

export const metadata: Metadata = {
  title: "هامتو سیتی",
  description: "فروشگاه لوازم کوهنوردی هامتو",
  keywords: "کفش , کوله , کوهنوردی , هامتو",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html dir="rtl" lang="fa-IR">
      <body className={`${dana.className}`}>
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}
