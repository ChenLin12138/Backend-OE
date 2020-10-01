// 教师管理model
const query = require('../service/mysql');
const Kit =  require("../libs/kit");

const teaModel = {
    // 教师登录
    checkLogin: async (email,password) => {
        let inserts = [email,password];
        let _sql = `select * from teacher where email = ? and password = ?`;
        return await query(_sql,inserts);
    },

    // 获取教师列表
    getAllTeacher:async (pager = Kit.getDefaultPager(), kw='') => {
        let _sql = `select id,name,email,type from teacher`;
        if (kw && kw !== '') {
            _sql += ' where name like \'%' + kw + '%\'';
        }
        const listTemp = await query(_sql);
        pager.rowcount = listTemp.length;
        pager.pagecount = Math.ceil(listTemp.length / pager.pagesize);

        // ----------------------------------------
        _sql = `select id,name,email,type from teacher`;
        if (kw && kw !== '') {
            _sql += ' where name like \'%' + kw + '%\'';
        }
        _sql += ' limit ?, ?';
        const list = await query(_sql, [
            pager.page * pager.pagesize, pager.pagesize
        ]);
        return {list, pager};
    },

    // 添加老师账号
    addTeacher: async (name,email, password)=>{
        let inserts = [name,email, password];
        let _sql = `insert into teacher (name,email, password) values (?,?, ?)`;
        return await query(_sql,inserts);
    },

    // 修改密码
    editPassword: async (name,newPass) => {
        let inserts = [newPass,name];
        let _sql = `update teacher set password = ? where name = ?`
        return await query(_sql,inserts);
    },

    // 根据id删除老师
    deleteTeaById: async (id) => {
        let inserts = [id];
        let _sql = `delete from teacher where id = ?`;
        return await query(_sql,inserts);
    },

    // 根据id删除老师
    getTeacherById: async (id) => {
        let inserts = [id];
        let _sql = `select * from teacher where id = ?`;
        return await query(_sql,inserts);
    },
    // 根据教师name查询教师
    queryTeacher:async (name, id = 0) => {
        let inserts = [name];
        if (id) {
            inserts.push(id);
        }
        let _sql = `select * from teacher where name = ?`;
        if (id) {
            _sql += ' and id <> ?'
        }
        return await query(_sql,inserts);
    },

    // 通过id更新教师name
    updateTeacher:async (id,name, email, password) => {
        let inserts = [];
        let _sql = `update teacher set `;// name = ?, email = ?, password = ? where id = ?`;
        if (name) {
            _sql += `name = ?, `;
            inserts.push(name);
        }
        if (email) {
            _sql += `email = ?, `;
            inserts.push(email);
        }
        if (password) {
            _sql += `password = ?, `;
            inserts.push(password);
        }
        _sql += `type = ? `;
        inserts.push(1);
        _sql += ` where id = ?`;
        inserts.push(id);
        console.log('sql, ', _sql, inserts);
        const ret =  await query(_sql,inserts);
        console.log('ret', ret);
        return ret;
    }


}
module.exports = teaModel;
