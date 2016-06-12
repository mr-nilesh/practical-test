/*
This is the Exception class, used to raise the exception, it also logs the exception.
*/
'use strict';

exports.Exception = Exception;

var util = require('util');

function Exception(errorName, params, rootError){
	Error.captureStackTrace(this, Exception);
	this.errorName = errorName;
	this.params = params;
	this.code = EXCEPTION_MESSAGES[errorName]['code'];
	
	this.httpCode = EXCEPTION_MESSAGES[errorName]['http_code'];
	this.errorMessage = EXCEPTION_MESSAGES[errorName]['message'];
	if(params != undefined && params != null && typeof params != 'string'){
		for(var key in params){
			var regExp = new RegExp('{'+key+'}','g');
			this.errorMessage = this.error_message.replace(regExp, params[key]);
		}
	}else if(params != undefined){
		this.error_message = params;
	}
	
	this.stack_trace = this.stack;
	if(rootError != undefined) this.rootError = rootError;
	if(EXCEPTION_MESSAGES[errorName]['send_notification'] == 'true' || EXCEPTION_MESSAGES[errorName]['send_notification'] == true)
		logger.error(this);

	this.getError = function(){
		return {
			'Code': this.code,
			'Name': this.errorName,
			'Message': this.errorMessage
		};
	}
}
util.inherits(Exception, Error);