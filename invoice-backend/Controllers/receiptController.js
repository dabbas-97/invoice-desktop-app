const db = require("../database/database");

const getReceiptsCount = () => {
  return new Promise(function (resolve, reject) {
    db.receiptsCount.count({ step: "" }, (err, count) => {
      if (err) reject(err);

      resolve(count);
    });
  });
};

const addReceipt = (receiptData) => {
  return new Promise(function (resolve, reject) {
    db.receipts.insert(receiptData, (err, receipt) => {
      if (err) return reject(err);
      db.receiptsCount.insert({ step: "" });
      resolve(receipt);
    });
  });
};

const getOneReceipt = (receiptId) => {
  return new Promise(function (resolve, reject) {
    db.receipts.findOne({ _id: receiptId }, (err, receipt) => {
      if (err) reject(err);
      resolve(receipt);
    });
  });
};

const editReceipt = (receiptId, newInfo) => {
  return new Promise(function (resolve, reject) {
    db.receipts.update(
      { _id: receiptId },
      { $set: newInfo },
      { returnUpdatedDocs: true },
      (err, numAffected, updatedReceipt) => {
        if (err) reject(err);
        resolve(updatedReceipt);
      }
    );
  });
};

const deleteReceipt = (receiptId) => {
  return new Promise(function (resolve, reject) {
    db.receipts.remove({ _id: receiptId }, (err) => {
      if (err) reject(err);
      resolve({
        message: `receipt with the id : ${receiptId} has been deleted `,
      });
    });
  });
};

module.exports = {
  deleteReceipt,
  editReceipt,
  getOneReceipt,
  addReceipt,
  getReceiptsCount,
};
