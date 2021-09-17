const path = require('path');
class HomeCtl {
  index(ctx) {
    ctx.body = '<h1>这是主页</h1>';
  }
  upload(ctx) {
    const file = ctx.request.files.file;
    const basename = path.basename(file.path);
    ctx.body = { url: `${ctx.origin}/uploads/${basename}` };
  }

  testPost(ctx) {
    console.log(ctx, ctx.request.body)
    ctx.body = {msg: '这是数据'};
  }
}

module.exports = new HomeCtl();
