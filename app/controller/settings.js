// 学生操作相关controller类
const Kit = require("../libs/kit");

const StudentService = require('../service/student')
const ManagerService = require('../service/manager')
const TeacherService = require('../service/teacher')
const R = require('../service/response')

const SettingsController = {
    updatePassword: async (ctx) => {
        const id = ctx.session.id;
        const oldPassword = ctx.request.body.old_password;
        const newPassword = ctx.request.body.new_password;
        if (!oldPassword) return R.error(1, "oldPassword", ctx);
        if (!newPassword) return R.error(1, "newPassword", ctx);
        const loginType = ctx.session.login_type;
        let ret = 0;
        if ('student' == loginType) {
            const student = await StudentService.getStudentById(id);
            if (student && student.password == oldPassword) {
                ret = await StudentService.updateSPass(newPassword, id);
            } else {
                return R.error(6, "错误", ctx);
            }
        } else if ('manager' == loginType) {
            const manager = await ManagerService.getById(id);
            console.log('manager', manager);
            if (manager && manager.password == oldPassword) {
                ret = await ManagerService.editPassword(id, newPassword);
            } else {
                return R.error(6, "错误", ctx);
            }
        } else if ('teacher' == loginType) {
            const teacher = await TeacherService.getTeacherById(id)
            if (teacher && teacher.password == oldPassword) {
                teacher.password = newPassword;
                ret = await TeacherService.updateTeacher(id, teacher.name, teacher.email, newPassword);
            } else {
                return R.error(6, "错误", ctx);
            }
        } else {
            R.error(888, "", ctx);
        }
        if (ret) {
            R.success(ret, ctx);
        } else {
            R.error(99, "更新失败", ctx);
        }
    },
};

module.exports = SettingsController
