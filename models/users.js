const mongoose = require('mongoose')

const { Schema, model } = mongoose

const userSchema = new Schema({
    // 默认列表会返回一个__v, 这里巧妙的去掉__v
    __v: { type: Number, select: false },
    name: { type: String, required: true },
    // select 获取列表时，不返回密码，当然如果要返回也是有办法的 去查mongodb手册吧
    password: { type: String, required: true, select: false },
    avatar_url: { type: String},
    gender: { type: String, enum: ['male', 'female'], default: 'female', required: true},
    headLine: { type: String},
    locations: { type: [{type: String}], select: false},
    business: { type: String, select: false},
    employments: {
        type: [{
            company: { type: String},
            job: { type: String }
        }],
        select: false
    },
    educations: {
        type: [{
            school: { type: String},
            major: { type: String },
            diploma: { type: Number, enum: [1,2,3,4,5] },
            entrance_year: { type: Number },
            graduation_year: { type: Number }
        }],
        select: false
    },
    following: {
        type: [{
          type: Schema.Types.ObjectId,
          ref: "User"
       }],
        select: false
    }
})


module.exports = model('User', userSchema)

