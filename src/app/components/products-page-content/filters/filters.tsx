"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Dropdown from "../../dropdown/dropdown";
import { categoryItems } from "../../homepage/category/category";
import { sizes } from "@/app/data/data";
import FilterColors from "./filter-colors/filter-colors";
import FilterSizes from "./filter-sizes/filter-sizes";
import FilterPriceRange from "./filter-price-range/filter-price-range";
import Button from "../../button/button";
import FilterHeader from "./filter-header/filter-header";
import Modal from "../../modal/modal";
import CloseIcon from "@/app/icons/close-icon";
import CategoryIcon from "@/app/icons/category-icon";
import FilterEmptyIcon from "@/app/icons/filter-empty-icon";
import DeleteIcon from "@/app/icons/delete-icon";
import { MAX_PRICE, MIN_PRICE } from "@/app/lib/values";
import SearchBar from "../../search-bar/search-bar";
import { Color } from "../../../../../next-type-models";

type Props = {
  filterColors: Color[];
};

const Filters = ({ filterColors }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    // Reset local states
    setSearchInput("");
    setSelectedCategory(null);
    setSelectedColors([]);
    setSelectedSizes([]);
    setSelectedMinPrice(MIN_PRICE);
    setSelectedMaxPrice(MAX_PRICE);

    const colorsParam = searchParams.get("colors");
    const sizesParam = searchParams.get("sizes");
    const sizeCategoryParam = searchParams.get("sizeCategory");
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
    router.push(`/products?${queryParams.toString()}`);

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
    setSelectedMaxPrice(MAX_PRICE);

    // Remove query params
    const queryParams = new URLSearchParams(searchParams.toString());
    queryParams.delete("searchInput");
    queryParams.delete("selectedCategory");
    queryParams.delete("colors");
    queryParams.delete("sizes");
    queryParams.delete("minPrice");
    queryParams.delete("maxPrice");

    // Navigate with the cleared query parameters
    router.push(`/products?${queryParams.toString()}`);
  };

  return (
    <>
      {/* Button to open modal on small screens */}
      <div className="sm:hidden rounded-xl bg-primary-100 p-2 flex justify-between items-center h-14">
        <button
          onClick={() => setIsModalOpen((prev) => !prev)}
          className="bg-primary-200 rounded-xl px-3 py-1.5 flex-center text-center text-bodyMain text-primary-main custom-transition hover:bg-primary-300"
        >
          <FilterEmptyIcon styles="size-6" />
          <span>فیلترها</span>
        </button>
        <button
          onClick={resetFilters}
          className="bg-state-error-200 rounded-xl px-3 py-1.5 flex-center text-center text-bodyMain text-state-error custom-transition hover:bg-state-error-300"
        >
          <DeleteIcon styles="size-6" />
          <span>حذف فیلترها</span>
        </button>
      </div>

      {/* Modal for small screens */}
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

      <div className="hidden sm:flex min-w-[280px] w-3/12 flex-col gap-3">
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
    </>
  );
};

export default Filters;
