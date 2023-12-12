sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
	"sap/ui/core/dnd/DragInfo",
	"sap/ui/core/dnd/DropInfo",
	"sap/f/dnd/GridDropInfo",
	"sap/ui/core/library"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, DragInfo, DropInfo, GridDropInfo) {
        "use strict";

        return Controller.extend("com.bids.appsbids.controller.Bids", {
            onInit: function () {
                this.getView().byId("sematicPageId").destroyTitleHeading();
                // this.byId("list1").setModel(new JSONModel([
                //     { title: "Open SAP Homepage 2x2", rows: 2, columns: 2 },
                //     { title: "Your personal information 3x3", rows: 3, columns: 3 },
                //     { title: "Appointments management 2x4", rows: 2, columns: 4 }
                // ]));
    
                var rowData = [
                    { "title": "Title 1", "subTitle": "SubTitle 1", "icon": "sap-icon://menu2", "items": [{ "key": "CV1", "text": "CV1"}, { "key": "CV2", "text": "CV2"}, { "key": "CV3", "text": "CV3"},{ "key": "CV4", "text": "CV4"}]},
                    { "title": "Title 2", "subTitle": "SubTitle 2", "icon": "sap-icon://add-contact", "items": [{ "key": "CV1", "text": "CV1"}, { "key": "CV2", "text": "CV2"}, { "key": "CV3", "text": "CV3"},{ "key": "CV4", "text": "CV4"}]},
                    { "title": "Title 3", "subTitle": "SubTitle 3", "icon": "sap-icon://business-objects-experience", "items": [{ "key": "CV1", "text": "CV1"}, { "key": "CV2", "text": "CV2"}, { "key": "CV3", "text": "CV3"},{ "key": "CV4", "text": "CV4"}]},
                    { "title": "Title 4", "subTitle": "SubTitle 4", "icon": "sap-icon://process", "items": [{ "key": "CV1", "text": "CV1"}, { "key": "CV2", "text": "CV2"}, { "key": "CV3", "text": "CV3"},{ "key": "CV4", "text": "CV4"}]},
                    { "title": "Title 4", "subTitle": "SubTitle 5", "icon": "sap-icon://process", "items": [{ "key": "CV1", "text": "CV1"}, { "key": "CV2", "text": "CV2"}, { "key": "CV3", "text": "CV3"},{ "key": "CV4", "text": "CV4"}]}
                ];       
                var oModel = new sap.ui.model.json.JSONModel();
                oModel.setData({ "cards": rowData });
                this.getView().setModel(oModel);
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
            },
            onBudgetCheck: function (oEvent) {
                var oPRFlag = "1";
                var oItemsConsistent = this.onCheckPRNonPRItmes(oPRFlag);
                if (oItemsConsistent.itemConsistent === false) {
                    MessageToast.show("Budget check can be executed only for PR items");
                    return;
                }
                var oDetailsModel = this.getOwnerComponent().getModel("DetailsModel");
                var oDetailsData;
                var oRFQType = "0";
                var oItemModel;
                var oItemData;
                if (oDetailsModel !== undefined) {
                    oDetailsData = oDetailsModel.getData();
                    if (oDetailsData !== undefined) {
                        oRFQType = oDetailsData.rfqType;
                        if (oRFQType === "1" || oRFQType === "2") {
                            oItemModel = this.getOwnerComponent().getModel("PRSelectedTreeModel");
                            if (oItemModel !== undefined) {
                                oItemData = oItemModel.getData();
                            }
                        } else if (oRFQType === "3") {
                            oItemModel = this.getView().getModel("list");
                            if (oItemModel !== undefined) {
                                oItemData = oItemModel.getData();
                                oItemData = this.onInitializeSubconData(oItemData, "PUT");
                            }
                        }
                    }
                }
    
                if (oItemModel !== undefined) {
                    if (oItemData !== undefined && oItemData.length > 0) {
                        this.onExecuteBudgetCheck(oItemData, oRFQType);
                    }
                } else {
                    MessageToast.show("No items selected for this RFQ");
                }
            }
        });
    });
