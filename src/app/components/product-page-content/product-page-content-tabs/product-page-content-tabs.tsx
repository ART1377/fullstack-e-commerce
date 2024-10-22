"use client";

import React, { useState } from "react";
import { comments } from "@/app/data/data";
import ProductPageContentComments from "./product-page-content-comments/product-page-content-comments";
import ProductPageContentFeatures from "./product-page-content-features/product-page-content-features";
import TabItems from "../../tab-items/tab-items";
import ProductPageContentLongDescription from "./product-page-content-long-description/product-page-content-long-description";
import { Comment, Feature } from "../../../../../next-type-models";

const tabItems: string[] = ["معرفی", "مشخصات", "دیدگاه ها"];


type Props = {
  description: string;
  commentItems: Comment[];
  features: Feature[];
};

const ProductPageContentTabs = ({description,features,commentItems}: Props) => {
  const [currentTab, setCurrentTab] = useState<string>(tabItems[0]);

  const commentsCount = 20;

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
          commentsCount={commentsCount}
        />
      )}
    </div>
  );
};

export default ProductPageContentTabs;
