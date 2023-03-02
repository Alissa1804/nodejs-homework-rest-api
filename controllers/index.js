const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
} = require("../service/index.js");
const { isContactValid } = require("../service/schemas/validation.js");

const getContacts = async (req, res) => {
  try {
    const contacts = await listContacts();
    res.status(200).json(contacts);
  } catch (error) {
    console.error(error);
  }
};

const getById = async (req, res) => {
  try {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);
    if (contact) {
      res.status(200).json(contact);
    } else {
      res.status(404).json({ message: "Contact was not found" });
    }
  } catch (error) {
    console.error(error);
  }
};

const postContact = async (req, res) => {
  let { name, email, phone, favorite } = req.body;
  try {
    const { error } = isContactValid({ name, email, phone, favorite });
    if (error) {
      res.status(400).json({ message: "Missing required name field" });
    }
    const contacts = await listContacts();
    if (contacts.find((contact) => contact.name === name)) {
      return res.status(400).json({ message: "Contact is already added." });
    }
    const newContact = await addContact({ name, email, phone, favorite });
    if (newContact) {
      res.status(201).json(newContact);
    }
  } catch (error) {
    console.error(error);
  }
};

const deleteContact = async (req, res) => {
  try {
    const { contactId } = req.params;
    const updateContacts = await removeContact(contactId);
    if (updateContacts) {
      res.status(200).json({ message: "Contact deleted" });
    } else {
      res.status(404).json({ message: "Contact was not found" });
    }
  } catch (error) {
    console.error(error);
  }
};

const putContact = async (req, res) => {
  try {
    const { error } = isContactValid(req.body);
    if (error) {
      res.status(400).json({ message: "Missing fields." });
    }
    const { contactId } = req.params;
    const isContact = await getContactById(contactId);
    if (!isContact) {
      res.status(404).json({ message: "Contact was not found" });
    }
    const updatedContact = await updateContact(contactId, req.body);
    if (updatedContact) {
      res.status(200).json(updatedContact);
    }
  } catch (error) {
    console.error(error);
  }
};

const updateStatus = async (req, res) => {
  try {
    const { favorite } = req.body;
    const { contactId } = req.params;
    if (!favorite && favorite !== false) {
      return res.status(400).json({ message: "missing field favorite" });
    }
    const contact = await updateStatusContact(contactId, favorite);
    if (contact) {
      res.status(200).json({ ...contact._doc, favorite });
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  getContacts,
  getById,
  postContact,
  deleteContact,
  putContact,
  updateStatus,
};
