exports.Response = Response;

function Response(){
	var that = this;
	this.handler = function(){
		return function(req,res,next){
			var respHandler = new ResponseHandler(req,res);
			respHandler.startTime = (new Date()).getTime();
			res.sendResponse = respHandler.sendResponse;
			res.sendError = respHandler.sendError;
			return next();
		};
	}
	this.authHandler = function(){
		return function(req, res, next){
			if(req.originalMethod == 'OPTIONS'){
				return next();
			}
		}
	}
}

function ResponseHandler(req, resp){
	var response = resp;
	var request = req;
	this.startTime = 0;
	this.responseTime = 0;
	this.path = '';
	this.inputParameters = {};
	this.applicationUser = '';
	this.user = '';
	var that = this;
	this.sendResponse = function(resp, notSendNoRecords){
		if(Object.keys(resp).length>0 || notSendNoRecords){
			var str = Utils.unescape(JSON.stringify(resp));
			str = str.replace(/&<[^>]*>/g, ' ');
			str = str.replace(/  /g,'');
			resp = JSON.parse(str);
			response.send({
				Status:'success',
				Data:resp
			});
		}
		else{
			response.send({
				Status: 'success',
				Data: resp,
				Message: 'No records found'
			});
		}
	}
	this.sendError=function(e){
		var err;
		if(e.http_code){
			response.status(e.http_code);
		} else{
			response.status(400);
		}

		if(e instanceof Exception){
			err = e.getError();
		}else{
			err = e;
		}
		response.json({
			Status: 'failure',
			Error: err
		});
	}
}