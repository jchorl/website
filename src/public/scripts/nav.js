$(function() {
	var firstNameEl = $('#first-name'),
		lastNameEl = $('#last-name'),
		fadeDist = $('#hero').height(),
		documentEl = $(document),
		firstName = 'Josh',
		lastName = 'Chorlton',
		cursor = '_',
		nav = $('#nav'),
		navHeight = nav.height(),
		navExpandButton = $('#nav-expand-button'),
		navSections = $('#nav-sections'),
		navExpanded = false,
		navSectionsLinks = navSections.find('a'),
		timeOut;

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

	function navFade() {
		var scrolledDist = documentEl.scrollTop();
		if (scrolledDist <= fadeDist) {
			var fractionFade = scrolledDist / fadeDist;
			var scaledFade = fractionFade * 0.95;
			var newColor = 'rgba(0, 0, 0, ' + scaledFade + ')';
			nav.css('background-color', newColor);
		}
	}

	function navActive(){
		var scrollPos = documentEl.scrollTop();
		navSectionsLinks.each(function () {
			var currLink = $(this);
			var refElement = $(currLink.attr('href'));
			var topPosition = refElement.position().top;
			var height = refElement.height();
			if (topPosition <= scrollPos + navHeight && topPosition + height > scrollPos + navHeight) {
				navSectionsLinks.removeClass('active');
				currLink.addClass('active');
				return;
			}
		});
	}

	function closeNav() {
		navSections.removeClass('expanded');
		navExpanded = false;
	}

	function openNav() {
		navSections.addClass('expanded');
		navExpanded = true;
	}

	function handleExpandButtonClick() {
		if (navExpanded) {
			closeNav();
		} else {
			openNav();
		}
	}

	firstNameEl.text(cursor);

	// type name
	type(firstNameEl, firstName, true, 0, type.bind(undefined, lastNameEl, lastName, false));

	documentEl.scroll(navFade);
	documentEl.scroll(navActive);
	navExpandButton.click(handleExpandButtonClick);
	navSections.find('a').click(closeNav);

	setTimeout(navFade, 50);
});
