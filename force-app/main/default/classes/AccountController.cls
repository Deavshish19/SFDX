public class AccountController {
    public List<Account> accounts { get; set; }
    Public String searchString { get; set; }
    public AccountController() {
        accounts = [SELECT Id, Name, Phone, BillingCity,Rating, isSelected__c FROM Account];
    }
    
    public PageReference deleteSelected() {
        List<Account> selectedAccounts = new List<Account>();
        for (Account acct : accounts) {
            if (acct.isSelected__c) {
                selectedAccounts.add(acct);
            }
        }
        delete selectedAccounts;
        ApexPages.addMessage(new ApexPages.Message(ApexPages.Severity.INFO, 'Selected records have been deleted.'));
        return null;
    }
    
    public void Search(){
        if (searchString != null && searchString.trim() != '') {
            accounts = [SELECT Id, Name, Phone, BillingCity,Rating FROM Account 
                        WHERE Name LIKE :searchString + '%'
                        OR Phone LIKE :searchString + '%'
                        OR BillingCity LIKE :searchString + '%'];
        } else {
            accounts = [SELECT Id, Name, Phone, BillingCity,Rating FROM Account ];
        }
    }
}