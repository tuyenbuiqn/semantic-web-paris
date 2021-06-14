using System.Collections.Generic;
using System.Linq;
using Business.Interfaces;
using Common.Constants;
using Model.Entity;
using VDS.RDF.Query;

namespace Business
{
    public class BikeStationBusiness : BaseBusiness<BikeStation>, IBikeStationBusiness
    {
        public BikeStationBusiness()
        {

        }

        #region Query

        private string QueryGetByCity(string cityName)
        {
            if (cityName.ToUpper() == SemanticConstants.Lyon)
            {
                return "PREFIX a: <https://www.wikidata.org/wiki/Property:> "
                       + "PREFIX wd:<https://www.wikidata.org/wiki/> "
                       + "PREFIX schema:<http://www.w3.org/2000/01/rdf-schema#> "
                       + "PREFIX schemaOrg:<https://schema.org/> "
                       + "PREFIX dbo: <http://dbpedia.org/ontology/>"
                       + "PREFIX dbp: <http://dbpedia.org/property/>"
                       + ""
                       + "SELECT DISTINCT ?cityComment ?coordination  ?city  ?name  ?bikestation ?address ?brand ?capacity{"
                       + "    ?city  a:P31 wd:Q484170 ; "
                       + "           schema:label \"" + cityName.ToUpper() + "\" ;"
                       + "           schema:comment ?cityComment ."
                       + "       ?bikestation  a:P31 dbo:Station ;"
                       + "            a:P131 ?city; "
                       + "             a:P1192 ?name;             "
                       + "            schemaOrg:address ?address; "
                       + "            a:P625 ?coordination  ;"
                       + "            schemaOrg:brand ?brand; "
                       + "            dbp:storage ?capacity . "
                       + "}";
            }
            else
            {
                return "PREFIX a: <https://www.wikidata.org/wiki/Property:> "
                       + "		PREFIX wd:<https://www.wikidata.org/wiki/> "
                       + "		PREFIX schema:<http://www.w3.org/2000/01/rdf-schema#> "
                       + "		PREFIX schemaOrg:<https://schema.org/> "
                       + "		PREFIX dbo: <http://dbpedia.org/ontology/>"
                       + "		PREFIX dbp: <http://dbpedia.org/property/>"
                       + "		PREFIX custom_ontology:<http://www.semanticweb.org/dhayananth/ontologies/2020/11/untitled-ontology-7#>"
                       + "		SELECT DISTINCT "
                       + "		?cityComment  "
                       + "		?city ?label"
                       + "		?name  ?bikestation ?capacity ?brand ?recorderAt ?coordination ?numOf{"
                       + "    ?city  a:P31 wd:Q484170 ; "
                       + "           schema:label \"" + cityName.ToUpper() + "\" ;"
                       + "           schema:comment ?cityComment ."
                       + "		?bikestation  a:P31 dbo:Station ;"
                       + "		            a:P131 ?city ; "
                       + "		             a:P1192 ?name ;  "
                       + "		            dbp:storage ?capacity;"
                       + "		            a:P625 ?coordination ."
                       + "		 OPTIONAL{"
                       + "		       ?bikestation custom_ontology:hasAvailability ?availability."
                       + "		       ?availability a:P131 custom_ontology:Availability;"
                       + "		                     custom_ontology:numberOfAvailability ?numOf;"
                       + "		                   custom_ontology:recordedAt ?recorderAt."
                       + "		       }"
                       + " OPTIONAL{"
                       + "                ?bikestation schemaOrg:brand ?brand . "
                       + "            }"

                       + "		}";
            }
        }

        #endregion

        public List<BikeStation> GetByCity(string cityName)
        {
            var result = new List<BikeStation>();
            var query = QueryGetByCity(cityName);
            var data = QueryDatabase(query);
            if (data.IsEmpty || !data.Results.Any()) return result;

            foreach (SparqlResult item in data)
            {
                var city = new BikeStation
                {
                    Label = item["name"].ToString(),
                    Uri = item["bikestation"].ToString(),
                    Coordination = item["coordination"].ToString(),
                    CityUri = item["city"].ToString(),
                    CityName = cityName,
                    Brand = cityName.ToUpper() == SemanticConstants.Lyon ? item["brand"].ToString() : "VERT",
                    Address = cityName.ToUpper() == SemanticConstants.Lyon ? item["address"].ToString() : "N/A",
                    RecordedAt = cityName.ToUpper() == SemanticConstants.Lyon ? "N/A" : item["recorderAt"].ToString(),
                    Availability = cityName.ToUpper() == SemanticConstants.Lyon ? "N/A" : item["numOf"].ToString(),
                    Capacity = item["capacity"].ToString(),
                };
                result.Add(city);
            }
            return result;
        }
    }
}
