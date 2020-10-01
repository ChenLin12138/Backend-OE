// 教师管理service
const ManagerModel = require('../model/manager')
const ManagerService = {
    // 教师登录
    checkLogin:async (email,password) => {
        let data =  await ManagerModel.checkLogin(email,password);
        return data && data.length? data[0] : false
    },

    // 获取Manager列表
    getAll: async (pager, kw) => {
        let data = await ManagerModel.findAll(pager, kw)
        return data
    },
    // 获取Manager列表
    getById: async (id) => {
        let data = await ManagerModel.getById(id)
        return data && data.length ? data[0] : false
    },

    // 添加Manager账号
    add:async (email, nickname, password,  role_id) =>{
        let result  = await ManagerModel.add(email, nickname, password,  role_id)
        if(result.insertId){return result}
        return false
    },

    // 修改Manager密码
    editPassword:async (id, newPassword)=>{
        let result = await ManagerModel.updatePassword(id, newPassword);
        if(result.changedRows){
            return result
        }
        return false
    },

    //根据id删除
    deleteById:async (id) => {
        let result = await ManagerModel.deleteById(id);
        if(result){return result}
        return false
    },
    // 通过id更新教师name
    update:async ( email, nickname, password, role_id, id) =>{
        let result  = await ManagerModel.update( email, nickname, password,role_id,  id);
        console.log('result', result);
        if (result.changedRows) {
            return result
        }
        return false
    },
    //
    repeatCheck:async(nickname, email, id = 0) => {
        let result =  await ManagerModel.repeatCheck(nickname, email, id);
        if(result && result.length){
            return result
        }
        return false
    },
};
module.exports = ManagerService;
