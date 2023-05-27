const fs = require("fs");
const path = require("path");

const contactsPath = path.join(__dirname, "db", "contacts.json");

function listContacts() {
  const contacts = fs.readFileSync(contactsPath, "utf-8");
  const contactsParsed = JSON.parse(contacts);
  // console.log(contactsParsed);

  console.table(contactsParsed);
  return contactsParsed;
}

function getContactById(contactId) {
  const contacts = listContacts();
  const contact = contacts.find((contact) => contact.id === contactId);
  return contact;
}

function removeContact(contactId) {
  const contacts = listContacts();
  const filteredContacts = contacts.filter(
    (contact) => contact.id !== contactId
  );
  // console.log(filteredContacts);
  const filteredContactsStringified = JSON.stringify(filteredContacts, null, 2);
  // console.log(filteredContactsStringified);
  fs.writeFileSync(contactsPath, filteredContactsStringified);
  return filteredContacts;
}

function addContact(name, email, phone) {
  const contacts = listContacts();
  const newContact = {
    id: Date.now().toString(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  const contactsStringified = JSON.stringify(contacts, null, 2);
  fs.writeFileSync(contactsPath, contactsStringified);
  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
