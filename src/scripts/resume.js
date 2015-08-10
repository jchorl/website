$(function() {
	var sidebarEl = $('#resume-sidebar');
	var sidebarContainerEl = $('#resume-sidebar-container');
	var resumeContainerTopOffset = $('#resume-container').offset().top;
	var beginFadeSidebarThreshold = 100;
	var navBarHeight = 80;
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

	if ($(document).scrollTop() > resumeContainerTopOffset - navBarHeight - beginFadeSidebarThreshold) {
			sidebarEl.css('opacity', 1);
	}

	$(document).scroll(function() {
		var scrolledDist = $(document).scrollTop();
		if (scrolledDist >= resumeContainerTopOffset - navBarHeight - 5) {
			sidebarContainerEl.css('position', 'fixed').css('top', navBarHeight + 5 + 'px');
			sidebarEl.css('opacity', 1);
		} else if (scrolledDist >= resumeContainerTopOffset - beginFadeSidebarThreshold - navBarHeight) {
			sidebarContainerEl.css('position', 'absolute').css('top', 'auto');
			var fractionFade = 1 - (resumeContainerTopOffset - scrolledDist - navBarHeight) / beginFadeSidebarThreshold;
			sidebarEl.css('opacity', fractionFade);
		} else {
			sidebarEl.css('opacity', 0);
		}
	});
});
