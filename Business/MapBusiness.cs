using System;
using System.Collections.Generic;
using Business.Interfaces;
using Common.Constants;
using Model.Common;
using Model.Entity;
using Model.Model;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using VDS.RDF.Query;

namespace Business
{
    public class MapBusiness : IBaseBusiness<BikeStation>,IMapBusiness
    {
        public ResultModel<string> GetMapConfigurationByJson()
        {
            try
            {
                var data = GetMapConfiguration().Data;
                var serializerSettings = new JsonSerializerSettings
                {
                    ContractResolver = new CamelCasePropertyNamesContractResolver()
                };
                var jsonData = JsonConvert.SerializeObject(data, serializerSettings);

                return new ResultModel<string>(false, CommonConstants.Success, jsonData);
            }
            catch (Exception exception)
            {
                return new ResultModel<string>(true, exception.Message, default(string));
            }
        }

        public ResultModel<Map> GetMapConfiguration()
        {
            var result = new ResultModel<Map>()
            {
                Data = new Map()
                {
                    Zoom = 16,
                    MapTypeId = MapTypeConstants.Roadmap,
                    Center = new Position()
                    {
                        Latitude = UiTextConfig.DefaultLatitude,
                        Longitude = UiTextConfig.DefaultLongtitude
                    },
                    Stylers = new List<StyleReference>()
                    {
                        new StyleReference()
                        {
                            FeatureType = MapFeatureTypeConstants.PoiBusiness,
                            Stylers = new List<Styler>()
                            {
                                new Styler()
                                {
                                    Visibility = MapVisibilityConstants.Off
                                }
                            }
                        },
                        new StyleReference()
                        {
                            FeatureType = MapFeatureTypeConstants.PoiMedical,
                            Stylers = new List<Styler>()
                            {
                                new Styler()
                                {
                                    Visibility = MapVisibilityConstants.Off
                                }
                            }
                        },
                         new StyleReference()
                        {
                            FeatureType = MapFeatureTypeConstants.PoiSchool,
                            Stylers = new List<Styler>()
                            {
                                new Styler()
                                {
                                    Visibility = MapVisibilityConstants.Off
                                }
                            }
                        },
                         new StyleReference()
                        {
                            FeatureType = MapFeatureTypeConstants.TransitStationBus,
                            Stylers = new List<Styler>()
                            {
                                new Styler()
                                {
                                    Visibility = MapVisibilityConstants.Off
                                }
                            }
                        }
                    },
                    MapCategoryIcons = new List<MapCategoryIcon>(),
                    MapCategories = CommonFunctions.MapCategoryEnumToListSelect2()
                },
                IsError = false,
                Message = CommonConstants.Success
            };

            foreach (var mapCategory in result.Data.MapCategories)
            {
                var item = new MapCategoryIcon()
                {
                    MapCategory = mapCategory.Id,
                    Icon = new Icon()
                    {
                        Url = "/Content/images/markers/marker_" + mapCategory.Id + ".png",
                        Size = new IconSize()
                        {
                            Width = MapIconConstants.DefaultIconSizeWidth,
                            Height = MapIconConstants.DefaultIconSizeHeight
                        },
                        Anchor = new Point()
                        {
                            X = MapIconConstants.DefaultIconAnchorX,
                            Y = MapIconConstants.DefaultIconAnchorY
                        },
                        Origin = new Point()
                        {
                            X = MapIconConstants.DefaultIconOriginX,
                            Y = MapIconConstants.DefaultIconOriginY
                        }
                    }
                };
                result.Data.MapCategoryIcons.Add(item);
            }
            return result;
        }

        public SparqlResultSet QueryDatabase(string query)
        {
            throw new NotImplementedException();
        }
    }
}
