const express = require('express');
const router = express.Router();

const { getPosts, getPost } = require('../controllers/postController');

router.route('/').get(getPosts);
router.route('/:id').get(getPost);

module.exports = router;
