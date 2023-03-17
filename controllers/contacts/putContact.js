const { Contact } = require("../../schemas/contact/contactModel");
const { isContactValid } = require("../../schemas/contact/validation.js");

const putContact = async (req, res) => {
  const { _id: owner } = req.user;
  try {
    const { error } = isContactValid(req.body);
    if (error) {
      res.status(400).json({ message: "Missing fields." });
    }
    const { contactId } = req.params;
    const isContact = await Contact.findOne({ _id: contactId, owner });
    if (!isContact) {
      res.status(404).json({ message: "Contact was not found" });
    }
    const updatedContact = await Contact.findOneAndUpdate(
      { _id: contactId, owner },
      req.body,
      {
        new: true,
      }
    );
    if (updatedContact) {
      res.status(200).json(updatedContact);
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports = putContact;
