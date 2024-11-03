"use client";

import React from "react";
import { DashboardData } from "../../../../../../next-type-models";
import OrdersStatusPieChart from "@/app/components/dashboard/dashboard-page/dashboard-page-content/orders-status-pie-chart/orders-status-pie-chart";
import SellChart from "./sell-chart/sell-chart";
import LowStockAlert from "./low-stock-alert/low-stock-alert";
import RecentOrdersTable from "./recent-orders-table/recent-orders-table";
import DashboardMetricCards from "./dashboard-metric-cards/dashboard-metric-cards";
import DashboardMainPageHeader from "./dashboard-main-page-header/dashboard-main-page-header";

type Props = {
  data: DashboardData;
};

export const orderStatusColor = (status: string) => {
  const color =
    status === "جاری"
      ? "warning"
      : status === "تحویل شده"
      ? "success"
      : status === "مرجوع شده"
      ? "error"
      : "";

  return color;
};
const DashboardPageContent = ({ data }: Props) => {
  return (
    <div>
      <DashboardMainPageHeader />
      {/* Key Metrics */}
      <DashboardMetricCards
        totalSales={data.totalSales}
        totalOrders={data.totalOrders}
        totalUsers={data.totalUsers}
        productsInStock={data.productsInStock}
      />

      {/* Sales Trend Chart */}
      <SellChart data={data.salesData} />
      {/* Order Status Percentages */}
      <OrdersStatusPieChart data={data.statusPercentages} />

      {/* Low Stock Alerts */}
      <LowStockAlert data={data.lowStockProducts} />

      {/* Recent Orders Table */}
      <RecentOrdersTable data={data.recentOrders} />
    </div>
  );
};

export default DashboardPageContent;
