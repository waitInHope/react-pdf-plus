
console.log('开始初始化服务端')

const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();

const port = 9090;

router.get('/pdf', (ctx, next) => {
    console.log('收到客户端的请求信息')
    ctx.body = {
        code: 200,
        data: 'hello word'
    }
    next();
})

app.use(router.routes()).use(router.allowedMethods());

app.listen(port, (err) => {
    if(err) {
        console.log('服务器启动失败');
        return false;
    } else {
        console.log(`服务器启动成功，监听${port}端口`);
    }
})
