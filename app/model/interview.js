// 面试相关 model类
const query = require('../service/mysql');


const InterModel = {
	/*
	*  添加一个面试
	* */
	addInterview: async (data) => {
		let inserts = [data.student_id, new Date(data.interview_date), data.interview_type, data.remarks]
		let sql = `INSERT INTO interview(student_id, interview_date, interview_type, remarks) VALUES (?, ?, ?, ?)`;
		return await query(sql, inserts)
    },
    /**
     * 
     * 查询某个月的面试记录
     */
    findInterviewsByMonth: async (month) => {
        let inserts = [new Date(month)]
		let sql = `select a.student_name, d.id, d.interview_date, d.interview_type, d.remarks from interview as d, student as a WHERE a.student_id = d.student_id and DATE_FORMAT(d.interview_date,'%Y-%m') = DATE_FORMAT(?,'%Y-%m')`;
		return await query(sql, inserts)
	},
	/**
	 * 
	 * 删除某条面试 
	 */
	deleteInterview: async (id) => {
		let inserts = [id]
		let sql = `delete from interview where id = ?`;
		return await query(sql, inserts)
	},
	/**
	 * 
	 * 查询最近的面试
	 */
	findNextInterview: async () => {
		let sql = `select a.student_name, d.id, d.interview_date, d.interview_type, d.remarks from student as a, interview as d WHERE a.student_id = d.student_id and d.interview_date > now() order by d.interview_date asc limit 3`;
		return await query(sql)
	}
};

module.exports = InterModel;
