const express = require("express");
const controller = require("../Controllers/app-controller");

const router = express.Router();

router.get("/count", async (req, res, next) => {
  try {
    const count = await controller.getCount();
    res.send({ count });
  } catch (e) {
    res.send(e.message);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const addedInvoice = await controller.addInvoice(req.body);
    res.send(addedInvoice);
  } catch (e) {
    res.send(e.message);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const invoice = await controller.getOneInvoice(req.params.id);
    res.send(invoice);
  } catch (e) {
    res.send(e.message);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const invoices = await controller.getInvoices();
    res.send(invoices);
  } catch (e) {
    res.send(e.message);
  }
});

router.patch("/:id", async (req, res, next) => {
  try {
    const editedInvoice = await controller.editInvoice(req.params.id, req.body);
    res.send(editedInvoice);
  } catch (e) {
    res.send(e.message);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const message = await controller.deleteInvoice(req.params.id);
    res.send(message);
  } catch (e) {
    res.send(e.message);
  }
});

module.exports = router;
