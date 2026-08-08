const express = require("express");
const { addPerson } = require("../controllers/personController");

const router = express.Router();

router.post("/", addPerson);

module.exports = router;