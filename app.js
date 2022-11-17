const express = require('express');
const path = require('path')
// 创建服务器的实例对象
const app = express();
const userRouter = require('./router/user');
const fileRouter = require('./router/file');
const Joi = require('joi');
// 导入解析token的模块和密钥
const { expressjwt: jwt } = require('express-jwt');
const secretKey = require('./config.js');
// 引入跨域
const cors = require('cors');
const imageRouter = require('./router/images')
app.use(cors());

// 封装res.send()函数为res.cc()，注意要在注册路由之前
app.use((req, res, next) => {
    res.cc = function (err, status = 1) {
        res.send({
            status,
            // instanceof用于判断左边是否是右边的构造实例
            message: err instanceof Error ? err.message : err
        })
    };
    next();
});

// 解析表单数据
app.use(express.urlencoded({ extended: false }));

// 定义将JWT字符串解析还原成JSON对象的中间件
// 就会自动的将解析出来的用户信息挂载到req.auth属性上，unless表示不需要权限的接口
app.use(jwt({ secret: secretKey, algorithms: ["HS256"] }).unless({ path: [/^\/user\//, /^\/images\//, /^\/agreement\//] }));
// 注册路由
app.use('/user', userRouter);
app.use('/file', fileRouter);
app.use('/images', imageRouter);
app.use('/images', express.static(path.join(__dirname, './public/images')));
app.use('/agreement',express.static('./public'))
// 定义错误级别中间件
app.use((err, req, res, next) => {
    // 验证用户输入信息失败导致的错误
    if (err instanceof Joi.ValidationError) return res.cc(err);
    // 认证token解析错误的判断
    if (err.name == "UnauthorizedError") return res.cc("身份认证失败");
    // 未知错误
    res.cc(err);
})


app.listen(8081, () => {
    console.log('express server running http://127.0.0.1:8081')
})