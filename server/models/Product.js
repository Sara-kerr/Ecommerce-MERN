const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  isStocked: { type: Boolean, default: true },
  imageUrl: { type: String, required: true }
});


const Product = mongoose.model('Product', productSchema, 'products');

module.exports = Product;

