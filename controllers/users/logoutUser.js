const { User } = require("../../schemas/user/userModel");

const logoutUser = async (req, res) => {
  const { _id } = req.user;
  await User.findOneAndUpdate(_id, { token: null });
  res.status(204).json({ message: "Logout success" });
};
module.exports = logoutUser;
