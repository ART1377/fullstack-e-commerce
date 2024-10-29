import React from "react";
import ProfilePageOrdersStatus from "../profile-page-orders-status/profile-page-orders-status";
import ProfilePageOrdersTabs from "./profile-page-orders-tabs/profile-page-orders-tabs";
import * as actions from "@/app/actions/order-actions/order-actions";
import { auth } from "@/app/auth";

type Props = {};

const ProfilePageOrders = async (props: Props) => {

  const session = await auth();

  const {
    orders,
    statusCount: { delivered, ongoing, returned },
  } = await actions.getUserOrdersWithDetails(session?.user?.id!);

  return (
    <>
      {/* orders header */}
      <div className="text-dark text-bodyMain pb-2 border-b border-customGray-300">
        <h1>سفارشات</h1>
      </div>
      {/* order states */}
      <ProfilePageOrdersStatus
        pendingOrdersCount={ongoing}
        deliveredOrdersCount={delivered}
        returnedOrdersCount={returned}
      />
      {/* order tabs */}
      <ProfilePageOrdersTabs orders={orders} />
    </>
  );
};

export default ProfilePageOrders;
