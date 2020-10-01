// 教师管理controller
const R = require('../service/response');
const Tools = require('./tools')
const TeaService = require('../service/teacher');
const Kit =  require("../libs/kit");

const teacherController = {
    // 教师登录
    login: async(ctx) => {
        let email = ctx.request.body.email;
        let password = ctx.request.body.password;
        if(!email) return R.error(1,"email",ctx);
        if(!password) return R.error(1,"password",ctx);
        let result = await TeaService.checkLogin(email,password);
        //console.log('result', result);
        if(result){
            let token = Tools.randomString(8,'0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
            // 将生成的token和教师信息存放到session中
            ctx.session.token = token;
            ctx.session.email = email;
            ctx.session.password = password;
            ctx.session.id = result.id;
            ctx.session.type = result.type;
            ctx.session.name = result.name;
            ctx.session.login_type = 'teacher';
            // console.log('session', ctx.session);
            //console.log('session response', ctx.response);
            // console.log('response cookies', ctx.headers);
            // console.log('response cookies', ctx);
            const cookie = ctx.headers['cookie'];

            R.success({
                token:token,
                //cookie,
                login_type: 'teacher',
                info:{
                    id:result.id,
                    email:result.email,
                    name: result.name,
                    type:result.type
                }
            },ctx)
        }else{
            R.error(5,'Login Failed',ctx);
        }
    },

    // 获取当前用户信息
    systemUserInfo:  (ctx)=> {
        R.success({
            token:ctx.session.token,
            info:{
                id:ctx.session.id,
                name:ctx.session.user,
                type:ctx.session.type
            }
        },ctx)
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
        let result = await TeaService.editPassword(ctx.session.user,newPas);
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
    // 获取教师列表
    getAllTeacher:async (ctx) => {
        const pager = Kit.getPager(ctx);
        const kw = ctx.query.kw || '';
        let result = await TeaService.getAllTeacher(pager, kw)
		if (result) {
			R.success(result, ctx)
		} else {
			R.error(99, '系统错误', ctx)
		}
    },

    // 添加老师账号
    addTeacher:async (ctx) => {
        let name = ctx.request.body.name;
        let email = ctx.request.body.email;
        let password = ctx.request.body.password;
        if(!name)return R.error(1,"name",ctx);
        if(!email)return R.error(1,"email",ctx);
        if(!password)return R.error(1,"password",ctx);
        // 验证name是否存在
        let repeat = await TeaService.queryTeacher(name);
        if(repeat){
            R.error(2,repeat[0].name,ctx);
            return
        }
        let result = await TeaService.addTeacher(name,email, password);
        if(result){
            R.success(result,ctx);
        }else{
            R.error(99,"系统错误",ctx);
        }
    },

    // 根据id删除教师
    deleteTeaById: async (ctx) => {
        let id = ctx.request.body.id;
        if(!id){
            return R.error(1,"id",ctx);
        }
        let result = await TeaService.deleteTeaById(id);
        if(result){
            R.success("删除成功",ctx);
        }else{
            R.error(99,"删除失败",ctx);
        }
    },

    // 通过id更新教师name
    updateTeacher:async (ctx) =>{
        let id = ctx.request.body.id;
        let name = ctx.request.body.name;
        let email = ctx.request.body.email;
        let password = ctx.request.body.password;
        if(!id) return R.error(1,"id",ctx);
        // 查重name
        let repeat = await TeaService.queryTeacher(name, id);
        if(repeat){
            R.error(2,repeat[0].name,ctx);
            return
        }
        let result = await TeaService.updateTeacher(id,name, email, password);
        if(result){
            // R.success("更新成功",ctx);
                R.success(result,ctx);
        }else{
            R.error(99,"更新失败",ctx);
        }
    },

    // 通过id


}
module.exports = teacherController
