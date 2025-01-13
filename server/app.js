const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const index = require("./routes/index");
const expressLayouts = require("express-ejs-layouts");
const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.set("view engine", "ejs");
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(expressLayouts);
app.set("layout", "./layouts/main");
app.use("/", index);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
