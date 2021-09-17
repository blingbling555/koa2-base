class UsersCtl {
  find(ctx) {
    ctx.body = '发现'
  }
  findById(ctx) {
    ctx.body = 'findById'
  }
  create(ctx) {
    ctx.verifyParams({
      name: { type: 'string', required: true },
      age: { type: 'number', required: true },
    })
    ctx.body = 'success'
  }
  update(ctx) {
    ctx.body = 'update'
  }
  delete(ctx) {
    ctx.body = 'delete'
  }
}

module.exports = new UsersCtl()
