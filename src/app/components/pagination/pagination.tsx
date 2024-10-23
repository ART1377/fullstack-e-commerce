"use client";

import ArrowDoubleLeftIcon from "@/app/icons/arrow-double-left-icon";
import ArrowDoubleRightIcon from "@/app/icons/arrow-double-right-icon";
import ArrowLeftIcon from "@/app/icons/arrow-left-icon";
import ArrowRightIcon from "@/app/icons/arrow-right-icon";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

type PaginationProps = {
  totalItems: number;
  itemsPerPage: number;
};

const Pagination = ({ totalItems, itemsPerPage }: PaginationProps) => {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  useEffect(() => {
    const page = searchParams.get("page");

    // If page param is missing, set it to 1
    if (!page) {
      const queryParams = new URLSearchParams(searchParams.toString());
      queryParams.set("page", "1");

      // Push the updated query with page=1 into the URL
      router.push(`${pathName}?${queryParams.toString()}`);
    } else {
      // If page is already present, set the state
      setCurrentPage(parseInt(page));
    }
  }, [pathName, router, searchParams]);

  const handlePageChange = (page: number) => {
    const queryParams = new URLSearchParams(searchParams.toString());
    queryParams.set("page", page.toString());
    // Push the updated page to the router
    router.push(`${pathName}?${queryParams.toString()}`);
    setCurrentPage(page);
  };

  // useEffect(() => {
  //   const queryParams = new URLSearchParams(window.location.search);
  //   if (queryParams.get("page")) {
  //     const page = parseInt(queryParams.get("page") as string);
  //     setCurrentPage(page);
  //   } else {
  //     queryParams.set("page", "1");
  //     setCurrentPage(1);
  //     // Navigate with query parameters
  //     router.push(`${pathName}?${queryParams.toString()}`);
  //   }
  // }, []);

  // const handlePageChange = (page: number) => {
  //   const queryParams = new URLSearchParams(window.location.search);
  //   queryParams.set("page", page.toString());
  //   window.history.pushState({}, "", `?${queryParams.toString()}`);
  //   setCurrentPage(page);
  // };

  const array = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div id="pagination" className="flex justify-center mt-4">
      <nav className="flex gap-1">
        <button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(1)}
          className="size-8 shadow rounded-lg flex-center text-primary-main bg-primary-100 custom-transition hover:bg-primary-300 hover:shadow-none"
        >
          <ArrowDoubleRightIcon styles="size-6" />
        </button>
        <button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
          className="size-8 shadow rounded-lg flex-center text-primary-main bg-primary-100 custom-transition hover:bg-primary-300 hover:shadow-none"
        >
          <ArrowRightIcon styles="size-6" />
        </button>
        {array.map((item) => (
          <button
            key={item}
            onClick={() => handlePageChange(item)}
            className={`size-8 shadow rounded-lg flex-center custom-transition hover:shadow-none ${
              currentPage === item
                ? "bg-primary-main text-white hover:bg-primary-dark"
                : "bg-white text-primary-main hover:bg-customGray-200"
            }`}
          >
            {item}
          </button>
        ))}
        <button
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
          className="size-8 shadow rounded-lg flex-center text-primary-main bg-primary-100 custom-transition hover:bg-primary-300 hover:shadow-none"
        >
          <ArrowLeftIcon styles="size-6" />
        </button>
        <button
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(totalPages)}
          className="size-8 shadow rounded-lg flex-center text-primary-main bg-primary-100 custom-transition hover:bg-primary-300 hover:shadow-none"
        >
          <ArrowDoubleLeftIcon styles="size-6" />
        </button>
      </nav>
    </div>
  );
};

export default Pagination;
