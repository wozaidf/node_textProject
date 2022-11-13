const express = require('express');
const router = express.Router();
const user_handle = require('../router_handle/user')
// 导入验证表单数据的中间件
const expressJoi = require('@escook/express-joi');
// 导入需要验证的规则对象
const reg_login_schema = require('../schema/user');

router.post('/login', expressJoi(reg_login_schema), user_handle.login);
router.post('/register', expressJoi(reg_login_schema), user_handle.register)

module.exports = router;