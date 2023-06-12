public class AccountMapTriggerController {
    
    public Static void getaccount(List<Account> lstAccount , Map<id,Account>oldAccountMap){
        List<contact> conUpdate = new List<Contact>();
        set<id> AccIds = new set<id>();
            for(Account acc : lstAccount){
                if(oldAccountMap.get(acc.id).Update_Contact__c != acc.Update_Contact__c){
                    AccIds.add(acc.id);
                }
                
            }
        
        List<Contact> conList = [Select id, AccountCheck__c from Contact where AccountId in: Accids];
       	
        for(Contact con :conList ){
            con.AccountCheck__c = 'Right';
            conUpdate.add(con);
        }
        update conUpdate;
         
    }

}