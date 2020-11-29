const { uid } = require("uid");
const db = require("../database/database");

const addCompany = (companyData) => {
  return new Promise(function (resolve, reject) {
    db.companies.insert({ ...companyData, _id: uid(16) }, (err, company) => {
      if (err) return reject(err);
      resolve(company);
    });
  });
};

const getAllCompanies = () => {
  return new Promise(function (resolve, reject) {
    db.companies.find({}, (err, companies) => {
      if (err) reject(err);
      resolve(companies);
    });
  });
};
const getOneCompany = (companyId) => {
  return new Promise(function (resolve, reject) {
    db.companies.findOne({ _id: companyId }, (err, company) => {
      if (err) reject(err);
      resolve(company);
    });
  });
};

const editCompany = (companyId, newInfo) => {
  return new Promise(function (resolve, reject) {
    db.companies.update(
      { _id: companyId },
      { $set: newInfo },
      { returnUpdatedDocs: true },
      (err, numAffected, updatedCompany) => {
        if (err) reject(err);
        resolve(updatedCompany);
      }
    );
  });
};

const deleteCompany = (companyId) => {
  db.companies.remove({ _id: companyId });
  db.contracts.remove({ _id: companyId });
  db.invoices.remove({ _id: companyId });
  db.receipts.remove({ _id: companyId });
};

module.exports = {
  deleteCompany,
  editCompany,
  getOneCompany,
  addCompany,
  getAllCompanies,
};
