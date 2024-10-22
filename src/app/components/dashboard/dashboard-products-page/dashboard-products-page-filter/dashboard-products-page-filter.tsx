"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Button from "@/app/components/button/button";
import Dropdown from "@/app/components/dropdown/dropdown";
import { categoryItems } from "@/app/components/homepage/category/category";
import Modal from "@/app/components/modal/modal";
import FilterColors from "@/app/components/products-page-content/filters/filter-colors/filter-colors";
import FilterHeader from "@/app/components/products-page-content/filters/filter-header/filter-header";
import FilterPriceRange from "@/app/components/products-page-content/filters/filter-price-range/filter-price-range";
import FilterSizes from "@/app/components/products-page-content/filters/filter-sizes/filter-sizes";
import CategoryIcon from "@/app/icons/category-icon";
import CloseIcon from "@/app/icons/close-icon";
import { sizes } from "@/app/data/data";
import { Color } from "../../../../../../next-type-models";
import { MAX_PRICE, MIN_PRICE } from "@/app/lib/values";
import SearchBar from "@/app/components/search-bar/search-bar";

type Props = {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  filterColors: Color[];
};

const DashboardProductsPageFilter = ({
  isModalOpen,
  setIsModalOpen,
  filterColors,
}: Props) => {
  const [searchInput, setSearchInput] = useState<string>("");

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const [selectedColors, setSelectedColors] = useState<string[]>([]);

  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);

  const minPrice = MIN_PRICE;
  const maxPrice = MAX_PRICE;

  const [selectedMinPrice, setSelectedMinPrice] = useState(minPrice);
  const [selectedMaxPrice, setSelectedMaxPrice] = useState(maxPrice);

  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const colorsParam = searchParams.get("colors");
    const sizesParam = searchParams.get("sizes");
    const minPriceParam = searchParams.get("minPrice");
    const maxPriceParam = searchParams.get("maxPrice");
    const searchInputParam = searchParams.get("searchInput");
    const selectedCategoryParam = searchParams.get("selectedCategory");

    if (selectedCategoryParam) {
      setSelectedCategory(selectedCategoryParam);
    }
    if (searchInputParam) {
      setSearchInput(searchInputParam);
    }
    if (colorsParam) {
      setSelectedColors(colorsParam.split(","));
    }
    if (sizesParam) {
      setSelectedSizes(sizesParam.split(","));
    }
    if (minPriceParam) {
      setSelectedMinPrice(parseInt(minPriceParam, 10)); // Parse the string to integer
    }

    if (maxPriceParam) {
      setSelectedMaxPrice(parseInt(maxPriceParam, 10)); // Parse the string to integer
    }
  }, [searchParams]);

  const handleColorSelection = (colorName: string) => {
    if (colorName) {
      setSelectedColors((prevSelected) =>
        prevSelected.includes(colorName)
          ? prevSelected.filter((c) => c !== colorName)
          : [...prevSelected, colorName]
      );
    } else {
      setSelectedColors([]);
    }
  };

  const handleSizeSelection = (size: string) => {
    if (size) {
      setSelectedSizes((prevSelected) =>
        prevSelected.includes(size)
          ? prevSelected.filter((s) => s !== size)
          : [...prevSelected, size]
      );
    } else {
      setSelectedSizes([]);
    }
  };

  const applyFilters = () => {
    const queryParams = new URLSearchParams(searchParams.toString()); // Preserve existing query parameters

    if (searchInput) {
      queryParams.set("searchInput", searchInput);
    } else {
      queryParams.delete("searchInput");
    }

    // Check if a category is selected; if not, remove it from queryParams
    if (selectedCategory) {
      queryParams.set("selectedCategory", selectedCategory);
    } else {
      queryParams.delete("selectedCategory");
    }

    if (selectedColors.length > 0) {
      queryParams.set("colors", selectedColors.join(","));
    } else {
      queryParams.delete("colors");
    }

    if (selectedSizes.length > 0) {
      queryParams.set("sizes", selectedSizes.join(","));
    } else {
      queryParams.delete("sizes");
    }

    // Add selected price range to query parameters
      if (selectedMinPrice > minPrice) {
        queryParams.set("minPrice", selectedMinPrice.toString());
      } else {
        queryParams.delete("minPrice");
      }
      if (selectedMaxPrice < maxPrice) {
        queryParams.set("maxPrice", selectedMaxPrice.toString());
      } else {
        queryParams.delete("maxPrice");
      }

    // Navigate with query parameters
    router.push(`/dashboard/products?${queryParams.toString()}`);

    // close modal
    setIsModalOpen(false);
  };

  //Reset Filters Function
  const resetFilters = () => {
    // Reset local states
    setSearchInput("");
    setSelectedCategory(null);
    setSelectedColors([]);
    setSelectedSizes([]);
    setSelectedMinPrice(MIN_PRICE);
    setSelectedMaxPrice(MIN_PRICE);

    // Remove query params
    const queryParams = new URLSearchParams(searchParams.toString());
    queryParams.delete("searchInput");
    queryParams.delete("selectedCategory");
    queryParams.delete("colors");
    queryParams.delete("sizes");
    queryParams.delete("sizeCategory");
    queryParams.delete("minPrice");
    queryParams.delete("maxPrice");

    // Navigate with the cleared query parameters
    router.push(`/dashboard/products?${queryParams.toString()}`);
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen((prev) => !prev)}
      header={
        <div className="w-full h-14 bg-primary-100 flex items-center justify-between px-4 py-2 text-bodyMain text-primary-main">
          <span>فیلترها</span>
          <button
            className="custom-transition rounded-full p-0.5 hover:bg-primary-200"
            onClick={() => setIsModalOpen((prev) => !prev)}
          >
            <CloseIcon styles="size-6" />
          </button>
        </div>
      }
    >
      <div className="w-full flex flex-col gap-3">
        {/* header */}
        <FilterHeader onResetFilters={resetFilters} />
        {/* search */}
        <div className="rounded-xl h-14">
          <SearchBar
            searchInput={searchInput}
            setSearchInput={setSearchInput}
          />
        </div>
        {/* category */}
        <div className="rounded-xl bg-white shadow h-14">
          <Dropdown
            onSelectItem={setSelectedCategory}
            selectedItem={selectedCategory}
            label={
              <div className="flex items-center gap-1">
                <CategoryIcon styles="size-6 mb-1" />
                دسته بندی
              </div>
            }
            items={categoryItems}
          />
        </div>
        {/* colors */}
        <FilterColors
          colors={filterColors!}
          selectedColors={selectedColors}
          handleColorSelection={handleColorSelection}
        />
        {/* sizes */}
        <FilterSizes
          sizes={sizes}
          selectedSizeCategory={selectedCategory!}
          selectedSizes={selectedSizes}
          handleSizeSelection={handleSizeSelection}
        />
        {/* price range */}
        <FilterPriceRange
          minPrice={minPrice}
          maxPrice={maxPrice}
          selectedMinPrice={selectedMinPrice}
          selectedMaxPrice={selectedMaxPrice}
          setSelectedMinPrice={setSelectedMinPrice}
          setSelectedMaxPrice={setSelectedMaxPrice}
        />

        {/* button */}
        <div className="w-full">
          <Button
            color="primary-main"
            size="large"
            styles="w-full"
            onClick={applyFilters}
          >
            اعمال فیلترها
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default DashboardProductsPageFilter;
