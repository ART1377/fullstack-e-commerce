"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import { Notification } from "../../../../../../next-type-d";
import NotificationItem from "./notification-item/notification-item";
import Pagination from "@/app/components/pagination/pagination";

type Props = {
  notifications: Notification[];
};

const NotificationsList = ({ notifications }: Props) => {
  const searchParams = useSearchParams();
  const pageNumber = parseInt(searchParams.get("page")!);

  const itemsPerPage = 4;

  const notificationsData = notifications.slice(
    pageNumber * itemsPerPage - itemsPerPage,
    pageNumber * itemsPerPage
  );

  return (
    <>
      <div className="w-full flex flex-col gap-4 p-2 md:p-4">
        {notificationsData.map((notification: Notification) => {
          return (
            <NotificationItem
              key={notification.id}
              notification={notification}
            />
          );
        })}
      </div>
      <div className="mt-10">
        <Pagination totalItems={notifications.length} itemsPerPage={itemsPerPage} />
      </div>
    </>
  );
};

export default NotificationsList;
