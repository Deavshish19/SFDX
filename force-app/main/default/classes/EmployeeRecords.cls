public class EmployeeRecords {
    public String searchTerm{get;set;}
    public List<Employee__C> filteredList {get;set;}
    public Employee__c employee { get; set; }
    
    public EmployeeRecords() {
        employee = new Employee__c();
    }
    
    public void SearchEmployee(){
        String searchQuery = 'Select id,Name,Email__c,Contact_Number__c,Department__c,Position__c from Employee__C where ';
        if(searchTerm != null){
            searchQuery += 'Name like\'%' +searchTerm +'%\' OR ';
            searchQuery += 'Department__c LIKE \'%' + searchTerm + '%\' OR ';
            searchQuery += 'Position__c LIKE \'%' + searchTerm + '%\'';
        }
        
        filteredList = Database.query(searchQuery);
    }
    
    public PageReference addEmployee() {
        return Page.NewEmployeePage;
    }
    
    public void saveEmployee(){
        try {
            insert employee;
            
        } catch (Exception e) {
            System.debug('Error');
        }
    }
         
}