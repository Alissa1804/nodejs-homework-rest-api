const { User } = require("../../schemas/user/userModel");

const verify = async (req, res) => {
  try {
    const { verificationToken } = req.params;
    const user = await User.findOne({ verificationToken });
    if (!user) {
      res.status(404).json({ message: "User not found" });
    }
    await User.findByIdAndUpdate(user._id, {
      verify: true,
      verificationToken: null,
    });

    res.json({
      status: "success",
      code: 200,
      data: {
        message: "Verification successful",
      },
    });
  } catch (error) {
    console.error(error);
  }
};

module.exports = verify;
