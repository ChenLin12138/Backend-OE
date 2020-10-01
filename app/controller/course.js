// 课程相关操作controller
const CourseService = require('../service/course');
const R = require('../service/response');
const Kit =  require("../libs/kit");

const CourseConroller = {
	/**
	 * 查询所有课程列表
	 */
	findAllCourseList: async (ctx) => {
		const pager = Kit.getPager(ctx);
		const kw = ctx.query.kw
		let result = await CourseService.findAllCourseList(pager, kw)
		if (result) {
			R.success(result, ctx)
		} else {
			R.error(99, '系统错误', ctx)
		}
	},

	/**
	 * 查询所有课程类型
	 */
	getAllCourseType: async (ctx) => {
		let result = await CourseService.getAllCourseType()
		if (result) {
			R.success(result, ctx)
		} else {
			R.error(99, '系统错误', ctx)
		}
	},

	/**
	 * 新增课程类型
	 */
	addCourseType: async (ctx) =>{
		let name = ctx.request.body.name;
		if(!name){return R.error(1,"name",ctx)};
		let check = await CourseService.queryCourseType(name);
		if(check){
			return R.error(777,'课程类型',ctx);
		}
		let result  = await CourseService.addCourseType(name);
		if (result){
			return R.success(result,ctx);
		}else{
			R.error(99,"系统错误",ctx);
		}
	},

	/**
	 * 更新课程类型
	 */
	updateCourseType: async (ctx) =>{
		let id = ctx.request.body.id;
		let name = ctx.request.body.name;
		if(!id){return R.error(1,"id",ctx)};
		if(!name){return R.error(1,"name",ctx)};
		let check = await CourseService.queryCourseType(name);
		if(check){
			return R.error(9,name+'已存在',ctx);
		}
		let result  = await CourseService.updateCourseType(name,id);
		if (result){
			R.success(result,ctx);
		}else{
			R.error(99,"系统错误",ctx);
		}
	},

	/**
	 * 根据id删除课程类型
	 */
	deleteCourseTypeById: async (ctx) =>{
		let id =  ctx.request.body.id;
		if(!id){return R.error(1,"id",ctx)};
		{
			let finds = await CourseService.queryCourseTypeByTypeId(id);
			if (finds && finds.length === 0) {
				R.error(666, '课程类型', ctx);
				return
			}

		}
		let result = await CourseService.deleteCourseTypeById(id);
		if(result){
			R.success(result,ctx);
		}else{
			R.error(99,"系统错误",ctx);
		}
	},

	/**
	 * 根据id删除课程
	 */
	deleteCourseById: async (ctx) =>{
		let id =  ctx.request.body.id;
		if(!id){return R.error(1,"id",ctx)};

		{
			let finds = await CourseService.queryCourseById(id);
			if (finds && finds.length === 0) {
				R.error(666, '课程', ctx);
				return
			}
		}

		let result = await CourseService.deleteCourseById(id);
		if(result){
			R.success(result,ctx);
		}else{
			R.error(99,'系统错误',ctx);
		}
	},

	 /**
	 * 新增一节课程
	 */
    addCourse: async (ctx)=>{
		let name = ctx.request.body.name;
		let vid = ctx.request.body.vid || 'TEST';
		let homework = ctx.request.body.homework;
		let type = ctx.request.body.type_id;
		if(!name){return R.error(1,"name",ctx)};
		//if(!vid){return R.error(1,"vid",ctx)};
		if(!homework){return R.error(1,"homework",ctx)};
		if(!type){return R.error(1,"type",ctx)};

		let result  = await CourseService.addCourse(name,vid,type,homework);
		if(result){
			return R.success(result,ctx);
		}else{
			R.error(99,"系统错误",ctx);
		}
    },

	 /**
	 * 更新一节课程
	 */
	 updateCourse: async (ctx)=>{
		let name = ctx.request.body.name;
		let vid = ctx.request.body.vid || 'TEST';
		let homework = ctx.request.body.homework;
		let type = ctx.request.body.type_id;
		let id = ctx.request.body.id;
		if(!name){return R.error(1,"name",ctx)};
		//if(!vid){return R.error(1,"vid",ctx)};
		if(!type){return R.error(1,"type",ctx)};
		if(!id){return R.error(1,"id",ctx)};
		let result = await CourseService.updateCourse(name,vid,homework,type,id);
		if(result){
			return R.success(result,ctx)
		}else{
			return R.error(99,"系统错误",ctx);
		}
	 },

	  /**
	 * 根据id查询当前课程
	 */

	 queryCourseById: async (ctx) => {
		 let id = ctx.query.id;
		 console.log(id)
		 if(!id){return R.id(1,"id",ctx)};
		 let result = await CourseService.queryCourseById(id);
		 if(result){
			R.success(result,ctx);
		 }else{
			 R.error(99,"系统错误",ctx);
		 }
	 }


}
module.exports = CourseConroller;


