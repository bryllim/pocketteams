const express = require('express');
const  {registerUser, authUser, getUsers}  = require('../controllers/UserControllers')

const router = express.Router()

router.route('/').post(registerUser);
router.route('/get').get(getUsers);
router.route('/login').post(authUser);

module.exports = router;