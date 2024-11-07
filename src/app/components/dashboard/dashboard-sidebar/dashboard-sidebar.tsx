"use client";

import React from "react";
import CloseIcon from "@/app/icons/close-icon";
import LogoutIcon from "@/app/icons/logout-icon";
import DashboardIcon from "@/app/icons/dashboard-icon";
import ShoppingBasketIcon from "@/app/icons/shopping-basket-icon";
import UsersIcon from "@/app/icons/users-icon";
import AddShoppingCartIcon from "@/app/icons/add-shopping-cart-icon";
import NotificationIcon from "@/app/icons/notification-icon";
import DashboardSidebarItem from "./dashboard-sidebar-item/dashboard-sidebar-item";
import { NavbarItemType } from "../../../../../next-type-models";
import * as actions from "@/app/actions/auth-actions/auth-actions";
import { AnimatePresence, motion } from "framer-motion";
import { navItemVariants, navVariants } from "../../header/navbar/navbar";

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

  // Custom signOut and refresh page
  const handleSignOut = async () => {
    await actions.handleSighOut();
    window.location.reload();
  };

  return (
    <>
      {/* mobile size */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.aside
            key="navbar"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={navVariants}
            className={`fixed top-0 left-0 right-0 bottom-0 z-10 w-screen h-screen bg-white sm:hidden`}
          >
            <ul className="flex flex-col gap-6 h-[90%] justify-center mr-auto max-w-[80%]">
              <AnimatePresence>
                {sidebarItems.map((sidebarItem: NavbarItemType, index) => {
                  return (
                    <motion.li
                      custom={index} // Pass the index to use in the staggered animation
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      variants={navItemVariants}
                      key={sidebarItem.title}
                      onClick={closeToggle}
                      className="w-full"
                    >
                      <DashboardSidebarItem sidebarItem={sidebarItem} />
                    </motion.li>
                  );
                })}
              </AnimatePresence>
            </ul>
            <div className="w-full cursor-pointer mt-auto mr-auto max-w-[80%]">
              <div
                className={`flex items-center gap-1 py-3 px-2 rounded-r-xl w-full text-customGray-700 text-h6 font-medium custom-transition hover:text-primary-main`}
                onClick={handleSignOut}
              >
                <div className="mb-1">
                  <LogoutIcon styles="size-6" />
                </div>
                خروج
              </div>
            </div>

            <div
              onClick={closeToggle}
              className="absolute left-5 top-5 cursor-pointer custom-transition rounded-full text-primary-main hover:bg-primary-main hover:text-white"
            >
              <CloseIcon styles="size-8" />
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
      {/* desktop size */}
      <AnimatePresence>
        <motion.aside
          key="navbar"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={navVariants}
          className={`hidden top-0 left-0 right-0 bottom-0 z-10 h-screen bg-white w-[280px] !sticky min-h-screen flex-col justify-between sm:flex`}
        >
          <ul className="flex flex-col gap-6 h-[90%] mr-auto max-w-[80%] justify-start mt-24 mb-20 w-full">
            <AnimatePresence>
              {sidebarItems.map((sidebarItem: NavbarItemType, index) => {
                return (
                  <motion.li
                    custom={index} // Pass the index to use in the staggered animation
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={navItemVariants}
                    key={sidebarItem.title}
                    onClick={closeToggle}
                    className="w-full"
                  >
                    <DashboardSidebarItem sidebarItem={sidebarItem} />
                  </motion.li>
                );
              })}
            </AnimatePresence>
          </ul>
          <div className="w-full cursor-pointer mt-auto mr-auto max-w-[80%]">
            <div
              className={`flex items-center gap-1 py-3 px-2 rounded-r-xl w-full text-customGray-700 text-h6 font-medium custom-transition hover:text-primary-main`}
              onClick={handleSignOut}
            >
              <div className="mb-1">
                <LogoutIcon styles="size-6" />
              </div>
              خروج
            </div>
          </div>

          <div
            onClick={closeToggle}
            className="absolute left-5 top-5 cursor-pointer custom-transition rounded-full text-primary-main hover:bg-primary-main hover:text-white hidden"
          >
            <CloseIcon styles="size-8" />
          </div>
        </motion.aside>
      </AnimatePresence>
    </>
  );
};

export default DashboardSidebar;
