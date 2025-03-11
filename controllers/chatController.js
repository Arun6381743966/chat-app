const Message = require("../models/message");

exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.findAll();
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.sendMessage = async (req, res) => {
  try {
    const { text } = req.body;
    const message = await Message.create({ userId: req.user.id, text });
    res.json(message);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
