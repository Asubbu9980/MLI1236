var express = require("express");
var router = express.Router();

var invoiceController = require("../controllers/invoice");

/* GET users listing. */
router.get("/", invoiceController.getAllInvoices);

router.post("/", invoiceController.newInvoice);
router.delete("/:id", invoiceController.deleteInvoice);

module.exports = router;
