const { Produk, Kategori, Status } = require("../models");

module.exports = {
  async index(req, res) {
    try {
      const produk = await Produk.findAll({
        where: { "$Status.nama_status$": "bisa dijual" },
        include: [{ model: Kategori }, { model: Status }],
      });
      res.render("produk/index", { produk });
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  async addForm(req, res) {
    try {
      const [kategori, status] = await Promise.all([
        Kategori.findAll(),
        Status.findAll(),
      ]);

      res.render("produk/add", {
        title: "Tambah Produk Baru",
        kategori,
        status,
      });
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  async add(req, res) {
    try {
      const { nama_produk, harga, kategori_id, status_id } = req.body;

      if (!nama_produk || !harga || !kategori_id || !status_id) {
        return res.status(400).send("Semua field harus diisi");
      }

      const parsedHarga = parseInt(harga, 10);
      const parsedKategoriId = parseInt(kategori_id, 10);

      const statusMapping = {
        "bisa dijual": 1,
        "tidak bisa dijual": 2,
      };
      const parsedStatusId =
        statusMapping[status_id] || parseInt(status_id, 10);

      if (
        isNaN(parsedHarga) ||
        isNaN(parsedKategoriId) ||
        isNaN(parsedStatusId)
      ) {
        return res
          .status(400)
          .send("Harga, kategori_id, dan status_id harus berupa angka");
      }

      await Produk.create({
        nama_produk,
        harga: parsedHarga,
        kategori_id: parsedKategoriId,
        status_id: parsedStatusId,
      });

      res.redirect("/");
    } catch (error) {
      console.error("Error adding product:", error);
      res.status(500).send(error.message);
    }
  },
  async editForm(req, res) {
    try {
      const [produk, kategori, status] = await Promise.all([
        Produk.findByPk(req.params.id),
        Kategori.findAll(),
        Status.findAll(),
      ]);

      if (!produk) {
        return res.status(404).send("Produk tidak ditemukan");
      }

      res.render("produk/edit", {
        title: "Edit Produk",
        produk,
        kategori,
        status,
      });
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  async edit(req, res) {
    try {
      const { nama_produk, harga, kategori_id, status_id } = req.body;

      const updateData = {
        nama_produk,
        harga: parseInt(harga),
        kategori_id: parseInt(kategori_id),
        status_id: parseInt(status_id),
      };

      const result = await Produk.update(updateData, {
        where: { id: req.params.id },
        returning: true,
      });

      if (result[0] === 0) {
        return res.status(404).send("Produk tidak ditemukan");
      }
      if (!nama_produk || !harga || !kategori_id || !status_id) {
        return res.status(400).send("Semua field harus diisi");
      }
      res.redirect("/");
    } catch (error) {
      console.error("Error updating product:", error);
      res.status(500).send(error.message);
    }
  },

  async delete(req, res) {
    try {
      await Produk.destroy({ where: { id: req.params.id } });
      res.redirect("/");
    } catch (error) {
      res.status(500).send(error.message);
    }
  },
};
