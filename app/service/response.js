// 返回处理服务


const ResponseService = {
    /**
     *
     *  成功
     *
     */
    success: function (data, ctx) {

        if (data.hasOwnProperty('list') && data.hasOwnProperty('pager')) {
            ctx.response.body = {
                code: 0,
                datas: data.list,
                pager: data.pager,
                message: ''
            }
        } else {
            ctx.response.body = {
                code: 0,
                datas: data,
                message: ''
            }
        }

    },
	/*
	*  错误
	* */
	error: function (errType, errMsg, ctx) {
	    let msg = '';
        switch (errType) {
            case 1:
                message = '缺少参数：' + errMsg
                break;
            case 2:
                message = '用户名已经存在：' + errMsg
                break;
            case 3:
                message = '找不到课程: ' + errMsg
                break;
            case 4:
                message = '找不到学生: ' + errMsg
                break;
            case 5:
                message = '账号或密码错误！' + errMsg
                break;
            case 6:
                message = '原始密码错误！' + errMsg
                break;
            case 7:
                message = '该学生已选择了这门课程！' + errMsg
                break;
            case 555:
                message = '登录失效：' + errMsg
                break;
            case 666:
                message = '找不到对应的：' + errMsg
                break;
            case 777:
                message = '对应的数据已存在：' + errMsg
                break;
            case 888:
                message = '无权限操作'
                break;
            default:
                message = '出错啦！'
        }
		ctx.response.body = {
            code: errType,
            error: true,
            test: 'test',
            message
        }
    },
};

module.exports = ResponseService;


