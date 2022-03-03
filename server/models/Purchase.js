const mongoose = require("mongoose");

const purchaseSchema = new mongoose.Schema({
  title: {
    type: String,
    maxlength: 100,
    required: true,
  },
  comment: {
    type: String,
    maxlength: 500,
  },
  price: {
    type: String,
    maxlength: 100,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  imageUrl: {
    type: String,
  },
  numberOfTable: {
    type: Number,
    required: true,
  },
  isKitchen: {
    type: Boolean,
    required: true,
  },
});

module.exports = mongoose.model("Purchase", purchaseSchema);
