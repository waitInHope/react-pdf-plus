
console.log('开始初始化服务端')

const Koa = require('koa');
const Router = require('koa-router');
const fs = require('fs');
const path = require('path');

const app = new Koa();
const router = new Router();

const port = 9090;

router.get('/pdf', (ctx, next) => {
    console.log('收到客户端的请求信息');
    // 读取本地pdf文件并返回给浏览器
    let url = path.join(__dirname, '../assets/2022年留杭承诺书.pdf');
    console.log(`文件的路径${url}`);

    // ctx.set('Content-Type', 'application/pdf');
    ctx.set('Content-Type', 'application/octet-stream');
    // ctx.set('Transfer-Encoding', 'chunked');

    let content = fs.readFileSync(url, 'binary');

    // react-pdf中的filr采用base64的方式
    let buf = Buffer.from(content, 'binary').toString('base64');
    ctx.body = buf;

    // react-pdf中的file采用url的方式   必须使用binary的编码格式
    // const buf = Buffer.from(content, 'binary');
    // ctx.body = buf;
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
