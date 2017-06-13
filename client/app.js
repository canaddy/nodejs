
//启动服务
(function () {
	var URL = "ws://127.0.0.1:8888";
    var ClientKernel = require('./ClientKernel');
	var clientKernel = new ClientKernel();

     clientKernel.startConnect(URL);

     // clientKernel.webSocketSend({"test":"aasd"})
})();
