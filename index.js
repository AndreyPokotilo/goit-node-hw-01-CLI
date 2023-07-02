const { Command } = require('commander');
const program = new Command();

const contacts = require("./contacts");

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

  program.parse(process.argv)
  const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const allContacts = await contacts.listContacts();
      console.table("allContacts:", allContacts);
      break;

    case "getById":
      const oneContact = await contacts.getContactById(id);
      console.log("oneContact:", oneContact);
      break;

    case "add":
      const newContact = await contacts.addContact({ name, email, phone });
      console.log("newContact:", newContact);
      break;

    case "update":
      const updateContact = await contacts.updateContactById(id, {
        name,
        email,
        phone,
      });
      console.log("updateContact:", updateContact);
      break;

    case "remove":
      const removeContact = await contacts.removeContact(id);
      console.log("removeContact:", removeContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
      break;
  }
}

invokeAction(argv)