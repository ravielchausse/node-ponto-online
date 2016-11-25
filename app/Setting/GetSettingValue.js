'use strict';
var _this = null;

module.exports = function (name) {
	_this = this;
	$axios.post('setting/getSettingValue', {name: name})
	.then(function (response) {
		$global.createEmail = (response.data == 0) ? false : true;
		console.log({createEmail: $global.createEmail});
		return;
	})
	.catch(function (error) {
		console.log(error);
		_this.socket.emit('Exceptions', {
			exception: {
				code: 999,
				exceptionMessage: error.response.data
			}
		});
		return;
	});
}