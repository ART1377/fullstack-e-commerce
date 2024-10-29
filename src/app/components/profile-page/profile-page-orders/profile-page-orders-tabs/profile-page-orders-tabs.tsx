"use client";

import React, { useState } from "react";
import ProfilePageOrderItem from "../../profile-page-order-item/profile-page-order-item";
import TabItems from "@/app/components/tab-items/tab-items";

type Props = {
  orders: {
    id: string;
    discountAmount: number;
    price: number;
    createdAt: Date;
    products: {
      title: string;
      id: string;
      image: string;
    }[];
    status: string;
  }[];
};

const tabItems: string[] = ["جاری", "تحویل شده", "مرجوع شده"];

const ProfilePageOrdersTabs = ({ orders }: Props) => {
  const [currentTab, setCurrentTab] = useState<string>(tabItems[0]);

  const tabColor =
    currentTab === "جاری"
      ? "warning"
      : currentTab === "تحویل شده"
      ? "success"
      : currentTab === "مرجوع شده"
      ? "error"
      : "";

  const currentOrders = orders.filter((order) => order.status === currentTab);

  return (
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
        {currentOrders.length > 0 ? (
          currentOrders.map((order) => {
            return <ProfilePageOrderItem key={order.id} order={order} />;
          })
        ) : (
          <div className="w-full px-4 py-8 bg-state-error-200 text-state-error rounded-xl flex-center flex-col gap-4 text-center text-bodyMain">
            <p>{`سفارش
            " ${currentTab} "
             موجود نیست`}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePageOrdersTabs;
