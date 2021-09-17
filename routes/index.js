const fs = require('fs');
module.exports = (app) => {
  // 不用手动引用文件
  fs.readdirSync(__dirname).forEach(file => {
    if (file === 'index.js') { return; }
    const route = require(`./${file}`);
    // 注册路由
    app.use(route.routes()).use(route.allowedMethods());
  });
}
