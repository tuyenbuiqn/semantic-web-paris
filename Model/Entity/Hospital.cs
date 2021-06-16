﻿
using System;
using Common.Constants;

namespace Model.Entity
{
    public class Hospital:BaseEntity
    {
        public string Uri{get;set;}
        public string Label{get;set;}
        public string Comment{get;set;}
        public string Coordination{get;set;}
        public string InstanceOf{get;set;}
        public string CityName{get;set;}
        public string CityUri{get;set;}
        public string Address{get;set;}
        public string Telephone{get;set;}
        public string MedicalSpecialty{get;set;}

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
