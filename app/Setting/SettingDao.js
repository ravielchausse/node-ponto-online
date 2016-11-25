'use strict';
var BB = require('../BrosBuilder');

var _this = null;
var _table = 'set_settings';
var _primaryKey = 'set_id';
var _fillable = 
[
'set_name'
, 'set_value'
];

/**
* @author Raviel Chausse Silveira
*/
var cls = class SettingDao 
{
	/**
	* @author Raviel Chausse Silveira
	*/
	constructor(socket) 
	{
		try {
			this.BB = new BB(socket);
		} catch (e) {
			throw e;
		}
	}

	/**
	* @author Raviel Chausse Silveira
	*/
	store(attributes, callback)
	{
		try {
			this.BB.insert(_table, _fillable, attributes, function (id) 
			{
				callback(id);
				return;
			});
			return;
		} catch (e) {
			throw e;
		}
	}

	/**
	* @author Raviel Chausse Silveira
	*/
	update(id, attributes, callback)
	{
		try {
			this.BB.update(_table, _primaryKey, _fillable, id, attributes, function (boolean) 
			{
				callback(boolean);
				return;
			});
			return;
		} catch (e) {
			throw e;
		}
	}

	/**
	* @author Raviel Chausse Silveira
	*/
	delete(id, callback)
	{
		try {
			this.BB.delete(_table, _primaryKey, id, function (boolean) 
			{
				callback(boolean);
				return;
			});
			return;
		} catch (e) {
			throw e;
		}
	}

	/**
	* @author Raviel Chausse Silveira
	*/
	getAllSettings(attributes, callback)
	{
		try {
			var query = `
			SELECT
			set_id AS settingId,
			set_name AS settingName,
			set_value AS settingValue
			FROM set_settings
			`;
			this.BB.get(query, callback);
			return;
		} catch (e) {
			throw e;
		}
	}

	/**
	* @author Raviel Chausse Silveira
	*/
	getSettingById(id, callback)
	{
		try {
			_this = this;
			var query = `
			SELECT
			set_id AS settingId,
			set_name AS settingName,
			set_value AS settingValue
			FROM set_settings 
			WHERE set_id = ?
			`;
			this.BB.first(query, [id], callback);
			return;
		} catch (e) {
			throw e;
		}
	}

}
module.exports = cls;