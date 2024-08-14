const express = require("express");
const router = express.Router();
const { createCheckoutForm, handleCallback } = require("../controllers/iyzicoController.js");

router.post("/", createCheckoutForm);
router.post("/callback", handleCallback);

module.exports = router;

 