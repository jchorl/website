var locations = [],
	map,
	markers = [];

function dropMarkers(){
	removeMarkers();
	markers.forEach(function(marker, i) {
		setTimeout(addMarker(marker), i * 300);
	});
};

function initMap() {
	locations.forEach(function(loc) {
		markers.push(new google.maps.Marker({
			draggable:false,
			animation: google.maps.Animation.DROP,
			position: new google.maps.LatLng(loc.lat, loc.lon)
		}));
	});
	var mapOptions = {
		zoom: 3,
		center: new google.maps.LatLng(32.937960, -26.239040)
	};
	map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
}

function removeMarkers() {
	markers.forEach(function(marker) {
		marker.setMap(null);
	});
}

function addMarker(marker){
	return function() {
		marker.setAnimation(google.maps.Animation.DROP);
		marker.setMap(map);
	};
}

$(function() {
	$('#show-places-button').click(dropMarkers);
});
