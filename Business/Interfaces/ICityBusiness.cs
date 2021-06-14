using System.Collections.Generic;
using Model.Entity;

namespace Business.Interfaces
{
    public interface ICityBusiness : IBaseBusiness<City>
    {
        List<City> GetAll();
    }
}
