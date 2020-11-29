const express = require("express");
const controller = require("../Controllers/ContractController");

const router = express.Router();

const {
  deleteContract,
  editContract,
  getOneContract,
  addContract,
  getAllContracts,
} = controller;

router.get("/", async (req, res, next) => {
  try {
    const contracts = await getAllContracts();
    res.send(contracts);
  } catch (e) {
    res.send(e.message);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const addedContract = await addContract(req.body);
    res.send(addedContract);
  } catch (e) {
    res.send(e.message);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const Contract = await getOneContract(req.params.id);
    res.send(Contract);
  } catch (e) {
    res.send(e.message);
  }
});

router.patch("/:id", async (req, res, next) => {
  try {
    const editedContract = await editContract(req.params.id, req.body);
    res.send(editedContract);
  } catch (e) {
    res.send(e.message);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const message = await deleteContract(req.params.id);
    res.send(message);
  } catch (e) {
    res.send(e.message);
  }
});

module.exports = router;
