global.$env = require('./env.json');
global.$extend = require('deep-extend');
global.$moment = require('moment');
global.$axios = require('axios');

var http = require('http'),
app = http.createServer(),
mods = {
	myapp: require('./app')
};

app.listen(3000, function() {
	console.log("server_load_start");
	console.time("server_load_end");
});

global.$io = require('socket.io').listen(app);

global.$createEmail = false;
global.$unavailability = {};
global.$students = [];
global.$classes = [];

$axios.defaults.baseURL = `http://${$env.app.host}:${$env.app.port}/${$env.app.path}`;
$axios.defaults.headers.post['Content-Type'] = 'application/json';

global.$factory = {
	instances: {},
	instanceId: 0,
	createInstance: function(modName){
		var instance
		, instanceName
		;

		instance = $factory.instanceId+=1;
		instanceName = modName + instance;

		$factory.instances[instanceName] = new mods[modName]();
		return $factory.instances[instanceName];
	},
	execute: function(modName, instanceName){
		return mods[modName];
	}
};

$io.on('connection', function(socket){

	console.log("conexão aberta " + socket.id);
	var instance = $factory.createInstance("myapp"),
	instanceName = instance.instanceName;

	instance.construct(socket);

	socket.on('disconnect', function(){
		instance.timesheet.releaseTimeBySocketId(socket.id);
		instance.classes.releaseClassBySocketId(socket.id);
		delete $factory.instances[instanceName];
		return;
	});

	socket.on('execute', function(pars, callback){
		var cls = pars.cls
		, action = pars.action
		, attributes = pars.data
		;

		if (cls) {
			if(typeof instance[cls][action] === "function"){
				instance[cls][action](attributes, callback);
			}else{
				instance["init"](attributes);
			}
		} else {
			if(typeof instance[action] === "function"){
				instance[action](attributes, callback);
			}else{
				instance["init"](attributes);
			}
		}
		return;
	});

	console.timeEnd("server_load_end");
	return;
});