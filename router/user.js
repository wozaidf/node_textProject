const express = require('express');
const router = express.Router();
const user_handle = require('../router_handle/user')



router.post('/login', user_handle.login);


module.exports = router