// 课程路由管理

const Course = require('../app/controller/course');

const CourseRouter = {
    name:'/course',//命名空间
    routes:[
        {methods:'get', path: '/type/list', realize: Course.getAllCourseType}, // 查询所有课程类型
        {methods:'get', path: '/type/info', realize: Course.getCourseType}, // 查询所有课程类型
        {methods:'post',path:'/type/add',realize:Course.addCourseType}, //新增课程类型
        {methods:'post',path:'/type/update',realize:Course.updateCourseType}, //更新课程类型
        {methods:'post',path:'/type/delete',realize:Course.deleteCourseTypeById}, //根据id删除课程类型
        {methods:'get',path:'/list',realize:Course.findAllCourseList}, //查询所有课程列表
        {methods:'get',path:'/info',realize:Course.queryCourseById}, //根据id查询当前课程
        {methods:'post',path:'/delete',realize:Course.deleteCourseById}, //根据id删除课程
        {methods:'post',path:'/add',realize:Course.addCourse}, //新增一节课程
        {methods:'post',path:'/update',realize:Course.updateCourse}, //更新一节课程
    ]
};

module.exports=CourseRouter;
