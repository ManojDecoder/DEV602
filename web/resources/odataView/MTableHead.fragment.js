sap.ui.jsfragment("odataView.MTableHead", {
	
    createContent: function(oController) { 
    	
    	
    	 oTable = new sap.m.Table("tblPOHeader",{
    		        tableId: "tblPOHeader", 
    		 		rowSelectionChange: oController.onRowSelect,    		        
    		 		growingThreshold:5,
    		        growing:true});  
    	 var displayPanel = new sap.m.Panel().setHeaderText('PO Header Data');
         displayPanel.setExpandable(true);
         displayPanel.setExpanded(true);
         displayPanel.addContent(oTable);
        return displayPanel;
    }  
});     	
