const fs = require("fs");
const path = require("path");

const contactsPath = path.join(__dirname, "db", "contacts.json");

function listContacts() {
  try {
    const contactsData = fs.readFileSync(contactsPath, "utf-8");
    const contactsParsed = JSON.parse(contactsData);
    // console.log(contactsParsed);

    console.table(contactsParsed);
    return contactsParsed;
  } catch (error) {
    console.log("something gone wrong: ", error);
  }
}

function getContactById(contactId) {
  try {
    const contactsData = fs.readFileSync(contactsPath, "utf-8");
    const contacts = JSON.parse(contactsData);

    const contact = contacts.filter((contact) => contact.id === contactId);
    console.log("found contact: ", contact);
    // console.table(contacts);

    return contact;
  } catch (error) {
    console.log("something gone wrong: ", error);
  }
}

function removeContact(contactId) {
  try {
    const contactsData = fs.readFileSync(contactsPath, "utf-8");
    const contacts = JSON.parse(contactsData);

    const filteredContacts = contacts.filter(
      (contact) => contact.id !== contactId
    );
    // console.log(filteredContacts);
    const filteredContactsStringified = JSON.stringify(
      filteredContacts,
      null,
      2
    );
    // console.log(filteredContactsStringified);
    fs.writeFileSync(contactsPath, filteredContactsStringified);
    listContacts();
    return filteredContactsStringified;
  } catch (error) {
    console.log("something gone wrong: ", error);
  }
}

function addContact(name, email, phone) {
  try {
    const contactsData = fs.readFileSync(contactsPath, "utf-8");
    const contacts = JSON.parse(contactsData);

    const newContact = {
      id: Date.now().toString(),
      name,
      email,
      phone,
    };
    contacts.push(newContact);
    const contactsStringified = JSON.stringify(contacts, null, 2);
    fs.writeFileSync(contactsPath, contactsStringified);
    listContacts();
    return newContact;
  } catch (error) {
    console.log("something gone wrong: ", error);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
