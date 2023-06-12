public class AccountList {
   @AuraEnabled 
    public static List <Account> getAccounts() {
        List<Account> accList = new List<Account>();
        accList = [SELECT Id, Name, NumberOfEmployees, Phone,
                   (SELECT FirstName, LastName, Email FROM Contacts)
                   FROM Account LIMIT 10];
        return accList;
    }
}