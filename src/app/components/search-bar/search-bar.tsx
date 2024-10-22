"use client";

import React from "react";
import SearchIcon from "@/app/icons/search-icon";
import { useRouter } from "next/navigation";

type Props = {
  searchInput: string;
  setSearchInput: React.Dispatch<React.SetStateAction<string>>;
};

const SearchBar = ({ searchInput, setSearchInput }: Props) => {
  const router = useRouter();

  const handleSearch = () => {
    const params = new URLSearchParams(window.location.search);
    if (searchInput) {
      // Set the new 'searchInput' query parameter
      params.set("searchInput", searchInput);
    } else {
      // If search input is empty, remove the 'searchInput' parameter
      params.delete("searchInput");
    }

    // Update the URL while preserving other query params
    router.push(`?${params.toString()}`);
  };

  return (
    <div className={`rounded-full relative h-full  bg-customGray-100`}>
      <input
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        type="search"
        placeholder="دنبال چی میگردی؟"
        className={`w-full h-full bg-transparent focus:outline-none rounded-full placeholder:text-sm font-normal p-2 pr-16
        `}
      />
      <button
        onClick={handleSearch}
        className="h-full aspect-square rounded-full bg-customGray-300 flex-center absolute right-0 top-0 custom-transition hover:bg-customGray-400 cursor-pointer"
      >
        <SearchIcon />
      </button>
    </div>
  );
};

export default SearchBar;
