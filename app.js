const Koa = require('koa');
const WebSocket = require('ws');
const cors = require('koa2-cors');
const bodyParser = require('koa-bodyparser');
const controller = require('./controller');
const templating = require('./templating');

const app = new Koa();
const IS_PRODUCTION = process.env.NODE_ENV === 'production';

app
    .use(cors())
    .use(bodyParser())
    .use(templating('views', {
        noCache: !IS_PRODUCTION,
        watch: !IS_PRODUCTION
    }))
    .use(controller())

let server = app.listen(3000); // listen方法返回http.Server

// 创建webSocketServer
let wss = new WebSocket.Server({ server });

wss.on('connection', ws => {
    console.log(ws.upgradeReq);
    console.log(`客户端连接`);
    ws.on('message', message => {
        console.log(`服务端接收信息 ${message}`);

        ws.send('server data', err => {
            if (err) {
                console.log('服务端发送消息失败');
            }
        });
    });
});

console.log('app started at port 3000....');