"use client";

import DislikeIcon from "@/app/icons/dislike-icon";
import LikeIcon from "@/app/icons/like-icon";
import React, { useState } from "react";
import * as actions from "@/app/actions/comment-actions/comment-actions";
import toast from "react-hot-toast";

type Props = {
  initialDislikeCount: number;
  initialLikeCount: number;
  commentId: string;
  userId: string | undefined;
  initialUserReaction?: "like" | "dislike" | null; // Optional prop to track initial reaction
};

const LikeDislikeOperations = ({
  initialDislikeCount,
  initialLikeCount,
  commentId,
  userId,
  initialUserReaction = null,
}: Props) => {
  const [likeCount, setLikeCount] = useState(initialLikeCount);
  const [dislikeCount, setDislikeCount] = useState(initialDislikeCount);
  const [userReaction, setUserReaction] = useState<"like" | "dislike" | null>(
    initialUserReaction
  );

  const handleLike = async () => {
    if (!userId) {
      toast.error("ابتدا وارد سایت شوید");
      return;
    }

    if (userReaction === "like") {
      toast.error("شما قبلاً این نظر را لایک کرده‌اید");
      return;
    }

    try {
      const response = await actions.likeOrDislikeComment(
        commentId,
        true,
        userId
      );

      if (response.success) {
        setLikeCount((prev) => prev + 1);
        if (userReaction === "dislike") setDislikeCount((prev) => prev - 1);
        setUserReaction("like");
        toast.success("بازخورد شما با موفقیت ثبت شد");
      } else {
        toast.error(response.errors || "خطایی رخ داده است");
      }
    } catch (error) {
      toast.error("خطایی رخ داده است");
    }
  };

  const handleDislike = async () => {
    if (!userId) {
      toast.error("ابتدا وارد سایت شوید");
      return;
    }

    if (userReaction === "dislike") {
      toast.error("شما قبلاً این نظر را دیسلایک کرده‌اید");
      return;
    }

    try {
      const response = await actions.likeOrDislikeComment(
        commentId,
        false,
        userId
      );

      if (response.success) {
        setDislikeCount((prev) => prev + 1);
        if (userReaction === "like") setLikeCount((prev) => prev - 1);
        setUserReaction("dislike");
        toast.success("بازخورد شما با موفقیت ثبت شد");
      } else {
        toast.error(response.errors || "خطایی رخ داده است");
      }
    } catch (error) {
      toast.error("خطایی رخ داده است");
    }
  };

  const handleRemoveReaction = async () => {
    if (!userId) {
      toast.error("ابتدا وارد سایت شوید");
      return;
    }

    try {
      const response = await actions.removeLikeOrDislike(
        commentId,
        userReaction === "like",
        userId
      );

      if (response.success) {
        if (userReaction === "like") {
          setLikeCount((prev) => prev - 1);
        } else if (userReaction === "dislike") {
          setDislikeCount((prev) => prev - 1);
        }
        setUserReaction(null); // Reset the user reaction
        toast.success("واکنش شما با موفقیت حذف شد");
      } else {
        toast.error(response.errors || "خطایی رخ داده است");
      }
    } catch (error) {
      toast.error("خطایی رخ داده است");
    }
  };

  return (
    <div className="flex gap-2 text-bodySmall text-customGray-500">
      <div className="flex items-end gap-0.5">
        <div
          onClick={userReaction === "like" ? handleRemoveReaction : handleLike}
          className={`like-dislike cursor-pointer custom-transition ${
            userReaction === "like" ? "text-dark" : ""
          }`}
        >
          <LikeIcon styles="size-6" />
        </div>
        {likeCount}
      </div>
      <div className="flex items-end gap-0.5">
        <div
          onClick={
            userReaction === "dislike" ? handleRemoveReaction : handleDislike
          }
          className={`like-dislike cursor-pointer custom-transition ${
            userReaction === "dislike" ? "text-dark" : ""
          }`}
        >
          <DislikeIcon styles="size-6" />
        </div>
        {dislikeCount}
      </div>
    </div>
  );
};

export default LikeDislikeOperations;
