"use client";

import React, { useEffect, useState } from "react";
import Dropdown from "../../../dropdown/dropdown";
import SortIcon from "@/app/icons/sort-icon";
import ExpensiveIcon from "@/app/icons/expensive-icon";
import CheapIcon from "@/app/icons/cheap-icon";
import { useRouter, useSearchParams } from "next/navigation";

type Props = {
  totalItems: number;
};

const DashboardNotificationsPageHeader = ({ totalItems }: Props) => {
  const [sortOption, setSortOption] = useState<string | null>(null); // State for sorting option
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Get the current sort parameter from the query on initial load
    const sortParam = searchParams.get("sort");
    if (sortParam) {
      setSortOption(sortParam);
    }
  }, [searchParams]);

  const handleSortChange = (selectedSort: string | null) => {
    setSortOption(selectedSort);

    // Create a new query parameter string with the selected sort option
    const queryParams = new URLSearchParams(searchParams.toString());
    if (selectedSort) {
      queryParams.set("sort", selectedSort);
    } else {
      queryParams.delete("sort"); // If no sort option is selected, remove the query parameter
    }

    // Update the URL with the new query parameters
    router.push(`/dashboard/users?${queryParams.toString()}`);
  };

  return (
    <>
      <div className="flex justify-between items-center p-3">
        <p className="text-dark text-bodyMain">لیست اعلانات</p>
        {/* products count */}
        <div className="text-bodySmall text-customGray-700">
          <span className="ml-1">{totalItems}</span>
          پیام
        </div>
      </div>
      <div className="flex justify-between items-center flex-wrap p-2">
        {/* sort */}
        <div className="min-w-[160px] rounded-xl">
          <Dropdown
            onSelectItem={handleSortChange}
            selectedItem={sortOption}
            label={
              <div className="flex items-center gap-1">
                <SortIcon styles="size-6" />
                مرتب سازی
              </div>
            }
            items={[
              {
                title: "جدید ترین",
                icon: <ExpensiveIcon styles="size-6" />,
              },
              {
                title: "قدیمی ترین",
                icon: <CheapIcon styles="size-6" />,
              },
            ]}
          />
        </div>
      </div>
    </>
  );
};

export default DashboardNotificationsPageHeader;
