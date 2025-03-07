const express = require("express");
const router = express.Router();
const notifyController = require("../controller/notifyController");


router.get("/", notifyController.getAllNotifications);


router.post("/import", notifyController.importNotifications);

module.exports = router;
