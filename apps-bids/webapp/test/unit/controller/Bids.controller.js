/*global QUnit*/

sap.ui.define([
	"combids/apps-bids/controller/Bids.controller"
], function (Controller) {
	"use strict";

	QUnit.module("Bids Controller");

	QUnit.test("I should test the Bids controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
