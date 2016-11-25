"use strict";
var setting = require('./Setting');

var _this = null;

var cls = class myapp {

	construct(socket){
		this.socket = socket;
		this.setting = new setting(socket);
	};

	init()
	{
		this.socket.emit('log','Action não encontrada!');
		console.log('Action não encontrada!');
		return;
	}

	chat(attributes, callback)
	{
		if ($io.sockets.connected[attributes.to]) {
			$io.sockets.connected[attributes.to].emit('log', {to: this.socket.id, message: attributes.message})
		} else {
			this.socket.emit('log','Usuário não encontrado!');
		}
		return;
	}

	log(attributes, callback)
	{
		console.log({log: attributes});
		$io.sockets.emit('log', {log: attributes});
		return;
	}

}

module.exports = cls;