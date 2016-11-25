'use strict';
var nodemailer = require('nodemailer');
var _text = null;
var _this = null;
var _index = 0;

module.exports = function (data) {
	_this = this;
	var mailOptions = {};
	var email = null;
	var j = 0;

	var transporter = nodemailer.createTransport({
		host: $env.mail.host,
		port: $env.mail.port,
		auth: $env.mail.auth
	});

	mailOptions = {
		from: $env.mail.name + '<' + $env.mail.auth.user + '>',
		to: email,
		subject: $env.mail.project,
		text: _text,
		html: '<html>' + _text + '</html>'
	};

	transporter.sendMail(mailOptions, function(error, info){
		if(error){
			console.log(error);
		} else {
			console.log({
				email: email,
				info: info
			});
		}
		return;
	});
	return;
}
