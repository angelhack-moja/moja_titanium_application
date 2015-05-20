var ip = "10.130.164.6:1880";

exports.getFirst = function(callback){
	var url = ip + "/first";
	__httpRequest('GET', url, {}, callback);
};

exports.getNext = function(data, callback){
	var url = ip + "/nextof";
	__httpRequest('POST', url, data, callback);
};

exports.updateRate = function(data, callback){
	var url = ip + "/rate";
	__httpRequest('POST', url, data, callback);
};


exports.getChallenges = function(callback){
	var url = ip + "/challenges";
	
	__httpRequest('GET', url, {}, callback);
};

exports.updatePuzzle = function(data, callback){
	var url = ip + "/rate";
	__httpRequest('POST', url, data, callback);
};


function __httpRequest(method, url, postData, callback){
	log(JSON.stringify(postData));
	var xhr = Titanium.Network.createHTTPClient();
	xhr.setRequestHeader( "Content-Type", "application/json" );
	var tries = tries || 0;
	
	xhr.open(method, url);
	
	xhr.onload = function(e) { 
		var items = null;
		try { items = JSON.parse(this.responseText); } catch (e){log("ERROR!!");}
		callback.onSuccess((items == null ? this.responseText : items));
	};
	
	xhr.onerror = function(e) {
		log("=======>"+JSON.stringify(e));
		callback.onError("Error");
	};
	
	if (Titanium.Network.online) {
		xhr.send(postData);
    } else {
        alert(Alloy.Globals.no_internet_error);
		if (callback.error) { callback.onError(); }
    };
	
}


function log(msg){
	Ti.API.info(msg);
}
