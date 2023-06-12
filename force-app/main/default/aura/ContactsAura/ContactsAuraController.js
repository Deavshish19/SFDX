({
    goToRecord : function(component, event, helper) {
        // Fire the event to navigate to the contact record
        var SobjectEvent = $A.get("e.force:navigateToSObject");
        SobjectEvent.setParams({
            "recordId": component.get("v.contact.Id")
        })
        SobjectEvent.fire();
    }
})