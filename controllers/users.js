class UsersCtl {
  find(ctx) {
    ctx.body = '发现'
  }
  findById(ctx) {
    ctx.body = 'findById'
  }
  create(ctx) {
    ctx.body = 'create'
  }
  update(ctx) {
    ctx.body = 'update'
  }
  delete(ctx) {
    ctx.body = 'delete'
  }
}

module.exports = new UsersCtl()
