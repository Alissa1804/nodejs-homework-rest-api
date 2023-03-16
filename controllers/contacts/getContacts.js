const { Contact } = require("../../schemas/contact/contactModel");

const getContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20 } = req.query;
  const skip = (page - 1) * limit;
  try {
    const contacts = await Contact.find({ owner })
      .skip(skip)
      .limit(limit)
      .populate("owner", "email subscription");
    res.status(200).json(contacts);
  } catch (error) {
    console.error(error);
  }
};

module.exports = getContacts;
