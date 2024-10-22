import React from 'react'
import DashboardNotificationsPageHeader from './dashboard-notifications-page-header/dashboard-notifications-page-header';
import { notifications } from '@/app/data/data';
import NotificationsList from './notifications-list/notifications-list';

type Props = {}

const DashboardNotificationsPage = (props: Props) => {
    const NotificationsCount = notifications.length;

  return (
    <section className="bg-white shadow rounded-xl pb-20">
      {/* header */}
      <DashboardNotificationsPageHeader totalItems={NotificationsCount} />
      {/* products table */}
      <NotificationsList notifications={notifications} />
    </section>
  );
}

export default DashboardNotificationsPage