const express = require("express")
const router = express.Router();
const {handleUserSignnup,handleUserLogin} = require("../controllers/user")

router.post("/", handleUserSignnup);
router.post("/login", handleUserLogin);

module.exports = router;