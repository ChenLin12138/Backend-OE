// 中间件管理类


const json = require('koa-json');
const bodyParser = require('koa-bodyparser');
const cors = require('koa2-cors');
const session = require('koa-session');
const conf = require('../config/index');
const loginCheck = require('../middleware/loginCheck')
const {accessLogger, systemLogger, userWatcher} = require('./logger');

// 初始化所有中间件
const initMid = (app) => {
	
	// json格式化
	app.use(json());
	// 跨域
	// 这里设置是为了能够跨浏览器拿到session
	// 前端如果是axios 需要配置 axios.defaults.withCredentials = true
	app.use(cors({
		origin: [ 
			conf.origunUrl
		], 
		// 允许这个域名的 跨域请求
		exposeHeaders: ['WWW-Authenticate', 'Server-Authorization', 'Set-Cookie', 'Cookie'],
		maxAge: 5,
		credentials: true,
		allowMethods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
		allowHeaders: ['Content-Type', 'Authorization', 'Accept', 'token', 'X-Requested-With', 'access-control-allow-credentials']
	}));

	// 转换接收到的post参数 ctx.request.body  get 用 ctx.query 接收
	app.use(bodyParser());

	// 使用session
	app.keys = ['secret'];
	const CONFIG = {
		key: 'koa:sess',   //cookie key (default is koa:sess)
		maxAge: 1000*60*60,  // cookie的过期时间 
		overwrite: true,  //是否可以overwrite    (默认default true)
		httpOnly: true, //cookie是否只有服务器端可以访问 httpOnly or not (default true)
		signed: true,   //签名默认true
		rolling: false,  //在每次请求时强行设置cookie，这将重置cookie过期时间（默认：false）
		renew: false,  //(boolean) renew session when session is nearly expired,
		sameSite: false,
		};
	app.use(session(CONFIG, app));

	// 登录检查
	app.use(loginCheck)
	app.use(async (ctx, next) => {
		await next()
	})

	// 全局请求监听
	app.use(accessLogger())
	// 全局错误日志
	app.on('error', err => {systemLogger.error(err)})
	// 用户行为监听
	app.use(userWatcher)
};

module.exports = initMid;
