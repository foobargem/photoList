// This is a test harness for your module
// You should do something interesting in this harness 
// to test out the module and to provide instructions 
// to users on how to use it by example.


// open a single window
var win = Ti.UI.createWindow({
	backgroundColor:'white',
});

var table = Ti.UI.createTableView({
	width: Ti.UI.FILL,
	height: Ti.UI.FILL,
})
win.add(table);


// TODO: write your module tests here
var photoList = require('com.oxgcp.photoList');
Ti.API.info("module is => " + photoList);

// label.text = photoList.example();

// Ti.API.info("module exampleProp is => " + photoList.exampleProp);
// photoList.exampleProp = "This is a test value";

function gpsConvert(gps) {
	var gps = gps.split(",");
	var val = 0;
	for(var i in gps) {
		val += (parseFloat(eval(gps[i])) / (Math.pow(60, i)));
	}
	
	return val;
}

function createImageWrapper(photo){
	
	var row = Ti.UI.createTableViewRow({
		width: Ti.UI.FILL,
		height: Ti.UI.SIZE,
		layout: 'vertical',
	})
	
	// var view = Ti.UI.createView({
	// 	top: 10,
	// 	width: Ti.UI.SIZE,
	// 	height: Ti.UI.SIZE,
	// 	backgroundColor: "#f00"
	// })
	// row.add(view);
	
	var data = JSON.parse(photoList.getExifData(photo.path));
	
	// image.width = data['width'];
	// image.height = data['height'];
	
	if(data['lat']){
		data['lat'] = gpsConvert(data['lat']);
	}
	if(data['lon']){
		data['lon'] = gpsConvert(data['lon']);
	}
	
	Ti.API.info(data.date + " " + data.time);
	Ti.API.info(photo.date);
	// Ti.API.info(new Date(parseInt(obj.date));
	
	var thumbnail; 
	if (data['hasThumbnail']) {
		thumbnail = photoList.getThumbnail(photo.path);
	}
	//
	
	var image = Ti.UI.createImageView({
		width: Ti.UI.SIZE,
		height: Ti.UI.SIZE,
		image: thumbnail ? thumbnail : "file://" + photo.path 
	});
	row.add(image);
	
	row.add(Ti.UI.createLabel({
		top: 10,
		text: "file://" + photo.path 
	}))
	
	// Ti.API.info("file://" + path + " has thumbnail : " + data['thumbnail']);
	
	table.appendRow(row);
}

if (Ti.Platform.name == "android") {
	// photoList = photoList.createExample({});
	
	// Ti.API.info(photoList.getPhotos(null, null))
	var photos = JSON.parse(photoList.getPhotos(0, 5));
	Ti.API.info("paths' length >>> " + photos.length)
	for(var i in photos) {
		// Ti.API.info(paths[i]);
		createImageWrapper(JSON.parse(photos[i]));
	}
	
}

win.open();