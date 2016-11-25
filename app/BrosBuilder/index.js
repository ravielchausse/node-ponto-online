"use strict";

var cls = class BrosBuilder 
{
	constructor(socket) 
	{
		this.socket = socket;
		this.connect = require('./Connect.js');
	}

	get(query, attributes, callback) 
	{
		try {
			if (typeof attributes === 'function') {
				callback = attributes;
				attributes = [];
			}
			console.log({get: {query: query, params: attributes}});
			var connect = this.connect();
			connect.query(query, attributes, function(err, results)
			{
				if (err) {
					throw err;
				}
				callback(results);
				return;
			});
			connect.end();
			return;
		} catch (e) {
			console.log(e);
			throw e;
		}
	}

	first(query, attributes, callback) 
	{
		try {
			if (typeof attributes === 'function') {
				callback = attributes;
				attributes = [];
			}
			console.log({first: {query: query, params: attributes}});
			var connect = this.connect();
			connect.query(query, attributes, function(err, results)
			{
				if (err) {
					throw err;
				}
				callback(results[0]);
				return;
			});
			connect.end();
			return;
		} catch (e) {
			console.log(e);
			throw e;
		}
	}

	insert(table, fillable, attributes, callback)
	{
		try {
			var columns = '';
			var values = '';
			var params = [];
			for (var index in fillable) {
				if (attributes[fillable[index]] && attributes.hasOwnProperty(fillable[index]) && attributes[fillable[index]].length > 0) {
					columns += fillable[index] + ',';
					values += '?,';			
					params.push(attributes[fillable[index]]);
				} 
			}
			var query = `INSERT INTO ${table} (${columns.substr(0, columns.length - 1)}) VALUES (${values.substr(0, values.length - 1)})`;
			console.log({insert: {query: query, params: params}});
			var connect = this.connect();
			connect.beginTransaction(function(err) 
			{
				connect.query(query, params, function(err, results)
				{
					if (err){
						connect.rollback();
						connect.end();
						throw err;
					}
					connect.commit(function(err)
					{
						if (err){
							connect.rollback();
							connect.end();
							throw err;
						}
						console.log({logInsertQuery: results});
						callback(results.insertId);
						connect.end();
						return;
					});
					return;
				});
				return;
			});
			return;
		} catch (e) {
			throw e;
		}
	}

	update(table, primaryKey, fillable, id, attributes, callback)
	{
		try {
			var columns = '';
			var params = [];
			for (var index in fillable) {
				if (attributes[fillable[index]] && attributes.hasOwnProperty(fillable[index]) && attributes[fillable[index]].length > 0) {
					columns += `${fillable[index]} = ?,`;
					params.push(attributes[fillable[index]]);
				} 
			}
			params.push(id);
			var query = `UPDATE ${table} SET ${columns.substr(0, columns.length - 1)} WHERE ${primaryKey} = ?`;
			console.log({update: {query: query, params: params}});
			var connect = this.connect();
			connect.beginTransaction(function(err) 
			{
				connect.query(query, params, function(err, results)
				{
					if (err){
						connect.rollback();
						connect.end();
						throw err;
					}
					connect.commit(function(err)
					{
						if (err){
							connect.rollback();
							connect.end();
							throw err;
						}
						console.log({logUpdateQuery: results});
						callback((results.protocol41 && results.changedRows) ? true : false);
						connect.end();
						return;
					});
					return;
				});
				return;
			});
			return;
		} catch (e) {
			throw e;
		}
	}

	delete(table, primaryKey, id, callback)
	{
		try {
			var query = `DELETE FROM ${table} WHERE ${primaryKey} = ?`;
			console.log({delete: {query: query, id: id}});
			var connect = this.connect();
			connect.beginTransaction(function(err) 
			{
				connect.query(query, id, function(err, results)
				{
					if (err){
						connect.rollback();
						connect.end();
						throw err;
					}
					connect.commit(function(err)
					{
						if (err){
							connect.rollback();
							connect.end();
							throw err;
						}
						console.log({logDeleteQuery: results});
						callback((results.protocol41 && results.affectedRows) ? true : false);
						connect.end();
						return;
					});
					return;
				});
				return;
			});
			return;
		} catch (e) {
			throw e;
		}
	}
}

module.exports = cls;