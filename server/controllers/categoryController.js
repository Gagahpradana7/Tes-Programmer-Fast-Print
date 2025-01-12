const { Kategori } = require("../models");

const getAllCategories = async (req, res) => {
  try {
    const categories = await Kategori.findAll();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch categories" });
  }
};

module.exports = { getAllCategories };
