
function hdbDirectTest(){
  var results = _selection();
//Pass output to response		
$.response.status = $.net.http.OK;
$.response.contentType = "application/json";
$.response.setBody(JSON.stringify(results));

}

function hdbFlattenedTest(){
	outputJSON(_selection().EX_BP_ADDRESSES);
}

function _selection(){
	var connection = $.hdb.getConnection();

	var getPOItems = connection.loadProcedure( 
		"dev602.procedures::getPOItems");

	var results = getPOItems();
	return results;
}

/**
@function Puts a JSON object into the Response Object
@param {object} jsonOut - JSON Object
*/
function outputJSON(jsonOut){
	var out = [];
	for(var i=0; i<jsonOut.length;i++){
		out.push(jsonOut[i]);
	}
	$.response.status = $.net.http.OK;
	$.response.contentType = "application/json";
	$.response.setBody(JSON.stringify(out));
}


var aCmd = $.request.parameters.get('cmd');
switch (aCmd) {
case "direct":
	hdbDirectTest();
	break;
case "flattened":
	hdbFlattenedTest();
	break;	
default:
	hdbDirectTest();
	break;
}