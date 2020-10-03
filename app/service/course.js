const CourseModel = require('../model/course')

const CourseService={

     /*
        查询所有课程列表

    */
    findAllCourseList: async (pager,kw) => {
        return await CourseModel.findAllCourseList(pager,kw);
    },
    /*
        查询所有课程类型
    */
   getAllCourseType: async () => {
       return await CourseModel.findAllCourseType();
   },

    /*
        根据id获取课程类型
    */
   getCourseTypeById: async (id) =>{
    return await CourseModel.findCourseTypeById(id);
    },

    /*
        新增课程类型
    */
   addCourseType:async (name) =>{
        return await CourseModel.addCourseType(name);
   },
     /*
        更新课程类型
    */
   updateCourseType: async(name,id) =>{
       return await CourseModel.updateCourseType(name,id);
   },

    /*
        根据id删除课程类型
    */
   deleteCourseTypeById: async (id) =>{
       return await CourseModel.deleteCourseTypeById(id);
   },

   /**
	 * 根据id删除课程
	 */
	deleteCourseById: async (id) =>{
		return await CourseModel.deleteCourseById(id);
    },

    /**
	 * 新增一节课程
	 */
    addCourse: async (name,vid,type,homework)=>{
        return await CourseModel.addCourse(name,vid,type,homework);
    },

     /**
	 * 更新一节课程
	 */
    updateCourse: async (name,vid,homework,type,id)=>{
        return await CourseModel.updateCourse(name,vid,homework,type,id)
    },

    /**
	 * 根据id查询当前课程
	 */
    queryCourseById: async (id) => {
        return await CourseModel.queryCourseById(id);
    },

    queryCourseTypeByTypeId: async (id) => {
        return await CourseModel.queryCourseTypeByTypeId(id);
    },

     /**
	 * 根据课程名称查询课程类型
	 */
    queryCourseType: async (name) => {
        let result = await CourseModel.queryCourseType(name)
        if (result && result.length) {
            return result
        }
        return false
    },
    courseGroupByDate: async ()=>{
        let result = await CourseModel.courseGroupByDate()
        return result;
    },
    coursePeiChartData: async ()=>{
        let result = await CourseModel.coursePeiChartData()
        return result;
    }


}

module.exports = CourseService;

