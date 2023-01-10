const router = require('express').Router();
const requireUser = require('../middlewares/requireUser');
const chatController = require('../controllers/chatController')

router.post('/', requireUser, chatController.createChat);
router.get("/:userId", requireUser, chatController.userChats)
router.get("/find/:firstId/:secondId", requireUser, chatController.findChat)

module.exports = router;