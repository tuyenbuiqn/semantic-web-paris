using System.Collections.Generic;
using Model.Entity;
using Model.Model;

namespace Business.Interfaces
{
    public interface IHospitalBusiness : IBaseBusiness<Hospital>
    {
        List<Hospital> GetByCity(string cityName);
        ResultModel<bool> AddHospital(HospitalModel parameter);
    }
}
