using System.Collections.Generic;
using System.Linq;
using Business.Interfaces;
using Model.Entity;
using VDS.RDF.Query;

namespace Business
{
    public class RailwayStationBusiness : BaseBusiness<RailwayStation>, IRailwayStationBusiness
    {
        public RailwayStationBusiness()
        {

        }

        #region Query

        private string QueryGetByCity(string cityName)
        {
            return "PREFIX a: <https://www.wikidata.org/wiki/Property:> "
                   + "PREFIX wd:<https://www.wikidata.org/wiki/> "
                   + "PREFIX schema:<http://www.w3.org/2000/01/rdf-schema#> "
                   + "PREFIX schemaOrg:<https://schema.org/> "
                   + "SELECT DISTINCT ?comment ?stationComment ?city  ?station ?stationLabel ?stationCoordination ?branchCode {"
                   + "        ?city  a:P31 wd:Q484170 ; "
                   + "            schema:label \"" + cityName.ToUpper() + "\";"
                   + "            schema:comment ?comment ."
                   + "        ?station  a:P31 schemaOrg:TrainStation ; "
                   + "                a:P625 ?stationCoordination; "
                   + "                schemaOrg:branchCode  ?branchCode; "
                   + "                a:P131  ?city; "
                   + "                schema:comment ?stationComment; "
                   + "                schema:label ?stationLabel . "
                   + "}";
        }
        private string QueryGetStatisticalDataTimeTableV2(string cityName)
        {
            return "SELECT DISTINCT ?type  ?station ?TrainStationTimeTable  ?departingAt "
                   + "?arrivingAt ?hasDirection ?network ?recordedAt{"
                   + "   ?station  custom_ontology:hasTimeTable ?TrainStationTimeTable."
                   + "             ?TrainStationTimeTable a:P31 ?type;"
                   + "             custom_ontology:arrivingAt ?arrivingAt;"
                   + "            custom_ontology:departingAt ?departingAt;"
                   + "             custom_ontology:serviceProvidedBy ?network;"
                   + "             custom_ontology:recordedAt ?recordedAt;"
                   + "            custom_ontology:hasDirection ?hasDirection."
                   + "            ?station a:P131 ?city."
                   + "            ?city schema:label ?cityname"
                   + "            FILTER(?cityname = \"" + cityName.ToUpper() + "\")"
                   + "}";
        }
        private string QueryGetAllStationStatisticTimeTableDataByCityName(string cityName)
        {
            return "PREFIX a: <https://www.wikidata.org/wiki/Property:> "
                   + "PREFIX wd:<https://www.wikidata.org/wiki/> "
                   + "PREFIX schema:<http://www.w3.org/2000/01/rdf-schema#> "
                   + "PREFIX schemaOrg:<https://schema.org/> "
                   + "PREFIX dbo: <http://dbpedia.org/ontology/>"
                   + "PREFIX dbp: <http://dbpedia.org/property/>"
                   + "PREFIX custom_ontology:<http://www.semanticweb.org/dhayananth/ontologies/2020/11/untitled-ontology-7#>"
                   + ""
                   + "SELECT DISTINCT ?comment ?stationComment ?city  ?station ?stationLabel ?stationCoordination ?branchCode ?departingAt ?arrivingAt "
                   + "?hasDirection{"
                   + "    ?city  a:P31 wd:Q484170 ; "
                   + "    chema:label \""+cityName.ToUpper()+"\" ;"
                   + "   schema:comment ?comment ."
                   + "    ?station  a:P31 schemaOrg:TrainStation ; "
                   + "              a:P625 ?stationCoordination; "
                   + "              schemaOrg:branchCode  ?branchCode; "
                   + "              a:P131  ?city; "
                   + "              schema:comment ?stationComment; "
                   + "              schema:label ?stationLabel "
                   + "            OPTIONAL{"
                   + "          		"
                   + "        		?station  custom_ontology:hasTimeTable ?TrainStationTimeTable;"
                   + "                                    custom_ontology:arrivingAt ?arrivingAt;"
                   + "                                    custom_ontology:hasDirection ?hasDirection;"
                   + "                                    custom_ontology:departingAt ?departingAt."
                   + "                }"
                   + "}"
                   + "";
        }

        #endregion

        public List<RailwayStation> GetByCity(string cityName)
        {
            var result = new List<RailwayStation>();
            var query = QueryGetByCity(cityName);
            var data = QueryDatabase(query);
            if (data.IsEmpty || !data.Results.Any()) return result;

            foreach (SparqlResult item in data)
            {
                var railwayStation = new RailwayStation
                {
                    StationUri = item["station"].ToString(),
                    BranchCode = item["branchCode"].ToString(),
                    CityUri = item["city"].ToString(),
                    CityLabel = cityName,
                    StationLabel = item["stationLabel"].ToString(),
                    Comment = item["stationComment"].ToString(),
                    InstanceOf = item["Q484170"].ToString(),
                    Coordination = item["stationCoordination"].ToString()
                };
                result.Add(railwayStation);
            }
            return result;
        }

        public List<RailwayStation> GetStatisticalDataTimeTableV2(string cityName)
        {
            var result = new List<RailwayStation>();
            var query = QueryGetStatisticalDataTimeTableV2(cityName);
            var data = QueryDatabase(query);
            if (data.IsEmpty || !data.Results.Any()) return result;

            foreach (SparqlResult item in data)
            {
                var railwayStation = new RailwayStation
                {
                    StationUri = item["station"].ToString(),
                    TimeTableNetwork = item["network"].ToString(),
                    CityUri = item["city"].ToString(),
                    CityLabel = cityName,
                    DepartingTime = item["departingAt"].ToString(),
                    ArrivingTime = item["arrivingAt"].ToString(),
                    RecordedAt = item["recordedAt"].ToString(),
                    TimeTableDirection = item["hasDirection"].ToString(),
                    InstanceOf = item["TrainStationTimeTable"].ToString()
                };
                result.Add(railwayStation);
            }
            return result;
        }

        public List<RailwayStation> GetAllStationStatisticTimeTableDataByCityName(string cityName)
        {
            var result = new List<RailwayStation>();
            var query = QueryGetAllStationStatisticTimeTableDataByCityName(cityName);
            var data = QueryDatabase(query);
            if (data.IsEmpty || !data.Results.Any()) return result;

            foreach (SparqlResult item in data)
            {
                var railwayStation = new RailwayStation
                {
                    StationUri = item["station"].ToString(),
                    BranchCode = item["branchCode"].ToString(),
                    CityUri = item["city"].ToString(),
                    CityLabel = cityName,
                    StationLabel = item["stationLabel"].ToString(),
                    Comment = item["stationComment"].ToString(),
                    InstanceOf = item["Q484170"].ToString(),
                    Coordination = item["stationCoordination"].ToString()
                };
                result.Add(railwayStation);
            }
            return result;
        }
    }
}
