const { uid } = require("uid");
const db = require("../database/database");

const addReceipt = (receiptData) => {
  return new Promise(function (resolve, reject) {
    db.receipts.insert({ ...receiptData, _id: uid(16) }, (err, receipt) => {
      if (err) return reject(err);
      resolve(receipt);
    });
  });
};

const getAllReceipts = () => {
  return new Promise(function (resolve, reject) {
    db.receipts.find({}, (err, receipts) => {
      if (err) reject(err);
      resolve(receipts);
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
  db.receipts.remove({ _id: receiptId });
};
const countReceipts = () => {
  return new Promise(function (resolve, reject) {
    db.receipts.count({}, (err, receiptsCount) => {
      if (err) reject(err);
      resolve(receiptsCount);
    });
  });
};

module.exports = {
  deleteReceipt,
  editReceipt,
  getOneReceipt,
  getAllReceipts,
  addReceipt,
  countReceipts,
};
