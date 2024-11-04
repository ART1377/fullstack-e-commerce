"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavbarItemType } from "../../../../../../next-type-models";

type Props = {
  sidebarItem: NavbarItemType;
};

const DashboardSidebarItem = ({ sidebarItem }: Props) => {
  const pathName = usePathname();

  const activeLink = (link: string) => {
    if (pathName === link) {
      return true;
    } else {
      return false;
    }
  };
  return (
    
      <Link
        href={sidebarItem.path}
        className={`flex items-center gap-1 py-3 px-2 rounded-r-xl w-full text-customGray-700 text-h6 font-medium custom-transition hover:text-primary-main ${
          activeLink(sidebarItem.path) &&
          "bg-primary-main text-white hover:bg-primary-light hover:text-white"
        }`}
      >
        <div className="mb-1">{sidebarItem.icon}</div>
        {sidebarItem.title}
      </Link>
  );
};

export default DashboardSidebarItem;
