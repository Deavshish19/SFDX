({
    doInit : function(component, event, helper) {
        var columns = [
            {
                type: 'text',
                fieldName: 'Name',
                label: 'Account Name'
            },
            {
                type: 'number',
                fieldName: 'NumberOfEmployees',
                label: 'Employees'
            },
            {
                type: 'phone',
                fieldName: 'Phone',
                label: 'Phone Number'
            },
            {
                type: 'text',
                fieldName: 'FirstName',
                label: 'First Name'
            },
            {
                type: 'text',
                fieldName: 'LastName',
                label: 'Last Name'
                },
            {
                type: 'email',
                fieldName: 'Email',
                label: 'Email'
            }
        ];
        component.set('v.gridColumns', columns);
        var action = component.get("c.getAccounts");
        action.setCallback(this, function(response){
            var state = response.getState();
            if (state === "SUCCESS" ) {
                var resultData = response.getReturnValue();
                for (var i=0; i<resultData.length; i++ ) {
                    resultData[i]._children = resultData[i]['Contacts'];
                    delete resultData[i].Contacts; 
                }
                component.set('v.gridData', resultData);
            }
        });
        $A.enqueueAction(action);
    }
})