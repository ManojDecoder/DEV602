"use strict";
var express = require("express");
var app = express(); 
var os = require("os");
var TextBundle = require("sap-textbundle");
var langparser = require("accept-language-parser");

function getLocale(req) {
	var lang = req.headers["accept-language"];
	if (!lang) {
		return;
	}
	var arr = langparser.parse(lang);
	if (!arr || arr.length < 1) {
		return;
	}
	var locale = arr[0].code;
	if (arr[0].region) {
		locale += "_" + arr[0].region;
	}
	return locale;
}
	
module.exports = function(){

   app.route("/")
	.get(function(req,res){
		var bundle = new TextBundle({ path: "./i18n/messages", locale: getLocale(req) } );
 		res.writeHead(200, {"Content-Type": "text/plain; charset=utf-8"});	
		var greeting = bundle.getText("greeting", [os.hostname(), os.type()]);
  		res.end(greeting, "utf-8");
	});
   return app;	
};	