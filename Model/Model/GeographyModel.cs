namespace Model.Model
{
    //[NotMapped]
    public class GeographyModel //:Geography
    {
        public int UserId { get; set; }
        public string FullAddress { get; set; }

        //public string MapAddress
        //{
        //    get
        //    {
        //        if (string.IsNullOrEmpty(Address) && string.IsNullOrEmpty(StreetName) && string.IsNullOrEmpty(WardName) && string.IsNullOrEmpty(DistrictName))
        //        {
        //            return UiTextConfig.DefaultFullAddress;
        //        }
        //        return CommonFunctions.GetMapAddress(Address, StreetName, WardName, DistrictName, ProvinceName);
        //    }
        //}

        public int Range { get; set; }
        //public List<AdministrativeDivisionModel> Provinces { get; set; }
        //public List<AdministrativeDivisionModel> Districts { get; set; }
        //public List<AdministrativeDivisionModel> Wards { get; set; }
        //public List<StreetModel> Streets { get; set; }

        public string ObjectTypeIds { get; set; }
        public int Radius { get; set; }
        public string Polygon { get; set; }
        public string ProductName { get; set; }
        public string ProductCategories { get; set; }
    }

    //[NotMapped]
    //public class GeographySave : Geography
    //{
    //    public string Type { get; set; }
    //}
}
