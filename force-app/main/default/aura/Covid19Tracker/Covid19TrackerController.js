({
	doInit : function(component, event, helper) {
		component.set('v.columns', [
            {label:'Country', fieldName:'country', type:'text'},
            {label:'New Confirmed', fieldName:'newConfirmed', type:'text'},
            {label:'Total Confirmed', fieldName:'totalConfirmed', type:'text'},
            {label:'New Recovered', fieldName:'newRecovered', type:'text'},
            {label:'Total Recovered', fieldName:'totalRecovered', type:'text'},
            {label:'New Deaths', fieldName:'newDeaths', type:'text'},
            {label:'Total Deaths', fieldName:'totalDeaths', type:'text'}
        ]);
        
        helper.getApiData(component);
	},
    
    showSpinner: function(component, event, helper) {
        // make Spinner attribute true for displaying loading spinner 
        component.set("v.spinner", true); 
    },
     
    // function automatic called by aura:doneWaiting event 
    hideSpinner : function(component,event,helper){
        // make Spinner attribute to false for hiding loading spinner    
        component.set("v.spinner", false);
    }
})