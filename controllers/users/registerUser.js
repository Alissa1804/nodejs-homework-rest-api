const { User } = require("../../schemas/user/userModel");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");

const { registerValid } = require("../../schemas/user/validation");

const registerUser = async (req, res) => {
  const { email, password, subscription } = req.body;
  try {
    const { error } = registerValid({ email, password, subscription });
    if (error) {
      res.status(400).json({ message: error.message });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(409).json({ message: "Email in use" });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const avatarURL = gravatar.url(email);
    const result = await User.create({
      email,
      password: hashPassword,
      subscription,
      avatarURL,
    });
    return res
      .status(201)
      .json({ email: result.email, subscription: result.subscription });
  } catch (error) {
    console.error(error);
  }
};
module.exports = registerUser;
