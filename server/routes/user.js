const { Router } = require('express');
const User = require('../models/User.js');  // User model
const Order = require('../models/Order.js');  // Order model

module.exports = ({ config, db }) => {
  const router = Router();

  // Create a new user (POST)
  router.post('/', async (req, res) => {
    const { name,  email, phoneNumber, wilaya, commune, address, orders } = req.body;

    // Validate required fields
    if (!name  || !email || !phoneNumber || !wilaya || !commune || !address) {
      return res.status(400).json({ message: 'Please provide all required fields.' });
    }

    try {
      const newUser = new User({
        name,
        email,
        phoneNumber,
        wilaya,
        commune,
        address,
        orders: orders || []
      });

      const savedUser = await newUser.save();
      res.status(201).json(savedUser);
    } catch (error) {
      res.status(500).json({ message: 'Error creating user', error });
    }
  });

  // Get All Users (GET)
  router.get('/', async (req, res) => {
    try {
      const users = await User.find().populate('orders');
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching users', error });
    }
  });

  // Get a Specific User by ID (GET)
  router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
      const user = await User.findById(id).populate('orders');
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching user', error });
    }
  });

  // Update User Information (PUT)
  router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, email, phoneNumber, wilaya, commune, address, orders } = req.body;

    try {
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Update user fields
      user.name = name || user.name;
      user.email = email || user.email;
      user.phoneNumber = phoneNumber || user.phoneNumber;
      user.wilaya = wilaya || user.wilaya;
      user.commune = commune || user.commune;
      user.address = address || user.address;
      user.orders = orders || user.orders;

      const updatedUser = await user.save();
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json({ message: 'Error updating user', error });
    }
  });

  // Delete a User (DELETE)
  router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      await user.remove();
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting user', error });
    }
  });

  // Get User Orders (GET)
  router.get('/:id/orders', async (req, res) => {
    const { id } = req.params;

    try {
      const user = await User.findById(id).populate('orders');
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.status(200).json(user.orders);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching user orders', error });
    }
  });

  return router;
};
