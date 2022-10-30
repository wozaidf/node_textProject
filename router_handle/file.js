const uploadFile = (req, res) => {
    res.send('ok');
    console.log(req.files);
}

module.exports = {
    uploadFile
}