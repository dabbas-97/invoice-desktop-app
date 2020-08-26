const Datastore = require("nedb");

const db = {};
db.steps = new Datastore("./database/steps/steps.db");
db.invoices = new Datastore("./database/invoices/invoices.db");

db.steps.loadDatabase();
db.invoices.loadDatabase();

module.exports = db;
