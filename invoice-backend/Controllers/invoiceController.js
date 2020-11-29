const db = require("../database/database");

const getInvoicesCount = () => {
  return new Promise(function (resolve, reject) {
    db.invoicesCount.count({ step: "" }, (err, count) => {
      if (err) reject(err);

      resolve(count);
    });
  });
};

const addInvoice = (invoiceData) => {
  return new Promise(function (resolve, reject) {
    db.invoices.insert(invoiceData, (err, invoice) => {
      if (err) return reject(err);
      db.invoicesCount.insert({ step: "" });
      resolve(invoice);
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
  return new Promise(function (resolve, reject) {
    db.invoices.remove({ _id: invoiceId }, (err) => {
      if (err) reject(err);
      resolve({
        message: `invoice with the id : ${invoiceId} has been deleted `,
      });
    });
  });
};

module.exports = {
  deleteInvoice,
  editInvoice,
  getOneInvoice,
  addInvoice,
  getInvoicesCount,
};
