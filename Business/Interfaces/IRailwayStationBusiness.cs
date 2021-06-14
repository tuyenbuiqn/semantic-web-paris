using System.Collections.Generic;
using Model.Entity;

namespace Business.Interfaces
{
    public interface IRailwayStationBusiness : IBaseBusiness<RailwayStation>
    {
        List<RailwayStation> GetByCity(string cityName);
        List<RailwayStation> GetStatisticalDataTimeTableV2(string cityName);
        List<RailwayStation> GetAllStationStatisticTimeTableDataByCityName(string cityName);
    }
}
