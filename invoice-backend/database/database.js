const Datastore = require("nedb");

const db = {};
db.invoices = new Datastore("./database/invoices.db");

db.receipts = new Datastore("./database/receipts.db");

db.invoices.loadDatabase();
db.receipts.loadDatabase();

module.exports = db;
