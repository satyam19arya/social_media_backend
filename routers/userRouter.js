const router = require('express').Router();
const userController = require('../controllers/userController');
const requireUser = require('../middlewares/requireUser');

router.post('/follow', requireUser, userController.followOrUnfollowUserController);
router.get('/getPostsofFollowing', requireUser, userController.getPostsOfFollowing);
router.get('/getMyPosts', requireUser, userController.getMyPosts);
router.get('/getUserPosts', requireUser, userController.getUserPosts);
router.delete('/delete', requireUser, userController.deleteMyProfile);

module.exports = router;