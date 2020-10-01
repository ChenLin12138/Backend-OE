// 学生操作相关controller类
const Kit =  require("../libs/kit");

const RoleService = require('../service/role');
const R = require('../service/response');
const Tools = require('../controller/tools');

const RoleController = {

    // 查找List
    getList: async (ctx) => {
        if (!Kit.checkLoginTypeOk(ctx, 'manager')){
            return
        }
        const pager = Kit.getPager(ctx);
        const kw = ctx.query.kw || '';
        console.log(pager);
        let result = await RoleService.getList(pager, kw);
        if (result.list && result.list.length) {
           for(const r of result.list) {
               if (r.menu && r.menu.length) {
                   r.menu = r.menu.split(',')
               }else{
                   r.menu = [];
               }
           }
        }
        if (result) {
            R.success(result, ctx)
        } else {
            R.error(99, '系统错误', ctx)
        }
    },
    // 通过id查询信息
    getById: async (ctx) => {
        if (!Kit.checkLoginTypeOk(ctx, 'manager')){
            return
        }
        let Id = ctx.query.id;
        let result = await RoleService.getById(Id);
        if (result && result.length) {
            R.success(result[0], ctx)
        } else {
            R.error(99, '系统错误', ctx)
        }

    },

    // 新增学生
    add: async (ctx) => {
        if (!Kit.checkLoginTypeOk(ctx, 'manager')){
            return
        }
        let name = ctx.request.body.name;
        let menu = ctx.request.body.menu;

        if (!name) {
            return R.error(1, "name", ctx)
        }
        if (menu && menu.length) {
            menu = menu.join(',');
        }
        // 查看是否已经存在Name
        let repeats = await RoleService.repeatCheck(name);
        if (repeats && repeats.length > 0) {
            R.error(2, repeats[0].name, ctx);
            return;
        }
        let result = await RoleService.add(name, menu);
        console.log(result);
        if (result) {
            return R.success("新增成功", ctx);
        } else {
            return R.error("系统错误", ctx);
        }
    },

    // 更新
    update: async (ctx) => {
        if (!Kit.checkLoginTypeOk(ctx, 'manager')){
            return
        }
        let name = ctx.request.body.name;
        let menu = ctx.request.body.menu;
        let id = ctx.request.body.id;

        if (!id) {
            return R.error(1, "id", ctx)
        }
        if (!name) {
            return R.error(1, "name", ctx)
        }
        if (menu && menu.length) {
            menu = menu.join(',');
        }


        // 验证要更新的name是否已经存在
        let repeats = await RoleService.repeatCheck(name, id);
        if (repeats && repeats[0].id != id) {
            R.error(2, repeats[0].name, ctx);
            return
        }
        let result = await RoleService.update(name, menu, id);
        if (result) {
            return R.success("数据更新成功", ctx);
        } else {
            return R.error("系统错误", ctx);
        }

    },

    /**
     * 根据id删除类型
     */
    delete: async (ctx) => {
        if (!Kit.checkLoginTypeOk(ctx, 'manager')){
            return
        }
        let id = ctx.request.body.id;
        if (!id) {
            return R.error(1, "id", ctx)
        }
        let result = await RoleService.delete(id);
        if (result) {
            R.success(result, ctx);
        } else {
            R.error(99, "系统错误", ctx);
        }
    },

};

module.exports = RoleController;
