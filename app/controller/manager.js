// 教师管理controller
const R = require('../service/response');
const Tools = require('./tools');
const ManagerService = require('../service/manager');
const RoleService = require('../service/role');
const Kit =  require("../libs/kit");

const ManagerController = {
    // Manager登录
    login: async(ctx) => {
        let email = ctx.request.body.email;
        let password = ctx.request.body.password;
        if(!email) return R.error(1,"email",ctx);
        if(!password) return R.error(1,"password",ctx);
        let result = await ManagerService.checkLogin(email,password);
        //console.log('result', result);
        if(result){
            let token = Tools.randomString(8,'0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
            // 将生成的token和教师信息存放到session中
            ctx.session.token = token;
            ctx.session.email = email;
            ctx.session.password = password;
            ctx.session.id = result.id;
            ctx.session.name = result.name;
            ctx.session.login_type = 'manager';
            // console.log('session', ctx.session);
            //console.log('session response', ctx.response);
            // console.log('response cookies', ctx.headers);
            // console.log('response cookies', ctx);
            const cookie = ctx.headers['cookie'];

            R.success({
                token:token,
                //cookie,
                login_type: 'manager',
                info:{
                    role_id: result.role_id,
                    id:result.id,
                    email:result.email,
                    name: result.name,
                    role: result.role || {},
                }
            },ctx)
        }else{
            R.error(5,'Login Failed',ctx);
        }
    },
    // 修改密码
    editPassword :async (ctx) => {
        let oldPas = ctx.request.body.oldPassword;
        let newPas = ctx.request.body.newPassword;
        if(!oldPas)return R.error(1,'oldPas',ctx);
        if(!newPas)return R.error(1,'newPas',ctx);
        if(oldPas !== ctx.session.password){
            R.error(6,'',ctx)
            return
        }
        let result = await ManagerService.editPassword(ctx.session.id,newPas);
        if(result){
            ctx.session.password = newPas;
            R.success('修改成功',ctx);
        }else{
            R.error(99,'修改失败',ctx);
        }
    },

    // 退出登录
    logOut: (ctx) => {
        ctx.session.token = '';
        R.success('已注销成功',ctx);
    },
    // 通过学生id查询学生信息
    getById: async (ctx) => {
        let Id = ctx.query.id;
        let result = await ManagerService.getById(Id);
        if (result) {
            R.success(result, ctx)
        } else {
            R.error(99, '系统错误', ctx)
        }

    },
    // 根据student_id删除学生
    delete: async (ctx) => {
        let id = ctx.request.body.id;
        console.log("id :" + id);
        if (!id) {
            return R.error(1, "id", ctx);
        }
        // 查询是否存在
        let isId = await ManagerService.getById(id);
        if (!isId || isId.length == 0) {
            return R.error(4, id, ctx)
        }
        let result = await ManagerService.deleteById(id);
        if (result) {
            return R.success("删除成功", ctx)
        } else {
            return R.error("删除失败", ctx);
        }
    },
    // 更新
    update: async (ctx) => {
        let id = ctx.request.body.id;
        let role_id = ctx.request.body.role_id;
        let email = ctx.request.body.email;
        let nickname = ctx.request.body.nickname;
        let password = ctx.request.body.password;

        if (!nickname) {
            return R.error(1, "nickname", ctx)
        }
        if (!role_id) {
            return R.error(1, "role_id", ctx)
        }
        if (!email) {
            return R.error(1, "email", ctx)
        }
        if (!password) {
            return R.error(1, "password", ctx)
        }
        if (!id) {
            return R.error(1, "id", ctx)
        }
        let role = await RoleService.getById(role_id)
        if (!role||!role.length) {
            R.error(666, '角色', ctx);
            return
        }
        // 验证要更新的name是否已经存在
        let repeats = await ManagerService.repeatCheck(nickname, email,  id);
        if (repeats && repeats.length && repeats[0].id !== id) {
            R.error(2, repeats[0].name, ctx);
            return
        }
        let result = await ManagerService.update(email, nickname, password, role_id, id);
        if (result) {
            return R.success("数据更新成功", ctx);
        } else {
            return R.error(99,"系统错误", ctx);
        }

    },
    // 新增学生
    add: async (ctx) => {
        let email = ctx.request.body.email;
        let role_id = ctx.request.body.role_id;
        let nickname = ctx.request.body.nickname;
        let password = ctx.request.body.password;
        if (!email) {
            return R.error(1, "email", ctx)
        }
        if (!nickname) {
            return R.error(1, "nickname", ctx)
        }
        if (!password) {
            return R.error(1, "password", ctx)
        }
        if (!role_id) {
            return R.error(1, "role_id", ctx)
        }
        // 查看是否已经存在用户名
        let repeats = await ManagerService.repeatCheck(nickname, email);
        if (repeats && repeats.length > 0) {
            R.error(2, '或Email已存在', ctx);
            return
        }
        let role = await RoleService.getById(role_id)
        if (!role) {
            R.error(666, '角色', ctx);
            return
        }
        let result = await ManagerService.add(email, nickname, password, role_id);
        if (result) {
            return R.success("新增成功", ctx);
        } else {
            return R.error("系统错误", ctx);
        }
    },
    getAll: async (ctx) => {
        const kw = ctx.query.kw || '';
        const pager = Kit.getPager(ctx);
        console.log(pager);
        let result = await ManagerService.getAll(pager, kw);
        if (result) {
            R.success(result, ctx)
        } else {
            R.error(99, '系统错误', ctx)
        }
    },
};
module.exports = ManagerController
