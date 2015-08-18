$(function() {
	var documentEl = $(document);
	var fadeThreshold = 100;
	var sidebarEl = $('#sidebar');
	var sidebarContainer= $('#sidebar-container');
	var skillsBarWrapperEl = $('#skills-bar-wrapper');
	var skillsBarWrapperWrapperEl = $('#skills-bar-wrapper-wrapper');
	var resumeHeaderBar = $('.resume-header-bar');
	var projectsSection = $('.projects-section');

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

	if (documentEl.width() >= 750) {
		addHoverListeners();
		$(window).scroll(handleScroll);
	}

	$(window).resize(function() {
		if (documentEl.width() >= 750) {
			addHoverListeners();
			$(window).scroll(handleScroll);
		} else {
			removeHoverListeners();
			$(window).off('scroll', handleScroll);
		}
	});

	function removeHoverListeners() {
		labelEls.unbind('mouseenter mouseleave');
		usageEls.unbind('mouseenter mouseleave');
	}

	function addHoverListeners() {
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
	}

	function handleScroll() {
		var scrolledDist = documentEl.scrollTop();
		var width = documentEl.width();
		if (width > 1650) {
			var sidebarHeight = sidebarEl.outerHeight();
			var sidebarContainerTop = sidebarContainer.offset().top;
			var sidebarContainerBottom = sidebarContainerTop + sidebarContainer.outerHeight();
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
		} else {
			var topFloatThreshold = resumeHeaderBar.offset().top + resumeHeaderBar.outerHeight() - navBarHeight;;
			var bottomFadeThreshold = projectsSection.offset().top + projectsSection.outerHeight() - navBarHeight;
			var bottomFloatThreshold = bottomFadeThreshold + fadeThreshold;
			if (scrolledDist < topFloatThreshold) {
				skillsBarWrapperEl.css('opacity', 1);
				skillsBarWrapperWrapperEl.css('height', 'auto');
				skillsBarWrapperEl.removeClass('floated');
			} else if (scrolledDist >= topFloatThreshold && scrolledDist < bottomFadeThreshold) {
				skillsBarWrapperEl.css('opacity', 1);
				skillsBarWrapperWrapperEl.css('height', skillsBarWrapperEl.outerHeight());
				skillsBarWrapperEl.addClass('floated');
			} else if (scrolledDist >= bottomFadeThreshold && scrolledDist < bottomFloatThreshold) {
				var fractionFade = (bottomFloatThreshold - scrolledDist) / fadeThreshold;
				skillsBarWrapperEl.css('opacity', fractionFade);
				skillsBarWrapperWrapperEl.css('height', skillsBarWrapperEl.outerHeight());
				skillsBarWrapperEl.addClass('floated');
			} else if (scrolledDist >= bottomFloatThreshold) {
				skillsBarWrapperEl.css('opacity', 1);
				skillsBarWrapperWrapperEl.css('height', 'auto');
				skillsBarWrapperEl.removeClass('floated');
			}
		}
	}
});
