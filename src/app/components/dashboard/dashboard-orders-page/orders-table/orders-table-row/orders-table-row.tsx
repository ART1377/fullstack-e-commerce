"use client";

import React, { useState } from "react";
import OperationIcon from "@/app/components/operation-icon/operation-icon";
import DeleteIcon from "@/app/icons/delete-icon";
import CloseIcon from "@/app/icons/close-icon";
import DeleteOrderModal from "./delete-order-modal/delete-order-modal";
import { formatPrice } from "@/app/lib/functions";
import { OrderWithName } from "@/app/actions/order-actions/get-all-orders";
import { formatToJalali } from "@/app/lib/date-format";

type Props = {
  order: OrderWithName;
  index: number;
};

const OrdersTableRow = ({ order, index }: Props) => {
  const {
    id,
    createdAt,
    price,
    products,
    status,
    discountAmount,
    totalItems,
    userName,
  } = order;

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

  const orderStatusColor =
    status === "pending"
      ? "warning"
      : status === "delivered"
      ? "success"
      : status === "returned"
      ? "error"
      : "";

  return (
    <>
      <DeleteOrderModal
        isDeleteModalOpen={isDeleteModalOpen}
        setIsDeleteModalOpen={setIsDeleteModalOpen}
      />
      <tr
        key={id}
        className={`border-b border-customGray-300 custom-transition ${
          index % 2 !== 0
            ? "bg-customGray-100 hover:bg-customGray-200"
            : "bg-white hover:bg-customGray-200"
        }`}
      >
        <td className="p-2 flex items-center gap-2">{userName}</td>
        <td className="p-2">{totalItems}</td>
        <td className="p-2">{formatPrice(price)}</td>
        <td className="p-2">
          {discountAmount !== undefined &&
          discountAmount &&
          discountAmount > 0 ? (
            formatPrice(discountAmount)
          ) : (
            <CloseIcon styles="size-6 text-state-error" />
          )}
        </td>
        <td className="p-2">{formatToJalali(createdAt)}</td>
        <td className="p-2">
          <div
            className={`rounded-full px-3 py-0.5 flex-center text-bodySmallBold w-fit bg-state-${orderStatusColor}-200 text-state-${orderStatusColor}`}
          >
            {status}
          </div>
        </td>
        <td className="p-2">
          <div onClick={() => setIsDeleteModalOpen(true)}>
            <OperationIcon color={"error"}>
              <DeleteIcon styles="size-6" />
            </OperationIcon>
          </div>
        </td>
      </tr>
    </>
  );
};

export default OrdersTableRow;
