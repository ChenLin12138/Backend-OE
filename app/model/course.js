// 课程Model
const query = require('../service/mysql');
const Kit =  require("../libs/kit");

const CourseModel={

	/**
	 * 查询所有课程列表
	 */
	findAllCourseList: async (pager = Kit.getDefaultPager(), kw = '') => {
		//let _sql = `select a.id,a.name,a.uid,a.homework,a.typeId,b.name as course_name from course as a,course_type as b where a.type_id = b.id order by id desc`;
		// let _sql = `select * from course order by name asc`
		let _sql = `
			select 
				c.ctime,
				c.id, 
				c.name, 
				c.homework, 
				c.type_id, 
				ct.name as type_name 
			from course c left join course_type ct on c.type_id = ct.id
		`;
		let cds = [];
		if (kw && kw != '') {
			_sql += " where c.name like '%" + kw + "%'";
			// cds.push(kw);
		}
		const listTemp =  await query(_sql, cds);

		pager.rowcount = listTemp.length;
		pager.pagecount = Math.ceil(listTemp.length / pager.pagesize);

		cds = [];
		cds.push(pager.page * pager.pagesize);
		cds.push(pager.pagesize);
		_sql = `
			select 
				c.ctime,
				c.id, 
				c.name, 
				c.homework, 
				c.type_id, 
				ct.name as type_name 
			from course c left join course_type ct on c.type_id = ct.id 
		`;
		if (kw && kw != '') {
			_sql += " where c.name like '%"+kw+"%'";
			// cds.push(kw);
		}
		_sql += ' limit ?, ?';
		console.log(_sql);
		const list =  await query(_sql, cds);
		return {list, pager};
	},

	/**
	 * 查询所有课程类型
	 */
	findAllCourseType: async () => {
		let _sql = `select * from course_type`;
		return await query(_sql)
	},

	/**
	 * 新增所有课程类型
	 */
	addCourseType: async (name) => {
		let inserts = [name];
		let _sql = `insert into course_type (name) values (?)`;
		return await query(_sql,inserts);
	},

	/**
	 * 更改所有课程类型
	 */
	updateCourseType:async (name,id) => {
		let inserts = [name,id];
		let _sql = `update course_type set name = ? where id =?`;
		return await query(_sql,inserts);
	},

	/**
	 * 根据id删除课程类型
	 */
	deleteCourseTypeById: async (id) =>{
		let inserts = [id];
		let _sql = `delete from course_type where id = ?`;
		return await query(_sql,inserts);
	},

	/**
	 * 根据id删除课程
	 */
	deleteCourseById: async (id) =>{
		let inserts = [id];
		let _sql1 =`delete from course where id = ?`;
		await query(_sql1, inserts);
		let _sql2 =`delete from student_course where course_id = ?`;
		return await query(_sql2, inserts);
	},

	 /*
	 * 新增一节课程
	 */
    addCourse: async (name,vid,type,homework)=>{
		let inserts=[name,vid,type,homework];
		let _sql = `insert into course (name,uid,type_id,homework) values (?, ?, ?, ?)`;
		return await query(_sql,inserts);
	},

	 /*
	 * 更新一节课程
	 */
	updateCourse: async (name,vid,homework,type,id)=>{
		let inserts = [name,vid,homework,type,id]
		let _sql = `update course set name = ?,uid = ?,homework = ?,type_id = ? where id = ?`;
		return await query(_sql,inserts);
	},

	 /*
	 * 根据id查询当前课程
	 */
	queryCourseById: async (id)=>{
		let inserts = [id];
		let _sql = `select * from course where id =?`;
		return await query(_sql,inserts);
	},
	queryCourseTypeByTypeId: async (id)=>{
		let inserts = [id];
		let _sql = `select * from course_type where id =?`;
		return await query(_sql,inserts);
	},
	/*
	 * 根据课程名称查询课程类型
	 */
	queryCourseType: async (name) => {
		let inserts = [name]
		let _sql = `select * from course_type where name = ?`;
		return await query(_sql, inserts)
	},

	courseGroupByDate:async () => {
		let _sql = `
			select 
			 	course_date, count(*) as course_count 
			 	from student_course sc 
				left join course c 
				on sc.course_id = c.id
				group by course_date
				order by course_date
		`;
		return await query(_sql)
	},
	coursePeiChartData:async () => {
		let _sql = `
			select 
			 	c.name, count(*) as course_count 
			 	from student_course sc 
				left join course c 
				on sc.course_id = c.id
				group by course_id
				order by course_id
		`;
		return await query(_sql)
	}
};

module.exports = CourseModel;
