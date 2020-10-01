// 配置类
const DEV = true //配置是否是开发环境
const serverUrl = 'localhost' //服务器地址

const config={
    port:'8080',
    mysql:{
        database:'tuto',//数据库名称
        user:'root',//mysql用户名
        password:'3306',//服务端密码
        port:'3306',//mysql端口号
        host:'localhost',//服务器ip,
    },
    prefix: '/api',
    // 跨域地址
    origunUrl: DEV ? 'http://localhost:3000' : serverUrl
}

module.exports=config
