// execute when page is done loading
$(function() {
	var firstNameEl = $("#first-name"),
		lastNameEl = $("#last-name"),
		firstName = "Josh",
		lastName = "Chorlton",
		timeOut,
	cursor = '_';

	firstNameEl.text(cursor);

	function type(element, txt, removeCursor, startIndex, callback) {
		startIndex = startIndex || 0;
		var time = Math.round(Math.random() * 200) + 50;
		timeOut = setTimeout(function() {
			currString = txt.substring(0, startIndex) + cursor;

			element.text(currString);
			if (startIndex === txt.length) {
				if (removeCursor) {
					element.text(txt);
				}
				clearTimeout(timeOut);
				return callback && callback();
			}
			type(element, txt, removeCursor, ++startIndex, callback);
		}, time);
	}

	// type name
	type(firstNameEl, firstName, true, 0, type.bind(undefined, lastNameEl, lastName, false));
	if ($(document).scrollTop() !== 0) {
		$("#nav").css("background-color", "rgba(0, 0, 0, 0.9)");
	}

	// fade nav bar
	var fadeDist = $("#hero").height();
	$(document).scroll(function() {
		var scrolledDist = $(document).scrollTop();
		if (scrolledDist <= fadeDist) {
			var fractionFade = scrolledDist / fadeDist;
			var scaledFade = fractionFade * 0.9;
			var newColor = "rgba(0, 0, 0, " + scaledFade + ")";
			$("#nav").css("background-color", newColor);
		}
	});
});
