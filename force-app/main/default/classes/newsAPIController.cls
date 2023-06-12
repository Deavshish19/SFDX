public class newsAPIController {
    @AuraEnabled
    public static Map<String,object> RetrieveNews(){
        HttpRequest request =  new HttpRequest();
        request.setEndpoint('http://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=92e81932c5b64c3db1becab9ec975fcf');
        request.setMethod('GET');
        
        Map<String ,object> newsJsonData = new Map<String ,object>();
        String strResponse = null;
        
        try{
            Http http = new Http();
            HttpResponse response = http.send(request);
            if(response.getStatusCode()== 200){
                strResponse = response.getBody();
            }else {
                throw new CalloutException(response.getBody());
            }    
        }
        catch(Exception ex){
            throw ex;
        }
        
        if(!String.isBlank(strResponse)){
            newsJsonData = (Map<String, Object>)JSON.deserializeUntyped(strResponse);
        }
        if(!newsJsonData.isEmpty()){
            return newsJsonData;
        } else {
            return null;
        }
    }
}