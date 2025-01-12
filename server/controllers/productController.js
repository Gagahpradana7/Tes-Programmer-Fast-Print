const { Produk, Kategori, Status } = require("../models");

const getAllProducts = async (req, res) => {
  try {
    const products = await Produk.findAll({
      include: [
        { model: Kategori, as: "kategori" },
        { model: Status, as: "status" },
      ],
    });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
};

const createProduct = async (req, res) => {
  try {
    const { nama_produk, harga, kategori_id, status_id } = req.body;
    const product = await Produk.create({
      nama_produk,
      harga,
      kategori_id,
      status_id,
    });
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: "Failed to create product" });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { nama_produk, harga, kategori_id, status_id } = req.body;

    const product = await Produk.findByPk(id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    await product.update({
      nama_produk,
      harga,
      kategori_id,
      status_id,
    });

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: "Failed to update product" });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Produk.findByPk(id);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    await product.destroy();
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete product" });
  }
};

module.exports = {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};
