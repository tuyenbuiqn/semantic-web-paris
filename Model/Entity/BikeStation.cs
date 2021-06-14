namespace Model.Entity
{
    public class BikeStation : BaseEntity
    {
        public string Uri{get;set;}
        public string Label{get;set;}
        public string Comment{get;set;}
        public string Coordination{get;set;}
        public string InstanceOf{get;set;}
        public string CityName{get;set;}
        public string CityUri{get;set;}
        public string Address{get;set;}
        public string Brand{get;set;}
        public string Capacity{get;set;}
        public string Availability{get;set;}
        public string RecordedAt{get;set;}
    }
}
