import React from "react";
import NotificationItem from "./notification-item/notification-item";
import Pagination from "@/app/components/pagination/pagination";
import { Notification } from "../../../../../../next-type-models";
import { PAGE_LIMIT } from "@/app/lib/values";

type Props = {
  totalItems: number;
  notifications: Notification[];
};

const NotificationsList = ({ notifications, totalItems }: Props) => {
  return (
    <>
      <div className="w-full flex flex-col gap-4 p-2 md:p-4">
        {notifications.map((notification: Notification) => {
          return (
            <NotificationItem
              key={notification.id}
              notification={notification}
            />
          );
        })}
      </div>
      <div className="mt-10">
        <Pagination totalItems={totalItems} itemsPerPage={PAGE_LIMIT} />
      </div>
    </>
  );
};

export default NotificationsList;
