public class CloneAccountController {
   private final Account originalAccount;
   public List<Contact> clonedContacts { get; private set; }
   
   public CloneAccountController(ApexPages.StandardController controller) {
      originalAccount = [SELECT Id, Name, (SELECT Id, Name FROM Contacts) FROM Account WHERE Id = :controller.getId()];
      clonedContacts = new List<Contact>();
      
      // Clone the Contacts
      for (Contact contact : originalAccount.Contacts) {
         Contact clonedContact = contact.clone(false, true); // Perform shallow copy of the Contact
         clonedContacts.add(clonedContact);
      }
   }
}