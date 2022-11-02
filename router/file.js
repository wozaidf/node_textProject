const express = require('express');
const router = express.Router();
const file_handle = require('../router_handle/file');
const path = require('path')
// 解析form-data
const multer = require('multer')

// const storage = multer.diskStorage({
//     //保存路径
//     destination: function (req, file, cb) {
//         cb(null, path.join(__dirname,'/file'))
//         //注意这里的文件路径,不是相对路径，直接填写从项目根路径开始写就行了
//     },
//     //保存在 destination 中的文件名
//     filename: function (req, file, cb) {
//         cb(null, file.fieldname + '-' + Date.now())
//     }
// })
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


router.post('/uploadFile', upload.single('file'), file_handle.uploadFile)

module.exports = router