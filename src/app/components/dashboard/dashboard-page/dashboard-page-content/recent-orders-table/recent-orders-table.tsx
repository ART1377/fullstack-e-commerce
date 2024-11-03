import { formatToJalali } from "@/app/lib/date-format";
import React from "react";
import { orderStatusColor } from "../dashboard-page-content";
import { formatPrice } from "@/app/lib/functions";
import { Order } from "../../../../../../../next-type-models";

type Props = {
  data: Partial<Order>[];
};

const RecentOrdersTable = ({ data }: Props) => {
  return (
    <div>
      <h5 className="text-bodyMain mb-2 p-3">آخرین سفارشات</h5>
      <div className="overflow-x-auto custom-scrollbar">
        <table className="min-w-full bg-white border-collapse table-auto">
          <thead>
            <tr className="text-customGray-500 text-right border-b border-t border-customGray-300">
              <th className="text-bodySmall p-2 whitespace-nowrap">
                شناسه سفارش
              </th>
              <th className="text-bodySmall p-2 whitespace-nowrap">کاربر</th>
              <th className="text-bodySmall p-2 whitespace-nowrap">قیمت کل</th>
              <th className="text-bodySmall p-2 whitespace-nowrap">تاریخ</th>
              <th className="text-bodySmall p-2 whitespace-nowrap">وضعیت</th>
            </tr>
          </thead>
          <tbody>
            {data.map((order, index) => (
              <tr
                key={order.id}
                className={`border-b border-customGray-300 custom-transition ${
                  index % 2 !== 0
                    ? "bg-customGray-100 hover:bg-customGray-200"
                    : "bg-white hover:bg-customGray-200"
                }`}
              >
                <td className="p-2 whitespace-nowrap">{order.id}</td>
                <td className="p-2 whitespace-nowrap">{order?.user?.email!}</td>
                <td className="p-2 whitespace-nowrap">
                  {formatPrice(order?.price!)} تومان
                </td>
                <td className="p-2 whitespace-nowrap">
                  {formatToJalali(order.createdAt)}
                </td>
                <td className="p-2 whitespace-nowrap">
                  <div
                    className={`rounded-full px-3 py-0.5 flex-center text-bodySmall w-fit bg-state-${orderStatusColor(
                      order?.status!
                    )}-200 text-state-${orderStatusColor(order?.status!)}`}
                  >
                    {order.status}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentOrdersTable;
