const RoleModel = require('../model/role')

//
const RoleService = {

    // 查询所有学生
    getList: async (pager, kw) => {
        return await RoleModel.findList(pager, kw)
    },
    // 通过id查询
    getById: async (Id) => {
        return await RoleModel.queryById(Id);
    },

    // 新增
    add: async (name, menu) => {
        return await RoleModel.add(name, menu);
    },

    // 验证name是否存在
    repeatCheck: async (name, id = 0) => {
        let result = await RoleModel.queryByName(name, id);
        if (result && result.length) {
            return result
        }
        return false
    },


    /*
        根据id删除课程类型
    */
    delete: async (id) => {
        return await RoleModel.delete(id);
    },
    // 更新
    update: async (name, menu, id) => {
        return await RoleModel.update(name, menu, id);
    },
};
module.exports = RoleService
