// 学生管理

const ManagerController = require('../app/controller/manager');
const StuRouter = {
    name:'/manager',//命名空间
    routes:[
        {methods:'post',path:'/login',  realize:ManagerController.login},
        {methods:'get',path:'/list',  realize:ManagerController.getAll},
        {methods:'get',path:'/info',  realize:ManagerController.getById},
        {methods:'post',path:'/delete',  realize:ManagerController.delete},
        {methods:'post',path:'/password',  realize:ManagerController.editPassword},
        {methods:'post',path:'/update',  realize:ManagerController.update},
        {methods:'post',path:'/add',  realize:ManagerController.add},

    ]
};

module.exports=StuRouter;
