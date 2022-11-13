const Joi = require('joi');

// 定义 分类Id 的校验规则
const id = Joi.number().integer().min(1).required();

exports.delete_file_schema = {
    params: {
        id,
    },
};