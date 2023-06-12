Public Class emailToAdmin{
	Public Static void sendEmailAlert(){
		User userObj = [Select id,Name,profile.name,Email from user where Profile.Name='System Administrator'];
		Messaging.singleEmailMessage email = new Messaging.singleEmailMessage();
		email.setToAddresses(new String[] {userObj.Email});
		email.setSubject('New Account inserted');
		email.setPlainTextbody('A new Account has been inserted into salesforce');
		
		Messaging.SendEmailResult[] results = Messaging.sendEmail(new Messaging.SingleEmailMessage[] {email});
        if (results[0].isSuccess()) {
            System.debug('Email notification sent to the admin.');
        } else {
            System.debug('Email notification failed to send: ' + results[0].getErrors()[0].getMessage());
        }
	}
}