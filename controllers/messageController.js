const MessageModel = require('../models/MessageModel');
const { success, error } = require('../utils/responseWrapper');

const addMessage = async (req, res) => {
  const { chatId, senderId, text } = req.body;
  const message = new MessageModel({
    chatId,
    senderId,
    text,
  });
  try {
    const result = await message.save();
    return res.send(success(200, {result}));
  } catch (e) {
    return res.send(error(500, e.message));
  }
};

const getMessages = async (req, res) => {
  const { chatId } = req.params;  //as we are sending chat in the parameter in routes
  try {
    const result = await MessageModel.find({ chatId });
    return res.send(success(200, {result}));
  } catch (e) {
    return res.send(error(500, e.message));
  }
};

module.exports = {
    addMessage,
    getMessages
}