const express = require('express')
const authController = require('../controllers/authcontroller')
const authPost = require('../controllers/post')
const router = express.Router();
const requireLogin = require('../middleware/requireLogin')
router.post('/signup', authController.signup);
router.post('/signin', authController.signin);
router.post('/createpost', requireLogin, authPost.createpost);
router.get('/allpost', requireLogin, authPost.allpost);
router.get('/mypost', requireLogin, authPost.mypost)

module.exports = router