"use client";

import React, { useState } from "react";
import ProductPageContentComments from "./product-page-comments/product-page-comments";
import ProductPageContentFeatures from "./product-page-features/product-page-features";
import TabItems from "../../tab-items/tab-items";
import ProductPageContentLongDescription from "./product-page-long-description/product-page-long-description";
import { Feature } from "../../../../../next-type-models";
import { CommentWithAuthor } from "@/app/actions/comment-actions/get-comments-action";

const tabItems: string[] = ["معرفی", "مشخصات", "دیدگاه ها"];

type Props = {
  description: string;
  comments: CommentWithAuthor[] | undefined;
  features: Feature[];
};

const ProductPageTabs = ({ description, features, comments }: Props) => {
  const [currentTab, setCurrentTab] = useState<string>(tabItems[2]);

  return (
    <div className="mt-10">
      {/* tabs */}
      <TabItems
        tabItems={tabItems}
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
      />
      {/* tab contents */}
      {currentTab === "معرفی" && (
        <ProductPageContentLongDescription longDescription={description} />
      )}
      {currentTab === "مشخصات" && (
        <ProductPageContentFeatures features={features} />
      )}
      {currentTab === "دیدگاه ها" && (
        // need change - add comments
        <ProductPageContentComments
          comments={comments}
          commentsCount={
            comments?.length != undefined && comments?.length > 0
              ? comments?.length
              : 0
          }
        />
      )}
    </div>
  );
};

export default ProductPageTabs;
