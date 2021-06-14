using System.Collections.Generic;
using System.Linq;
using Business.Interfaces;
using Model.Entity;
using VDS.RDF.Query;

namespace Business
{
    public class HospitalBusiness : BaseBusiness<Hospital>, IHospitalBusiness
    {
        public HospitalBusiness()
        {

        }

        #region Query

        private string QueryGetByCity(string cityName)
        {
            return "PREFIX a: <https://www.wikidata.org/wiki/Property:> "
                   + "		PREFIX wd:<https://www.wikidata.org/wiki/> "
                   + "		PREFIX schema:<http://www.w3.org/2000/01/rdf-schema#> "
                   + "		PREFIX schemaOrg:<https://schema.org/> "
                   + "		SELECT DISTINCT ?cityComment ?hospitalComment ?city  ?hospital "
                   + "      ?hospitalLabel ?hospitalAddress  ?medicalSpecialty ?telephone ?coordinate {"
                   + " 			?city  a:P31 wd:Q484170 ; "
                   + "            		schema:label \"" + cityName.ToUpper() + "\";"
                   + "            		schema:comment ?cityComment ."
                   + "			?hospital  a:P31 schemaOrg:Hospital ; "
                   + "                    schemaOrg:City ?city; "
                   + "			           schema:comment ?hospitalComment; "
                   + "			           schemaOrg:address ?hospitalAddress; "
                   + "			           	a:P625 ?coordinate ; "
                   + "			           schemaOrg:medicalSpecialty ?medicalSpecialty; "
                   + "			           schemaOrg:telephone ?telephone; "
                   + "				       schema:label ?hospitalLabel . "
                   + "				}";
        }

        #endregion

        public List<Hospital> GetByCity(string cityName)
        {
            var result = new List<Hospital>();
            var query = QueryGetByCity(cityName);
            var data = QueryDatabase(query);
            if (data.IsEmpty || !data.Results.Any()) return result;

            foreach (SparqlResult item in data)
            {
                var hospital = new Hospital
                {
                    Label = item["hospitalLabel"].ToString(),
                    Uri = item["hospital"].ToString(),
                    CityUri = item["city"].ToString(),
                    CityName = cityName,
                    MedicalSpecialty = item["medicalSpecialty"].ToString(),
                    Address = item["hospitalAddress"].ToString(),
                    Telephone = item["telephone"].ToString(),
                    Coordination = item["coordinate"].ToString()
                };
                result.Add(hospital);
            }
            return result;
        }
    }
}
