"use client";

import React, { useState } from "react";
import DashboardSidebar from "../dashboard-sidebar/dashboard-sidebar";
import Logo from "../../logo/logo";
import SidebarToggle from "./sidebar-toggle/sidebar-toggle";
import DashboardHeaderProfile from "./dashboard-header-profile/dashboard-header-profile";

type Props = {};

const DashboardHeader = (props: Props) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  return (
    <>
      <header className="bg-white shadow h-16 px-2 sm:px-4">
        <div className="flex justify-between items-center w-full h-full">
          {/* navbar toggle */}
          <SidebarToggle setIsSidebarOpen={setIsSidebarOpen} />

          {/* logo */}
          <Logo />
          {/* profile icon */}
          <DashboardHeaderProfile />
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
