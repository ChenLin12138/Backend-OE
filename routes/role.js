// 课程路由管理

const RoleController = require('../app/controller/role');

const RoleChecker = (f)=>{
    return f;
};
const RoleRouter = {
    name: '/role',
    routes: [
        {methods: 'get', path: '/list', realize: RoleChecker(RoleController.getList)},
        {methods: 'post', path: '/add', realize: RoleController.add},
        {methods: 'post', path: '/update', realize: RoleController.update},
        {methods: 'post', path: '/delete', realize: RoleController.delete},
        {methods: 'get', path: '/info', realize: RoleController.getById},

    ]
};

module.exports = RoleRouter;
