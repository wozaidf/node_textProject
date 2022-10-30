const express = require('express')
// 创建服务器的实例对象
const app = express();
const userRouter = require('./router/user');
const fileRouter = require('./router/file')
// 引入跨域
const cors = require('cors');
app.use(cors());

// 解析表单数据
app.use(express.urlencoded({ extended: false }));

app.use('/user',userRouter)
app.use('/file',fileRouter)
app.listen(8081, () => {
    console.log('express server running http://127.0.0.1:8081')
})