const express = require("express");
const { fetchAndSaveData } = require("../controllers/apiController");
const router = express.Router();
const productController = require("../controllers/productController");
const categoryController = require("../controllers/categoryController");
const statusController = require("../controllers/statusController");

router.get("/", fetchAndSaveData);
router.get("/products", productController.getAllProducts);
router.post("/products", productController.createProduct);
router.put("/products/:id", productController.updateProduct);
router.delete("/products/:id", productController.deleteProduct);
router.get("/categories", categoryController.getAllCategories);
router.get("/statuses", statusController.getAllStatuses);

module.exports = router;
