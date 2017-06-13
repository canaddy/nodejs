
//启动服务
(function () {
    var GameServer = require('./server');
    var gameServer = new GameServer();

    gameServer.start();

    process.on('uncaughtException', function (e) {
        winston.error("error uncaughtException\t", e.stack);
    });


})();
