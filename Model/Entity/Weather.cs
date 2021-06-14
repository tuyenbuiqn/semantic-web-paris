namespace Model.Entity
{
   public class Weather:BaseEntity
    {
        public string Description{get;set;} //3
        public string AirHumidity{get;set;} //9
        public string TemperatureValue{get;set;} //4
        public string FeelsLike{get;set;} //5
        public string MaxTemperature{get;set;}//6 
        public string MinTemperature{get;set;} //7
        public string RecordedAt{get;set;}//12 this is the dt parameter in the json 1608244121 can be converted to 2020-12-17-23-30-42-gmt
        public string Id{get;set;}//1
        public string WeatherMain{get;set;}
        public string MainPressure{get;set;} //airPressure unit is hPa
        public string VisibiltyAhead{get;set;} //10000m = 10km. how far could have been seen in straight line without obstruction
        public string WindSpeed{get;set;} //km/hr
        public string SunRise{get;set;} //time given which is same as unix to regular dataTime conversion
        public string SunSet{get;set;}
    }
}
