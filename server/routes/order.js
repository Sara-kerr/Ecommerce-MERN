const { Router } = require("express");
const Order = require("../models/Order");

module.exports = ({ config, db }) => {
  const router = Router();

  // POST route to create a new order
  router.post("/", async (req, res) => {
    const { user, orderItems, shippingAddress, totalPrice } = req.body;

    // Validate the required fields
    if (
      !user ||
      !orderItems ||
      orderItems.length === 0 ||
      !shippingAddress ||
      !totalPrice
    ) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields." });
    }

    try {
      const newOrder = new Order({
        user,
        orderItems,
        shippingAddress,
        totalPrice,
      });

      const savedOrder = await newOrder.save();
      res.status(201).json(savedOrder);
    } catch (error) {
      res.status(500).json({ message: "Error creating order", error });
    }
  });

  // To fill the id
  router.put("/:id", async (req, res) => {
    const { orders } = req.body;

    try {
      // Find user by ID and update their orders array
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        { $push: { orders: { $each: orders } } }, // Add the new order(s)
        { new: true } // Return the updated document
      );

      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json({ message: "Error updating user", error });
    }
  });

  // Get All Orders 
  router.get("/", async (req, res) => {
    try {
      const orders = await Order.find()
        .populate("user", "name email")
        .populate("orderItems.product");
      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json({ message: "Error fetching orders", error });
    }
  });

  // Get a Specific Order by ID 
  router.get("/:id", async (req, res) => {
    const { id } = req.params;

    try {
      const order = await Order.findById(id)
        .populate("user", "name email")
        .populate("orderItems.product");
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
      res.status(200).json(order);
    } catch (error) {
      res.status(500).json({ message: "Error fetching order", error });
    }
  });

  // Get Orders by User 
  router.get("/user/:userId", async (req, res) => {
    const { userId } = req.params;

    try {
      const orders = await Order.find({ user: userId }).populate(
        "orderItems.product"
      );
      if (orders.length === 0) {
        return res
          .status(404)
          .json({ message: "No orders found for this user" });
      }
      res.status(200).json(orders);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error fetching orders for user", error });
    }
  });

  // Update Order Status 
  router.put("/:id/status", async (req, res) => {
    const { id } = req.params;
    const { orderStatus } = req.body;

    try {
      const order = await Order.findById(id);
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }

      order.orderStatus = orderStatus;
      const updatedOrder = await order.save();
      res.status(200).json(updatedOrder);
    } catch (error) {
      res.status(500).json({ message: "Error updating order status", error });
    }
  });

  // Delete an Order 
  router.delete("/:id", async (req, res) => {
    const { id } = req.params;

    try {
      const order = await Order.findById(id);
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }

      await order.remove();
      res.status(200).json({ message: "Order deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting order", error });
    }
  });

  // Mark Order as Paid 
  router.put("/:id/pay", async (req, res) => {
    const { id } = req.params;
    const { isPaid } = req.body;

    try {
      const order = await Order.findById(id);
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }

      order.isPaid = isPaid;
      const updatedOrder = await order.save();
      res.status(200).json(updatedOrder);
    } catch (error) {
      res.status(500).json({ message: "Error updating payment status", error });
    }
  });

  return router;
};
