const { Contact } = require("../../schemas/contact/contactModel");

const getById = async (req, res) => {
  try {
    const { contactId } = req.params;
    const { _id: owner } = req.user;
    const contact = await Contact.findOne({ _id: contactId, owner });
    if (contact) {
      res.status(200).json(contact);
    } else {
      res.status(404).json({ message: "Contact was not found" });
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports = getById;
