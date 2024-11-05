"use client";

import React, { useRef, useState } from "react";
import Testimonial from "@/app/components/testimonial/testimonial";
import ProductPageCommentsHeader from "./product-page-comments-header/product-page-comments-header";
import CreateCommentModal from "./create-comment-modal/create-comment-modal";
import { CommentWithAuthor } from "@/app/actions/comment-actions/get-comments-action";
import { COMMENTS_PER_PAGE } from "@/app/lib/values";
import Button from "@/app/components/button/button";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
  comments: CommentWithAuthor[] | undefined;
  commentsCount: number;
};

const ProductPageComments = ({ comments, commentsCount }: Props) => {
  const [visibleComments, setVisibleComments] = useState(COMMENTS_PER_PAGE);
  const [isExpanded, setIsExpanded] = useState(false);

  const commentsRef = useRef<HTMLDivElement | null>(null);

  const loadMoreComments = () => {
    setVisibleComments((prev) => prev + COMMENTS_PER_PAGE);
    setIsExpanded(true); // Set expanded state to true when "Load More" is clicked
  };

  const showLessComments = () => {
    setVisibleComments(COMMENTS_PER_PAGE);
    setIsExpanded(false); // Reset expanded state when "Show Less" is clicked

    // Scroll to the top of the comments container
    if (commentsRef.current) {
      commentsRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  };

  const hasMoreComments = commentsCount > visibleComments;

  return (
    <>
      <CreateCommentModal />
      {commentsCount > 0 && comments ? (
        <>
          <ProductPageCommentsHeader commentsCount={commentsCount} />
          <div id="comments" ref={commentsRef} className="flex flex-col gap-4">
            <AnimatePresence>
              {comments.slice(0, visibleComments).map((comment) => (
                <motion.div
                  key={comment.id}
                  initial={{ opacity: 0, y: 20, scale: 0.6 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 20, scale: 0.6 }}
                  transition={{ duration: 0.3 }}
                >
                  <Testimonial comment={comment} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          {/* Load More / Show Less Buttons */}
          <div className="w-full flex-center mt-6">
            {hasMoreComments && (
              <Button color="dark" onClick={loadMoreComments}>
                مشاهده بیشتر
              </Button>
            )}
            {isExpanded && visibleComments > COMMENTS_PER_PAGE && (
              <Button color="dark" onClick={showLessComments}>
                نمایش کمتر
              </Button>
            )}
          </div>
        </>
      ) : (
        <div className="w-full px-4 py-8 bg-state-error-200 text-state-error rounded-xl flex-center flex-col gap-4 text-center text-bodyMain">
          <p>دیدگاهی موجود نیست</p>
        </div>
      )}
    </>
  );
};

export default ProductPageComments;
