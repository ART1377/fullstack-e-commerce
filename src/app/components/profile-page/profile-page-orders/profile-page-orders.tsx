"use client";

import React, { useState } from "react";
import TabItems from "../../tab-items/tab-items";
import { Order, User } from "../../../../../next-type-d";
import ProfilePageOrderItem from "../profile-page-order-item/profile-page-order-item";
import ProfilePageOrdersStatus from "../profile-page-orders-status/profile-page-orders-status";

const tabItems: string[] = ["جاری", "تحویل شده", "مرجوع شده"];

type Props = {
  user: User;
};

const ProfilePageOrders = ({ user }: Props) => {
  const [currentTab, setCurrentTab] = useState<string>(tabItems[0]);

  const tabColor =
    currentTab === "جاری"
      ? "warning"
      : currentTab === "تحویل شده"
      ? "success"
      : currentTab === "مرجوع شده"
      ? "error"
      : "";

  const pendingOrders = user.orders.filter(
    (order: Order) => order.status === "pending"
  );
  const deliveredOrders = user.orders.filter(
    (order: Order) => order.status === "delivered"
  );
  const returnedOrders = user.orders.filter(
    (order: Order) => order.status === "returned"
  );

  const currentOrders =
    currentTab === "جاری"
      ? pendingOrders
      : currentTab === "تحویل شده"
      ? deliveredOrders
      : returnedOrders;

  return (
    <>
      {/* orders header */}
      <div className="text-dark text-bodyMain pb-2 border-b border-customGray-300">
        <h1>سفارشات</h1>
      </div>
      {/* order states */}
      <ProfilePageOrdersStatus
        pendingOrdersCount={pendingOrders.length}
        deliveredOrdersCount={deliveredOrders.length}
        returnedOrdersCount={returnedOrders.length}
      />
      {/* order tabs */}
      <div className="flex flex-col w-full my-10">
        <TabItems
          tabItems={tabItems}
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
        />
        <div className="flex flex-col gap-4 rounded-xl bg-light p-2">
          {/* tab content header */}
          <div className="text-dark text-bodyMain pb-2 border-b border-customGray-300 flex items-center gap-2">
            <div className={`size-6 rounded-full bg-state-${tabColor}`}></div>
            <h2>{currentTab}</h2>
          </div>
          {currentOrders.map((order: Order) => {
            return <ProfilePageOrderItem key={order.id} order={order} />;
          })}
        </div>
      </div>
    </>
  );
};

export default ProfilePageOrders;
