$(function() {

	//active schedule tabs
	var hash = window.location.hash;
	hash && $('ul.nav a[href="' + hash + '"]').tab('show');



	//highlight the current nav
	$("#home a:contains('Home')").parent().addClass('active');
	$("#artists a:contains('Artists')").parent().addClass('active');
	$("#tour a:contains('Tour')").parent().addClass('active');

	//make menus drop automatically
	$('ul.nav li.dropdown').hover(function() {
		$('.dropdown-menu', this).fadeIn();
	}, function() {
		$('.dropdown-menu', this).fadeOut('fast');
	});//hover




});