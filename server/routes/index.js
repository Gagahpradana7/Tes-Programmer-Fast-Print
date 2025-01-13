const express = require("express");
const { fetchAndSaveData } = require("../controllers/apiController");
const router = express.Router();
const produkController = require("../controllers/produkController");

router.get("/fetch", fetchAndSaveData);
router.get("/", produkController.index);
router.get("/produk/add", produkController.addForm);
router.post("/produk/add", produkController.add);
router.get("/produk/edit/:id", produkController.editForm);
router.post("/produk/edit/:id", produkController.edit);
router.post("/produk/delete/:id", produkController.delete);

module.exports = router;
