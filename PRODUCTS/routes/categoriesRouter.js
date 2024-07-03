const router = require("express").Router();
const {createCategory} = require ("../controller/categoriesController");

router.route("/").post(createCategory);
// router.route("/:productId").get(getProduct).patch(updateProduct).delete(deleteProduct);

module.exports = router;
