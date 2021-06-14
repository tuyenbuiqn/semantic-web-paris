namespace Model.Entity
{
    public class RailwayStation:BaseEntity
    {
        public string StationUri{get;set;}
        public string CityLabel{get;set;}
        public string StationLabel{get;set;}
        public string CityUri{get;set;}
        public string StationCoordination{get;set;}
        public string Comment{get;set;}
        public string Coordination{get;set;}
        public string Lat{get;set;}
        public string Long{get;set;}
        public string InstanceOf{get;set;}
        public string BranchCode{get;set;}
        //REAL sIME DATA PREDICATES
        public string TimeTableDirection{get;set;}
        public string TimeTableNetwork{get;set;}
        public string TimeTableLabel{get;set;}
        public string ArrivingTime{get;set;}
        public string DepartingTime{get;set;}
        public string TransportMean{get;set;}
        public string CommercialModes{get;set;}
        public string StopPoint{get;set;}
        public string TripId{get;set;}
        public string RecordedAt{get;set;}
    }
}
