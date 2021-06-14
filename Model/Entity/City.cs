﻿using System;
using Common.Constants;

namespace Model.Entity
{
    public class City : BaseEntity
    {
        public string Uri { get; set; }
        public string Label { get; set; }
        public string Comment { get; set; }
        public string Coordination { get; set; }
        public string InstanceOf { get; set; }
        public string Country { get; set; }
        public string Latitude { get; set; }
        public string Longitude { get; set; }

        public double[] LatLng
        {
            get
            {
                try
                {

                    if (string.IsNullOrEmpty(Coordination))
                        return new[] { 21.039396, 105.839908 };
                    var latData = Coordination.Substring(Coordination.IndexOf("(", StringComparison.Ordinal));
                    latData = latData.Substring(0, Coordination.IndexOf(")", StringComparison.Ordinal));
                    var arrLatData = latData.Split(' ');
                    var xLat = double.Parse(arrLatData[0]);
                    var xLng = double.Parse(arrLatData[1]);
                    return new[] { xLat, xLng };
                }
                catch (Exception e)
                {
                    return new[] { 21.039396, 105.839908 };

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
                    return LatLng[0];
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
                    return LatLng[1];
                }
                catch (Exception e)
                {
                    return MapConstants.DefaultLongtitude;
                }
            }
        }
    }
}
