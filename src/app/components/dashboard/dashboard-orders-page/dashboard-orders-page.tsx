import { orders } from "@/app/data/data";
import React from "react";
import DashboardOrdersPageHeader from "./dashboard-orders-page-header/dashboard-orders-page-header";
import OrdersTable from "./orders-table/orders-table";

type Props = {};

const DashboardOrdersPage = (props: Props) => {
  const ordersCount = orders.length;

  return (
    <section className="bg-white shadow rounded-xl pb-20">
      {/* header */}
      <DashboardOrdersPageHeader totalItems={ordersCount} />
      {/* products table */}
      <OrdersTable totalItems={ordersCount} />
    </section>
  );
};

export default DashboardOrdersPage;
