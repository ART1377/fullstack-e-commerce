import React from "react";
import DashboardUsersPageHeader from "./dashboard-users-page-header/dashboard-users-page-header";
import UsersTable from "./users-table/users-table";
import { SearchQueries } from "../../../../../next-type-models";
import * as actions from "@/app/actions/user-actions/user-actions";
import { PAGE_LIMIT } from "@/app/lib/values";

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

const DashboardUsersPage = async ({ searchParams }: Props) => {
  const { page, searchInput, sort } = searchParams as SearchQueries;

  // Fetch products using the updated searchParams
  const { users, totalCount } = await actions.getAllUsers({
    limit: PAGE_LIMIT,
    page: page as string,
    sortBy:
      sort === "تاریخ عضویت صعودی" || "تاریخ عضویت نزولی"
        ? "createdAt"
        : undefined,
    sortOrder:
      sort === "تاریخ عضویت صعودی"
        ? "asc"
        : sort === "تاریخ عضویت نزولی"
        ? "desc"
        : undefined,
    searchQuery: searchInput ? (searchInput as string) : "",
  });

  return (
    <section className="bg-white shadow rounded-xl pb-3">
      {/* header */}
      <DashboardUsersPageHeader totalItems={totalCount!} />
      {/* products table */}
      {totalCount! > 0 ? (
        <UsersTable totalItems={totalCount!} users={users!} />
      ) : (
        <p className="text-bodyMain text-state-error py-5 px-3 rounded-lg bg-state-error-200 m-4 text-center">
          کاربری یافت نشد
        </p>
      )}
    </section>
  );
};

export default DashboardUsersPage;
