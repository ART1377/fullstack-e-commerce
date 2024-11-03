import React from "react";

type Props = {
  totalSales: number;
  totalOrders: number;
  totalUsers: number;
  productsInStock: number;
};

const DashboardMetricCards = ({
  productsInStock,
  totalOrders,
  totalSales,
  totalUsers,
}: Props) => {
  return (
    <div className="p-3 grid grid-cols-1 gap-3 mb-8 xs:grid-cols-2 sm:grid-cols-1 md:grid-cols-2 blgxl:grid-cols-4">
      <div className="px-3 py-16 text-primary-main border border-primary-main rounded-xl shadow flex-center flex-col gap-4 relative overflow-hidden">
        <p className="text-bodyMain">فروش کل</p>
        <small className="text-h6">{totalSales} تومان</small>
        <div className="absolute bottom-0 w-full h-4 bg-primary-main"></div>
      </div>

      <div className="px-3 py-16 text-state-success border border-state-success rounded-xl shadow flex-center flex-col gap-4 relative overflow-hidden">
        <p className="text-bodyMain">کل سفارشات</p>
        <small className="text-h6">{totalOrders}</small>
        <div className="absolute bottom-0 w-full h-4 bg-state-success"></div>
      </div>

      <div className="px-3 py-16 text-state-warning border border-state-warning rounded-xl shadow flex-center flex-col gap-4 relative overflow-hidden">
        <p className="text-bodyMain">کل کاربران</p>
        <small className="text-h6">{totalUsers}</small>
        <div className="absolute bottom-0 w-full h-4 bg-state-warning"></div>
      </div>

      <div className="px-3 py-16 text-state-error border border-state-error rounded-xl shadow flex-center flex-col gap-4 relative overflow-hidden">
        <p className="text-bodyMain">محصولات در انبار</p>
        <small className="text-h6">{productsInStock}</small>
        <div className="absolute bottom-0 w-full h-4 bg-state-error"></div>
      </div>
    </div>
  );
};

export default DashboardMetricCards;
