"use client";

import React, { useState } from "react";
import OperationIcon from "@/app/components/operation-icon/operation-icon";
import DeleteIcon from "@/app/icons/delete-icon";
import CloseIcon from "@/app/icons/close-icon";
import DeleteOrderModal from "./delete-order-modal/delete-order-modal";
import { formatPrice } from "@/app/lib/functions";
import { OrderWithName } from "@/app/actions/order-actions/get-all-orders";
import { formatToJalali } from "@/app/lib/date-format";
import { updateOrderStatus } from "@/app/actions/order-actions/change-order-status";
import toast from "react-hot-toast";
import Tooltip from "@/app/components/tooltip/tooltip";

type Props = {
  order: OrderWithName;
  index: number;
};

const OrdersTableRow = ({ order, index }: Props) => {
  const { id, createdAt, price, status, discountAmount, totalItems, userName } =
    order;

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

  const orderStatusColor =
    status === "جاری"
      ? "warning"
      : status === "تحویل شده"
      ? "success"
      : status === "مرجوع شده"
      ? "error"
      : "";

  const handleStatusChange = async (
    newStatus: "جاری" | "تحویل شده" | "مرجوع شده"
  ) => {
    // Show loading toast
    const loadingToastId = toast.loading("در حال به روز رسانی وضعیت سفارش...");

    const response = await updateOrderStatus(order.id, newStatus);

    // Dismiss the loading toast
    toast.dismiss(loadingToastId);

    if (response.success) {
      // Show success toast in Persian
      toast.success(`وضعیت سفارش با موفقیت به "${newStatus}" تغییر کرد.`);
    } else {
      // Show error toast in Persian
      toast.error(`خطا: ${response.error}`);
    }
  };

  return (
    <>
      <DeleteOrderModal
        isDeleteModalOpen={isDeleteModalOpen}
        setIsDeleteModalOpen={setIsDeleteModalOpen}
        selectedOrderId={id}
      />
      <tr
        key={id}
        className={`border-b border-customGray-300 custom-transition ${
          index % 2 !== 0
            ? "bg-customGray-100 hover:bg-customGray-200"
            : "bg-white hover:bg-customGray-200"
        }`}
      >
        <td className="p-2 whitespace-nowrap flex items-center gap-2">{userName}</td>
        <td className="p-2 whitespace-nowrap">{totalItems}</td>
        <td className="p-2 whitespace-nowrap">{formatPrice(price)}</td>
        <td className="p-2 whitespace-nowrap">
          {discountAmount !== undefined &&
          discountAmount &&
          discountAmount > 0 ? (
            formatPrice(discountAmount)
          ) : (
            <CloseIcon styles="size-6 text-state-error" />
          )}
        </td>
        <td className="p-2 whitespace-nowrap">{formatToJalali(createdAt)}</td>
        <td className="p-2 whitespace-nowrap">
          <div
            className={`rounded-full px-3 py-0.5 flex-center text-bodySmall w-fit bg-state-${orderStatusColor}-200 text-state-${orderStatusColor}`}
          >
            {status}
          </div>
        </td>
        <td className="p-2 whitespace-nowrap flex items-center gap-2">
          <Tooltip
            content="علامت زدن به عنوان سفارش تحویل شده"
            position="right"
            color="state-success"
          >
            <div onClick={() => handleStatusChange("تحویل شده")}>
              <OperationIcon color={"success"}>ت</OperationIcon>
            </div>
          </Tooltip>
          <Tooltip
            content="علامت زدن به عنوان سفارش مرجوع شده"
            position="right"
            color="state-error"
          >
            <div onClick={() => handleStatusChange("مرجوع شده")}>
              <OperationIcon color={"error"}>م</OperationIcon>
            </div>
          </Tooltip>
          <Tooltip
            content="علامت زدن به عنوان سفارش جاری"
            position="right"
            color="state-warning"
          >
            <div onClick={() => handleStatusChange("جاری")}>
              <OperationIcon color={"warning"}>ج</OperationIcon>
            </div>
          </Tooltip>
          <Tooltip content="حذف سفارش" position="right" color="state-error">
            <div onClick={() => setIsDeleteModalOpen(true)}>
              <OperationIcon color={"error"}>
                <DeleteIcon styles="size-6" />
              </OperationIcon>
            </div>
          </Tooltip>
        </td>
      </tr>
    </>
  );
};

export default OrdersTableRow;
