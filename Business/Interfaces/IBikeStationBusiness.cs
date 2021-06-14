using System.Collections.Generic;
using Model.Entity;

namespace Business.Interfaces
{
    public interface IBikeStationBusiness : IBaseBusiness<BikeStation>
    {
        List<BikeStation> GetByCity(string cityName);
    }
}
