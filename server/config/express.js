/**
 *
 * Express configuration
 *
 */

'use strict';
module.exports = function(app){
	var express = require('express');
	var bodyParser = require('body-parser');
	var methodOverride = require('method-override');
	var path = require('path');
	var config = require('./environment');
	var winston = require('winston');
	// var MongoStore = require('connect-mongo');
	var request = require('request');
	var fs=require('fs');


	app.use(bodyParser.json({type:'application/*+json', limit:'50mb'}));
	app.use(bodyParser.json({type:'application/json', limit:'50mb'}));
	app.use(bodyParser.urlencoded({extended:false, limit:'50mb'}));

	var env = app.get('env');
	app.disable('x-powered-by');
	app.set('views', config.root + '/server/views');
	app.engine('html', require('ejs').renderFile);
	app.set('view engine', 'html');
	app.use(methodOverride());


	//Setup Excpetions
	global.EXCEPTION_MESSAGES = JSON.parse(fs.readFileSync(ROOT_PATH+DS+'config'+DS+'exceptions.js'));
	global.Exception = require('../system/exception.js').Exception;

	//Setup Response handing
	var Response = require('../system/response.js').Response;
	var response = new Response();
	app.use(response.handler());

	//Setup MongoDB Models
	// require('./mongo.js');

	app.use('/', express.static('client'));

	//Setup logger
	var logger = new winston.Logger({exitOnError:false});
	var loggingOption = global.CONFIG.logging;
	for(var type in loggingOption){
		if(loggingOption[type].enabled){
			if(type == 'console'){
				logger.add(winston.transports.Console, loggingOption[type]);
			} else if(type == 'file'){
				logger.add(winston.transports.File, loggingOption[type]);
			} else if(type == 'mail'){
				var Mail = require('winston-mail').Mail;
				logger.add(Mail, loggingOption[type]);
			}
		}
	}
	global.logger = logger;


	global.SetupAdminRoutes = function(app){
		fs.readdirSync(ROOT_PATH + '/modules').filter(function(file){
			var stats = fs.statSync(ROOT_PATH + '/modules/' + file);
			return (file.indexOf('.') !== 0 && stats.isDirectory());
		}).forEach(function(file){
			var tmpRoute = require(ROOT_PATH + '/modules/' + file);
			tmpRoute(app);
		});
	};
};