using System.Collections.Generic;
using System.Linq;
using Business.Interfaces;
using Model.Entity;
using VDS.RDF.Query;

namespace Business
{
    public class CityBusiness : BaseBusiness<City>, ICityBusiness
    {
        public CityBusiness()
        {

        }

        #region Query

        private string QueryGetAll()
        {
            return "PREFIX wiki: <https://www.wikidata.org/wiki/Property:>"
                   + "		PREFIX wd:<https://www.wikidata.org/wiki/>"
                   + "		PREFIX schema:<http://www.w3.org/2000/01/rdf-schema#>"
                   + "		SELECT  ?Label ?City ?Coordination {"
                   + "				?City wiki:P31 wd:Q484170 ;"
                   + "				wiki:P625 ?Coordination ;"
                   + "			   	schema:label ?Label . "
                   + "		}";
        }

        #endregion

        public List<City> GetAll()
        {
            var result = new List<City>();
            var query = QueryGetAll();
            var data = QueryDatabase(query);
            if(data.IsEmpty || !data.Results.Any()) return result;

            foreach (SparqlResult item in data)
            {
                var city = new City
                {
                    Label = item["Label"].ToString(),
                    Uri = item["City"].ToString(),
                    Coordination = item["Coordination"].ToString()
                };
                result.Add(city);
            }

            return result;
        }
    }
}
