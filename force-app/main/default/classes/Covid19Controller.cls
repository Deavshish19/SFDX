public class Covid19Controller {
	@AuraEnabled
    public static covid19Parser getCovidData(){
        String baseUrl = 'https://api.covid19api.com/summary'; 
        HttpRequest request = new HttpRequest();
        request.setEndpoint(baseUrl);
        request.setHeader('Accept', 'application/json');
        request.setMethod('GET');
        Http h = new Http();
        HttpResponse response = h.send(request);
        
        covid19Parser parser = covid19Parser.parse(response.getBody().replace('"Global":','"AllStats":'));
        return parser;
    }
}