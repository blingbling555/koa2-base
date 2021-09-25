const Router = require('koa-router');
const router = new Router({ prefix: '/users' });
const {
    find,
    findById,
    create,
    update,
    delete: del,
    login
} = require('../controllers/users');

router.get('/', find);
router.post('/', create);
router.get('/:id', findById);
// put是整体替换， patch是可以替换部分属性
router.patch('/:id', update);
router.delete('/:id', del);
router.post('/login', login);

module.exports = router;
