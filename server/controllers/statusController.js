const { Status } = require("../models");

const getAllStatuses = async (req, res) => {
  try {
    const statuses = await Status.findAll();
    res.status(200).json(statuses);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch statuses" });
  }
};

module.exports = { getAllStatuses };
