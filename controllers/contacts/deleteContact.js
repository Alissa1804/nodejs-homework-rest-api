const { Contact } = require("../../schemas/contact/contactModel");

const deleteContact = async (req, res) => {
  try {
    const { contactId } = req.params;
    const { _id: owner } = req.user;
    const updateContacts = await Contact.findOneAndDelete({
      _id: contactId,
      owner,
    });
    if (updateContacts) {
      res.status(200).json({ message: "Contact deleted" });
    } else {
      res.status(404).json({ message: "Contact was not found" });
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports = deleteContact;
