({
	getApiData : function(component) {
		var action = component.get('c.getCovidData');
        
        action.setCallback(this,function(response){
            var state = response.getState(); 
            if(state==='SUCCESS' || state==='DRAFT'){
                //alert('SUCCESS');
                var result = response.getReturnValue(); 
                component.set('v.confirmed',result.allStats.TotalConfirmed);
                component.set('v.newConfirmed',result.allStats.NewConfirmed);
                component.set('v.recovered',result.allStats.TotalRecovered);
                component.set('v.deaths',result.allStats.TotalDeaths);
                
                var dataArray=[];
                
                for(var i= 0 ; i<result.countries.length;i++){
                    var fetchData = {
                        id  : i,
                        country : result.countries[i].Country,
                        newConfirmed : result.countries[i].NewConfirmed,
                        totalConfirmed : result.countries[i].TotalConfirmed,
                        newRecovered : result.countries[i].NewRecovered,
                        totalRecovered : result.countries[i].TotalRecovered,
                        newDeaths : result.countries[i].NewDeaths,
                        totalDeaths : result.countries[i].TotalDeaths,
                    }
                    dataArray.push(fetchData);
                }
                component.set('v.data',dataArray);        
            }else if(state==='ERROR'){
                alert('ERROR');
            }else if(state==='INCOMPLETE'){
                alert('INCOMPLETE');
            }
        },'ALL');
        $A.enqueueAction(action);
	}
})