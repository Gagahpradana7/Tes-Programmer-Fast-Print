"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Produk extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Produk.belongsTo(models.Status, { foreignKey: "status_id" });
      Produk.belongsTo(models.Kategori, { foreignKey: "kategori_id" });
    }
  }
  Produk.init(
    {
      nama_produk: DataTypes.STRING,
      harga: DataTypes.INTEGER,
      kategori_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "Kategori",
          key: "id",
        },
      },
      status_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "Status",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "Produk",
    }
  );
  return Produk;
};
