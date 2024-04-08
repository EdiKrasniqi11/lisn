const express = require("express");
const router = express.Router();
const authMiddleware = require("../utils/authMiddleware");
const {
  getFollowing,
  getFollowers,
  followUser,
  unfollowUser,
  fetchFollower,
  fetchFollowing,
  getFollowersCount,
  getFollowingCount,
} = require("../controllers/follow.controller");

router.get("/followers/:id", getFollowers);
router.get("/followers/count/:id", getFollowersCount);
router.get("/followings/:id", getFollowing);
router.get("/followings/count/:id", getFollowingCount);
router.post("/:id", authMiddleware.authenticateToken, followUser);
router.delete("/:id", authMiddleware.authenticateToken, unfollowUser);
router.get("/follower/:id", authMiddleware.authenticateToken, fetchFollower);
router.get("/following/:id", authMiddleware.authenticateToken, fetchFollowing);

module.exports = router;
