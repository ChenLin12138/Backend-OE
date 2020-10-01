// 学生管理

const StatController = require('../app/controller/stat');
const StuRouter = {
    name: '/stat',//命名空间
    routes: [
        {methods: 'get', path: "/course-date", realize: StatController.courseByDate},
        {methods: 'get', path: "/course-pie", realize: StatController.coursePeiChartData},
    ]
};

module.exports = StuRouter;
