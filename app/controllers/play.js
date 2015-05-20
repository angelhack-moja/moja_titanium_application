var args = arguments[0] || {};

function update(){
	Ti.API.info(JSON.stringify(args));
	var idPuzzle = args.group;
	var userId = args.userId; 
	
	
	var data = {"puzzleId": idPuzzle, "step": args.step};
	
	if(args.coupon && args.coupon != null){
		Ti.App.fireEvent("update_gps", {"res":{"coupon":true}});
		$.w_play.close();
	}else{ 
		var api = require("api");
		Ti.API.info(JSON.stringify(data));
		api.getNext(JSON.stringify(data), {
			onSuccess: function(res){
				Ti.App.fireEvent("update_gps", {"res":res});
				$.w_play.close();
			},
			onError: function(){
				setTimeout(function(){
					update();
				}, 2000);
			}
		});
	}
}

$.w_play.addEventListener('open', function(e){
	$.web_view.url='http://178.62.218.20:4567/api/game/123';
});

function send(){
	Ti.App.fireEvent('game:done');
}

Ti.App.addEventListener('game:done',function(e){
	// alert("ok");
	update();
});
