"use client";

import DislikeIcon from "@/app/icons/dislike-icon";
import LikeIcon from "@/app/icons/like-icon";
import React, { useState } from "react";
import * as actions from "@/app/actions/comment-actions/comment-actions";
import toast from "react-hot-toast";
import Spinner from "../../spinner/spinner";

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

  const [loading, setLoading] = useState(false);

  const handleLike = async () => {
    if (!userId) {
      toast.error("ابتدا وارد سایت شوید");
      return;
    }

    if (userReaction === "like") {
      toast.error("شما قبلاً این نظر را لایک کرده‌اید");
      return;
    }

    setLoading(true);
    const loadingToastId = toast.loading("در حال ثبت لایک...");

    try {
      const response = await actions.likeOrDislikeComment(
        commentId,
        true,
        userId
      );

      toast.dismiss(loadingToastId);
      if (response.success) {
        setLikeCount((prev) => prev + 1);
        if (userReaction === "dislike") setDislikeCount((prev) => prev - 1);
        setUserReaction("like");
        toast.success("بازخورد شما با موفقیت ثبت شد");
      } else {
        toast.error(response.errors || "خطایی رخ داده است");
      }
    } catch (error) {
      toast.dismiss(loadingToastId);
      toast.error("خطایی رخ داده است");
    } finally {
      setLoading(false);
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

    setLoading(true);
    const loadingToastId = toast.loading("در حال ثبت دیسلایک...");

    try {
      const response = await actions.likeOrDislikeComment(
        commentId,
        false,
        userId
      );

      toast.dismiss(loadingToastId);
      if (response.success) {
        setDislikeCount((prev) => prev + 1);
        if (userReaction === "like") setLikeCount((prev) => prev - 1);
        setUserReaction("dislike");
        toast.success("بازخورد شما با موفقیت ثبت شد");
      } else {
        toast.error(response.errors || "خطایی رخ داده است");
      }
    } catch (error) {
      toast.dismiss(loadingToastId);
      toast.error("خطایی رخ داده است");
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveReaction = async () => {
    if (!userId) {
      toast.error("ابتدا وارد سایت شوید");
      return;
    }

    setLoading(true);
    const loadingToastId = toast.loading("در حال حذف واکنش...");

    try {
      const response = await actions.removeLikeOrDislike(
        commentId,
        userReaction === "like",
        userId
      );

      toast.dismiss(loadingToastId);
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
      toast.dismiss(loadingToastId);
      toast.error("خطایی رخ داده است");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex gap-2 text-bodySmall text-customGray-500">
      {loading ? (
        <Spinner size={20} color="dark" />
      ) : (
        <>
          <div className="flex items-end gap-0.5">
            <div
              onClick={
                userReaction === "like" ? handleRemoveReaction : handleLike
              }
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
                userReaction === "dislike"
                  ? handleRemoveReaction
                  : handleDislike
              }
              className={`like-dislike cursor-pointer custom-transition ${
                userReaction === "dislike" ? "text-dark" : ""
              }`}
            >
              <DislikeIcon styles="size-6" />
            </div>
            {dislikeCount}
          </div>
        </>
      )}
    </div>
  );
};

export default LikeDislikeOperations;
