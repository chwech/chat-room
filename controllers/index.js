const indexController =  async (ctx, next) => {
    ctx.render('index.html', {
        name: 'chwech'
    });
};

module.exports = {
    'GET /': indexController
};