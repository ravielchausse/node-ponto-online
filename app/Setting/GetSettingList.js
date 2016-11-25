'use strict';
var _this = null;

module.exports = function (name) {
	_this = this;
	var list = _this.settingDao.list();
	console.log({settingList: list});
	return;
}