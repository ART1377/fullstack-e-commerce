import React from "react";
import Testimonial from "@/app/components/testimonial/testimonial";
import ProductPageCommentsHeader from "./product-page-comments-header/product-page-comments-header";
import CreateCommentModal from "./create-comment-modal/create-comment-modal";
import { CommentWithAuthor } from "@/app/actions/comment-actions/get-comments-action";

type Props = {
  comments: CommentWithAuthor[] | undefined;
  commentsCount: number;
};

const ProductPageComments = ({ comments, commentsCount }: Props) => {
  return (
    <>
      <CreateCommentModal />
      {commentsCount > 0 && comments ? (
        <>
          <ProductPageCommentsHeader commentsCount={commentsCount} />
          <div className="flex flex-col gap-4">
            {comments.map((comment: CommentWithAuthor) => {
              return <Testimonial key={comment.id} comment={comment} />;
            })}
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
