// 教师管理service
const teaModel = require('../model/teacher')
const TeaService = {
    // 教师登录
    checkLogin:async (email,password) => {
        let data =  await teaModel.checkLogin(email,password);
        return data && data.length? data[0] : false
    },

    // 获取教师列表
    getAllTeacher: async (pager, kw) => {
        let data = await teaModel.getAllTeacher(pager, kw)
        return data;
    },

    // 添加教师账号
    addTeacher:async (name,email, password) =>{
        let result  = await teaModel.addTeacher(name,email, password);
        if(result.insertId){return result}
        return false
    },

    // 修改密码
    editPassword:async (name,newPass)=>{
        let result = await teaModel.editPassword(name,newPass);
        if(result.changedRows){
            return result
        }
        return false
    },

    //根据id删除老师
    deleteTeaById:async (id) => {
        let result = await teaModel.deleteTeaById(id);
        if(result){return result}
        return false
    },

    // 根据教师name查询教师
    queryTeacher:async (name, id) => {
        let result = await teaModel.queryTeacher(name, id);
        if(result && result.length){return result}
        return false;
    },
    // 根据教师name查询教师
    getTeacherById:async (id) => {
        let result = await teaModel.getTeacherById(id);
        if(result && result.length){return result}
        return false;
    },
    // 通过id更新教师name
    updateTeacher:async (id,name, email, password) =>{
        let result  = await teaModel.updateTeacher(id,name, email, password);
        if (result.changedRows) {
            return result
        }
        return false
    }



}
module.exports = TeaService;
