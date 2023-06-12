public class covid19Parser {
    @AuraEnabled
    public AllStats allStats;
    
    @AuraEnabled
    public list<Countries> countries;
    
    public class AllStats{
        @AuraEnabled
        public String NewConfirmed;
        @AuraEnabled
        public String TotalConfirmed;
        @AuraEnabled
        public String TotalRecovered;
        @AuraEnabled
        public String TotalDeaths;
        
    }
    
    public class Countries{
        @AuraEnabled
        public String Country;
        @AuraEnabled
        public String NewConfirmed;
        @AuraEnabled
        public String TotalConfirmed;
        @AuraEnabled
        public String TotalDeaths;
        @AuraEnabled
        public String NewRecovered;
        @AuraEnabled
        public String TotalRecovered;
        @AuraEnabled
        public String NewDeaths;
    }
    
    public static Covid19Parser parse(string json){
        return (Covid19Parser) System.JSON.deserialize(json,Covid19Parser.class);
    }
}