using System.ComponentModel;
using Common.Extensions;

namespace Common.Constants
{
    class SemanticEnums
    {
    }

    public enum MapCategoryEnum
    {
        // Lưu trú
        [Sort(2)]
        [Description("Train Station")]
        TrainStation = 1,

        [Sort(3)]
        [Description("Hospital")]
        Hospital = 2,

        [Sort(4)]
        [Description("Bike Station")]
        BikeStation = 3,

    }
}
