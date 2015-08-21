var documentEl;
var width;
var sidebarContainer= $('#sidebar-container');
var sidebarEl;
var skillsBarWrapperWrapperEl;
var skillsBarWrapperEl;
var resumeHeaderBar;
var projectsSection;
var navBarHeight;
var skillsEls;
var fadeThreshold = 100;
var resumeHeaderBarHeight;
var sidebarHeight;
var sidebarContainerHeight;
var sidebarContainerTop;
var sidebarContainerBottom;
var topFloatThreshold;
var topFadeThreshold;
var bottomFloatThreshold;
var bottomFadeThreshold;
var labelEls = [];
var usageEls = [];
var activeEls = [];
var hoverListenersOn = false;

function hasAttr(attr, el) {
	var check = el.attr(attr);
	return typeof check !== typeof undefined && check !== false;
}

function partitionSkills() {
	labelEls = skillsEls.filter(function() {
		return hasAttr('label', $(this));
	});
	usageEls = skillsEls.filter(function() {
		return hasAttr('usage', $(this));
	});
}

function setBigFixedVars() {
	sidebarHeight = sidebarEl.outerHeight();
	sidebarContainerHeight = sidebarContainer.outerHeight();
}

function setSmallFixedVars() {
	resumeHeaderBarHeight = resumeHeaderBar.outerHeight();
}

function setBigVariableVars() {
	sidebarContainerTop = sidebarContainer.offset().top;
	sidebarContainerBottom = sidebarContainerTop + sidebarContainerHeight;
	topFloatThreshold = sidebarContainerTop - navBarHeight - 5;
	topFadeThreshold = topFloatThreshold - fadeThreshold;
	bottomFloatThreshold = sidebarContainerBottom - sidebarHeight - navBarHeight - 5;
	bottomFadeThreshold = bottomFloatThreshold + fadeThreshold;
}

function setSmallVariableVars() {
	topFloatThreshold = resumeHeaderBar.offset().top + resumeHeaderBarHeight - navBarHeight;;
	bottomFadeThreshold = projectsSection.offset().top + projectsSection.outerHeight() - navBarHeight;
	bottomFloatThreshold = bottomFadeThreshold + fadeThreshold;
}

function removeHoverListeners() {
	if (hoverListenersOn) {
		labelEls.unbind('mouseenter mouseleave');
		usageEls.unbind('mouseenter mouseleave');
		hoverListenersOn = false;
	}
}

function addHoverListeners() {
	if (!hoverListenersOn) {
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
		hoverListenersOn = true;
	}
}

function handleScroll() {
	var scrolledDist = documentEl.scrollTop();
	if (width >= 1650) {
		setBigVariableVars();
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
		setSmallVariableVars();
		if (scrolledDist < topFloatThreshold || scrolledDist >= bottomFloatThreshold) {
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
		}
	}
}

$(function() {
	documentEl = $(document);
	width = $(window).width();
	sidebarContainer= $('#sidebar-container');
	sidebarEl = sidebarContainer.find('#sidebar');
	skillsBarWrapperWrapperEl = $('#skills-bar-wrapper-wrapper');
	skillsBarWrapperEl = skillsBarWrapperWrapperEl.find('#skills-bar-wrapper');
	resumeHeaderBar = $('#resume-header-bar');
	projectsSection = $('#projects-section');

	navBarHeight = $('#nav').outerHeight();
	skillsEls = $('[skills]');

	partitionSkills();

	if (width >= 750) {
		if (width >= 1650) {
			setBigFixedVars();
		} else {
			setSmallFixedVars();
		}
		addHoverListeners();
		$(window).scroll(handleScroll);
	}

	$(window).resize(function() {
		width = $(window).width();
		if (width >= 750) {
			if (width >= 1650) {
				setBigFixedVars();
			} else {
				setSmallFixedVars();
			}
			addHoverListeners();
			$(window).scroll(handleScroll);
		} else {
			removeHoverListeners();
			$(window).off('scroll', handleScroll);
		}
	});
});
