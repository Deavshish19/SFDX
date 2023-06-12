public class ContactListContrller {
    @AuraEnabled
    public static List<contact> findAll(){
        return [Select id,FirstName,LastName from Contact];
    }
    
    @AuraEnabled
    public static List<Contact> findByName(string searchKey){
        String name = '%' + searchKey +'%';
        return [Select id,Name,Phone from Contact where Name like : name];
    }
    
    @AuraEnabled
    Public Static List<contact> findById(Id contactId){
        return [Select id,Name,Phone from Contact where Id =: contactId];
    }
    
}