using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using Business.Interfaces;
using Common.Constants;
using Model.Model;
using PagedList;
using VDS.RDF.Query;

namespace Website.Controllers
{
    public class HomeController : Controller
    {
        private ICityBusiness _cityBusiness;
        private IHospitalBusiness _hospitalBusiness;
        private IBikeStationBusiness _bikeStationBusiness;
        private IRailwayStationBusiness _railwayStationBusiness;
        public HomeController(
            ICityBusiness cityBusiness
            , IBikeStationBusiness bikeStationBusiness
            , IHospitalBusiness hospitalBusiness
            , IRailwayStationBusiness railwayStationBusiness
            )
        {
            _cityBusiness = cityBusiness;
            _bikeStationBusiness = bikeStationBusiness;
            _hospitalBusiness = hospitalBusiness;
            _railwayStationBusiness = railwayStationBusiness;
        }
        public ActionResult Index()
        {
            ViewBag.SearchCityName = "LYON";
            var data = new Map()
            {
                Cities = _cityBusiness.GetAll2()
            };
            return View(data);
        }

        public ActionResult SearchBikeStatation(string cityName, int page, int pageSize = 30)
        {
            ViewBag.SearchCityName = cityName;
            var data = _bikeStationBusiness.GetByCity(cityName);
            var pagedData = data.ToPagedList(page, pageSize);
            return PartialView("_BikeStations", pagedData);
        }
        public ActionResult SearchHospital(string cityName, int page, int pageSize = 30)
        {
            ViewBag.SearchCityName = cityName;
            var data = _hospitalBusiness.GetByCity(cityName);
            var pagedData = data.ToPagedList(page, pageSize);
            return PartialView("_Hospitals", pagedData);
        }
        public ActionResult SearchTrainStation(string cityName, int page, int pageSize = 30)
        {
            ViewBag.SearchCityName = cityName;
            var data = _railwayStationBusiness.GetByCity(cityName);
            var pagedData = data.ToPagedList(page, pageSize);
            return PartialView("_Trains", pagedData);
        }

        public JsonResult SearchMap(string cityName)
        {
            var result = new ResultModel<List<GeographyJsonModel>>()
            {
                Data = new List<GeographyJsonModel>()
            };

            var trains = _railwayStationBusiness.GetByCity(cityName).Select(x => new GeographyJsonModel()
            {
                Lat = x.Lat,
                Lng = x.Lng,
                OTId = (int)MapCategoryEnum.TrainStation,
                OId = x.OId,
                Name = x.StationLabel,
                Addr = cityName,
                ObjectDetail = new GeographyDetailJsonModel()
                {
                    Name = x.StationLabel,
                    Link = x.StationUri,
                    Mail = "mail@hust.edu.vn",
                    Phone = "(+84) (024) 678.678"
                }
            });

            var hospitals = _hospitalBusiness.GetByCity(cityName).Select(x => new GeographyJsonModel()
            {
                Lat = x.Lat,
                Lng = x.Lng,
                OTId = (int)MapCategoryEnum.Hospital,
                OId = x.OId,
                Name = x.Label,
                Addr = x.Address,
                ObjectDetail = new GeographyDetailJsonModel()
                {
                    Name = x.Label,
                    Link = x.Uri,
                    Mail = "mail@hust.edu.vn",
                    Phone = x.Telephone,
                    Infor = x.MedicalSpecialty
                }
            });
            var bikes = _bikeStationBusiness.GetByCity(cityName).Select(x => new GeographyJsonModel()
            {
                Lat = x.Lat,
                Lng = x.Lng,
                OTId = (int)MapCategoryEnum.BikeStation,
                OId = x.OId,
                Name = x.Label,
                Addr = x.Address,
                ObjectDetail = new GeographyDetailJsonModel()
                {
                    Name = x.Label,
                    Link = x.Uri,
                    Mail = "mail@hust.edu.vn",
                    Phone = "(+84) (024) 678.678",
                    Infor = $"Brand: {x.Brand} - Availability : {x.Availability} - Capacity: {x.Capacity}"
                }
            });

            result.Data.AddRange(trains);
            result.Data.AddRange(hospitals);
            result.Data.AddRange(bikes);

            return Json(result, JsonRequestBehavior.AllowGet);
        }
    }
}