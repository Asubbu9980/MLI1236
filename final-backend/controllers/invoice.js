const ProductModel = require("../model/invoice");

const newInvoice = async function (req, res, next) {
  let body = req.body;
  try {
    let invoice = new ProductModel(body);
    let createdInvoice = await invoice.save();
    return res.send(createdInvoice);
  } catch (err) {
    return res.send(err);
  }
};

const getAllInvoices = async function (req, res, next) {
  try {
    let all = await ProductModel.find({});
    return res.send(all);
  } catch (err) {
    return res.send(err);
  }
};

const deleteInvoice = async function (req, res, next) {
  let id = req.params.id;
  try {
    let deleted = await ProductModel.findByIdAndDelete(id);
    return res.send(deleted);
  } catch (err) {
    return res.send(err);
  }
};

module.exports = { newInvoice, getAllInvoices, deleteInvoice };
