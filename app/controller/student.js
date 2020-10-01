// 学生操作相关controller类
const Kit =  require("../libs/kit");

const Course = require('../service/course')

const StuSer = require('../service/student')
const R = require('../service/response')
const Tools = require('../controller/tools')

const StuController = {
    // 教师登录
    login: async(ctx) => {
        let email = ctx.request.body.email;
        let password = ctx.request.body.password;
        if(!email) return R.error(1,"email",ctx);
        if(!password) return R.error(1,"password",ctx);
        let result = await StuSer.checkLogin(email,password);
        //console.log('result', result);
        if(result){
            let token = Tools.randomString(8,'0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
            // 将生成的token和教师信息存放到session中
            ctx.session.token = token;
            ctx.session.email = email;
            //ctx.session.password = password;
            ctx.session.id = result.id;
            ctx.session.name = result.name;
            ctx.session.login_type = 'student';
            //console.log('session', ctx.session);
            //console.log('session response', ctx.response);
            // console.log('response cookies', ctx.headers);
            // console.log('response cookies', ctx);
            //const cookie = ctx.headers['cookie'];

            R.success({
                token:token,
                // cookie,
                login_type: 'student',
                //result,
                info:{
                    id:result.id,
                    email:result.email,
                    name: result.name,
                }
            },ctx)
        }else{
            R.error(5,'Login Failed',ctx);
        }
    },
    // 查找所有学生
    getAllStudents: async (ctx) => {
        const pager = Kit.getPager(ctx);
        const kw = ctx.query.kw || '';
        console.log(pager);
        let result = await StuSer.getAllStudent(pager, kw);
        if (result) {
            R.success(result, ctx)
        } else {
            R.error(99, '系统错误', ctx)
        }
    },
    // 查询所有学生类型
    findAllStudentType: async (ctx) => {
        let result = await StuSer.findAllStudentType();
        if (result) {
            R.success(result, ctx)
        } else {
            R.error(99, '系统错误', ctx)
        }
    },

    // 通过学生id查询学生信息
    getStudentById: async (ctx) => {
        let Id = ctx.query.id;
        let result = await StuSer.getStudentById(Id);
        if (result) {
            delete result.password;
            R.success(result, ctx)
        } else {
            R.error(99, '系统错误', ctx)
        }

    },

    // 新增学生
    addStudent: async (ctx) => {
        let name = ctx.request.body.name;
        let type = ctx.request.body.type_id;
        // let course  = ctx.request.body.course_id;
        let address = ctx.request.body.address;
        let email = ctx.request.body.email;
        if (!name) {
            return R.error(1, "name", ctx)
        }
        if (!type) {
            return R.error(1, "type", ctx)
        }if (!email) {
            return R.error(1, "email", ctx)
        }
        // if(!course){
        //     return R.error(1,"course",ctx)
        // }
        if (!address) {
            return R.error(1, "address", ctx)
        }
        // 查看是否已经存在用户名
        let repeatStu = await StuSer.repeatStu(name);
        if (repeatStu && repeatStu.length > 0) {
            R.error(2, repeatStu[0].student_name, ctx);
            return
        }
        let result = await StuSer.addStudent(name, type, address, email);
        console.log(result);
        if (result) {
            return R.success("新增成功", ctx);
        } else {
            return R.error("系统错误", ctx);
        }
    },

    // 更新学生信息
    updateStu: async (ctx) => {
        let name = ctx.request.body.name;
        let type = ctx.request.body.type_id;
        // let course_ids = ctx.request.body.course_ids;
        let address = ctx.request.body.address;
        let id = ctx.request.body.id;

        if (!name) {
            return R.error(1, "name", ctx)
        }
        if (!type) {
            return R.error(1, "type", ctx)
        }
        //if(!course){return R.error(1,"course",ctx)}
        if (!address) {
            return R.error(1, "address", ctx)
        }
        if (!id) {
            return R.error(1, "id", ctx)
        }

        // 验证要更新的name是否已经存在
        let repeatStu = await StuSer.repeatStu(name);
        if (repeatStu && repeatStu[0].id != id) {
            R.error(2, repeatStu[0].name, ctx);
            return
        }
        let result = await StuSer.updateStu(name, type, address, id);
        if (result) {
            return R.success("数据更新成功", ctx);
        } else {
            return R.error("系统错误", ctx);
        }

    },

    addCourse: async (ctx) => {
        let studentId = ctx.request.body.student_id;
        let courseId = ctx.request.body.course_id;
        let courseDate = ctx.request.body.course_date;


        if (!studentId) {
            return R.error(1, "student_id", ctx)
        }
        if (!courseId) {
            return R.error(1, "course_id", ctx)
        }
        if (!courseDate) {
            return R.error(1, "course_date", ctx)
        }

        // 验证要更新的name是否已经存在
        let students = await StuSer.getStudentById(studentId);
        if (!students || students.length == 0) {
            R.error(4,"", ctx);
            return
        }
        let courses = await Course.queryCourseById(courseId);
        if (!courses || courses.length == 0) {
            R.error(3,"", ctx);
            return
        }
        let studentCourses = await StuSer.findStudentWithCourse(studentId, courseId);
        if (!studentCourses || studentCourses.length > 0) {
            R.error(7, "", ctx);
            return
        }

        let result = await StuSer.addCourseSelection(studentId, courseId, courseDate);
        if (result) {
            return R.success("数据更新成功", ctx);
        } else {
            return R.error("系统错误", ctx);
        }

    },
    /**
     * 根据id删除类型
     */
    deleteStudentTypeById: async (ctx) => {
        let id = ctx.request.body.id;
        if (!id) {
            return R.error(1, "id", ctx)
        }
        {
            let findTypes = await StuSer.getStudentTypeById(id);
            if (findTypes && findTypes.length === 0) {
                R.error(666, '学生类型数据', ctx);
                return
            }
        }
        let result = await StuSer.deleteStudentTypeById(id);
        if (result) {
            R.success(result, ctx);
        } else {
            R.error(99, "系统错误", ctx);
        }
    },

    // 根据student_id删除学生
    deleteStu: async (ctx) => {
        let id = ctx.request.body.id;
        console.log("id :" + id);
        if (!id) {
            return R.error(1, "id", ctx);
        }
        // 查询student_id是否存在
        let isId = await StuSer.queryStuById(id);
        if (!isId || isId.length == 0) {
            return R.error(4, id, ctx)
        }
        let result = await StuSer.deleteStu(id);
        if (result) {
            return R.success("删除成功", ctx)
        } else {
            return R.error("删除失败", ctx);
        }
    },

    // 修改学生密码
    updateSPass: async (ctx) => {
        let password = ctx.request.body.password;
        let newPassword = ctx.request.body.newPassword;
        if (!password) {
            return R.error(1, "password", ctx);
        }
        if (!newPassword) {
            return R.error(1, "newPassword", ctx);
        }
        if (password !== ctx.session.password) {
            return R.error(6, "", ctx)
        }
        let result = await StuSer.updateSPass(newPassword, ctx.session.user)
        if (result) {
            ctx.session.password = newPassword;
            R.success("修改成功", ctx);
        } else {
            R.error("修改失败", ctx);
        }
    },

    // 获取最近活跃人数
    getActiveStu: async (ctx) => {
        let result = await StuSer.getActiveStu();
        R.success(result, ctx)
    },
    // 获取最近活跃人数
    getCourseList: async (ctx) => {
        let date = ctx.query.date;
        let kw = ctx.query.kw;
        let course_id = ctx.query.course_id;
        let login_type = ctx.session.login_type;
        let pager = Kit.getPager(ctx);
        if (login_type && login_type == 'student') {
            let student_id = ctx.session.id;
            let result = await StuSer.getCourseList(date, course_id, student_id, pager, kw);
            R.success(result, ctx)
        } else {
            let result = await StuSer.getCourseList(date, course_id, 0, pager,kw);
            R.success(result, ctx)
        }

    },


}

module.exports = StuController
