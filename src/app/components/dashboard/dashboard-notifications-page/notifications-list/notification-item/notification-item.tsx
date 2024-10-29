import React from "react";
import Image from "next/image";
import PersonIcon from "@/app/icons/person-icon";
import { timeAgo } from "@/app/lib/functions";
import DoubleCheckIcon from "@/app/icons/double-check-icon";
import CheckIcon from "@/app/icons/check-icon";
import OperationIcon from "@/app/components/operation-icon/operation-icon";
import DeleteIcon from "@/app/icons/delete-icon";
import Tooltip from "@/app/components/tooltip/tooltip";
import { Notification } from "../../../../../../../next-type-models";

type Props = {
  notification: Notification;
};

const NotificationItem = ({ notification }: Props) => {
  const { id, message, type, createdAt, isRead, user } = notification;

  const readStatusColor = isRead ? "success" : "error";
  const readStatusIcon = isRead ? (
    <DoubleCheckIcon styles="size-6 text-state-success" />
  ) : (
    <CheckIcon styles="size-6 text-state-error" />
  );
  const readStatusText = isRead ? "خوانده شده" : "خوانده نشده";

  return (
    <div className="rounded-xl shadow bg-light flex flex-col cursor-pointer custom-transition hover:bg-customGray-200">
      <div className="py-4 px-2 flex flex-col gap-4 md:px-3">
        <div className="flex justify-between">
          <div className="flex gap-2">
            <div className="size-12 rounded-xl shadow relative overflow-hidden flex-center">
              {user?.image ? (
                <Image
                  alt={`${user?.firstName} ${user?.lastName}`}
                  src={user?.image}
                  fill
                  style={{
                    objectFit: "cover",
                  }}
                />
              ) : (
                <PersonIcon styles="size-6" />
              )}
            </div>
            <div className="flex flex-col justify-between">
              <small className="text-customGray-700 text-bodySmall">
                {user?.firstName} {user?.lastName}
              </small>
              <span className="text-captionMain text-customGray-500">
                {user?.email}
              </span>
            </div>
          </div>
          <span className="text-customGray-700 text-captionMain">
            {timeAgo(createdAt)}
          </span>
        </div>
        <p className="text-bodySmall text-customGray-500">{message}</p>
      </div>
      <div className="bg-customGray-100 p-2 flex justify-between items-center">
        <div
          className={`rounded-full px-3 py-0.5 flex-center text-bodySmallBold w-fit bg-state-${readStatusColor}-200 text-state-${readStatusColor}`}
        >
          {readStatusText}
          {readStatusIcon}
        </div>
        <div className="flex gap-2">
          {isRead ? (
            <Tooltip content="علامت زدن به عنوان خوانده نشده" position="right">
              <OperationIcon color="primary">
                <CheckIcon styles="size-6" />
              </OperationIcon>
            </Tooltip>
          ) : (
            <Tooltip content="علامت زدن به عنوان خوانده شده" position="right">
              <OperationIcon color="primary">
                <DoubleCheckIcon styles="size-6" />
              </OperationIcon>
            </Tooltip>
          )}
          <Tooltip content="حذف پیام" color="state-error" position="right">
            <OperationIcon color="error">
              <DeleteIcon styles="size-6" />
            </OperationIcon>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default NotificationItem;
