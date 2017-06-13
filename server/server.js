var util = require('util');
var events = require('events');
var io = require('socket.io');
var https = require('https');
var winston = require('winston');

 function GameServer() {
 	 this.PORT = 8888;
 }

 /**
 * 继承事件发射器
 */
util.inherits(GameServer, events.EventEmitter);


var p = GameServer.prototype;


p.start = function () {
	this.serverSocket = io.listen(this.PORT);

	winston.info("端口号" + this.PORT);

	var that = this;
    //连接成功
    this.serverSocket.on('connection', function (socket) {
        winston.info("新socket链接成功");

        socket._msgID = -1; //网络包id
        //网络消息
        socket.on('message', function (data) {

            try {
                console.log(data);
            } catch (e) {
                winston.error(data);
                winston.error(e.stack)
            }


        });
        //断开消息
        socket.on('disconnect', function (data) {
            that.onUserShut(data, socket);
        });
        //错误消息
        socket.on('error', function (error) {
            winston.error(error.stack);
        });
    });
}

p.onClientSocketEvent = function (data, socket, androidUserItem) {

};

module.exports = GameServer;
