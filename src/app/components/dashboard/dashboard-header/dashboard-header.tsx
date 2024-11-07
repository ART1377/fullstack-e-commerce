"use client";

import React, { useState } from "react";
import DashboardSidebar from "../dashboard-sidebar/dashboard-sidebar";
import Logo from "../../logo/logo";
import SidebarToggle from "./sidebar-toggle/sidebar-toggle";
import DashboardHeaderProfile from "./dashboard-header-profile/dashboard-header-profile";
import { motion } from "framer-motion";
import {
  rollingFromLeftVariants,
  rollingFromRightVariants,
  topToBottomVariants,
} from "../../header/header";

type Props = {};

const DashboardHeader = (props: Props) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  return (
    <>
      <header className="bg-white shadow h-16 px-2 sm:px-4">
        <div className="flex justify-between items-center w-full h-full">
          {/* navbar toggle */}
          <motion.div
            custom={0} // First item
            initial="hidden"
            animate="visible"
            variants={rollingFromRightVariants}
            className="sm:hidden"
          >
            <SidebarToggle setIsSidebarOpen={setIsSidebarOpen} />
          </motion.div>

          {/* logo */}
          <motion.div
            custom={0} // First item
            initial="hidden"
            animate="visible"
            variants={topToBottomVariants}
          >
            <Logo />
          </motion.div>
          {/* profile icon */}
          <motion.div
            custom={0} // First item
            initial="hidden"
            animate="visible"
            variants={rollingFromLeftVariants}
          >
            <DashboardHeaderProfile />
          </motion.div>
        </div>
      </header>
      {/* sidebar */}
      <div className="sm:hidden">
        <DashboardSidebar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
      </div>
    </>
  );
};

export default DashboardHeader;
