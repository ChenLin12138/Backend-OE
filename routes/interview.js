// 面试相关路由

const Interview = require('../app/controller/interview.js');

const InterviewRouter =  {
	name: '/interview', // 命名空间
	routes: [
        {methods: 'post', path: '/add', realize: Interview.addInterview}, // 新增面试
        {methods: 'post', path: '/list/by/month', realize: Interview.findInterviewsByMonth}, // 通过月份查询面试列表
		{methods: 'get', path: '/delete', realize: Interview.deleteInterview}, // 根据id删除面试记录
		{methods: 'get', path: '/next', realize: Interview.findNextInterview}, // 查询最近的面试

	]
};

module.exports = InterviewRouter;
