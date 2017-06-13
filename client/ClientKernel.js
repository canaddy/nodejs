/**
 * Created by Administrator on 2015/7/10.
 */


/** @expose */
// window.io;
var SocketIO = require('socket.io-client');


function ClientKernel(){
    webSocket: null;
}

ClientKernel.prototype.webSocketSend = function (data) {
    this.webSocket && this.webSocket.send(JSON.stringify(data));
};
ClientKernel.prototype.startConnect = function (url) {
    console.log(url)
    this.webSocket = SocketIO.connect(url);
    this.webSocket.tag = "GAME_Client";
    var self = this;

    //链接事件
    this.webSocket.on("connect",  (data) => {
         console.log("连接成功");

         this.webSocketSend({"test":"aasd"})

    });

    

    //断开事件
    this.webSocket.on("disconnect", function () {
     console.log("断开连接");
        self.webSocket = null;
    });
    //错误消息
    this.webSocket.on("error", function (error) {
     console.log(error.stack);
        self.webSocket = null;
    });
    //通信消息
    this.webSocket.on("message", function (data) {
        data = JSON.parse(data);

        self.onEventMessage(data);
    });
},
ClientKernel.prototype.onEventMessage = function (data) {

     this.webSocketSend(data);
},
module.exports = ClientKernel;