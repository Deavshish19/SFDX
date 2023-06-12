({
	myAction : function(component, event, helper) {
        component.set("v.Columns" , [
            {label:"Name", fieldName :"Name", type:"Text"},
            {label:"Phone", fieldName : "Phone",type:"Phone"},
            {label:"Rating", fieldName :"Rating", type:"Picklist"}       
        ]);
            
        var action =  component.get("c.getAccount");
           
        action.setCallback(this,function(data){
            component.set("v.Account" , data.getReturnValue());
        });
        
        $A.enqueueAction(action);
	}
})