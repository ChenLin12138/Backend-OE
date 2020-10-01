// 学生管理

const stuCon = require('../app/controller/student')
const StuRouter = {
    name:'/student',//命名空间
    routes:[
        {methods:'get', path:"/list", realize:stuCon.getAllStudents},    //查询所有学生信息
        {methods:'get',path:"/info",realize:stuCon.getStudentById}, //通过id获取学生信息
        {methods:'get',path:"/type/list",realize:stuCon.findAllStudentType}, //查询所有学生类型
        {methods:'post',path:'/add', realize:stuCon.addStudent},        //新增学生
        {methods:'post',path:'/update',  realize:stuCon.updateStu},         //更新学生信息
        {methods:'post', path:'/delete',  realize:stuCon.deleteStu},         //删除学生信息
        {methods:'post', path:'/type/delete',  realize:stuCon.deleteStudentTypeById},         //删除学生信息
        {methods:'post',path:'/password',realize:stuCon.updateSPass},       //更新学生密码
        {methods:'get', path:'/active/list',realize:stuCon.getActiveStu},     //获取最近活跃学生
        {methods:'get', path:'/course/list',realize:stuCon.getCourseList},     //获取最近活跃学生
        {methods:'post',path:'/course/add',  realize:stuCon.addCourse},         //更新学生信息
        {methods:'post',path:'/login',  realize:stuCon.login},         //更新学生信息

    ]
}

module.exports=StuRouter;
