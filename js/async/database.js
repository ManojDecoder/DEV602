'use strict';
var hdb = require("sap-hdbext");	
var async = require("async");

module.exports = {
	callHANA: function(wss){
        hdb.createConnection(function(error, client) {
            if(error) {
                console.error(error);
            }
            if(client) {	
    	        wss.broadcast("Database Connected");
                client.exec("select * from \"dev602.data::PurchaseOrder.Header\"",
        	       function (err, res, cb) {
                    if (err){ return ("ERROR: " + err); }
                    wss.broadcast("Database Call Complete");
                    for(var i = 0; i < res.length; i++){
                	   wss.broadcast(res[i].PURCHASEORDERID + ": " + res[i].GROSSAMOUNT + "\n");
                    }
        		    client.disconnect(function(cb){wss.broadcast("Database Disconnected"); } );
                });
            }  //End if client
        });  //end create connection      
    cb();	
   },   //end callHANA



   callHANA1: function(cb, wss){

    hdb.createConnection(function(error, client) {
    if(error) {
        console.error(error);
    }
    if(client) {

   	async.waterfall([

        function execute(callback){
        	wss.broadcast("Database Connected #1");
        	client.exec("select * from \"dev602.data::PurchaseOrder.Header\"", 
        	             function(err,res){callback(null,err,res);});

        },

        function processResults(err, res, callback){
        	if (err){ return ("ERROR: " + err); }
            wss.broadcast("Database Call  #1");
            wss.broadcast("--PO Header");            
            for(var i = 0; i < res.length; i++){
               	wss.broadcast(res[i].PURCHASEORDERID + ": " + res[i].GROSSAMOUNT);
            }
            wss.broadcast("\n");  
            client.disconnect(callback); 
        },

        function disconnectDone(callback){
			wss.broadcast("Database Disconnected #1"); 
			wss.broadcast("End Waterfall #1");
            cb();
        }

 	], function (err, result) {
        wss.broadcast(err || "done");
        wss.broadcast("Error Occured disrupting flow of Waterfall for #1");
        cb();
    });  //end Waterfall

    }    //end if client
    });  //end create connection

   },  //end callHANA1

   callHANA2: function(cb, wss){

    hdb.createConnection(function(error, client) {
    if(error) {
        console.error(error);
    }
    if(client) {

   	async.waterfall([

        function execute(callback){
        	wss.broadcast("Database Connected #2");
        	client.exec("select * from \"dev602.data::PurchaseOrder.Item\"", 
        	              function(err,res){callback(null,err,res);});

        },

        function processResults(err, res, callback){
        	if (err){ return ("ERROR: " + err); }
            wss.broadcast("Database Call  #2");
            wss.broadcast("--PO Items");             
            for(var i = 0; i < res.length; i++){
               	wss.broadcast(res[i].PURCHASEORDERID + ": " + res[i].PURCHASEORDERITEM );
            }
            wss.broadcast("\n");  
            client.disconnect(callback); 
        },

        function disconnectDone(callback){
			wss.broadcast("Database Disconnected #2"); 
			wss.broadcast("End Waterfall #2");
            cb();
        }

 	], function (err, result) {
        wss.broadcast(err || "done");
        wss.broadcast("Error Occured disrupting flow of Waterfall for #2");
        cb();
    });     //end Waterfall
   }        //end if client
   });  //end create connection

   }  //end callHANA2
};

