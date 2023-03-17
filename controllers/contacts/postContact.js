const { Contact } = require("../../schemas/contact/contactModel");
const { isContactValid } = require("../../schemas/contact/validation.js");

const postContact = async (req, res) => {
  let { name, email, phone, favorite } = req.body;
  const { _id: owner } = req.user;
  try {
    const { error } = isContactValid({ name, email, phone, favorite });
    if (error) {
      res.status(400).json({ message: "Missing required name field" });
    }
    const contacts = await Contact.find({});
    if (contacts.find((contact) => contact.name === name)) {
      return res.status(400).json({ message: "Contact is already added." });
    }
    const newContact = await Contact.create({
      ...req.body,
      owner,
    });
    if (newContact) {
      res.status(201).json(newContact);
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports = postContact;
