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
            },
            onRFQTypeSelected: function () {
                var oType = sap.ui.getCore().byId("RBRFQType");
                this.RFQType = oType.getSelectedButton().getText();
    
                this.onSelectType();
                if (this._oDialog) {
                    this._oDialog.close();
                }
    
                this.onCreateRFQ();
            },
        });
    });
