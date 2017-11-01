const WebSocket = require('ws');

const wss = new WebSocket.Server({
    port: 3000
});

console.log(`listen at port 3000`);

wss.on('connection', ws => {
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

function parseUser (obj) {
    if (!obj) return;
    console.log('try parse: ' + obj);
    let s = '';
    if (typeof obj === 'string') {
        s = obj;
    } else if (obj.headers) {
        let cookies = new Cookies(obj, null);
        s = cookies.get('name');
    }
    if (s) {
        try {
            let user = JSON.parse(Buffer.from(s, 'base64').toString());
            console.log(`User: ${user.name}, ID: ${user.id}`);
            return user;
        } catch (e) {

        }
    }
}