const nunjucks = require('nunjucks');

function createEnv(path, opts) {
    let 
        autoescape = opts.autoescape === undefined ? true : opts.autoescape,
        noCache = opts.noCache || false,
        watch = opts.watch || false,
        throwOnUndefined = opts.throwOnUndefined || false,
        env = new nunjucks.Environment(
            new nunjucks.FileSystemLoader(path, {
                noCache: noCache, // 如果为 true，不使用缓存，模板每次都会重新编译。
                watch: watch // 如果为 true，当文件系统上的模板变化了，系统会自动更新他。使用前请确保已安装可选依赖 chokidar。
            }), {
                autoescape: autoescape, // autoescape (默认值: true) 控制输出是否被转义
                throwOnUndefined: throwOnUndefined // throwOnUndefined (default: false) 当输出为 null 或 undefined 会抛出异常
            }
        );
    if (opts.filters) {
        for (let f in opts.filters) {
            env.addFilter(f, opts.filters[f]); //过滤器
        }
    }

    return env;
}


module.exports = function templating(path, opts) {
    const env = createEnv(path, opts);

    return async (ctx, next) => {
        // 给ctx挂上render函数
        ctx.render = function (view, model) {
            // 把渲染后的模板返回
            ctx.response.body = env.render(view, Object.assign({}, ctx.state || {}, model || {}));
            // 设置Content-Type
            ctx.response.type = "text/html";
        };

        await next(); // 继续处理请求
    };
};
