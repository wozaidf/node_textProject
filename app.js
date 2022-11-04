const express = require('express')
// 创建服务器的实例对象
const app = express();
const userRouter = require('./router/user');
const fileRouter = require('./router/file')
// 引入跨域
const cors = require('cors');
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

app.use('/user',userRouter)
app.use('/file',fileRouter)
app.listen(8081, () => {
    console.log('express server running http://127.0.0.1:8081')
})