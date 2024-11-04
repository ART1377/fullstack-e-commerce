import React from "react";
import DashboardNotificationsPageHeader from "./dashboard-notifications-page-header/dashboard-notifications-page-header";
import NotificationsList from "./notifications-list/notifications-list";
import { SearchQueries } from "../../../../../next-type-models";
import { PAGE_LIMIT } from "@/app/lib/values";
import * as actions from "@/app/actions/notification-actions/notification-actions";

export const revalidate = 3600;

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

const DashboardNotificationsPage = async ({ searchParams }: Props) => {
  const { page, sort } = searchParams as SearchQueries;

  // Fetch notifications using the updated searchParams
  const { notifications, totalCount } = await actions.getAllNotification({
    limit: PAGE_LIMIT,
    page: (page as string) || "1",
    sortBy:
      sort === "قدیمی ترین"
        ? "date"
        : sort === "جدید ترین"
        ? "date"
        : undefined,
    sortOrder:
      sort === "جدید ترین" ? "desc" : sort === "قدیمی ترین" ? "asc" : undefined,
  });

  return (
    <section className="bg-white shadow rounded-xl pb-20">
      {/* header */}
      <DashboardNotificationsPageHeader totalItems={totalCount!} />
      {/* notification table */}

      {totalCount! > 0 ? (
        <NotificationsList
          totalItems={totalCount!}
          notifications={notifications!}
        />
      ) : (
        <p className="text-bodyMain text-state-error py-5 px-3 rounded-lg bg-state-error-200 m-4 text-center">
          اعلانی یافت نشد
        </p>
      )}
    </section>
  );
};

export default DashboardNotificationsPage;
