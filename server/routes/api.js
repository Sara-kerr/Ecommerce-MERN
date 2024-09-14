const { Router } = require("express");
const product = require("./product.js");
const order = require("./order.js");
const user = require("./user.js");

module.exports = ({ config, db }) => {
  let api = Router();

  api.use("/product", product({ config, db }));

  api.use("/order", order({ config, db }));

  api.use("/user", user({ config, db }));

  return api;
};
