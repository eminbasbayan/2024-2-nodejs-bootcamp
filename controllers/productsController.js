const data = {};
data.products = require("../models/products.json");
const Product = require("../models/Product");

const getAllProducts = (req, res) => {
  res.json(data.products);
};

const createNewProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();

    res.sendStatus(201);
  } catch (err) {
    console.log(err);
  }
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
