using Newtonsoft.Json;
using System.Collections.Generic;

namespace Model.Model
{
    public class GeographyJsonModel
    {
        public long RowNumber { get; set; }
        public double Lng { get; set; }
        public double Lat { get; set; }
        public double SLng { get; set; }
        public double SLat { get; set; }
        public string Addr { get; set; }
        public string Name { get; set; }

        public GeographyDetailJsonModel Detail => !string.IsNullOrEmpty(DetailData) ? JsonConvert.DeserializeObject<GeographyDetailJsonModel>(DetailData) : new GeographyDetailJsonModel();

        [JsonIgnore]
        public string DetailData { get; set; }
        public int OTId { get; set; }
        public string OTName { get; set; }
        public int OId { get; set; }
        public long? PId { get; set; }
        public long? DId { get; set; }
        public long? WId { get; set; }
        public int? StrId { get; set; }

        //public string MyHaNoiLink { get; set; }
        [JsonIgnore]
        public string MultiMediaData { get; set; }
        public string ImgUrl { get; set; }
        public MultiMediaGoogleMapObject MultiMedia => !string.IsNullOrEmpty(MultiMediaData) ? JsonConvert.DeserializeObject<MultiMediaGoogleMapObject>(MultiMediaData) : new MultiMediaGoogleMapObject();
        public decimal Distance { get; set; }
    }

    public class MultiMediaGoogleMapObject
    {
        public bool Video { get; set; }
        public bool Image { get; set; }
        public bool Audio { get; set; }
        public bool Other { get; set; }
    }
    public class GeographyDetailJsonModel
    {
        public string Name { get; set; }
        public string Mail { get; set; }
        public string Phone { get; set; }
        public string Web { get; set; }
        public List<GeographyDetailPropertyJsonModel> Props { get; set; }
        public List<GeographyLinkJsonModel> Links { get; set; }
        [JsonIgnore]
        public string PropsData { get; set; }
    }

    public class GeographyDetailPropertyJsonModel
    {
        public string Rating { get; set; }
    }
    public class GeographyLinkJsonModel
    {
        public string Link { get; set; }
    }
}
