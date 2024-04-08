const Follow = require("../models/follow.model.js");

const getFollowers = async (req, res) => {
  try {
    const userId = req.params.id;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const userFollowers = await Follow.find({ followed: userId }, "follower")
      .populate("follower")
      .skip(skip)
      .limit(limit);

    if (!userFollowers) {
      return res
        .status(404)
        .json({ followerCount: 0, message: "User has no followers" });
    }

    const totalFollowersCount = await Follow.countDocuments({
      followed: userId,
    });

    res.status(200).json({
      followerCount: totalFollowersCount,
      currentPage: page,
      totalPages: Math.ceil(totalFollowersCount / limit),
      followers: userFollowers,
    });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const getFollowersCount = async (req, res) => {
  try {
    const userId = req.params.id;

    const followerCount = await Follow.countDocuments({ followed: userId });

    res.status(200).json({ followerCount });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const getFollowing = async (req, res) => {
  try {
    const userId = req.params.id;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const userFollowing = await Follow.find({ follower: userId }, "followed")
      .populate("followed")
      .skip(skip)
      .limit(limit);

    if (!userFollowing) {
      return res
        .status(404)
        .json({ followingCount: 0, message: "User follows no one" });
    }

    const totalFollowingCount = await Follow.countDocuments({
      follower: userId,
    });

    return res.status(200).json({
      followerCount: totalFollowingCount,
      currentPage: page,
      totalPages: Math.ceil(totalFollowingCount / limit),
      following: userFollowing,
    });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const getFollowingCount = async (req, res) => {
  try {
    const userId = req.params.id;

    const followerCount = await Follow.countDocuments({ follower: userId });

    res.status(200).json({ followerCount });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const fetchFollower = async (req, res) => {
  try {
    const userId = req.user._id;
    const follow = await Follow.findOne({
      follower: userId,
      followed: req.params.id,
    });
    return res.status(200).json(follow ? true : false);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const fetchFollowing = async (req, res) => {
  try {
    const userId = req.user._id;
    const follow = await Follow.findOne({
      follower: req.params.id,
      followed: userId,
    });
    return res.status(200).json(follow ? true : false);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const followUser = async (req, res) => {
  try {
    const userId = req.user._id;
    const followUser = req.params.id;

    const userFollow = await Follow.create({
      follower: userId,
      followed: followUser,
    });
    res.status(200).json(userFollow);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const unfollowUser = async (req, res) => {
  try {
    const followObject = await Follow.findOne({
      follower: req.user._id,
      followed: req.params.id,
    });

    if (!followObject) {
      return res
        .status(404)
        .json({ message: "This follower combination does not exist" });
    }
    await Follow.findByIdAndDelete(followObject._id);
    res.status(200).json({ message: "Unfollowed" });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

module.exports = {
  getFollowers,
  getFollowersCount,
  getFollowing,
  getFollowingCount,
  followUser,
  unfollowUser,
  fetchFollower,
  fetchFollowing,
};
