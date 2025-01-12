const express = require("express");
const { fetchAndSaveData } = require("../controllers/apiController");
const router = express.Router();

router.get("/fetch", fetchAndSaveData);

module.exports = router;
