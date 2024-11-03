import React from "react";
import DashboardPageContent from "./dashboard-page-content/dashboard-page-content";
import * as actions from "@/app/actions/dashboard-actoins/dashboard-actoins";

const DashboardPage = async () => {
  const data = await actions.loadDashboardData();

  return (
      <section className="bg-white shadow rounded-xl pb-20">
        <DashboardPageContent data={data} />
      </section>
  );
};

export default DashboardPage;
