const Router = require('koa-router');
const router = new Router({ prefix: '/users' });
const jsonwebtoken = require('jsonwebtoken')
const { secret } = require('../config')
const {
    find,
    findById,
    create,
    update,
    delete: del,
    login,
    checkOwner
} = require('../controllers/users');

// 认证token：token才从前端headers的authorization属性传过来
const auth = async (ctx, next) => {
  const { authorization = '' } = ctx.request.header
  const token = authorization.replace('Bearer ', '')
    try {
        const user = jsonwebtoken.verify(token, secret)
        ctx.state.user = user;
    } catch (e) {
      ctx.throw(401, e.message)
    }
   await next()
}
router.get('/', find);
router.post('/', create);
router.get('/:id', findById);
// put是整体替换， patch是可以替换部分属性
router.patch('/:id',auth, checkOwner, update);
// 两个中间件 先授权 在检查
router.delete('/:id',auth, checkOwner, del);
router.post('/login', login);

module.exports = router;
