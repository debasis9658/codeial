const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users_controllers');
const postsController = require('../controllers/posts_controller');

router.get('/profile', usersController.profile);
router.get('/comments', postsController.comment);

module.exports = router;