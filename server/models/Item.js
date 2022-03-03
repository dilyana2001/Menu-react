const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  title: {
    type: String,
    maxlength: 100,
    required: true,
  },
  imageUrl: {
    type: String,
  },
  description: {
    type: String,
    maxlength: 500,
  },
  price: {
    required: true,
    type: String,
    maxlength: 20,
  },
  category: {
    type: String,
    maxlength: 100,
    required: true,
  },
  subcategory: {
    type: String,
    maxlength: 100,
    required: true,
  },
  isKitchen: {
    type: Boolean,
  },
});

module.exports = mongoose.model("Item", itemSchema);
