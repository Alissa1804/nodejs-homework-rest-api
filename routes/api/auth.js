const express = require("express");
const router = express.Router();
const { authenticate } = require("../../middlewares/authenticate");
const { upload } = require("../../middlewares/upload");
const { users } = require("../../controllers/index.js");

router.post("/register", users.registerUser);
router.post("/login", users.loginUser);
router.get("/logout", authenticate, users.logoutUser);
router.get("/current", authenticate, users.getCurrentUser);
router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  users.updateAvatar
);

module.exports = router;
