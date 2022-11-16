const express = require('express');
const router = express.Router();
const iamge_handle = require('../router_handle/images');
const path = require('path');
// 解析form-data的中间件
const multer = require('multer');


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
    destination: path.join(__dirname, '../public/images/'),//上传的相对路径
    //上传文件的名称
    filename: function (req, file, cb) {
      cb(null, decodeURI(file.originalname))
    },
  })
});


router.post('/uploadImages', upload.single('image'), iamge_handle.uploadImages);
router.get('/getImagesList', iamge_handle.getImagesList);



module.exports = router;
