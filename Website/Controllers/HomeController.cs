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
        private IBikeStationBusiness _bikeStationBusiness;
        public HomeController(
            ICityBusiness cityBusiness
            , IBikeStationBusiness bikeStationBusiness
            )
        {
            _cityBusiness = cityBusiness;
            _bikeStationBusiness = bikeStationBusiness;
        }
        public ActionResult Index()
        {
            ViewBag.SearchCityName = "LYON";
            var data = new Map();
            return View(data);
        }

        public ActionResult SearchBikeStatation(string cityName, int page)
        {
            ViewBag.SearchCityName = cityName;
            var data = _bikeStationBusiness.GetByCity(cityName);
            var pagedData = data.ToPagedList(page,30);
            return PartialView("_BikeStations",pagedData);
        }
        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }

      
    }
}