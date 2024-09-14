const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  orderItems: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: { type: Number , default : 1 },
    },
  ],
  shippingAddress: {
    address: { type: String, required: true },
    wilaya: { type: String, required: true },
    commune: { type: String, required: true },
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  isPaid: {
    type: Boolean,
    default: false,
  },
  orderStatus: {
    type: String,
    default: "processing",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Order", orderSchema, 'orders');
