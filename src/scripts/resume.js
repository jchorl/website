$(function() {
	var fadeThreshold = 100;
	var navBarHeight = $('#nav').outerHeight();
	var skillsEls = $('[skills]');
	var labelEls = [];
	var usageEls = [];
	var activeEls = [];

	function hasAttr(el, attr) {
		var check = el.attr(attr);
		return typeof check !== typeof undefined && check !== false;
	}

	labelEls = skillsEls.filter(function() {
		return hasAttr($(this), 'label');
	});
	usageEls = skillsEls.filter(function() {
		return hasAttr($(this), 'usage');
	});

	// add hover listeners
	labelEls.hover(function() {
		var el = $(this);
		el.addClass('active');
		var skill = el.attr('skills');
		usageEls.filter(function() {
			return $(this).attr('skills').indexOf(skill) > -1;
		}).each(function() {
			activeEls.push($(this));
			$(this).addClass('active');
		});
	}, function() {
		$(this).removeClass('active');
		activeEls.forEach(function(el) {
			el.removeClass('active');
		});
		activeEls = [];
	});

	usageEls.hover(function() {
		var el = $(this);
		el.addClass('active');
		var skills = el.attr('skills').split(' ');
		labelEls.filter(function() {
			return skills.indexOf($(this).attr('skills')) > -1;
		}).each(function() {
			activeEls.push($(this));
			$(this).addClass('active');
		});
	}, function() {
		$(this).removeClass('active');
		activeEls.forEach(function(el) {
			el.removeClass('active');
		});
		activeEls = [];
	});

	$(document).scroll(function() {
		var scrolledDist = $(document).scrollTop();
		var sidebarEl = $('#sidebar');
		var sidebarHeight = sidebarEl.outerHeight();
		var sidebarContainerTop = $('#sidebar-container').offset().top;
		var sidebarContainerBottom = sidebarContainerTop + $('#sidebar-container').outerHeight();
		var topFloatThreshold = sidebarContainerTop - navBarHeight - 5;
		var topFadeThreshold = topFloatThreshold - fadeThreshold;
		var bottomFloatThreshold = sidebarContainerBottom - sidebarHeight - navBarHeight - 5;
		var bottomFadeThreshold = bottomFloatThreshold + fadeThreshold;
		if (scrolledDist < topFadeThreshold || scrolledDist >= bottomFadeThreshold) {
			sidebarEl.removeClass('floated');
			sidebarEl.removeClass('bottom');
			sidebarEl.css('opacity', 0);
		} else if (scrolledDist >= topFadeThreshold && scrolledDist < topFloatThreshold) {
			var fractionFade = 1 - (topFloatThreshold - scrolledDist) / fadeThreshold;
			sidebarEl.css('opacity', fractionFade);
			sidebarEl.removeClass('floated');
			sidebarEl.removeClass('bottom');
		} else if (scrolledDist >= topFloatThreshold && scrolledDist < bottomFloatThreshold) {
			sidebarEl.removeClass('bottom');
			sidebarEl.addClass('floated');
			sidebarEl.css('opacity', '');
		} else if (scrolledDist >= bottomFloatThreshold && scrolledDist < bottomFadeThreshold) {
			var fractionFade = (bottomFadeThreshold - scrolledDist) / fadeThreshold;
			sidebarEl.css('opacity', fractionFade);
			sidebarEl.removeClass('floated');
			sidebarEl.addClass('bottom');
		}
	});
});
