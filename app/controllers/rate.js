var data = arguments[0] || {};

data.res.step = 1;

function rate1(){
	$.v1.image = "/star_full.png";
	$.v2.image = "/star_empty.png";	
	$.v3.image = "/star_empty.png";
	$.v4.image = "/star_empty.png";
	$.v5.image = "/star_empty.png";
	
	data.res.rate = 1;	
	
	sendRequest();
}
function rate2(){
	$.v1.image = "/star_full.png";
	$.v2.image = "/star_full.png";
	$.v3.image = "/star_empty.png";
	$.v4.image = "/star_empty.png";
	$.v5.image = "/star_empty.png";
	
	data.res.rate = 2;	
	
	sendRequest();
}

function rate3(){
	$.v1.image = "/star_full.png";
	$.v2.image = "/star_full.png";	
	$.v3.image = "/star_full.png";
	$.v4.image = "/star_empty.png";
	$.v5.image = "/star_empty.png";
	
	data.res.rate = 3;
	sendRequest();
}

function rate4(){
	$.v1.image = "/star_full.png";
	$.v2.image = "/star_full.png";	
	$.v3.image = "/star_full.png";
	$.v4.image = "/star_full.png";
	$.v5.image = "/star_empty.png";
	
	data.res.rate = 4;
	sendRequest();
}

function rate5(){
	$.v1.image = "/star_full.png";
	$.v2.image = "/star_full.png";	
	$.v3.image = "/star_full.png";
	$.v4.image = "/star_full.png";
	$.v5.image = "/star_full.png";
	
	data.res.rate = 5;
	sendRequest();
}



function sendRequest(){
	var api= require("api");
	api.updateRate(data.res, {
		onSuccess: function(e){
			$.w_rate.close();
		},
		onError: function(e){
			
		}
	});
}


