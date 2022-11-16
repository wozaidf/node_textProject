const db = require('../database/index')

const uploadImages = (req, res) => {
    const { originalname, size, filename } = req.file;
    const url = `http://127.0.0.1:8081/images/${filename}`
    console.log(req.file);
    const sql = 'select * from images_info where picture_name = ? and is_delete = 0';
    db.query(sql, originalname, (err, results) => {
        if (err) return res.cc(err);
        if (results.length > 0) return res.cc("图片已存在");
        const sqlStr = 'insert into images_info (picture_name,picture_size,picture_url) value (?,?,?)';
        db.query(sqlStr, [originalname, size, url], (err, results) => {
            if (err) return res.cc(err);
            if (results.affectedRows !== 1) return res.cc("上传失败");
            res.cc("上传成功", 0)
        })
    })
}

const getImagesList = (req, res) => {
    const sqlStr = 'select * from images_info where is_delete = 0 order by id';
    db.query(sqlStr, (err, results) => {
        if (err) return res.cc(err);
        if (!(results.length >= 0)) return res.cc("获取失败");
        res.send({
            status: 0,
            message: "获取成功",
            data: results
        })
    })
}


module.exports = {
    uploadImages,
    getImagesList
} 