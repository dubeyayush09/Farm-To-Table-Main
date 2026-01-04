const express = require("express");
const { generatePdf } = require("../controller/Receipt.controller");

const router = express.Router();

router.post("/generate", generatePdf);

module.exports = router;
