using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Business.Interfaces;

namespace Website.Controllers
{
    public class MapController : Controller
    {
        private  IMapBusiness _mapBusiness;
        public MapController(IMapBusiness mapBusiness)
        {
            _mapBusiness = mapBusiness;
        }
        // GET: Map
        public JsonResult GetMapConfiguration()
        {
            var data = _mapBusiness.GetMapConfigurationByJson();
            return Json(data,JsonRequestBehavior.AllowGet);
        }
    }
}