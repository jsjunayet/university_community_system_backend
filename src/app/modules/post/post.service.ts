import { Post } from "@prisma/client";
import { prisma } from "../../share/prismaClient";
import { fcm } from "../../utils/firebaseAdmin";

const postCreateData = async (payload: Post, userId: string) => {
  const { description, location, image } = payload;
  const result = await prisma.post.create({
    data: { description, location, image, user: { connect: { id: userId } } },
  });

  return result;
};
const postGetData = async () => {
  const result = await prisma.post.findMany({
    include: {
      user: true,
      comments: {
        include: {
          user: true,
        },
      },
    },
  });
  return result;
};
const postGetuserData = async (user: any) => {
  const exituser = await prisma.user.findUniqueOrThrow({
    where: {
      id: user.id,
    },
  });
  let Posts;

  Posts = await prisma.post.findMany({
    where: {
      status: "approved",
    },
    include: {
      votes: true,
      comments: {
        include: {
          user: true,
        },
      },

      user: true,
    },
    orderBy: {
      createdAt: "desc", // 🔽 Most recent posts first
    },
  });

  const result = Posts.map((post) => {
    const upVotes = post.votes.filter((v) => v.vote === "UP").length;
    const downVotes = post.votes.filter((v) => v.vote === "DOWN").length;

    const totalComments = post.comments.length;

    return {
      ...post,
      upVotes,
      downVotes,
      totalComments,
    };
  });

  return result;
};
const postSingleGetData = async (postId: string) => {
  const result = await prisma.post.findUniqueOrThrow({
    where: {
      id: postId,
    },
  });
  return result;
};
const mypostdata = async (postId: string) => {
  const result = await prisma.post.findMany({
    where: {
      userId: postId,
    },
  });
  return result;
};

const postApprovedGetData = async (postId: string, payload: Partial<Post>) => {
  console.log(payload);
  const exitPost = await prisma.post.findUniqueOrThrow({
    where: {
      id: postId,
    },
  });
  const result = await prisma.post.update({
    where: {
      id: postId,
    },
    data: {
      status: payload.status,
    },
  });
  if (payload.status === "approved") {
    const tokens = await prisma.deviceToken.findMany();
    const tokenList = tokens.map((t) => t.token);
    if (tokenList.length > 0) {
      await fcm.sendEachForMulticast({
        tokens: tokenList,
        notification: {
          title: " New Community Post",
          body: `${exitPost?.description}`,
        },
        data: {
          requestId: exitPost.id,
          url: "http://localhost:3000/community",
        },
      });
    }
  }

  return result;
};
const postDeletedGetData = async (postId: string) => {
  const result = await prisma.post.delete({
    where: {
      id: postId,
    },
  });
  return result;
};
const analyticsData = async () => {
  console.log("helloword");
};

export const postService = {
  postCreateData,
  postGetData,
  postSingleGetData,
  postDeletedGetData,
  postApprovedGetData,
  postGetuserData,
  analyticsData,
  mypostdata,
};
