const { Router } = require("express");
const Product = require("../models/Product.js"); // Product model

module.exports = ({ config, db }) => {
  const router = Router();

  // POST route to add a new product
  router.post("/", async (req, res) => {
    const { name, price, description, category, isStocked, imageUrl } =
      req.body;

    // Validation
    if (!name || !price || !description || !category || !imageUrl) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields." });
    }

    try {
      const newProduct = new Product({
        name,
        price,
        description,
        category,
        isStocked: isStocked !== undefined ? isStocked : true,
        imageUrl,
      });

      const savedProduct = await newProduct.save();
      res.status(201).json(savedProduct);
    } catch (error) {
      res.status(500).json({ message: "Error adding product", error });
    }
  });

  // GET route to fetch all products
  router.get("/", async (req, res) => {
    const { page = 1, limit = 12, sort = "name", category } = req.query;

    // Convert page and limit to integers
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);

    // Build the query object
    const query = {};
    if (category) {
      query.category = category;
    }

    try {
      // Fetch products from the database
      const products = await Product.find(query)
        .sort(sort)
        .skip((pageNumber - 1) * limitNumber)
        .limit(limitNumber);

      // Get total count for pagination
      const totalProducts = await Product.countDocuments(query);

      res.json({
        products,
        totalProducts,
        page: pageNumber,
        totalPages: Math.ceil(totalProducts / limitNumber),
      });
    } catch (error) {
      res.status(500).json({ message: "Error fetching products", error });
    }
  });

  // GET route to fetch a single product by ID
  router.get("/:id", async (req, res) => {
    const { id } = req.params;

    try {
      const product = await Product.findById(id);

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      res.json(product);
    } catch (error) {
      res.status(500).json({ message: "Error fetching product", error });
    }
  });

  // GET route to search for products
  router.get("/search", async (req, res) => {
    const { query } = req.query;

    console.log(`Search query received: ${query}`); // Log the query for debugging

    try {
      const products = await Product.find({
        $or: [
          { name: { $regex: query, $options: "i" } },
          { category: { $regex: query, $options: "i" } },
        ],
      });

      console.log(`Products found:`, products); // Log the results
      res.json(products);
    } catch (error) {
      console.error("Error searching products:", error); // Log the error
      res.status(500).json({ message: "Error searching products", error });
    }
  });

  // GET route to fetch products by category
  router.get("/category/:category", async (req, res) => {
    const { category } = req.params;

    try {
      const products = await Product.find({ category });

      res.json(products);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error fetching products by category", error });
    }
  });

  // GET route to check stock status of a product
  router.get("/:id/stock", async (req, res) => {
    const { id } = req.params;

    try {
      const product = await Product.findById(id);

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      res.json({ isStocked: product.isStocked });
    } catch (error) {
      res.status(500).json({ message: "Error checking product stock", error });
    }
  });

  return router;
};
