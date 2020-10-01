// 教师管理
const teaCon = require('../app/controller/teacher');
const teaRouter = {
    name: '/teacher', //命名空间
    routes:[
        {methods:'post',path:"/login",realize:teaCon.login}, //教师登录
        {methods:'get',path:'/info',realize:teaCon.systemUserInfo},//获取当前用户的信息
        {methods:'get',path:'/list',realize:teaCon.getAllTeacher},//获取教师列表
        {methods:'get',path:'/logout',realize:teaCon.logOut}, //教师退出登录
        {methods:'post',path:'/add',realize:teaCon.addTeacher}, //新增教师账号
        {methods:'post',path:'/delete',realize:teaCon.deleteTeaById},//通过id删除教师账号
        {methods:'post',path:'/update',realize:teaCon.updateTeacher},//通过id更新教师name
        {methods:'post',path:'/password',realize:teaCon.editPassword},//修改老师密码

    ]
}
module.exports = teaRouter;
