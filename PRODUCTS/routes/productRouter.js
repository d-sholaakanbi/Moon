const router = require("express").Router();
const  {
    getAllProducts, updateProduct, deleteProduct, getProduct, createProduct
} = require ("../controller/productController");

router.route("/").get(getAllProducts).post(createProduct);
router.route("/:productId").get(getProduct).patch(updateProduct).delete(deleteProduct);

module.exports = router;
