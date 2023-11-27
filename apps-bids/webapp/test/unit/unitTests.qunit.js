/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"combids/apps-bids/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
