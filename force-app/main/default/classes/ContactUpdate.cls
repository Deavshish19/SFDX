public class ContactUpdate {
    public Static void getContact (List<Contact> newContact , Map<Id,Contact>oldContactMap){
        set<id> conIds = oldContactMap.keyset();
        List<Account> accList = new List<Account>();
        
        List<Account> acc  =[Select id,name,(Select id,Firstname,Lastname from contacts where id=: conIds) from Account];
    }
}