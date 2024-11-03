"use client";

import React, { useEffect, useState } from "react";


type Props = {};

const DashboardMainPageHeader = (props: Props) => {
  const [currentTime, setCurrentTime] = useState("");

  const updateCurrentTime = () => {
    const now = new Date();
    const formattedTime = new Intl.DateTimeFormat("fa-IR", {
      dateStyle: "full", // Full date
      timeStyle: "short", // Short time
    }).format(now);

    setCurrentTime(formattedTime);
  };

  useEffect(() => {
    updateCurrentTime(); // Set initial time
    const intervalId = setInterval(updateCurrentTime, 1000); // Update time every second

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, []);

  return (
    <div className="flex justify-between items-center flex-wrap gap-2 mb-4 p-3">
      <h1 className="text-bodyMain">داشبورد مدیریت</h1>
      <p className="text-captionMain">{currentTime}</p>
    </div>
  );
};

export default DashboardMainPageHeader;
