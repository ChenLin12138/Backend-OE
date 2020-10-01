// 路由类
const Router = require('koa-router');

const Student = require('./student');
const Course =  require('./course');
const Interview = require('./interview');
const Teacher = require('./teacher');
const Manager = require('./manager');
const Settings = require('./settings');
const Role = require('./role');
const Stat = require('./stat');
const Config = require('../config/index')

const Routes = new Router({
	prefix: Config.prefix
});

//创建接口

Student.routes.forEach(e => {
	Routes[e.methods](Student.name + e.path, e.realize);
});

Course.routes.forEach(e => {
	Routes[e.methods](Course.name + e.path, e.realize);
});
Interview.routes.forEach(e => {
	Routes[e.methods](Interview.name + e.path, e.realize);
});
Teacher.routes.forEach(e=>{
	Routes[e.methods](Teacher.name+e.path,e.realize);
});
Manager.routes.forEach(e=>{
	Routes[e.methods](Manager.name+e.path,e.realize);
});
Role.routes.forEach(e=>{
	Routes[e.methods](Role.name+e.path,e.realize);
});
Settings.routes.forEach(e=>{
	Routes[e.methods](Settings.name+e.path,e.realize);
});
Stat.routes.forEach(e=>{
	Routes[e.methods](Stat.name+e.path,e.realize);
});

module.exports = Routes;
