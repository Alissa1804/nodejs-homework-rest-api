const express = require("express");
const router = express.Router();
const { authenticate } = require("../../middlewares/authenticate");
const { users } = require("../../controllers/index.js");

router.post("/register", users.registerUser);
router.post("/login", users.loginUser);
router.get("/logout", authenticate, users.logoutUser);
router.get("/current", authenticate, users.getCurrentUser);

module.exports = router;
