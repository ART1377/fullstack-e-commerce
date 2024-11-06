"use client";

import React, { useEffect, useState } from "react";
import Dropdown from "../../../dropdown/dropdown";
import SortIcon from "@/app/icons/sort-icon";
import ExpensiveIcon from "@/app/icons/expensive-icon";
import CheapIcon from "@/app/icons/cheap-icon";
import FilterEmptyIcon from "@/app/icons/filter-empty-icon";
import Button from "../../../button/button";
import PlusIcon from "@/app/icons/plus-icon";
import Tooltip from "../../../tooltip/tooltip";
import DashboardProductsPageFilter from "../dashboard-products-page-filter/dashboard-products-page-filter";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Color } from "../../../../../../next-type-models";

type Props = {
  totalItems: number;
  filterColors: Color[];
};

const DashboardProductsPageHeader = ({ totalItems, filterColors }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    router.push(`/dashboard/products?${queryParams.toString()}`);
  };

  return (
    <>
      <DashboardProductsPageFilter
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        filterColors={filterColors}
      />
      {/* title and products count */}
      <div className="flex justify-between items-center p-3">
        <h1 className="text-dark text-bodyMain">لیست محصولات</h1>
        {/* products count */}
        <div className="text-bodySmall text-customGray-700">
          <span className="ml-1">{totalItems}</span>
          محصول
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
                title: "گران ترین",
                icon: <ExpensiveIcon styles="size-6" />,
              },
              {
                title: "ارزان ترین",
                icon: <CheapIcon styles="size-6" />,
              },
            ]}
          />
        </div>
        {/* buttons */}
        <div className="flex flex-wrap gap-2 my-4">
          <Tooltip color="primary-light" content="فیلترها">
            <button
              onClick={() => setIsModalOpen((prev) => !prev)}
              className="h-full bg-primary-200 rounded-xl px-3 py-1.5 flex-center text-center text-bodyMain text-primary-main custom-transition hover:bg-primary-300"
            >
              <FilterEmptyIcon styles="size-6" />
              <span className="hidden md:block">فیلترها</span>
            </button>
          </Tooltip>
          {/* <Tooltip color="state-error" content="حذف فیلترها">
            <button className="h-full bg-state-error-200 rounded-xl px-3 py-1.5 flex-center text-center text-bodyMain text-state-error custom-transition hover:bg-state-error-300">
              <DeleteIcon styles="size-6" />
              <span className="hidden md:block">حذف فیلترها</span>
            </button>
          </Tooltip> */}
          <Tooltip content="افزودن محصول">
            <Link
              href={"/dashboard/products/add-product"}
              aria-label="add-product"
            >
              <Button icon={<PlusIcon styles="size-6" />}>
                <span className="hidden md:block">افزودن محصول</span>
              </Button>
            </Link>
          </Tooltip>
        </div>
      </div>
    </>
  );
};

export default DashboardProductsPageHeader;
