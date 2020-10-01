// 面试相关 service类
const InterModel = require('../model/interview');

const InterService = {
    /**
     * 
     * 新增一个面试
     */
    addInterview: async (data) => {
        let result = await InterModel.addInterview(data)
        if (result.insertId) {
            return result
        }
        return false
    },
    /**
     * 
     * 根据月份查询面试记录
     */
    findInterviewsByMonth: async (month) => {
        return await InterModel.findInterviewsByMonth(month)
    },
    /**
     * 
     * 根据id删除面试记录
     */
    deleteInterview: async (id) => {
        let result = await InterModel.deleteInterview(id)
        if (result) {
            return result
        }
        return false
    },
    /**
     * 
     * 查询最近的面试
     */
    findNextInterview: async () => {
        return InterModel.findNextInterview()
    }
};

module.exports = InterService;
