// services/vote.service.ts
import { Votes } from "@prisma/client";
import { prisma } from "../../share/prismaClient";

const voteCreate = async (payload: Votes, userId: string) => {
  const { postId, vote } = payload;

  const existingVote = await prisma.votes.findUnique({
    where: {
      userId_postId: {
        userId,
        postId,
      },
    },
  });

  if (existingVote) {
    if (existingVote.vote === vote) {
      await prisma.votes.delete({
        where: {
          userId_postId: {
            userId,
            postId,
          },
        },
      });
      return { message: "Vote removed (unvoted)" };
    } else {
      await prisma.votes.update({
        where: {
          userId_postId: {
            userId,
            postId,
          },
        },
        data: { vote },
      });
      return { message: "Vote updated" };
    }
  }

  await prisma.votes.create({
    data: {
      userId,
      postId,
      vote,
    },
  });

  return { message: "Vote added" };
};

export const voteService = {
  voteCreate,
};
