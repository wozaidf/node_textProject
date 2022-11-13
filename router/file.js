const express = require('express');
const router = express.Router();
const file_handle = require('../router_handle/file');
const path = require('path');
// 解析form-data的中间件
const multer = require('multer');

// 导入验证表单数据的中间件
const expressJoi = require('@escook/express-joi');
// 导入需要验证的规则对象
const { delete_file_schema } = require('../schema/file');


// 配置multer
const upload = multer({
  fileFilter(req, file, callback) {
    // 解决中文名乱码的问题 latin1 是一种编码格式
    file.originalname = Buffer.from(file.originalname, "latin1").toString(
      "utf8"
    );
    callback(null, true);
  },
  storage: multer.diskStorage({
    //上传文件的目录
    destination: path.join(__dirname, '../public/uploads/'),//上传的相对路径
    //上传文件的名称
    filename: function (req, file, cb) {
      cb(null, decodeURI(file.originalname))
    },
  })
});

router.post('/uploadFile', upload.single('file'), file_handle.uploadFile);
router.get('/getFileList', file_handle.fileList);
router.delete('/deleteFile/:id', expressJoi(delete_file_schema), file_handle.deleteFile)


module.exports = router;