"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import Dropdown from "@/app/components/dropdown/dropdown";
import SortIcon from "@/app/icons/sort-icon";
import LikeIcon from "@/app/icons/like-icon";
import DislikeIcon from "@/app/icons/dislike-icon";
import NewIcon from "@/app/icons/new-icon";
import Testimonial from "@/app/components/testimonial/testimonial";
import { Comment } from "../../../../../../next-type-d";

type Props = {
  comments: Comment[];
  commentsCount: number;
};

const ProductPageContentComments = ({ comments, commentsCount }: Props) => {
  const [sortOption, setSortOption] = useState<string | null>(null); // State for sorting option
  const router = useRouter();
  const searchParams = useSearchParams();
  const { id } = useParams();

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
    router.push(`/products/${id}?${queryParams.toString()}`, { scroll: false });
  };

  return (
    <>
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
                title: "جدیدترین",
                icon: <NewIcon styles="size-6" />,
              },
              {
                title: "بیشترین لایک",
                icon: <LikeIcon styles="size-6" />,
              },
              {
                title: "بیشترین دیسلایک",
                icon: <DislikeIcon styles="size-6" />,
              },
            ]}
          />
        </div>
        {/* products count */}
        <div className="text-bodySmall text-customGray-700">
          <span className="ml-1">{commentsCount}</span>
          محصول
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {comments.map((comment: Comment) => {
          return <Testimonial key={comment.id} comment={comment} />;
        })}
      </div>
    </>
  );
};

export default ProductPageContentComments;
