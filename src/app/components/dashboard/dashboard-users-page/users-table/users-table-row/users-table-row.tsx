"use client";

import React, { useState } from "react";
import Image from "next/image";
import OperationIcon from "@/app/components/operation-icon/operation-icon";
import DeleteIcon from "@/app/icons/delete-icon";
import PersonIcon from "@/app/icons/person-icon";
import DeleteUserModal from "./delete-user-modal/delete-user-modal";
import { formatPrice } from "@/app/lib/format-price";
import { User } from "../../../../../../../next-type-models";
import { formatToJalali } from "@/app/lib/date-format";
import Tooltip from "@/app/components/tooltip/tooltip";

type Props = {
  user: User;
  index: number;
};

const UsersTableRow = ({ user, index }: Props) => {
  const { firstName, lastName, id, image, email, createdAt, orders } = user;

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

  const totalOrdersPrice = orders?.reduce((sum, order) => sum + order.price, 0); // Sum of prices

  const sortedOrders = orders?.sort(
    (a, b) =>
      new Date(b?.createdAt).getTime() - new Date(a?.createdAt).getTime()
  );

  return (
    <>
      <DeleteUserModal
        isDeleteModalOpen={isDeleteModalOpen}
        setIsDeleteModalOpen={setIsDeleteModalOpen}
        selectedUserId={id}
        selectedUserName={`${firstName} ${lastName}`}
      />
      <tr
        key={id}
        className={`border-b border-customGray-300 custom-transition ${
          index % 2 !== 0
            ? "bg-customGray-100 hover:bg-customGray-200"
            : "bg-white hover:bg-customGray-200"
        }`}
      >
        <td className="p-2 whitespace-nowrap flex items-center gap-2">
          <div className="size-12 rounded-xl shadow relative overflow-hidden flex-center">
            {image ? (
              <Image
                alt={`${firstName} ${lastName}`}
                src={image}
                fill
                style={{
                  objectFit: "cover",
                }}
              />
            ) : (
              <PersonIcon styles="size-6" />
            )}
          </div>
          {firstName} {lastName}
        </td>
        <td className="p-2 whitespace-nowrap">{email}</td>
        <td className="p-2 whitespace-nowrap">
          {createdAt ? formatToJalali(createdAt) : "-"}
        </td>
        <td className="p-2 whitespace-nowrap">{orders?.length}</td>
        <td className="p-2 whitespace-nowrap">
          {formatPrice(totalOrdersPrice!)}
        </td>
        <td className="p-2 whitespace-nowrap">
          {sortedOrders?.[0]
            ? formatToJalali(sortedOrders?.[0].createdAt)
            : "-"}
        </td>
        <td className="p-2 whitespace-nowrap">
          <Tooltip content="حذف کاربر" position="right" color="state-error">
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

export default UsersTableRow;
