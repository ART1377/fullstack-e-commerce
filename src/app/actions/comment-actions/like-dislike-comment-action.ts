"use server";

import { auth } from "@/app/auth";
import { db } from "@/app/db/db";

type LikeOrDislikeFormState = {
  success: boolean;
  errors?: string;
};

export const likeOrDislikeComment = async (
  commentId: string,
  isLike: boolean,
  userId: string
): Promise<LikeOrDislikeFormState> => {



  const session = await auth();

  if (!session || !session.user) {
    return {
      errors: "ابتدا وارد سایت شوید",
      success: false,
    };
  }

  try {
    // Check existing reaction by this user
    const existingReaction = await db.commentLike.findUnique({
      where: {
        userId_commentId: {
          userId,
          commentId,
        },
      },
    });

    if (existingReaction) {
      if (existingReaction.isLike === isLike) {
        return {
          errors: `شما یک بار این نظر را ${isLike ? "لایک" : "دیسلایک"} کردید`,
          success: false,
        };
      } else {
        // If toggling from like to dislike or vice versa, update the reaction
        await db.commentLike.update({
          where: {
            userId_commentId: {
              userId,
              commentId,
            },
          },
          data: {
            isLike,
          },
        });
      }
    } else {
      // No previous reaction; create a new one
      await db.commentLike.create({
        data: {
          userId,
          commentId,
          isLike,
        },
      });
    }

   
    return { success: true };
  } catch (error) {
    console.log("Error:", error);
    return {
      success: false,
      errors: "ایجاد واکنش با مشکل مواجه شد",
    };
  }
};

export const removeLikeOrDislike = async (
  commentId: string,
  isLike: boolean,
  userId: string
): Promise<LikeOrDislikeFormState> => {
  // check if user is logged in
  const session = await auth();

  if (!session || !session.user) {
    return {
      errors: "ابتدا وارد سایت شوید",
      success: false,
    };
  }

  try {
    // Delete like/dislike entry if exists
    const commentLike = await db.commentLike.delete({
      where: {
        userId_commentId: {
          userId,
          commentId,
        },
      },
    });

    console.log("222", commentLike);
    return { success: true };
  } catch (error) {
    console.log("222", error);
    return { success: false, errors: "حذف واکنش با مشکل مواجه شد" };
  }
};
