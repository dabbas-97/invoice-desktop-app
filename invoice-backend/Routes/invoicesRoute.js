const express = require("express");
const controller = require("../Controllers/invoiceController");

const router = express.Router();

const {
  deleteInvoice,
  editInvoice,
  getOneInvoice,
  addInvoice,
  getInvoicesCount,
} = controller;

router.get("/count", async (req, res, next) => {
  try {
    const count = await getInvoicesCount();
    res.send({ count });
  } catch (e) {
    res.send(e.message);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const addedInvoice = await addInvoice(req.body);
    res.send(addedInvoice);
  } catch (e) {
    res.send(e.message);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const invoice = await getOneInvoice(req.params.id);
    res.send(invoice);
  } catch (e) {
    res.send(e.message);
  }
});

router.patch("/:id", async (req, res, next) => {
  try {
    const editedInvoice = await editInvoice(req.params.id, req.body);
    res.send(editedInvoice);
  } catch (e) {
    res.send(e.message);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const message = await deleteInvoice(req.params.id);
    res.send(message);
  } catch (e) {
    res.send(e.message);
  }
});

module.exports = router;
