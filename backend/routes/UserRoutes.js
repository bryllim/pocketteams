const express = require('express');
const  {registerUser, authUser, getUsers, getUserById}  = require('../controllers/UserControllers')
const { protect } = require("../middlewares/AuthMiddleware");

const router = express.Router()

router.route('/').post(registerUser);
router.route('/get').get(getUsers);
router.route('/login').post(authUser);
router.route('/:id').get(getUserById)

module.exports = router;