import React, { Suspense } from "react";
import DashboardPageContent from "./dashboard-page-content/dashboard-page-content";
import * as actions from "@/app/actions/dashboard-actoins/dashboard-actoins";
import Spinner from "../../spinner/spinner";

const DashboardPage = async () => {
  const data = await actions.loadDashboardData();

  return (
    <Suspense fallback={<Spinner size={50} />}>
      <section className="bg-white shadow rounded-xl p-3 pb-20">
        <DashboardPageContent data={data} />
      </section>
    </Suspense>
  );
};

export default DashboardPage;
