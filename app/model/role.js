// 课程Model
const query = require('../service/mysql');
const Kit = require("../libs/kit");

const RoleModel = {

    /**
     * 查询所有课程列表
     */
    findList: async (pager = Kit.getDefaultPager(), kw = '') => {
        //let _sql = `select a.id,a.name,a.uid,a.homework,a.typeId,b.name as course_name from course as a,course_type as b where a.type_id = b.id order by id desc`;
        // let _sql = `select * from course order by name asc`
        let _sql = `
			select 
				*
			from role
		`;
        let cds = [];
        if (kw && kw !== '') {
            _sql += " where name like '%" + kw + "%'";
        }
        const listTemp = await query(_sql, cds);

        pager.rowcount = listTemp.length;
        pager.pagecount = Math.ceil(listTemp.length / pager.pagesize);

        cds = [];
        cds.push(pager.page * pager.pagesize);
        cds.push(pager.pagesize);
        _sql = `
			select 
				*
			from role c 
		`;
        if (kw && kw !== '') {
            _sql += " where c.name like '%" + kw + "%'";
        }
        _sql += ' limit ?, ?';
        const list = await query(_sql, cds);
        return {list, pager};
    },

    /**
     * 更改所有课程类型
     */
    update: async (name, menu, id) => {
        let inserts = [name, menu, id];
        let _sql = `update role set name = ?, menu = ? where id =?`;
        return await query(_sql, inserts);
    },

    /**
     * 根据id删除课程
     */
    delete: async (id) => {
        let inserts = [id];
        let _sql2 = `delete from role where id = ?`;
        return await query(_sql2, inserts);
    },

    /*
    * 新增一节课程
    */
    add: async (name, menu) => {
        let inserts = [name, menu];
        let _sql = `insert into role (name,menu) values (?, ?)`;
        return await query(_sql, inserts);
    },

    /*
    * 根据id查询
    */
    queryById: async (id) => {
        let inserts = [id];
        let _sql = `select * from role where id =?`;
        const roles = await query(_sql, inserts);
        if (roles && roles.length) {
            roles[0].menu = roles[0].menu.split(',')
        }
        return roles;
    },
    /*
    * 根据name
    */
    queryByName: async (name, id = 0) => {
        let inserts = [name];
        let _sql = `select * from role where name =?`;
        if (!id) {
            _sql += ' and id <> ?';
            inserts.push(id);
        }
        return await query(_sql, inserts);
    }
}

module.exports = RoleModel;
