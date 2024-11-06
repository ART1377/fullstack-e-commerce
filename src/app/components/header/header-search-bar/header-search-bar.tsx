import React from "react";
import SearchIcon from "@/app/icons/search-icon";
import Link from "next/link";

type Props = {
  searchInput: string;
  setSearchInput: React.Dispatch<React.SetStateAction<string>>;
};

const HeaderSearchBar = ({ searchInput, setSearchInput }: Props) => {
  return (
    <div className={`rounded-full relative h-full  bg-customGray-100`}>
      <input
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        type="search"
        placeholder="دنبال چی میگردی؟"
        className={`w-full h-full bg-transparent focus:outline-none rounded-full placeholder:text-sm font-normal p-2 pr-12
        `}
      />
      <Link
        href={`/products?page=1&searchInput=${searchInput}`}
        aria-label="search-result"
        className="h-full aspect-square rounded-full bg-customGray-300 flex-center absolute right-0 top-0 custom-transition hover:bg-customGray-400 cursor-pointer"
      >
        <SearchIcon />
      </Link>
    </div>
  );
};

export default HeaderSearchBar;
