"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import HomeIcon from "@/app/icons/home-icon";
import ArrowLeftIcon from "@/app/icons/arrow-left-icon";

// Define the breadcrumb mapping with specific keys
const breadcrumbMap: Record<string, string> = {
  home: "خانه",
  products: "محصولات",
  dashboard: "داشبورد",
  orders: "سفارشات",
  settings: "تنظیمات",
  profile: "پروفایل",
  "shopping-cart": "سبد خرید",
  "contact-us": "تماس با ما",
};

const Breadcrumb = () => {
  const pathName = usePathname();
  const pathSegments = pathName.split("/").filter((segment) => segment); // Split the path and filter out empty segments

  return (
    <nav className="breadcrumb mt-6 sm:mt-10">
      <ul className="flex items-center gap-0.5 px-3 py-2 rounded-xl bg-white shadow w-fit">
        <li>
          <Link
            href="/"
            className="text-customGray-700 custom-transition hover:text-dark"
          >
            <HomeIcon styles="size-6" />
          </Link>{" "}
          {/* Home link */}
        </li>
        {pathSegments.map((segment, index) => {
          const isLast = index === pathSegments.length - 1;
          const url = `/${pathSegments.slice(0, index + 1).join("/")}`; // Construct the URL for the breadcrumb link

          // Type assertion to inform TypeScript that `segment` is a valid key
          const persianTitle =
            breadcrumbMap[segment as keyof typeof breadcrumbMap] || segment; // Get the Persian title or use the segment itself

          return (
            <>
              <li key={index} className="flex items-center">
                <ArrowLeftIcon styles="size-6 text-customGray-500 flex items-center gap-0.5" />
                {!isLast ? (
                  <>
                    <Link
                      href={url}
                      className="text-customGray-700 custom-transition hover:text-dark"
                    >
                      {persianTitle}
                    </Link>
                  </>
                ) : (
                  <span className="text-bodySmall text-customGray-500">
                    {persianTitle}
                  </span> // Last item should not be a link
                )}
              </li>
            </>
          );
        })}
      </ul>
    </nav>
  );
};

export default Breadcrumb;
