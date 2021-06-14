using System.Collections.Generic;
using Model.Entity;

namespace Business.Interfaces
{
    public interface IHospitalBusiness : IBaseBusiness<Hospital>
    {
        List<Hospital> GetByCity(string cityName);
    }
}
