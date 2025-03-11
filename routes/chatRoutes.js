const express = require("express");
const { getMessages, sendMessage } = require("../controllers/chatController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/messages", authMiddleware, getMessages);
router.post("/send", authMiddleware, sendMessage);

module.exports = router;
