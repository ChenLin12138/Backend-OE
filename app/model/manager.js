// 学生model类
const Kit = require("../libs/kit");
const query = require('../service/mysql');
const RoleModel = require('./role');
const ManagerModel = {

    checkLogin: async (email, password) => {
        let inserts = [email, password];
        let _sql = `select * from manager where email = ? and password = ?`;
        const list = await query(_sql, inserts);
        for (const i of list) {
            if (i.role_id) {
                const rs = await RoleModel.queryById(i.role_id);
                i.role = rs.length ? rs[0] : {};
            } else {
                i.role = {};
            }
        }
        return list;
    },
    // 查询所有Manager
    findAll: async (pager = Kit.getDefaultPager(), kw = '') => {
        let _sql = `select 
						m.id, 
						m.ctime,
						m.nickname
						from manager m
						`;
        if (kw && kw != '') {
            _sql += " where m.nickname like '%" + kw + "%'";
        }
        const listTemp = await query(_sql);

        pager.rowcount = listTemp.length;
        pager.pagecount = Math.ceil(listTemp.length / pager.pagesize);
        _sql = `select 
						m.id, 
						m.role_id,
						m.ctime,
						m.email,
						m.nickname
						from manager m 
						`;
        if (kw && kw != '') {
            _sql += " where m.nickname like '%" + kw + "%'";
        }
        _sql += " limit ?, ?";
        const list = await query(_sql, [
            pager.page * pager.pagesize, pager.pagesize
        ]);
        for (const i of list) {
            if (i.role_id) {
                const rs = await RoleModel.queryById(i.role_id);
                i.role = rs.length ? rs[0] : {};
                console.log('role', i.role);
            } else {
                i.role = {};
            }
        }
        return {list, pager};
    },

    // 通过id查询学生信息
    getById: async (Id) => {
        let inserts = [Id];
        let _sql = `select 
                        m.role_id,
						m.id, 
						m.ctime,
						m.nickname,
						m.password
						from manager m 
						where m.id = ?`;
        const manager = await query(_sql, inserts);
        if (manager.role_id) {
            const rs = await RoleModel.queryById(manager.role_id);
            manager.role = rs.length ? rs[0] : {};
        } else {
            manager.role = {};
        }
        return manager;
    },

    // 新增
    add: async (email, nickname, password, role_id) => {
        let inserts = [email, nickname, password, role_id];
        console.log(inserts);
        let _sql = `insert into manager (email, nickname, password, role_id) values (?, ?, ?, ?)`;
        return await query(_sql, inserts);
    },

    // 验证name是否存在
    repeatCheck: async (nickname, email, id = 0) => {
        let inserts = [nickname, email];
        let _sql = `select * from manager where (nickname =? or email = ?)`;
        if (id) {
            _sql += ' and id <> ?';
            inserts.push(id);
        }
        return await query(_sql, inserts);
    },

    // 更新学生信息
    update: async (email, nickname, password, role_id, id) => {
        let inserts = [email, nickname, password, role_id, id];

        let _sql = `update manager set email = ?, nickname = ?, password =  ?, role_id = ? where id = ?`;
        return await query(_sql, inserts);

    },

    // 根据student_id删除学生
    deleteById: async (id) => {
        let inserts = [id];
        {
            let _sql = `delete from manager where id = ?`;
            await query(_sql, inserts);
        }
        return 1;
    },

    // 根据student_id查询学生
    queryById: async (id) => {
        let inserts = [id];
        let _sql = `select * from manager where id = ?`;
        return await query(_sql, inserts);
    },
    // 学生密码更新
    updatePassword: async (id, newPassword) => {
        let inserts = [newPassword, id];
        let _sql = `update manager set password = ? where id = ?`;
        return await query(_sql, inserts);
    },
};

module.exports = ManagerModel;
