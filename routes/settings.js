// 学生管理

const SettingsController = require('../app/controller/settings')
const SettingsRouter = {
    name: '/settings',//命名空间
    routes: [
        {methods: 'post', path: '/password', realize: SettingsController.updatePassword},
    ]
};

module.exports = SettingsRouter;
