const db = require("../database/database");

const addContract = (contractData) => {
  return new Promise(function (resolve, reject) {
    db.contracts.insert(contractData, (err, contract) => {
      if (err) return reject(err);
      resolve(contract);
    });
  });
};

const getAllContracts = () => {
  return new Promise(function (resolve, reject) {
    db.contracts.find({}, (err, contracts) => {
      if (err) reject(err);
      resolve(contracts);
    });
  });
};
const getOneContract = (contractId) => {
  return new Promise(function (resolve, reject) {
    db.contracts.findOne({ _id: contractId }, (err, contract) => {
      if (err) reject(err);
      resolve(contract);
    });
  });
};

const editContract = (contractId, newInfo) => {
  return new Promise(function (resolve, reject) {
    db.contracts.update(
      { _id: contractId },
      { $set: newInfo },
      { returnUpdatedDocs: true },
      (err, numAffected, updatedContract) => {
        if (err) reject(err);
        resolve(updatedContract);
      }
    );
  });
};

const deleteContract = (contractId) => {
  return new Promise(function (resolve, reject) {
    db.contracts.remove({ _id: contractId }, (err) => {
      if (err) reject(err);
      resolve({
        message: `contract with the id : ${contractId} has been deleted `,
      });
    });
  });
};

module.exports = {
  deleteContract,
  editContract,
  getOneContract,
  addContract,
  getAllContracts,
};
