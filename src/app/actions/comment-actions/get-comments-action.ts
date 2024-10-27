import { db } from "@/app/db/db";

// Types for comments and response

export type CommentWithAuthor = {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
  user: {
    id: string;
    image: string | null;
    firstName: string;
    lastName: string;
  };
  likeCount: number;
  dislikeCount: number;
};

type GetCommentsResponse = {
  success: boolean;
  comments?: CommentWithAuthor[];
  errors?: string;
};

// The function with the defined return type
export const getComments = async (
  productId: string,
  sort?: string
): Promise<GetCommentsResponse> => {
  try {
    const comments = await db.comment.findMany({
      where: { productId },
      select: {
        id: true,
        title: true,
        description: true,
        createdAt: true,
        user: {
          select: {
            id: true,
            image: true,
            firstName: true,
            lastName: true,
          },
        },
        likes: {
          select: {
            isLike: true,
          },
        },
      },
      orderBy: (() => {
        switch (sort) {
          case "mostLike":
            return { likes: { _count: "desc" } };
          case "mostDislike":
            return { likes: { _count: "asc" } };
          case "newest":
          default:
            return { createdAt: "desc" };
        }
      })(),
    });

    const formattedComments: CommentWithAuthor[] = comments.map((comment) => {
      const likeCount = comment.likes.filter((like) => like.isLike).length;
      const dislikeCount = comment.likes.length - likeCount;
      return {
        ...comment,
        likeCount,
        dislikeCount,
      };
    });

    return { success: true, comments: formattedComments };
  } catch (error) {
    return {
      success: false,
      errors: "مشکلی در دریافت نظرات به وجود آمد",
    };
  }
};
