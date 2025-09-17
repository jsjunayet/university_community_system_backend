import { Router } from "express";

import { bloodReqestRoute } from "../modules/bloodDonation/bloodDonation.route";
import { commentRoute } from "../modules/comment/comment.route";
import { BloodDonationJoinRoutes } from "../modules/donationJoin/donationJoin.route";
import { eventRoutes } from "../modules/event/event.router";
import { eventJoinRoutes } from "../modules/eventJoin/eventJoin.router";
import { jobApplicationRoutes } from "../modules/jobApply/jobApply.route";
import { jobPostRoutes } from "../modules/jobPost/jobPost.route";
import { NotificationRoute } from "../modules/Notification/Notification.route";
import { postRoutes } from "../modules/post/post.route";
import { tourRoutes } from "../modules/tour/tour.route";
import { tourJoinRoute } from "../modules/tourJoin/tourjoin.route";
import { userRoutes } from "../modules/user/user.route";
import { voteRoute } from "../modules/votes/votes.route";

const router = Router();
const AllRoutes = [
  {
    path: "/user",
    route: userRoutes,
  },
  {
    path: "/post",
    route: postRoutes,
  },

  {
    path: "/vote",
    route: voteRoute,
  },

  {
    path: "/comment",
    route: commentRoute,
  },
  {
    path: "/event",
    route: eventRoutes,
  },
  {
    path: "/eventjoin",
    route: eventJoinRoutes,
  },
  {
    path: "/job",
    route: jobPostRoutes,
  },
  {
    path: "/job-apply",
    route: jobApplicationRoutes,
  },
  {
    path: "/donation-Request",
    route: bloodReqestRoute,
  },
  {
    path: "/donation-join",
    route: BloodDonationJoinRoutes,
  },
  {
    path: "/tour-group",
    route: tourRoutes,
  },
  {
    path: "/tour-join",
    route: tourJoinRoute,
  },
  {
    path: "/notify",
    route: NotificationRoute,
  },
];

AllRoutes.forEach((item) => router.use(item.path, item.route));
export default router;
