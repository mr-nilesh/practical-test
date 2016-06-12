'use strict';
// Development specific configuration
// ==================================
module.exports = {
	logging:{
		console:{
			enabled:true,
			level:'silly',
			timestamp:true,
			handleExceptions:true,
			json:true
		},
		file:{
			enabled:true,
			filename:'./log/logs.txt',
			level:'silly',
			timestamp:true,
			json:true,
			handleExceptions:true
		}
	},
	server:{
		port:9000,
		host:'0.0.0.0'
	},
	mongo:{
		dbHost:[{host:'127.0.0.1'}],
		dbName:'practical_test',
		dbUser:'',
		dbPassword:'',
		debug:true
	}
};