"use client";

import Dropdown from "@/app/components/dropdown/dropdown";
import CheapIcon from "@/app/icons/cheap-icon";
import ExpensiveIcon from "@/app/icons/expensive-icon";
import SortIcon from "@/app/icons/sort-icon";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

type Props = {
  totalItems: number;
};

const ProductListHeader = ({ totalItems }: Props) => {
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
    router.push(`/products?${queryParams.toString()}`);
  };

  return (
    <div className="w-full bg-white rounded-xl shadow px-3 py-1 flex items-center justify-between mt-2 mb-4 sm:mt-0">
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
              title: "گران ترین",
              icon: <ExpensiveIcon styles="size-6" />,
            },
            {
              title: "ارزان ترین",
              icon: <CheapIcon styles="size-6" />,
            },
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
      {/* products count */}
      <div className="text-bodySmall text-customGray-700">
        <span className="ml-1">{totalItems}</span>
        محصول
      </div>
    </div>
  );
};

export default ProductListHeader;
