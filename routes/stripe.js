const express = require("express");
const router = express.Router();
const { createCheckoutSession } = require("../controllers/stripeController");

router.post("/", createCheckoutSession);

module.exports = router;
