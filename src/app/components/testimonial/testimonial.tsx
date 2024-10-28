"use client";

import React from "react";
import Image from "next/image";
import { CommentWithAuthor } from "@/app/actions/comment-actions/get-comments-action";
import { formatToJalali } from "@/app/lib/date-format";
import PersonIcon from "@/app/icons/person-icon";
import { useSessionContext } from "@/app/context/useSessionContext";
import LikeDislikeOperations from "./like-dislike-operations/like-dislike-operations";
import CreateCommentModal from "../product-page-content/product-page-tabs/product-page-comments/create-comment-modal/create-comment-modal";

type Props = {
  comment: CommentWithAuthor;
  depth?: number;
};

const Testimonial = ({ comment, depth = 0 }: Props) => {
  const {
    createdAt,
    title,
    description,
    dislikeCount,
    likeCount,
    id,
    user,
    children,
  } = comment;

  const userName = `${user.firstName} ${user.lastName}`;

  const { session } = useSessionContext();

  const userId = session && session.user ? session.user.id : undefined;

  return (
    <>
      <div
        className={`rounded-xl shadow bg-white flex flex-col justify-center pt-2 pb-3 custom-transition hover:shadow-none`}
        style={{ marginRight: depth < 3 ? depth * 20 : 40 }}
      >
        {/* rating */}
        {userId && userId === user.id && (
          <div className="w-full flex-center gap-3">
            <div className="bg-customGray-200 h-px min-w-14 w-[calc(40%-100px)]"></div>
            <div className="text-primary-main">دیدگاه شما</div>
            <div className="bg-customGray-200 h-px min-w-14 w-[calc(40%-100px)]"></div>
          </div>
        )}
        {/* image and comment content */}
        <div className="flex flex-col items-center gap-y-8 mt-8 sm:flex-row sm:gap-x-10">
          {/* images */}
          <div className="relative shadow w-28 h-36 sm:mr-10">
            {user.image ? (
              <Image
                alt={userName}
                src={user.image}
                fill
                style={{
                  objectFit: "cover",
                  borderRadius: "12px",
                  zIndex: "1",
                }}
              />
            ) : (
              <div className="w-full h-full flex-center bg-white relative z-[2]">
                <PersonIcon styles="size-20" />
              </div>
            )}
            <div className="absolute -top-4 -right-4">
              <Image
                alt={"dots"}
                src={"/images/dots.png"}
                width={54}
                height={104}
              />
            </div>
            <div className="absolute -bottom-10 left-1.5 rotate-90">
              <Image
                alt={"dots"}
                src={"/images/dots.png"}
                width={54}
                height={104}
              />
            </div>
          </div>
          {/* comment content */}
          <div
            className={`bg-light w-full p-4 sm:rounded-r-xl sm:w-[calc(100%-200px)] sm:mr-auto`}
          >
            <p className="text-dark text-bodyMain">{title}</p>
            <small className="mt-2 mb-3 text-bodySmall text-customGray-500">
              {description}
            </small>
            <div className="flex justify-between items-end mt-3">
              {/* creator name - date */}
              <div className="flex flex-col gap-1">
                <small className="text-bodySmall text-customGray-700">
                  {userName}
                </small>
                <small className="text-captionMain text-customGray-500">
                  {formatToJalali(createdAt)}
                </small>
              </div>
              {/* like - dislike */}
              <LikeDislikeOperations
                initialDislikeCount={dislikeCount}
                initialLikeCount={likeCount}
                commentId={id}
                userId={userId}
              />
            </div>
          </div>
        </div>
        {/* Show CreateCommentModal if replying */}
        <CreateCommentModal
          parentId={id} // Pass parentId for reply
          isReply
        />
      </div>

      {/* Render Children Comments */}
      {children &&
        children.map((child) => (
          <Testimonial key={child.id} comment={child} depth={depth + 1} />
        ))}
    </>
  );
};

export default Testimonial;
