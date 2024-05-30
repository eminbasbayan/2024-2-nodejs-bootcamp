const express = require("express");

const {
  getAllProducts,
  createNewProduct,
  updateProduct,
  getProductById,
  deleteProduct,
} = require("../../controllers/productsController");
const router = express.Router();

router
  .route("/")
  .get(getAllProducts)
  .post(createNewProduct)
  .put(updateProduct)
  .delete(deleteProduct);

router.route("/:productId").get(getProductById);

module.exports = router;
