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
