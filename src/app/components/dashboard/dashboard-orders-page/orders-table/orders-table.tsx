import React from "react";
import Pagination from "@/app/components/pagination/pagination";
import OrdersTableRow from "./orders-table-row/orders-table-row";
import { PAGE_LIMIT } from "@/app/lib/values";
import { OrderWithName } from "@/app/actions/order-actions/get-all-orders";

type Props = {
  totalItems: number;
  orders: OrderWithName[];
};

const OrdersTable = ({ totalItems ,orders}: Props) => {
  return (
    <>
      <div className="overflow-x-auto custom-scrollbar">
        <table className="min-w-full bg-white border-collapse table-auto">
          <thead>
            <tr className="text-customGray-500 text-right border-b border-t border-customGray-300">
              <th className="text-bodySmall p-2 whitespace-nowrap">نام خریدار</th>
              <th className="text-bodySmall p-2 whitespace-nowrap">تعداد اقلام</th>
              <th className="text-bodySmall p-2 whitespace-nowrap">قیمت کل</th>
              <th className="text-bodySmall p-2 whitespace-nowrap">مجموع تخفیف</th>
              <th className="text-bodySmall p-2 whitespace-nowrap">تاریخ سفارش</th>
              <th className="text-bodySmall p-2 whitespace-nowrap">وضعیت سفارش</th>
              <th className="text-bodySmall p-2 whitespace-nowrap"></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order: OrderWithName, index: number) => (
              <OrdersTableRow key={order.id} order={order} index={index} />
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-10">
        <Pagination totalItems={totalItems} itemsPerPage={PAGE_LIMIT} />
      </div>
    </>
  );
};

export default OrdersTable;
