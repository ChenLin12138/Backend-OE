// 学生操作相关controller类
const Kit = require("../libs/kit");

const CourseService = require('../service/course')

const R = require('../service/response')
const Tools = require('../controller/tools')

const StatController = {
    async courseByDate(ctx) {
        let result = await CourseService.courseGroupByDate();
        if (result) {
            R.success(result, ctx)
        } else {
            R.error(99, '系统错误', ctx)
        }
    },
    async coursePeiChartData(ctx) {
        let result = await CourseService.coursePeiChartData();
        if (result) {
            R.success(result, ctx)
        } else {
            R.error(99, '系统错误', ctx)
        }
    }
};

module.exports = StatController
