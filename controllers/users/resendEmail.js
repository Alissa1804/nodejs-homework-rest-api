const { verifyEmailValid } = require("../../schemas/user/validation");
const { User } = require("../../schemas/user/userModel");
const { sendEmail } = require("../../helpers/sendEmail");
require("dotenv").config();
const { BASE_URL } = process.env;

const resendEmail = async (req, res) => {
  const { email } = req.body;
  try {
    const { error } = verifyEmailValid({ email });
    if (error) {
      res.status(400).json({ message: error.message });
    }
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ message: "User not found" });
    }
    if (user.verify) {
      return res
        .status(400)
        .json({ message: "Verification has already been passed" });
    }

    const mail = {
      to: email,
      subject: "Verify email",
      html: `<a target="_blank" href="${BASE_URL}/api/auth/verify${user.verificationToken}">Click to verify your email<a/>`,
    };
    await sendEmail(mail);

    res.json({
      status: "success",
      code: 200,
      data: {
        message: "Verification email sent",
      },
    });
  } catch (error) {
    console.error(error);
  }
};

module.exports = resendEmail;
