var api = require('api');
var MapModule = require('ti.map');


var annotations = {};
var lastClicked = null;

function doClick(e) {
    alert($.label.text);
}


var position = [46.4861067, 11.3275207];

var map = MapModule.createView({
    mapType: MapModule.NORMAL_TYPE,
    region: {
        latitude: 46.4861067,
        longitude: 11.3275207, 
        latitudeDelta: 0.001, 
        longitudeDelta: 0.001,
        regionFit:true 
    }, 

    width: 'auto',
    height: 'auto'

});





$.index.add(map);

// function populate(){
	// var data = [];
	// for(var i=0; i<2; i++){
// 
		// data.push({ 
			// "img":{"image": "/appicon.png"},
			// "lbl_name":{"text": "get 20 % discount!!"}
		// });
	// }
	// return data;
// }
// 
// 
// var section = Ti.UI.createListSection({items: populate()});
// $.listView.sections = [section];

$.index.open();


map.addEventListener('click', function(e){
	// Ti.API.info(e.clicksource);
	// Ti.API.info(e.annotation.id);
	// Ti.API.info(JSON.stringify(e));
	// if(e.id != "me"){
		// Alloy.createController('play', {"id": e.id, 'userId': 'samsungS3'}).getView().open();
	// }
	if (e.clicksource == 'rightButton' || e.clicksource == 'leftPane') {
		// Ti.API.log('debug', '		>>> opening detail window for event: ' + e.title);
		// openDetailAnnotationWin(e);	
		position = [e.annotation.latitude, e.annotation.longitude];
		lastClicked = e.annotation.id;
		
		Alloy.createController('play', {"id": e.annotation.id, 'userId': 'samsungS3', "step": e.annotation.step, "group": e.annotation.group, "coupon":e.annotation.coupon}).getView().open();
	}
});


$.index.addEventListener('open', function(){
	addAnnototations("me", 46.4861067, 11.3275207, "", "/pin_orange.png", null, null);
	checkForUpdates();
});


function checkForUpdates(){
	
	api.getFirst({
		onSuccess: function(data){
			for(var i in data){
				
				if(data[i].step == 1){
					var annotationView = Alloy.createController("annotation", {"nr": (data[i].rate?data[i].rate:0), "title":data[i].quest}).getView(); 
					addAnnototations(data[i].id, data[i].position[0], data[i].position[1], "", "/pin_blue.png", annotationView, data[i].step, data[i].group, data[i].coupon);
				}else{
					var annotationView = Alloy.createController("annotation", {"nr": (data[i].rate?data[i].rate:0), "title":data[i].quest}).getView(); 
					addAnnototations(data[i].id, data[i].position[0], data[i].position[1], "", "/pin_yellow.png", annotationView, data[i].step, data[i].group, data[i].coupon);
				}
			}
			Ti.API.info(JSON.stringify(data));
 
		},
		onError: function(e){
			Ti.API.info(e);
			setTimeout(function(){
				checkForUpdates();
			}, 5000);
		}
	});
}


function addAnnototations(id, lat, lon, url, pin_image, annotationView, step, group, coupon){
	 
	 
	var eventoAnnotationParms = MapModule.createAnnotation({ 
		latitude: lat,
		longitude: lon, 
	    url: url, 
	    animate:true,
	    id: id,
	    coupon: (coupon && coupon!=null? coupon : null)
	});
	
	Ti.API.info(coupon + "  " + (coupon && coupon!=null? coupon : null));
	
	if(annotationView) eventoAnnotationParms.leftView = annotationView;
	if(step) eventoAnnotationParms.step = step;
	if(group) eventoAnnotationParms.group = group;
	// var ann_val = { latitude: lat,
				// longitude: lon,
			    // title: title,
			    // url: url, 
			    // animate:true
	// };
// 								
	// var eventoAnnotationParms  = MapModule.createAnnotation(ann_val);
			
	if(OS_IOS) {
		// Ti.API.info("ios");
		eventoAnnotationParms.rightButton=Titanium.UI.iPhone.SystemButton.DISCLOSURE;
		eventoAnnotationParms.image = pin_image;
	}
	else {
		eventoAnnotationParms.rightButton='/DisclosureButton2.png';
		eventoAnnotationParms.image = pin_image;
	}
	
	annotations[id] = eventoAnnotationParms;
	
	map.addAnnotation(eventoAnnotationParms);	
}

// Ti.API.

Ti.App.addEventListener("update_gps",function(data){
	Ti.API.info("=====> " + JSON.stringify(data.res)); 
	if(data.res.coupon){
		Alloy.createController('rate', {"res": data.res}).getView().open();
	}else{
		
		map.removeAnnotation(annotations[lastClicked]);
		map.removeAnnotation(annotations["me"]);
		
		
		delete annotations["me"];
		
		Ti.API.info(JSON.stringify(annotations[lastClicked]));
		addAnnototations("me", annotations[lastClicked].latitude, annotations[lastClicked].longitude, "", "/pin_orange.png", null, null, null, null);
		
		delete annotations[lastClicked];
		
		
		var annotationView = Alloy.createController("annotation", {"nr": (data.res.rate?data[i].rate:0), "title":data.res.quest}).getView(); 
		addAnnototations(data.res.id, data.res.position[0], data.res.position[1], "", "/pin_yellow.png", annotationView, data.res.step, data.res.group, data.res.coupon);
	}
});
