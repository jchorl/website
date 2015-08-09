$(function() {
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
	})
});
