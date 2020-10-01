const Koa = require('koa');

// 配置
const Config = require('./config/index');

// 路由
const Routes = require('./routes/index');

// 中间件
const MiddleWare = require('./middleware/index');

// 实例化koa
const app=new Koa();
app.on('error', (err, ctx) =>
  console.error('server error', err)
)
// 激活所有中间件
MiddleWare(app)

// 配置路由
app.use(Routes.routes()).use(Routes.allowedMethods());

// 启动服务
app.listen(Config.port,()=>{
  console.log('服务已经启动，http://localhost:'+Config.port)
});