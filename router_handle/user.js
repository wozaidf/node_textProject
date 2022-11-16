const db = require('../dataBase/index');
// 引入生成token模块和密钥
const jwt = require('jsonwebtoken');
const secretKey = require('../config.js');

const login = (req, res) => {
    const { username, password } = req.body
    // 和数据库中的用户信息进行对比
    // 成功后生成token返回前端
    const sql = 'select * from user where username = ?'
    db.query(sql, username, (err, results) => {
        if (err) return res.cc(err);
        if (!results.length > 0) res.cc("未查到该用户");
        // 有该用户，用bcrypt.compareSync(password, hashFromDB)函数判断用户输入的密码和数据的密码是否一样
        const comparaResult = bcrypt.compareSync(password, results[0].password);
        if (!comparaResult) return res.cc("登录失败，密码错误");
        // 校验成功后生成token
        const user = { ...results[0], password: '', }; //生成token一定要剔除密码
        const token = 'Bearer ' + jwt.sign(user, secretKey, { expiresIn: '10h' });
        res.send({
            status: 0,
            message: "登陆成功",
            token,
            data: results[0].username
        })
    })
};
// 导入用户密码加密模块
const bcrypt = require('bcryptjs');

const register = (req, res) => {
    // 将用户密码加密存入数据库
    // 定义sql语句
    // 查询用户名是否被占用
    const { username, password } = req.body;
    const sqlStr = 'select * from user where username = ?';
    db.query(sqlStr, username, (err, resuts) => {
        if (err) return res.cc(err);
        if (resuts.length > 0) return res.cc("已经有该用户");
        // 用户名可以使用，用bcrypt.hashSync(params1,salt)哈希给用户密码加密，salt为随机盐：通过在密码任意固定位置插入特定的字符串
        const hashPassword = bcrypt.hashSync(password, 10);
        // 插入该用户
        const sql = 'insert into user set ?';
        db.query(sql, { username, password: hashPassword }, (err, results) => {
            if (err) return res.cc(err);
            if (results.affectedRows != 1) return res.cc("注册失败");
            res.cc("注册成功", 0);
        })
    })
}

module.exports = {
    login,
    register
}