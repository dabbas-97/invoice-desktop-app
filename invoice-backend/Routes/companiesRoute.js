const express = require("express");
const controller = require("../Controllers/CompanyController");

const router = express.Router();

const {
  deleteCompany,
  editCompany,
  getOneCompany,
  addCompany,
  getAllCompanies,
} = controller;

router.get("/", async (req, res, next) => {
  try {
    const companies = await getAllCompanies();
    res.send(companies);
  } catch (e) {
    res.send(e.message);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const addedCompany = await addCompany(req.body);
    res.send(addedCompany);
  } catch (e) {
    res.send(e.message);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const company = await getOneCompany(req.params.id);
    res.send(company);
  } catch (e) {
    res.send(e.message);
  }
});

router.patch("/:id", async (req, res, next) => {
  try {
    const editedCompany = await editCompany(req.params.id, req.body);
    res.send(editedCompany);
  } catch (e) {
    res.send(e.message);
  }
});

router.delete("/:id", (req, res, next) => {
  deleteCompany(req.params.id);
  res.send(req.params.id);
});

module.exports = router;
