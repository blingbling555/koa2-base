const mongoose = require('mongoose')

const { Schema, model } = mongoose

const userSchema = new Schema({
    // 默认列表会返回一个__v, 这里巧妙的去掉__v
    __v: { type: Number, select: false },
    name: { type: String, required: true },
    // select 获取列表时，不返回密码，当然如果要返回也是有办法的 去查mongodb手册吧
    password: { type: String, required: true, select: false }
})

module.exports = model('User', userSchema)

