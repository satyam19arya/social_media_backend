const router = require('express').Router();
const postsController = require('../controllers/postsController');
const requireUser = require('../middlewares/requireUser');

router.post('/', requireUser, postsController.createPostController);
router.post('/like', requireUser, postsController.likeAndUnlikePost);
router.put('/', requireUser, postsController.updatePostController);
router.delete('/delete', requireUser, postsController.deletePost);
router.post('/comment', requireUser, postsController.commentOnPost);
router.get('/comment', requireUser, postsController.getComments);

module.exports = router;