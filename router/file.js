const express = require('express');
const router = express.Router();
const file_handle = require('../router_handle/file');
// 解析form-data
const multipart = require('connect-multiparty');
const multipartyMiddleware = multipart();

router.post('/uploadFile', multipartyMiddleware, file_handle.uploadFile)

module.exports = router