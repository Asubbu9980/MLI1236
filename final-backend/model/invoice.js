var mongoose = require("mongoose");
const { Schema } = mongoose;

const InvoiceSchema = new Schema({
  title: String,
  brand: String,
  price: Number,
  quantity: Number,
  taxrate: Number,
  discount: Number,
});

let product = mongoose.model("data", InvoiceSchema);

module.exports = product;
