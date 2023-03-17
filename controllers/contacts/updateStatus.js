const { Contact } = require("../../schemas/contact/contactModel");

const updateStatus = async (req, res) => {
  try {
    const { favorite } = req.body;
    const { contactId } = req.params;
    if (!favorite && favorite !== false) {
      return res.status(400).json({ message: "missing field favorite" });
    }
    const { _id: owner } = req.user;
    const contact = await Contact.findOneAndUpdate(
      { _id: contactId, owner },
      { favorite }
    );
    if (contact) {
      res.status(200).json({ ...contact._doc, favorite });
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports = updateStatus;
