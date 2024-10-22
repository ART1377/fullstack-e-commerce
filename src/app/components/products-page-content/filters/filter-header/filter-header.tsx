import DeleteIcon from "@/app/icons/delete-icon";
import FilterEmptyIcon from "@/app/icons/filter-empty-icon";
import React from "react";

type Props = {
  onResetFilters: () => void;
};

const FilterHeader = ({ onResetFilters }: Props) => {
  return (
    <div className="rounded-xl bg-primary-100 p-2 flex justify-between items-center h-14">
      <button className="bg-primary-200 rounded-xl px-3 py-1.5 flex-center text-center text-bodyMain text-primary-main  custom-transition hover:bg-primary-300">
        <FilterEmptyIcon styles="size-6" />
        <span>فیلترها</span>
      </button>
      <button
        onClick={onResetFilters}
        className="bg-state-error-200 rounded-xl px-3 py-1.5 flex-center text-center text-bodyMain text-state-error custom-transition hover:bg-state-error-300"
      >
        <DeleteIcon styles="size-6" />
        <span>حذف فیلترها</span>
      </button>
    </div>
  );
};

export default FilterHeader;
