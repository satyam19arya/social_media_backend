const router = require('express').Router();
const messageController = require('../controllers/messageController');
const requireUser = require('../middlewares/requireUser');

router.post('/', requireUser, messageController.addMessage);

router.get('/:chatId', requireUser, messageController.getMessages);

module.exports = router;