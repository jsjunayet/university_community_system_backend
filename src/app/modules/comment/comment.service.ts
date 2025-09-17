// services/comment.service.ts

import { Comments } from "@prisma/client";
import { prisma } from "../../share/prismaClient";

const commentCreate = async (payload: Comments, userId: string) => {
  const { postId, commentText } = payload;
  const result = await prisma.comments.create({
    data: {
      userId,
      postId,
      commentText,
    },
  });
  return result;
};
const commentUpdate = async (commentId: string, payload: Partial<Comments>) => {
  const result = await prisma.comments.update({
    where: {
      id: commentId,
    },
    data: {
      commentText: payload.commentText,
    },
  });
  return result;
};
const commentdeleted = async (commentId: string) => {
  const result = await prisma.comments.delete({
    where: {
      id: commentId,
    },
  });
  return result;
};
const commentGet = async () => {
  const result = await prisma.comments.findMany({
    include: {
      user: {
        select: {
          email: true,
          role: true,
          name: true,
        },
      },
      post: {
        select: {
          description: true,
        },
      },
    },
  });
  return result;
};

export const commentService = {
  commentCreate,
  commentUpdate,
  commentdeleted,
  commentGet,
};
