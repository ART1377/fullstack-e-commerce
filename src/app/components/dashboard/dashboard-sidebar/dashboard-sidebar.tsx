"use client";

import React from "react";
import { NavbarItemType } from "../../../../../next-type-d";
import CloseIcon from "@/app/icons/close-icon";
import LogoutIcon from "@/app/icons/logout-icon";
import DashboardIcon from "@/app/icons/dashboard-icon";
import ShoppingBasketIcon from "@/app/icons/shopping-basket-icon";
import UsersIcon from "@/app/icons/users-icon";
import AddShoppingCartIcon from "@/app/icons/add-shopping-cart-icon";
import NotificationIcon from "@/app/icons/notification-icon";
import DashboardSidebarItem from "./dashboard-sidebar-item/dashboard-sidebar-item";

const sidebarItems: NavbarItemType[] = [
  {
    title: "داشبورد",
    path: "/dashboard",
    icon: <DashboardIcon styles="size-6" />,
  },
  {
    title: "محصولات",
    path: "/dashboard/products",
    icon: <ShoppingBasketIcon styles="size-6" />,
  },
  {
    title: "کاربران",
    path: "/dashboard/users",
    icon: <UsersIcon styles="size-6" />,
  },
  {
    title: "سفارشات",
    path: "/dashboard/orders",
    icon: <AddShoppingCartIcon styles="size-6" />,
  },
  {
    title: "اعلانات",
    path: "/dashboard/notifications",
    icon: <NotificationIcon styles="size-6" />,
  },
];

type Props = {
  isSidebarOpen?: boolean;
  setIsSidebarOpen?: React.Dispatch<React.SetStateAction<boolean>>;
};

const DashboardSidebar = ({ isSidebarOpen, setIsSidebarOpen }: Props) => {
  const closeToggle = () => {
    if (setIsSidebarOpen) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <aside
      className={`${
        isSidebarOpen ? "block" : "hidden sm:block"
      } fixed top-0 left-0 right-0 bottom-0 z-10 w-screen h-screen bg-white sm:w-[280px] sm:!sticky sm:min-h-screen sm:flex sm:flex-col sm:justify-between`}
    >
      <ul className="flex flex-col gap-6 h-[90%] justify-center mr-auto max-w-[80%] sm:justify-start sm:mt-24 sm:mb-20 sm:w-full">
        {sidebarItems.map((sidebarItem: NavbarItemType) => {
          return (
            <DashboardSidebarItem
              key={sidebarItem.title}
              sidebarItem={sidebarItem}
            />
          );
        })}
      </ul>
      <div className="w-full cursor-pointer mt-auto mr-auto max-w-[80%]">
        <div
          className={`flex items-center gap-1 py-3 px-2 rounded-r-xl w-full text-customGray-700 text-h6 font-medium custom-transition hover:text-primary-main`}
        >
          <div className="mb-1">
            <LogoutIcon styles="size-6" />
          </div>
          خروج
        </div>
      </div>

      <div
        onClick={closeToggle}
        className="absolute left-5 top-5 cursor-pointer custom-transition rounded-full text-primary-main hover:bg-primary-main hover:text-white sm:hidden"
      >
        <CloseIcon styles="size-8" />
      </div>
    </aside>
  );
};

export default DashboardSidebar;
