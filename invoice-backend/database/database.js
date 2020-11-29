const Datastore = require("nedb");

const db = {};
db.companies = new Datastore("./database/companies/companies.db");

db.contracts = new Datastore("./database/contracts/contracts.db");

db.invoicesCount = new Datastore("./database/invoices/invoicesCount.db");
db.invoices = new Datastore("./database/invoices/invoices.db");

db.receiptsCount = new Datastore("./database/receipts/receiptsCount.db");
db.receipts = new Datastore("./database/receipts/receipts.db");

db.companies.loadDatabase();
db.contracts.loadDatabase();
db.invoicesCount.loadDatabase();
db.invoices.loadDatabase();
db.receiptsCount.loadDatabase();
db.receipts.loadDatabase();

module.exports = db;
