const db = require('../database/index')
const uploadFile = (req, res) => {
    const { filename, path, size, fieldname } = req.file
    // 操作数据存文件信息
    const sql = 'select * from file_info where filename = ? and is_delete = 0'
    db.query(sql, filename, (err, results) => {
        if (err) return res.cc(err);
        if (results.length > 0) return res.cc("不要重复上传文件");
        const sqlStr = 'insert into file_info(filename,path,size,fieldname) values(?,?,?,?)'
        db.query(sqlStr, [filename, path, size, fieldname], (err, results) => {
            if (err) return res.send(err);
            if (results.affectedRows != 1) return res.cc("添加失败");
            res.cc("添加成功", 0);
        })
    })
}

const fileList = (req, res) => {
    // 获取列表
    const sqlStr = 'select * from file_info where is_delete = 0 order by id'
    db.query(sqlStr, (err, results) => {
        if (err) return res.cc(err);
        if (!(results.length >= 0)) return res.cc("获取失败");
        res.send({
            status: 0,
            message: "获取文件列表成功成功",
            data: results
        })
    })
}

const deleteFile = (req, res) => {
    const sqlStr = 'update file_info set is_delete = 1 where id = ?';
    db.query(sqlStr, req.params.id, (err, results) => {
        if (err) return res.cc(err);
        if (results.affectedRows !== 1) return ("删除失败");
        res.cc("删除成功", 0)
    })
}





module.exports = {
    uploadFile,
    fileList,
    deleteFile
}