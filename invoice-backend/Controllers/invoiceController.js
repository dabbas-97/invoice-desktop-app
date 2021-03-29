const { uid } = require("uid");
const db = require("../database/database");

const addInvoice = (invoiceData) => {
  return new Promise(function (resolve, reject) {
    db.invoices.insert({ ...invoiceData, _id: uid(16) }, (err, invoice) => {
      if (err) return reject(err);
      resolve(invoice);
    });
  });
};

const getAllInvoices = () => {
  return new Promise(function (resolve, reject) {
    db.invoices.find({}, (err, invoices) => {
      if (err) reject(err);
      resolve(invoices);
    });
  });
};

const getOneInvoice = (invoiceId) => {
  return new Promise(function (resolve, reject) {
    db.invoices.findOne({ _id: invoiceId }, (err, invoice) => {
      if (err) reject(err);
      resolve(invoice);
    });
  });
};

const editInvoice = (invoiceId, newInfo) => {
  return new Promise(function (resolve, reject) {
    db.invoices.update(
      { _id: invoiceId },
      { $set: newInfo },
      { returnUpdatedDocs: true },
      (err, numAffected, updatedInvoice) => {
        if (err) reject(err);
        resolve(updatedInvoice);
      }
    );
  });
};

const deleteInvoice = (invoiceId) => {
  db.invoices.remove({ _id: invoiceId });
};

const countInvoices = () => {
  return new Promise(function (resolve, reject) {
    db.invoices.count({}, (err, invoicesCount) => {
      if (err) reject(err);
      resolve(invoicesCount);
    });
  });
};

module.exports = {
  deleteInvoice,
  editInvoice,
  getOneInvoice,
  getAllInvoices,
  addInvoice,
  countInvoices,
};
