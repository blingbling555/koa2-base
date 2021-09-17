const Koa = require('koa')
const app = new Koa()
const BodyParser = require('koa-bodyparser')
const routing = require('./routes');
app.use(BodyParser())
routing(app)

app.listen(3000)
