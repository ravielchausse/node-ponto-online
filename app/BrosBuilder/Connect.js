'use strict';
var _mysql = require('mysql');

module.exports = function(){
	var connect = _mysql.createConnection({
		host: $env.database.host,
		database: $env.database.database,
		user: $env.database.username,
		password: $env.database.password
	});
	return connect;
}