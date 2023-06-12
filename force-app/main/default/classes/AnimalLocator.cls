public class AnimalLocator {
    public static string getAnimalNamebyId(integer Id){
        Http http = new Http();
        HttpRequest request = new HttpRequest();
        request.setEndpoint('https://th-apex-http-callout.herokuapp.com/animals/'+id);
        request.setMethod('GET');
        HttpResponse response =  http.send(request);
        Object animals;
        String returnValue;
        
        if(response.getStatusCode() == 200){
            map<String,Object> result = (map<String,Object>)JSON.deserializeUntyped(response.getBody());
            animals = result.get('animal');      
        }
        if(animals!= null){
           Map<String, Object> result1 = (Map<String, Object>) JSON.deserializeUntyped(JSON.serialize(animals));
            returnValue =(String) result1.get('name');
        }
        return returnValue;
        
    }
}