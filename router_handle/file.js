const uploadFile = (req, res) => {
    // // 整理数据
    // console.log(req.file);
    // const uploadFile = req.file;
    // if (uploadFile.size < 1024) {
    //     uploadFile.size = Math.ceil(uploadFile.size) + "B";
    //  } else if (uploadFile.size / 1024 < 1024) {
    //     uploadFile.size = Math.ceil(uploadFile.size / 1024) + "KB";
    //  } else if (uploadFile.size / 1024 / 1024 < 5) {
    //     uploadFile.size = Math.ceil(uploadFile.size / 1024 / 1024) + "MB";
    //  }
    //  // 生成现在上传的时间
    //  console.log(uploadFile.size);
    //  const date = new Date().toLocaleString();
    //  uploadFile.time = date;
    // console.log(uploadFile);
    console.log(req.file);
    res.send('ok')
}

module.exports = {
    uploadFile
}