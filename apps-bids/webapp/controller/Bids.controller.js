sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("com.bids.appsbids.controller.Bids", {
            onInit: function () {
                this.getView().byId("sematicPageId").destroyTitleHeading();
                this.getView().getModel("NewModel").getData();
            }
        });
    });
