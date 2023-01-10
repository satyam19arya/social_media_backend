const { success, error } = require('../utils/responseWrapper');
const chatModel = require('../models/ChatModel');

const createChat = async (req, res) => {
    const newChat = new chatModel({
      members: [req.body.senderId, req.body.receiverId],
    });

    try {
      const result = await newChat.save();
      return res.send(success(200, {result}));
    } catch (e) {
      return res.send(error(500, e.message));
    }
  };
  
const userChats = async (req, res) => {
    try {
      const chat = await chatModel.find({
        members: { $in: [req.params.userId] },
      });
      return res.send(success(200, {chat}));
    } catch (e) {
      return res.send(error(500, e.message));
    }
};
  
const findChat = async (req, res) => {
    try {
      const chat = await chatModel.findOne({
        members: { $all: [req.params.firstId, req.params.secondId] },
      });
      return res.send(success(200, {chat}));
    } catch (e) {
      return res.send(error(500, e.message));
    }
};


module.exports = {
    createChat,
    userChats,
    findChat
}