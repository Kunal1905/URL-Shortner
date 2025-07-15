const express = require("express");
const router = express.Router();
const {handleGenerateNewURL,  handleGetAnalytics} = require("../controllers/url")

router.get("/analytics/:shortId", handleGetAnalytics)

router.post("/", handleGenerateNewURL);

module.exports = router;