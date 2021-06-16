using System;
using Common.Constants;

namespace Model.Entity
{
    public class RailwayStation : BaseEntity
    {
        public string StationUri { get; set; }
        public string CityLabel { get; set; }
        public string StationLabel { get; set; }
        public string CityUri { get; set; }
        public string StationCoordination { get; set; }
        public string Comment { get; set; }
        public string Coordination { get; set; }
        // public string Lat{get;set;}
        // public string Long{get;set;}
        public string InstanceOf { get; set; }
        public string BranchCode { get; set; }
        //REAL sIME DATA PREDICATES
        public string TimeTableDirection { get; set; }
        public string TimeTableNetwork { get; set; }
        public string TimeTableLabel { get; set; }
        public string ArrivingTime { get; set; }
        public string DepartingTime { get; set; }
        public string TransportMean { get; set; }
        public string CommercialModes { get; set; }
        public string StopPoint { get; set; }
        public string TripId { get; set; }
        public string RecordedAt { get; set; }

        public string Latitude { get; set; }
        public string Longitude { get; set; }

        public double[] LatLng
        {
            get
            {
                try
                {
                    if (string.IsNullOrEmpty(Coordination))
                        return new[] { MapConstants.DefaultLatitude, MapConstants.DefaultLongtitude };
                    var latData = Coordination.Substring(Coordination.IndexOf("(", StringComparison.Ordinal));
                    latData = latData.Substring(1, latData.IndexOf(")", StringComparison.Ordinal) - 1);
                    var arrLatData = latData.Split(' ');
                    var xLat = double.Parse(arrLatData[0]);
                    var xLng = double.Parse(arrLatData[1]);
                    return new[] { xLat, xLng };
                }
                catch (Exception e)
                {
                    return new[] { MapConstants.DefaultLatitude, MapConstants.DefaultLongtitude };
                }
            }
        }

        public double Lat
        {
            get
            {
                try
                {
                    if (string.IsNullOrEmpty(Coordination))
                        return MapConstants.DefaultLatitude;
                    return LatLng[1];
                }
                catch (Exception e)
                {
                    return MapConstants.DefaultLatitude;
                }
            }
        }
        public double Lng
        {
            get
            {
                try
                {
                    if (string.IsNullOrEmpty(Coordination))
                        return MapConstants.DefaultLongtitude;
                    return LatLng[0];
                }
                catch (Exception e)
                {
                    return MapConstants.DefaultLongtitude;
                }
            }
        }
    }
}
