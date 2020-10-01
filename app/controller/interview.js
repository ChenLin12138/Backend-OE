// 面试相关 controller

const InterService = require('../service/interview');
const R = require('../service/response');

const InterConroller = {
    /*
	*  新增一个面试
	* */
    addInterview: async (ctx) => {
        let student_id = ctx.request.body.student_id
        let interview_date = ctx.request.body.interview_date
        let interview_type = ctx.request.body.interview_type
        let remarks = ctx.request.body.remarks
        console.log(student_id,interview_date,interview_type,remarks)
		if (!student_id) return R.error(1, 'student_id', ctx)
        if (!interview_date) return R.error(1, 'interview_date', ctx)
        if (!interview_type) return R.error(1, 'interview_type', ctx)
        let result = await InterService.addInterview({student_id:student_id, interview_date: interview_date, interview_type: interview_type, remarks: remarks})
        if (result) {
            R.success("新增成功！", ctx)
        } else {
            R.error(88, '', ctx)
        }
    },
    /**
     * 
     * 根据月份查询面试列表
     */
    findInterviewsByMonth: async (ctx) => {
        let interview_date = ctx.request.body.interview_date
        if (!interview_date) return R.error(1, 'interview_date', ctx)
        let result = await InterService.findInterviewsByMonth(interview_date)
        if (result) {
            R.success(result, ctx)
        } else {
            R.error(88, '', ctx)
        }
    },
    /**
     * 
     * 根据id删除面试记录
     */
    deleteInterview: async (ctx) => {
        let id = ctx.query.interview_id
		if (!id) return R.error(1, 'interview_id', ctx)
		let result = await InterService.deleteInterview(id)
		if (result) {
			R.success('删除成功！', ctx)
		} else {
			R.error(99, '删除失败！', ctx)
		}
    },
    /**
     * 
     * 查询最近的面试
     */
    findNextInterview: async (ctx) => {
        let result = await InterService.findNextInterview()
		if (result) {
			R.success(result, ctx)
		} else {
			R.error(99, '系统错误', ctx)
		}
    }
};


module.exports = InterConroller;
