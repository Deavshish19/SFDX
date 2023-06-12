trigger AccountTrigger on Account (after update,after insert) {
    
    if(trigger.isAfter && trigger.isUpdate){
        AccountMapTriggerController.getaccount(trigger.new ,trigger.oldMap);
    }
    else if(trigger.isAfter && trigger.isInsert){
        ContactCreation.createContact(trigger.new);
        emailToAdmin.sendEmailAlert();
    }
    
}