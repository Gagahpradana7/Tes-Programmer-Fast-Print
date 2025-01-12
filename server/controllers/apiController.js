const axios = require("axios");
const crypto = require("crypto");
const { Produk, Kategori, Status } = require("../models");

const fetchAndSaveData = async (req, res) => {
  try {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear()).slice(-2);

    const username = `tesprogrammer${day}${month}${year}C12`;
    const rawPassword = `bisacoding-${day}-${month}-${year}`;
    const password = crypto.createHash("md5").update(rawPassword).digest("hex");

    const formData = new URLSearchParams();
    formData.append("username", username);
    formData.append("password", password);

    console.log("Username:", username);
    console.log("Raw password:", rawPassword);
    console.log("MD5 password:", password);

    const response = await axios.post(
      "https://recruitment.fastprint.co.id/tes/api_tes_programmer",
      formData,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const products = response.data.data;

    for (let product of products) {
      const [status, createdStatus] = await Status.findOrCreate({
        where: { nama_status: product.status },
      });

      const [category, createdCategory] = await Kategori.findOrCreate({
        where: { nama_kategori: product.kategori },
      });

      await Produk.create({
        nama_produk: product.nama,
        harga: product.harga,
        kategori_id: category.id,
        status_id: status.id,
      });
    }

    res.status(200).json({ message: "Data successfully fetched and saved" });
  } catch (error) {
    console.error("Full error:", error.response?.data || error.message);
    res.status(500).json({
      error: "Failed to fetch and save data",
      details: error.response?.data || error.message,
    });
  }
};

module.exports = { fetchAndSaveData };
