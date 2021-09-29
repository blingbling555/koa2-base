const User = require("../models/users")
const jsonwebtoken = require('jsonwebtoken')
// 密码不建议写在代码里面，根据环境变量来的
const { secret } = require("../config")
class UsersCtl {
  async checkOwner(ctx, next) {
    if (ctx.params.id !== ctx.state.user._id) {
      ctx.throw(403, '没有权限')
    }
    await  next()
  }
  async find(ctx) {
    ctx.body = await User.find()
  }
  async findById(ctx) {
    const { fields = '' } = ctx.query;
    const selectFields = fields.split(';').filter(f => f).map(f => ' +' + f).join('');
    console.log(selectFields)
    const user = await User.findById(ctx.params.id).select(selectFields)
    if (!user) { ctx.throw(404, '用户不存在')}
    ctx.body = user
  }
  async create(ctx) {
    ctx.verifyParams({
      name: { type: 'string', required: true },
      password: { type: 'string', required: true}
    })
    const { name } = ctx.request.body
    const repeatedUser = await User.findOne({name})
    if (repeatedUser) { ctx.throw(409, '该用户已经占用')}
    const user = await new User(ctx.request.body).save()
    ctx.body = user
  }
  async update(ctx) {
    ctx.verifyParams({
      name: { type: 'string', required: false },
      password: { type: 'string', required: false },
      avatar_url: { type: 'string', required: false },
      gender: { type: 'string', required: false },
      headline: { type: 'string', required: false },
      locations: { type: 'array', itemType: 'string', required: false },
      business: { type: 'string', required: false },
      employments: { type: 'array', itemType: 'object', required: false },
      educations: { type: 'array', itemType: 'object', required: false },
    });
    const user = await  User.findOneAndUpdate(ctx.params.id, ctx.request.body)
    if (!user) { ctx.throw(404, '用户不存在')}
    ctx.body = user
  }
  async delete(ctx) {
    const user = await  User.findByIdAndDelete(ctx.params.id)
    if (!user) { ctx.throw(401, '用户不存在')}
    ctx.body = user
  }
  //  登录
 async login(ctx) {
   ctx.verifyParams({
     name: { type: 'string', required: true },
     password: { type: 'string', required: true}
   })
   const user = await User.findOne(ctx.request.body)
   if (!user) { ctx.throw(401, '用户名或密码不正确') }
   const {_id, name } = user
   const token = jsonwebtoken.sign({ _id, name }, secret, { expiresIn: '1d'})
   ctx.body = { token }
 }
}

module.exports = new UsersCtl()
