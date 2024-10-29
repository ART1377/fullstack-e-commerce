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
        <table className="min-w-full bg-white border-collapse">
          <thead>
            <tr className="text-customGray-500 text-right border-b border-t border-customGray-300">
              <th className="text-bodySmall p-2 min-w-[180px]">نام خریدار</th>
              <th className="text-bodySmall p-2 min-w-[140px]">تعداد اقلام</th>
              <th className="text-bodySmall p-2 min-w-[140px]">قیمت کل</th>
              <th className="text-bodySmall p-2 min-w-[140px]">مجموع تخفیف</th>
              <th className="text-bodySmall p-2 min-w-[140px]">تاریخ سفارش</th>
              <th className="text-bodySmall p-2 min-w-[180px]">وضعیت سفارش</th>
              <th className="text-bodySmall p-2 min-w-[200px]"></th>
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
