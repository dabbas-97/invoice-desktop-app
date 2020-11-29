const express = require("express");
const controller = require("../Controllers/receiptController");

const router = express.Router();

const {
  deleteReceipt,
  editReceipt,
  getOneReceipt,
  addReceipt,
  getReceiptsCount,
} = controller;

router.get("/count", async (req, res, next) => {
  try {
    const count = await getReceiptsCount();
    res.send({ count });
  } catch (e) {
    res.send(e.message);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const addedReceipt = await addReceipt(req.body);
    res.send(addedReceipt);
  } catch (e) {
    res.send(e.message);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const receipt = await getOneReceipt(req.params.id);
    res.send(receipt);
  } catch (e) {
    res.send(e.message);
  }
});

router.patch("/:id", async (req, res, next) => {
  try {
    const editedReceipt = await editReceipt(req.params.id, req.body);
    res.send(editedReceipt);
  } catch (e) {
    res.send(e.message);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const message = await deleteReceipt(req.params.id);
    res.send(message);
  } catch (e) {
    res.send(e.message);
  }
});

module.exports = router;
