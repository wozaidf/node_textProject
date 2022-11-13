const Joi = require('joi');

// 定义用户名和密码的验证规则
const username = Joi.string().alphanum().min(1).max(10).required();
//  至少8-16个字符，至少1个大写字母，1个小写字母和1个数字，其他可以是任意字符：**
const password = Joi.string().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/).required();

const reg_login_schema = {
    body: {
        username,
        password
    }
}
module.exports = reg_login_schema