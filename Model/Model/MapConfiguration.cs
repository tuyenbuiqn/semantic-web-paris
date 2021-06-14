using System.Collections.Generic;
using Model.Entity;

namespace Model.Model
{
    public class Map
    {
        public int Zoom { get; set; }
        public string MapTypeId { get; set; }
        public List<StyleReference> Stylers { get; set; }
        public Position Center { get; set; }
        public List<MapCategoryIcon> MapCategoryIcons { get; set; }
        public bool DisplayMarkerImage { get; set; }

        public string SelectedCity { get; set; }
        public List<City> Cities { get; set; }
        //public List<Select2Data> MapCategories { get; set; }

        //public int DefaultSelectedDistrictId { get; set; }
        //public List<AdministrativeDivisionModel> Districts { get; set; }
        //public int DefaultSelectedWardId { get; set; }
        //public List<AdministrativeDivisionModel> Wards { get; set; }
        //public int DefaultSelectedStreetId { get; set; }
        //public List<StreetModel> Streets { get; set; }

        //public int DefaultSelectedProductCategoryId { get; set; }
        //public List<CategoryModel> ProductCategories { get; set; }

        public Map()
        {
            Cities = new List<City>();
        }
    }

    public class MapEntity
    {
        public string Title { get; set; }
        public string MapCategory { get; set; }
        public string Address { get; set; }
        public Position Position { get; set; }
        public bool IsDisableControl { get; set; }
        public GeographyModel Geography { get; set; }
        public bool IsEnableDistrict { get; set; }
        public bool IsDisableGoogleMap { get; set; }
        public bool IsEnableDetailAddress { get; set; }
        public int Order { get; set; }
        public string Id { get; set; }
            
    }

    public class Marker
    {
        public int? PointId { get; set; }
        public string Title { get; set; }
        public Position Position { get; set; }
        public string Type { get; set; }
        public bool Draggable { get; set; }
        //https://medium.com/@barvysta/google-marker-api-lets-play-level-1-dynamic-label-on-marker-f9b94f2e3585
        public MarkerLabel MarkerLabel { get; set; }
        public string Address { get; set; }
        public string Phone { get; set; }
        public string Website { get; set; }
        public string ImageUrl { get; set; }
        public int? Rating { get; set; }
        public string Description { get; set; }
        public string RatingStar
        {
            get
            {
                if (Rating <= 0) return string.Empty;
                var result = string.Empty;
                for (var i = 0; i < Rating; i++)
                {
                    result += "<i class=\"fa fa-star-o fa-lg\"></i>";
                }
                return result;
            }
        }
    }

    //public class MarkerContent
    //{
    //    public string Title { get; set; }
    //    public string Address { get; set; }
    //    public string Phone { get; set; }
    //    public string Website { get; set; }
    //    public string QrCode { get; set; }
    //    public string ImageUrl { get; set; }
    //    public int Rating { get; set; }
    //    public string Description { get; set; }
    //}

    public class MarkerLabel
    {
        public string LabelContent { get; set; }
        public string LabelClass { get; set; }
        public bool? LabelInBackground { get; set; }
        public Point Point { get; set; }
    }

    /// <summary>
    /// google.maps.Point class
    /// </summary>
    public class Point
    {
        //https://developers.google.com/maps/documentation/javascript/reference#Point
        /// <summary>
        /// The X coordinate
        /// </summary>
        public double? X { get; set; }
        /// <summary>
        /// The Y coordinate
        /// </summary>
        public double? Y { get; set; }
    }

    public class Icon
    {
        //public string Path { get; set; }
        //public double Scale { get; set; }
        //public double StrokeWeight { get; set; }
        //public string StrokeColor { get; set; }
        //public double StrokeOpacity { get; set; }
        //public string FillColor { get; set; }
        //public double FillOpacity { get; set; }

        public string Url { get; set; }
        public IconSize Size { get; set; }
        public Point Origin { get; set; }
        public Point Anchor { get; set; }
    }

    public class IconSize
    {
        public int Width { get; set; }
        public int Height { get; set; }
    }

    //https://developers.google.com/maps/documentation/javascript/style-reference
    /*
         var noPoi = [
            {
                featureType: "poi.medical",
                stylers: [
                  { visibility: "off" }
                ]
            },
            {
                featureType: "poi.business",
                stylers: [
                  { visibility: "off" }
                ]
            }
            ];
         */

    public class Styler
    {
        public string Color { get; set; }
        public string Visibility { get; set; }
        public string Weight { get; set; }
        public int Saturation { get; set; }
    }

    public class StyleReference
    {
        public string FeatureType { get; set; }
        public string ElementType { get; set; }
        public List<Styler> Stylers { get; set; }
    }

    public class Position
    {
        public double? Longitude { get; set; }
        public double? Latitude { get; set; }
    }

    public class MapCategoryIcon
    {
        public int MapCategory { get; set; }
        public Icon Icon { get; set; }
    }

    public class MapCategory
    {
        public int CategoryId { get; set; }
        public string CategoryCode { get; set; }
        public string CategoryName { get; set; }
    }
}
