public with sharing class LeaveListController {
   @AuraEnabled(cacheable=true)
   public static list<LeaveRequest__c> getLeaves(){
    return [SELECT Id,Name,From_Date__c,To_Date__c,Reason__c,Status__c,Manager_Comment__c FROM LeaveRequest__c WHERE User__c=:UserInfo.getUserId() ORDER BY CreatedDate DESC];

   }
}