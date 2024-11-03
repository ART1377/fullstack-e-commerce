"use client";

import React from "react";
import Image from "next/image";
import PersonIcon from "@/app/icons/person-icon";
import DoubleCheckIcon from "@/app/icons/double-check-icon";
import CheckIcon from "@/app/icons/check-icon";
import OperationIcon from "@/app/components/operation-icon/operation-icon";
import DeleteIcon from "@/app/icons/delete-icon";
import Tooltip from "@/app/components/tooltip/tooltip";
import { Notification } from "../../../../../../../next-type-models";
import toast from "react-hot-toast";
import * as actions from "@/app/actions/notification-actions/notification-actions";
import { timeAgo } from "@/app/lib/time-ago";

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

  const handleDelete = async () => {
    // Show loading toast
    const loadingToastId = toast.loading("در حال حذف اعلان...");

    try {
      const response = await actions.deleteNotificationById(id);
      // Dismiss the loading toast
      toast.dismiss(loadingToastId);

      if (response.success) {
        // Show success toast
        toast.success("اعلان با موفقیت حذف شد.");
      } else {
        // Show error toast
        toast.error(`خطا: ${response.error}`);
      }
    } catch (error) {
      // Dismiss loading toast on error
      toast.dismiss(loadingToastId);
      toast.error("خطا در حذف اعلان. لطفا دوباره تلاش کنید.");
    }
  };

  const handleToggleReadStatus = async () => {
    const loadingToastId = toast.loading("در حال تغییر وضعیت خوانده شده...");

    try {
      const response = await actions.toggleNotificationReadStatus(id);
      toast.dismiss(loadingToastId);

      if (response.success) {
        toast.success(
          isRead
            ? "علامت زده به عنوان خوانده نشده"
            : "علامت زده به عنوان خوانده شده"
        );
      } else {
        toast.error(`خطا: ${response.error}`);
      }
    } catch (error) {
      toast.dismiss(loadingToastId);
      toast.error("خطا در تغییر وضعیت خوانده شده. لطفا دوباره تلاش کنید.");
    }
  };

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
        <div className="flex flex-col gap-2">
          <p className="text-bodySmall text-primary-500 bg-primary-200 rounded-full px-3 py-1 w-fit">
            {type}
          </p>
          <div className="text-bodySmall text-customGray-500">
            {type === "تماس با ما" ? (
              <div className="flex flex-col gap-1">
                <small className="text-bodySmall text-customGray-500">{message.split("<br />")[0]}</small>
                <small className="text-bodySmall text-customGray-500">{message.split("<br />")[1]}</small>
              </div>
            ) : (
              message
            )}
          </div>
        </div>
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
              <div onClick={handleToggleReadStatus}>
                <OperationIcon color="primary">
                  <CheckIcon styles="size-6" />
                </OperationIcon>
              </div>
            </Tooltip>
          ) : (
            <Tooltip content="علامت زدن به عنوان خوانده شده" position="right">
              <div onClick={handleToggleReadStatus}>
                <OperationIcon color="primary">
                  <DoubleCheckIcon styles="size-6" />
                </OperationIcon>
              </div>
            </Tooltip>
          )}
          <Tooltip content="حذف پیام" color="state-error" position="right">
            <div onClick={handleDelete}>
              <OperationIcon color="error">
                <DeleteIcon styles="size-6" />
              </OperationIcon>
            </div>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default NotificationItem;
