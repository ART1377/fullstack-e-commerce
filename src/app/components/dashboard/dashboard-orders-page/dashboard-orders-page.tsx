import React from "react";
import DashboardOrdersPageHeader from "./dashboard-orders-page-header/dashboard-orders-page-header";
import OrdersTable from "./orders-table/orders-table";
import { SearchQueries } from "../../../../../next-type-models";
import { PAGE_LIMIT } from "@/app/lib/values";
import * as actions from "@/app/actions/order-actions/order-actions";


export const revalidate = 60 * 10;

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

const DashboardOrdersPage = async ({ searchParams }: Props) => {
  const { page, sort } = searchParams as SearchQueries;

  // Fetch orders using the updated searchParams
  const { orders, totalCount } = await actions.getAllOrders({
    limit: PAGE_LIMIT,
    page: page as string,
    sortBy:
      sort === "ارزان ترین"
        ? "price"
        : sort === "گران ترین"
        ? "price"
        : sort === "قدیمی ترین"
        ? "date"
        : sort === "جدید ترین"
        ? "date"
        : undefined,
    sortOrder:
      sort === "ارزان ترین"
        ? "asc"
        : sort === "گران ترین"
        ? "desc"
        : sort === "جدید ترین"
        ? "desc"
        : sort === "قدیمی ترین"
        ? "asc"
        : undefined,
  });


  return (
    <section className="bg-white shadow rounded-xl pb-20">
      {/* header */}
      <DashboardOrdersPageHeader totalItems={totalCount!} />
      {/* orders table */}
      {totalCount! > 0 ? (
        <OrdersTable totalItems={totalCount!} orders={orders!} />
      ) : (
        <p className="text-bodyMain text-state-error py-5 px-3 rounded-lg bg-state-error-200 m-4 text-center">
          سفارشی یافت نشد
        </p>
      )}
    </section>
  );
};

export default DashboardOrdersPage;
