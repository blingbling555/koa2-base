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
  // 关注人列表
  async listFollowing(ctx) {
    //

    /*
    *    在 model里面用下面写法
    *    type: Schema.Types.ObjectId,
         ref: "User"
        * 在这里使用 populate('following')，
        * 就可以获取到用户列表了，不然获取的是用户id
    * */
    const user = await User.findById(ctx.params.id).select('+following').populate('following');
    if (!user) { ctx.throw(404, '用户不存在'); }
    ctx.body = user.following;
  }
  // 关注某人
  async follow(ctx) {
    const me = await User.findById(ctx.state.user._id).select('+following');
    if (!me.following.map(id => id.toString()).includes(ctx.params.id)) {
      me.following.push(ctx.params.id);
      me.save();
    }
    ctx.status = 204;
  }
  // 取消关注
  async unfollow(ctx) {
    const me = await User.findById(ctx.state.user._id).select('+following');
    const index = me.following.map(id => id.toString()).indexOf(ctx.params.id);
    if (index > -1) {
      me.following.splice(index, 1);
      me.save();
    }
    ctx.status = 204;
  }
  // 获取粉丝列表
  async listFollowers(ctx) {
    // 表示用户列表的following数组里面包含该id
    const users = await User.find({ following: ctx.params.id });
    ctx.body = users;
  }
  async checkUserExist(ctx, next) {
    const user = await User.findById(ctx.params.id);
    if (!user) { ctx.throw(404, '用户不存在'); }
    await next();
  }
}

module.exports = new UsersCtl()
