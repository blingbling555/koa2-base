const Koa = require('koa')
const app = new Koa()
const BodyParser = require('koa-bodyparser')

const mongoose = require('mongoose')
const parameter = require('koa-parameter');
app.use(parameter(app))

const routing = require('./routes');
const error = require('koa-json-error')
const { connectionStr } = require('./config')
// 自己写的错误处理
// app.use(async (ctx, next) => {
//   try {
//     await next()
//   } catch (err) {
//     ctx.status = err.status || err.statusCode || 500
//     ctx.body = {
//       message: err.message
//     }
//   }
// })

// 第一个参数是云数据库复制的那一串
mongoose.connect(connectionStr, { useNewUrlParser: true }, () => console.log('mongodb连接成功了'))
mongoose.connection.on('error', console.error)
// 用koa-json-error 404或者其他自己写的错误以及运行时错误都可以捕获，生产环境不要抛出堆栈信息
app.use(error({
  postFormat: (e, { stack, ...rest }) => process.env.NODE_ENV === 'production' ? rest : { stack, ...rest }
}))

app.use(BodyParser())
routing(app)

app.listen(3000)
