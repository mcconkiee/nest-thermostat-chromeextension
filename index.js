var jQuery = require('jquery'),
	angular = require('angular'),
    Firebase = require('firebase');

var app = {
	KEY_ACCESS_TOKEN : "access_token",
	PRODUCT_ID: "XXX_",
	SECRET: "XXX_",
    firebase: new Firebase('wss://developer-api.nest.com')
}
window.jQuery = jQuery;
window.app = app;

var bootstrap = require('bootstrap'),
	slider = require('bootstrap-slider');
window.bootstrap = bootstrap;
window.Slider = slider;
