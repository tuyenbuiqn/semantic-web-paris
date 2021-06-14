namespace Model.Entity
{
    public class City:BaseEntity
    {
        public string Uri { get; set; }
        public string Label { get; set; }
        public string Comment { get; set; }
        public string Coordination { get; set; }
        public string InstanceOf { get; set; }
        public string Country { get; set; }
        public string Lat { get; set; }
        public string Long { get; set; }
    }
}
