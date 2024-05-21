const express = require("express");
const router = express.Router();
const data = {};
data.products = require("../../data/products.json");

router.route("/").get((req, res) => {
  res.json(data.products);
});

module.exports = router;
