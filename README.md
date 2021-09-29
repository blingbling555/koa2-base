# 安装
```js
npm install
```

# 启动
- nodemon 热启动，更新文件会自动重启服务
- --inspect node的调试工具，可以了解下
```js
nodemon --inspect index.js

// 或者最简单的启用
node index.js 
```

# 插件的使用
### mongoose
```bash
npm i mongoose --save
```
使用
```js
const mongoose = require('mongoose')
mongoose.connect(mongodb+srv://wangling:<password>@cluster0.hbo6k.mongodb.net/myFirstDatabase?retryWrites=true&w=majority)
```

### jsonwebtoken
```js
npm i jsonwebtoken -S
```
使用
```js
// 签名
const jwt = require('jsonwebtoken')
// 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoid2FuZ2xpbmciLCJpYXQiOjE2MzI1NzczNTB9.ohuS6-6yszCz5BpesKwpVjKLCzQH62HTfIC7YF6__n0'

const token = jwt.sign({name: 'wangling'}, 'secret')
// 验证
// 解码 { name: 'wangling', iat: 1632577432 }
jwt.decode(token) 
// 验证成功 { name: 'wangling', iat: 1632577432 },验证不成功会报错
jwt.verify(token, 'sectet')
```

# 其他知识
### session
#### session优势
- 相比JWT,最大的优势就在于可以主动清楚session
    - JWT是以token的形式保存在客户端的，只要没过期客户端就一直可以拿着token令牌，来进行认证的
- session保存在服务器端，相对比较安全
- 结合cookie使用，较为灵活，兼容性较好

#### session的劣势
- cookie + session在跨域场景表现并不好
- 如果是分布式部署，需要做多机共享session机制
- 基于cookie的机制很容易被CSRF
- 查询session信息可能会有数据库查询操作(带来性能问题)

#### 总结
- 主要放在服务端，相对安全
- cookie放在客户端，不是很安全

### JWT
#### 什么是JWT
- json web token是一个开放标准（RFC 7519）
- 定义了一种紧凑且独立的方式，可以将各方之间的信息作为json对象进行安全传输
- 该信息可以验证和信任，因为是经过数字签名的

#### 插件
用插件 kao-jwt

### 上传图片
操作步骤
- 安装koa-body,替换koa-bodyparser
  - 因为koa-bodyparser只支持form和json，不支持上传文件
- 设置图片上传目录
  - 如果不使用目录会上传到临时目录中，过段时间就 没了
- 安装koa-static静态服务
- 设置静态文件目录（通常是public）

### 个人资料
- 不同类型（如字符串、数组）的属性
- 字段过滤（用户列表不会反返回所以的字段）
- 分析个人资料的数据结构Schema编写
- 个人资料的参数校验（复杂类型 的参数检验 ）
