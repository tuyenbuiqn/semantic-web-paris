using Model.Entity;
using Model.Model;

namespace Business.Interfaces
{
    public interface IMapBusiness: IBaseBusiness<BikeStation>
    {
        ResultModel<string> GetMapConfigurationByJson();
    }
}
