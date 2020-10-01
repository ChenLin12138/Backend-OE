// 学生model类
const Kit =  require("../libs/kit");

const query = require('../service/mysql');

const StuModel = {

    checkLogin: async (email, password) => {
        let inserts = [email, password];
        let _sql = `select * from student where email = ? and password = ?`;
        return await query(_sql, inserts);
    },
    // 查询所有学生

    findAllStudents: async (pager = Kit.getDefaultPager(), kw='') => {
        //let _sql = `select a.student_id, a.student_name, a.update_date, a.address, b.id as type_id, b.name as course_type, c.id as course_id, c.name as course_name from student as a, student_type as b, course as c where a.course_id = c.id and a.student_type = b.id order by update_date desc`;

        let _sql = `select 
						s.id, 
						s.ctime,
						s.name,
						s.email,
						s.type_id,
						s.address,
						st.name as type_name
						from student s
						left join student_type st on s.type_id = st.id
						`;
        if (kw && kw != '') {
            _sql += ' where s.name like \'%' + kw + '%\'';
        }
        const listTemp = await query(_sql);

        pager.rowcount = listTemp.length;
        pager.pagecount = Math.ceil(listTemp.length / pager.pagesize);
        _sql = `select 
						s.id, 
						s.ctime,
						s.name,
						s.type_id,
						s.email,
						s.address,
						st.name as type_name
						from student s
						left join student_type st on s.type_id = st.id 
						`;

        if (kw && kw != '') {
            _sql += ' where s.name like \'%' + kw + '%\'';
        }
        _sql += ' limit ?, ?';
        const list = await query(_sql, [
            pager.page * pager.pagesize, pager.pagesize
        ]);

        for (const s of list) {
            const zsql = `
					select 
						c.id,
						c.name
					from student_course sc
					left join course c
					on sc.course_id = c.id
					where student_id = ?
			`;
            const courses = await query(zsql, [s.id]);
            s.courses = courses;
        }
        return {list, pager};
    },
    findAllStudentType: async () => {
        let _sql = `select * from student_type`;
        return await query(_sql);
    },
    // 通过id查询学生信息
    getStudentById: async (Id) => {
        let inserts = [Id];
        let _sql = `select 
						s.id,
						s.ctime,
						s.password,
						s.name,
						s.type_id,
						s.address,
						st.name as student_type_name
						from student s left join student_type st on s.type_id = st.id 
						where s.id = ?`;
        return await query(_sql, inserts);
    },

    // 新增学生
    addStudent: async (name, type, address, email) => {
        let inserts = [name, type, address, email];
        console.log(inserts);
        let _sql = `insert into student (name, type_id, update_date, address, email) values (?, ?, now() ,?, ?)`;
        return await query(_sql, inserts);
    },

    // 验证name是否存在
    repeatStu: async (name) => {
        let inserts = [name]
        let _sql = `select * from student where name =?`;
        return await query(_sql, inserts);
    },

    // 更新学生信息
    updateStu: async (name, type, address, id) => {
        let inserts = [name, type, address, id];
        console.log("inserts" + inserts)
        // let _sql=`update student set student_name="glad12",student_type = 1,course_id=1,update_date=now(),address="新西兰" where student_id=27`;

        let _sql = `update student set name = ?, type_id = ?, update_date = now() , address= ? where id = ?`;
        return await query(_sql, inserts);

    },

    addCourseSelection: async (studentId, courseId, courseDate) => {
        let inserts = [studentId, courseId, courseDate]
        let _sql = `
			insert into  student_course (student_id, course_id, course_date) values(?,?,?)
		`;
        return await query(_sql, inserts);
    },

    // 根据student_id删除学生
    deleteStu: async (id) => {
        let inserts = [id]
        {
            let _sql = `delete from student where id = ?`;
            await query(_sql, inserts);
        }
        {
            let _sql = `delete from student_course where student_id = ?`;
            await query(_sql, inserts);
        }
        return 1;
    },

    // 根据student_id查询学生
    queryStuById: async (id) => {
        let inserts = [id];
        let _sql = `select * from student where id = ?`;
        return await query(_sql, inserts);
    },
    // 学生密码更新
    updateSPass: async (newPassword, id) => {
        let inserts = [newPassword, id];
        let _sql = `update student set password = ? where id = ?`
        return await query(_sql, inserts);
    },

    // 查询最近活跃人数
    getActiveStu: async () => {
        let _sql = `select a.id, a.name, a.update_date, b.id as type_id, b.name as course_type, c.id as course_id, c.name as course_name from student as a, student_type as b, course as c where a.course_id = c.id and a.student_type = b.id and TO_DAYS(NOW()) - TO_DAYS(update_date) <= 7 order by update_date desc`;
        return await query(_sql);
    },

    // 查询最近活跃人数
    getCourseList: async (date, course_id, student_id, pager = Kit.getDefaultPager(), kw= '') => {
        const params = [];
        let _sql = `
			select 
				sc.course_date,
				sc.id,
				sc.student_id,
				sc.course_id,
				s.name as student_name,
				c.name as course_name
			from student_course sc
			left join student s on sc.student_id = s.id
			left join course c on sc.course_id = c.id
		`;
        _sql += ' where 1 = 1';
        if (date && date != '') {
            if (date.length === 7) {
                _sql += ' and sc.course_date > ? and sc.course_date <= ?';
                params.push(date + '-01');
                params.push(date + '-30');
            } else {
                _sql += ' and sc.course_date = ?';
                params.push(date);
            }

        }
        if (course_id && course_id != '') {
            _sql += ' and sc.course_id = ?';
            params.push(course_id);
        }
        if (student_id && student_id != '') {
            _sql += ' and sc.student_id = ?';
            params.push(student_id);
        }
        if (kw && kw != ''){
            _sql += ' and kw like\'%' + kw + '%\'';

        }

        const listTemp = await query(_sql, params);

        console.log('listTemp length = ', listTemp.length)

        pager.rowcount = listTemp.length;
        pager.pagecount = Math.ceil(listTemp.length / pager.pagesize);
        if (kw && kw != ''){
            _sql += ' and kw like\'%' + kw + '%\'';
        }

        _sql += ' limit ?, ?';
        params.push(pager.page * pager.pagesize)
        params.push(pager.pagesize);
        const list = await query(_sql, params);
        return {pager, list};
    },

    /**
     * 根据id删除学生类型
     */
    deleteStudentTypeById: async (id) => {
        let inserts = [id];
        let _sql = `delete from student_type where id = ?`;
        return await query(_sql, inserts);
    },

    getStudentTypeById: async (id) => {
        let inserts = [id];
        let _sql = `select * from student_type where id = ?`;
        return await query(_sql, inserts);
    },

    findStudentWithCourse: async (studentId, courseId) => {
        let _sql = `
    		select * from student_course where student_id =? and course_id = ?
    	`
        return await query(_sql, [studentId, courseId]);
    }


}

module.exports = StuModel;
