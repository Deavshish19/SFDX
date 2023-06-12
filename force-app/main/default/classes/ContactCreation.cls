public class ContactCreation {
    public Static void createContact(List<Account> newAccount){
        set<id> accIds = new set<id>();
        List<Contact> conList = new List<Contact>();
        Map<id,decimal> mapAcc = new Map<id,Decimal>();
        for(Account acc:newAccount){
            mapAcc.put(acc.id,acc.Number_of_Locations__c);
            System.debug('mapAcc>>>>>>>>>' + mapAcc);
        }
        if(mapAcc != Null && mapAcc.size()>0 ){
            for(Id accId : mapAcc.keySet()){
                for(Integer i = 0 ;i<mapAcc.get(accId);i++){
                    Contact con =  new Contact();
                    con.LastName = 'Contact' + i;
                    con.AccountId = accId;
                    conList.add(con);
                }
            }
        }
        insert conList;
    }

}