const { loginValid } = require("../../schemas/user/validation");
const { User } = require("../../schemas/user/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { SECRET_KEY } = process.env;

const loginUser = async (req, res) => {
  const { email, password, subsription } = req.body;
  try {
    const { error } = loginValid({ email, password });
    if (error) {
      res.status(400).json({ message: error.message });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Email or password is wrong" });
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      return res.status(401).json({ message: "Email or password is wrong" });
    }
    const payload = { id: user._id };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" });
    await User.findByIdAndUpdate(user._id, { token });
    return res.json({
      user: { email: user.email, subsription: user.subscription },
      token,
    });
  } catch (error) {
    console.error(error);
  }
};

module.exports = loginUser;
