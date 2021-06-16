using System.Collections.Generic;
using System.Linq;
using Common.Constants;
using Common.Extensions;
using Model.Model;

namespace Model.Common
{
    public class CommonFunctions
    {
        public static List<Select2Data> MapCategoryEnumToListSelect2()
        {
            var result = (from MapCategoryEnum item in SortAttribute.SortEnum<MapCategoryEnum>()

                select new Select2Data()
                {
                    Id = (int)item,
                    Text = item.ToDescription()
                }).ToList();
            return result;
        }
    }
}
