"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

// Define unique variants for each tab
const tabVariants = {
  description: {
    hidden: { opacity: 0, x: 20 }, // Start from the right
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  },
  features: {
    hidden: { opacity: 0, y: 20 }, // Start from the bottom
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  },
  comments: {
    hidden: { opacity: 0, x: -20 }, // Start from the left
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 },
  },
};

const ProductPageTabs = ({ description, features, comments }: Props) => {
  const [currentTab, setCurrentTab] = useState<string>(tabItems[0]);

  // Determine the variant based on the current tab
  const getCurrentTabVariant = () => {
    switch (currentTab) {
      case "معرفی":
        return tabVariants.description;
      case "مشخصات":
        return tabVariants.features;
      case "دیدگاه ها":
        return tabVariants.comments;
      default:
        return tabVariants.description;
    }
  };

  return (
    <div className="mt-10">
      {/* tabs */}
      <TabItems
        tabItems={tabItems}
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
      />
      {/* tab contents with animation */}
      <AnimatePresence mode="wait">
        {currentTab === "معرفی" && (
          <motion.div
            key="description"
            variants={getCurrentTabVariant()}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <ProductPageContentLongDescription longDescription={description} />
          </motion.div>
        )}
        {currentTab === "مشخصات" && (
          <motion.div
            key="features"
            variants={getCurrentTabVariant()}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <ProductPageContentFeatures features={features} />
          </motion.div>
        )}
        {currentTab === "دیدگاه ها" && (
          <motion.div
            key="comments"
            variants={getCurrentTabVariant()}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <ProductPageContentComments
              comments={comments}
              commentsCount={
                comments?.length != undefined && comments?.length > 0
                  ? comments?.length
                  : 0
              }
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductPageTabs;
