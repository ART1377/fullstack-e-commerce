import { orders } from "@/app/data/data";
import React from "react";
import DashboardOrdersPageHeader from "./dashboard-orders-page-header/dashboard-orders-page-header";
import OrdersTable from "./orders-table/orders-table";
import { SearchQueries } from "../../../../../next-type-models";
import { PAGE_LIMIT } from "@/app/lib/values";
import * as actions from "@/app/actions/order-actions/order-actions";

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

const DashboardOrdersPage = async ({ searchParams }: Props) => {
  const { page, sort } = searchParams as SearchQueries;

  // Fetch products using the updated searchParams
  const { orders, totalCount } = await actions.getAllOrders({
    limit: PAGE_LIMIT,
    page: page as string,
    sortBy:
      sort === "ارزان ترین" || "گران ترین"
        ? "price"
        : sort === "قدیمی ترین" || "جدید ترین"
        ? "date"
        : undefined,
    sortOrder:
      sort === "ارزان ترین" || "جدید ترین"
        ? "asc"
        : sort === "گران ترین" || "قدیمی ترین"
        ? "desc"
        : undefined,
  });

  const ordersCount = orders?.length;

  return (
    <section className="bg-white shadow rounded-xl pb-20">
      {/* header */}
      <DashboardOrdersPageHeader totalItems={totalCount!} />
      {/* products table */}
      {totalCount! > 0 ? (
        <OrdersTable totalItems={totalCount!} orders={orders!} />
      ) : (
        <p className="text-bodyMain text-state-error py-2 px-3 rounded-lg bg-state-error-200 m-4 text-center mb-3">
          سفارشی یافت نشد
        </p>
      )}
    </section>
  );
};

export default DashboardOrdersPage;
