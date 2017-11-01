const testController = async (ctx, next) => {
    console.log(ctx.request.body);
};

module.exports = {
    'POST /test': testController
};