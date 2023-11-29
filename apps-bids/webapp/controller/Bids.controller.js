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
            },
            onSearchPackageCode: function (oEvent) {
                var sValue = oEvent.getParameter("value");
                var oFilter = new sap.ui.model.Filter("resAnalysisCostDescription", sap.ui.model.FilterOperator.Contains, sValue, false);
                var oFilterCode = new sap.ui.model.Filter("packageCode", sap.ui.model.FilterOperator.Contains, sValue, false);
                var oFilterPackageCode = new Array();
                oFilterPackageCode.push(oFilter);
                oFilterPackageCode.push(oFilterCode);
                var aFilter = new sap.ui.model.Filter({
                    filters: oFilterPackageCode,
                    and: false
                });
    
                var oBinding = oEvent.getParameter("itemsBinding");
                oBinding.filter([aFilter]);
            }
        });
    });
