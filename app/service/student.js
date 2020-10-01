const StuModel = require('../model/student')

//
const StuSer = {
    checkLogin: async (email, password) => {
        const data = await StuModel.checkLogin(email, password)
        return data && data.length ? data[0] : false
    },
    // 查询所有学生
    getAllStudent: async (pager, kw) => {
        return await StuModel.findAllStudents(pager, kw)
    },
    // 查询所有课程类型
    findAllStudentType: async () => {
        return await StuModel.findAllStudentType();
    },
    // 通过id查询学生信息
    getStudentById: async (Id) => {
        return await StuModel.getStudentById(Id);
    },

    // 新增学生
    addStudent: async (name, type, address, email) => {
        return await StuModel.addStudent(name, type, address, email);
    },

    // 验证name是否存在
    repeatStu: async (name) => {
        let result = await StuModel.repeatStu(name);
        if (result && result.length) {
            return result
        }
        return false
    },


    /*
        根据id删除课程类型
    */
    deleteStudentTypeById: async (id) => {
        return await StuModel.deleteStudentTypeById(id);
    },
    // 更新学生信息
    updateStu: async (name, type, address, id) => {
        return await StuModel.updateStu(name, type, address, id);
    },

    findStudentWithCourse: async (studentId, courseId) => {
        return await StuModel.findStudentWithCourse(studentId, courseId);
    },

    addCourseSelection: async (studentId, courseId, courseDate) => {
        return await StuModel.addCourseSelection(studentId, courseId, courseDate);
    },

    // 根据student_id删除学生
    deleteStu: async (id) => {
        return await StuModel.deleteStu(id);
    },

    // 根据student_id查询是否存在
    queryStuById: async (id) => {
        return await StuModel.queryStuById(id);
    },
    // 学生密码更新
    updateSPass: async (newPassword, id) => {
        return await StuModel.updateSPass(newPassword, id);
    },

    // 获取最近活跃人数
    getActiveStu: async () => {
        return await StuModel.getActiveStu();
    },
    // 获取最近活跃人数
    getCourseList: async (date, course_id, student_id, pager, kw = '') => {
        return await StuModel.getCourseList(date, course_id, student_id, pager, kw);
    },
    getStudentTypeById: async (id) => {
        return await StuModel.getStudentTypeById(id);
    },


}
module.exports = StuSer
