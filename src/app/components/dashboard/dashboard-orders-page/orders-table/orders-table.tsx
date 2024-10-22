"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import { orders, users } from "@/app/data/data";
import Pagination from "@/app/components/pagination/pagination";
import { Order } from "../../../../../../next-type-d";
import OrdersTableRow from "./orders-table-row/orders-table-row";

type Props = {
  totalItems: number;
};

const OrdersTable = ({ totalItems }: Props) => {
  const searchParams = useSearchParams();
  const pageNumber = parseInt(searchParams.get("page")!);

  const itemsPerPage = 4;

  const ordersData = orders.slice(
    pageNumber * itemsPerPage - itemsPerPage,
    pageNumber * itemsPerPage
  );

  return (
    <>
      <div className="overflow-x-auto custom-scrollbar">
        <table className="min-w-full bg-white border-collapse">
          <thead>
            <tr className="text-customGray-500 text-right border-b border-t border-customGray-300">
              <th className="text-bodySmall p-2 min-w-[180px]">نام خریدار</th>
              <th className="text-bodySmall p-2 min-w-[140px]">تعداد اقلام</th>
              <th className="text-bodySmall p-2 min-w-[140px]">
                قیمت کل
              </th>
              <th className="text-bodySmall p-2 min-w-[140px]">مجموع تخفیف</th>
              <th className="text-bodySmall p-2 min-w-[140px]">تاریخ سفارش</th>
              <th className="text-bodySmall p-2 min-w-[180px]">وضعیت سفارش</th>
              <th className="text-bodySmall p-2 min-w-[120px]"></th>
            </tr>
          </thead>
          <tbody>
            {ordersData.map((order: Order, index: number) => (
              <OrdersTableRow key={order.id} order={order} index={index} />
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-10">
        <Pagination totalItems={users.length} itemsPerPage={itemsPerPage} />
      </div>
    </>
  );
};

export default OrdersTable;
