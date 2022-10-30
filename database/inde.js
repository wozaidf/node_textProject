const mysql = require("mysql");

// 建立与数据库的连接
const dataBase = mysql.createConnection({
    host: '127.0.0.1',          // 数据库的ip地址
    user: 'root',               // 登录数据库的账号
    password: 'LK123',          // 登录数据库的密码
    database: 'node_db',        // 指定要操作的数据库名称
});

module.exports = dataBase;