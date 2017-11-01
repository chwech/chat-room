const fs = require('fs');

console.log(__dirname); // 当前模块的目录的绝对路径： E:\Users\chenweicheng\Documents\my-data\Front-End-Engineer\作品\chat-room作品\chat-room
console.log(__filename);// 当前模块的绝对路径：E:\Users\chenweicheng\Documents\my-data\Front-End-Engineer\作品\chat-room\app.js作品\chat-room\app.js

function addMapping (router, mapping) {
    for (let url in mapping) {
        if (url.startsWith('GET ')) {
            var path = url.substring(4);
            router.get(path, mapping[url]);
            console.log(`注册路由: GET ${path}`);
        } else if (url.startsWith('POST ')) {
            var path = url.substring(5);
            router.post(path, mapping[url]);
            console.log(`注册路由: POST ${path}`);
        } else {
            console.log('无效的url')
        }
    }
}

function addControllers (router, dir) {
    let files = fs.readdirSync(__dirname + '/' + dir);
    // 过滤出js文件
    const jsFiles = files.filter((file) => {
        return file.endsWith('.js');
    });
    for (let file of jsFiles) {
        console.log(`处理controller: ${file}`);
        // 导入js文件
        let mapping = require(__dirname + `/${dir}/` + file);
        addMapping(router, mapping)
    }
}

module.exports = function (dir = 'controllers') {
    const Router = require('koa-router');
    const router = new Router();
    addControllers(router, dir);
    return router.routes();
};