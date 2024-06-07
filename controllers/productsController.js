const data = {};
data.products = require("../models/products.json");
const Product = require("../models/Product");

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

const createNewProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();

    res.sendStatus(201);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

const updateProduct = async (req, res) => {
  const productId = req.body.id;
  const updateData = req.body;

  if (!productId) return res.sendStatus(400);

  const updatedProduct = await Product.findByIdAndUpdate(
    productId,
    updateData,
    { new: true }
  );

  if (!updatedProduct) return res.sendStatus(404);

  res.status(200).json(updatedProduct);
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
