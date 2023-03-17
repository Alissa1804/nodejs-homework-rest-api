const express = require("express");
const router = express.Router();
const { authenticate } = require("../../middlewares/authenticate");
const { contacts } = require("../../controllers/index.js");

router.get("/", authenticate, contacts.getContacts);
router.get("/:contactId", authenticate, contacts.getById);
router.post("", authenticate, contacts.postContact);
router.put("/:contactId", authenticate, contacts.putContact);
router.delete("/:contactId", authenticate, contacts.deleteContact);
router.patch("/:contactId/favorite", authenticate, contacts.updateStatus);

module.exports = router;
