"use strict";
var dao = require('./SettingDao.js')

var _this = null;

var _map = {
	'settingId': 'set_id',
	'settingName': 'set_name',
	'settingValue': 'set_value'
};

var _mapReverse = {};

var _settingList = [];
var _setting = {
	set_id: null,
	set_name: null,
	set_value: null
};

/**
* @author Raviel Chausse Silveira
*/
var cls = class Setting {

	/**
	* @author Raviel Chausse Silveira
	*/
	constructor(socket)
	{
		try {
			this.socket = socket;
			this.dao = new dao(socket);
			_mapReverse = this.mapReverse(_map);
			this.getSettingValue = require('./GetSettingValue.js');
			this.getSettingList = require('./GetSettingList.js');
		} catch (e) {
			console.log(e);
			this.socket.emit('log', {exception: e});
		}
	}

	/**
	* @author Raviel Chausse Silveira
	*/
	store(attributes)
	{
		try {
			_this = this;
			attributes = _this.mapFields(_map, attributes);
			_this.dao.store(attributes, function (id) {
				attributes['set_id'] = id;
				attributes = _this.mapFieldReverse(_map, attributes);
				_this.socket.emit('log', {data: attributes});
				return;
			});
			return;
		} catch (e) {
			console.log(e);
			this.socket.emit('log', {exception: e});
		}
	}

	/**
	* @author Raviel Chausse Silveira
	*/
	update(attributes)
	{
		try {
			_this = this;
			attributes = _this.mapFields(_map, attributes);
			if (!attributes.set_id) {
				throw 'Field settingId required in object attributes.';
			}
			_this.dao.update(attributes.set_id, attributes, function (boolean) {
				_this.socket.emit('log', {data: boolean});
				return;
			});
			return;
		} catch (e) {
			console.log(e);
			this.socket.emit('log', {exception: e});
		}
	}

	/**
	* @author Raviel Chausse Silveira
	*/
	delete(attributes)
	{
		try {
			_this = this;
			if (!attributes.id) {
				throw 'Field settingId required in object attributes.';
			}
			_this.dao.delete(attributes.id, function (boolean) {
				_this.socket.emit('log', {data: boolean});
				return;
			});
			return;
		} catch (e) {
			console.log(e);
			this.socket.emit('log', {exception: e});
		}
	}

	/**
	* @author Raviel Chausse Silveira
	*/
	getSettingById(attributes)
	{
		try {
			_this = this;
			if (!attributes.id) {	
				throw 'Empty id in attributes';
			}
			_this.dao.getSettingById(attributes.id, function (attributes) {
				_this.socket.emit('log', {data: attributes});
				return;
			});
			return;
		} catch (e) {
			console.log(e);
			this.socket.emit('log', {exception: e});
		}
	}

	/**
	* @author Raviel Chausse Silveira
	*/
	getAllSettings(attributes)
	{
		try {
			_this = this;
			_this.dao.getAllSettings(attributes, function (attributes) {
				_settingList = attributes;
				_this.socket.emit('log', {data: _settingList});
				return;
			});
			return;
		} catch (e) {
			console.log(e);
			this.socket.emit('log', {exception: e});
		}
	}

	/**
	* @author Raviel Chausse Silveira
	*/
	mapReverse(map) 
	{
		try {
			var reverse = {};
			for (var key in map) {
				reverse[map[key]] = key;
			};
			return reverse;
		} catch (e) {
			console.log(e);
			this.socket.emit('log', {exception: e});
		}
	}

	/**
	* @author Raviel Chausse Silveira
	*/
	mapFields(map, params)
	{
		try {
			var attributes = {};
			for (var key in params) {
				attributes[map[key]] = params[key];
			}
			return attributes;
		} catch (e) {
			console.log(e);
			this.socket.emit('log', {exception: e});
		}
	}

	/**
	* @author Raviel Chausse Silveira
	*/
	mapFieldReverse(map, params)
	{
		try {
			var attributes = {};
			for (var key in params) {
				attributes[_mapReverse[key]] = params[key];
			}
			return attributes;
		} catch (e) {
			console.log(e);
			this.socket.emit('log', {exception: e});
		}
	}

	/**
	* @author Raviel Chausse Silveira
	*/
	keyByValue(map, value) 
	{
		try {
			for(var key in map) {
				if(map[key] === value && map.hasOwnProperty(key)) {
					return key;
				}
			}
			return;
		} catch (e) {
			console.log(e);
			this.socket.emit('log', {exception: e});
		}
	}
}
module.exports = cls;