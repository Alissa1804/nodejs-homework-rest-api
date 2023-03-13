const express = require("express");
const router = express.Router();
const {
  getContacts,
  getById,
  postContact,
  deleteContact,
  putContact,
  updateStatus,
} = require("../../controllers/index.js");

router.get("/", getContacts);
router.get("/:contactId", getById);
router.post("", postContact);
router.put("/:contactId", putContact);
router.delete("/:contactId", deleteContact);
router.patch("/:contactId/favorite", updateStatus);

module.exports = router;
