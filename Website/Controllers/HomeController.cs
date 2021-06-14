using System;
using System.Web.Mvc;
using Business.Interfaces;
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
                Cities = _cityBusiness.GetAll()
            };
            return View(data);
        }

        public ActionResult SearchBikeStatation(string cityName, int page)
        {
            ViewBag.SearchCityName = cityName;
            var data = _bikeStationBusiness.GetByCity(cityName);
            var pagedData = data.ToPagedList(page,30);
            return PartialView("_BikeStations",pagedData);
        }
        public ActionResult SearchHospital(string cityName, int page)
        {
            ViewBag.SearchCityName = cityName;
            var data = _hospitalBusiness.GetByCity(cityName);
            var pagedData = data.ToPagedList(page,30);
            return PartialView("_Hospitals",pagedData);
        }
        public ActionResult SearchTrainStation(string cityName, int page)
        {
            ViewBag.SearchCityName = cityName;
            var data = _railwayStationBusiness.GetByCity(cityName);
            var pagedData = data.ToPagedList(page,30);
            return PartialView("_Trains",pagedData);
        }
    }
}