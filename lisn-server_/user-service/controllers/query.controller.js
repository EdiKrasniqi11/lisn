const User = require("../models/user.model");

const searchUsers = async (req, res) => {
  try {
    const search = req.query.search || "";
    const users = await User.find(
      {
        username: { $regex: search, $options: "i" },
      },
      "_id username user_image createdAt updatedAt"
    );
    res.status(200).json(users);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

module.exports = {
  searchUsers,
};
