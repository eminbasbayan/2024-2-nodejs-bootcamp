const data = {};
data.products = require("../models/products.json");

const getAllProducts = (req, res) => {
  res.json(data.products);
};

const createNewProduct = (req, res) => {
  res.json({
    productName: req.body.productName,
    categoryName: req.body.categoryName,
  });
};

const updateProduct = (req, res) => {
  res.json({
    productName: req.body.productName,
    categoryName: req.body.categoryName,
  });
};

const deleteProduct = (req, res) => {
  res.json({
    id: req.body.id,
  });
};

const getProductById = (req, res) => {
  const productId = req.params.productId;
  const findProduct = data.products.find(
    (item) => item.id === Number(productId)
  );
  res.json(findProduct);
};

module.exports = {
  getAllProducts,
  createNewProduct,
  updateProduct,
  deleteProduct,
  getProductById,
};
