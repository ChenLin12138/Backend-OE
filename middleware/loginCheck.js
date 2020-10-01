const R = require('../app/service/response');
const Config = require('../config/index');

const whiteList = [
    Config.prefix + "/teacher/login",
    Config.prefix + "/student/login",
    Config.prefix + "/manager/login",
]
// 登录检查
const loginCheck =async (ctx,next)=>{

    if (whiteList.includes(ctx.url)) {
        console.log('ctx.url', ctx.url);
        console.log('skip');
        console.log('-----------');
        await next()
    } else {
        console.log('ctx.url', ctx.url);
        console.log('ctx.session.token', ctx.session.token);
        console.log('ctx.header.token', ctx.header.token);
        console.log('-----------');
        if(!ctx.session.token || !ctx.header.token || (ctx.session.token !== ctx.header.token)){
            R.error(555,ctx.header.token,ctx)
        }else{
            await next()
        }
    }
}

module.exports=loginCheck;
