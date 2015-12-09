sap.ui.jsfragment("odataView.MTableItem", {
	
    createContent: function(oController) { 
    	
    	
    	 oTable = new sap.m.Table("tblPOItem",{
    		        tableId: "tblPOItem", 
     		 		growingThreshold:5,
    		        growing:true});  
    	 var displayPanel = new sap.m.Panel().setHeaderText('PO Item Data');
         displayPanel.setExpandable(true);
         displayPanel.setExpanded(true);
         displayPanel.addContent(oTable);
        return displayPanel;
    }  
});     	
