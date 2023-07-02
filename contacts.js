const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "db/contacts.json");

async function updateData(contacts) {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
}

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    return contacts;
  } catch (error) {
    console.error(error);
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    const oneContact = contacts.find(({ id }) => id === contactId);
    return oneContact || null;
  } catch (error) {
    console.error(error);
  }
}

async function updateContactById(id, data) {
  try {
    const contacts = await listContacts();
    const indexContact = contacts.findIndex((contact) => contact.id === id);
    if (indexContact === -1) {
      return null;
    }
    contacts[indexContact] = { id, ...data };
    updateData(contacts);
    return contacts[indexContact];
  } catch (error) {
    console.error(error);
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const indexContact = contacts.findIndex(({ id }) => id === contactId);
    if (indexContact === -1) {
      return null;
    }
    const [result] = contacts.splice(indexContact, 1);
    updateData(contacts);
    return result;
  } catch (error) {
    console.error(error);
  }
}

async function addContact(data) {
  try {
    const contacts = await listContacts();
    const contactId = nanoid();
    const newContact = { id: contactId, ...data };
    contacts.push(newContact);
    updateData(contacts);
    return newContact;
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  listContacts,
  getContactById,
  updateContactById,
  removeContact,
  addContact,
};
