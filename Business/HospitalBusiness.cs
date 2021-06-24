using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Remoting.Messaging;
using Business.Interfaces;
using Model.Entity;
using Model.Model;
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

        public ResultModel<bool> AddHospital(HospitalModel parameter)
        {
            string a = "https://www.wikidata.org/wiki/Property:P31";
            string wd = "https://www.wikidata.org/wiki/";
            string geo = "http://www.w3.org/2003/01/geo/wgs84_pos#";
            string organisationID = "https://www.wikidata.org/wiki/Property:P1901";
            string organisation = "https://www.wikidata.org/wiki/Property:P2541";
            string property = "https://www.wikidata.org/wiki/Property:";
            string ex = "http://www.example.org/";
            string schemaHospitalInstance = "https://schema.org/Hospital";
            string schema = "https://schema.org/";
            string date_ouverture = "https://www.wikidata.org/wiki/Property:P580";
            string hospitalGraph = "INSERT DATA {";
            try
            {
                var id = (new Random().Next(800000000, 850000000) + new Random().Next(1000, 100000));
                string hospitalQid = ex + id;
                //SettingUp-InstanceOf
                hospitalGraph += "<" + hospitalQid + "> "
                + "<" + a + "> "
                + "<" + $"{schema}Hospital" + "> . ";

                //SettingUp-finess_et

                hospitalGraph += "<" + hospitalQid + "> "
                        + "<" + $"{property}P1901" + "> "
                        + " \"" + id + "\"@en . ";

                //SettingUp-raison_sociale
                if (!string.IsNullOrEmpty(parameter.MedicalSpecialty))
                {
                    hospitalGraph += "<" + hospitalQid + "> "
                    + "<" + schema + "medicalSpecialty" + "> "
                    + " \"" + parameter.MedicalSpecialty + "\"@en . ";
                }
                //SettingUp-addressLocality
                if (!string.IsNullOrEmpty(parameter.Address))
                {
                    hospitalGraph += "<" + hospitalQid + "> "
                    + "<" + schema + "addressLocality" + "> "
                    + " \"" + parameter.Address + "\"@en . ";
                }
                //SettingUp-address
                if (!string.IsNullOrEmpty(parameter.Address))
                {
                    hospitalGraph += "<" + hospitalQid + "> "
                                     + "<" + schema + "address" + "> "
                                     + " \"" + parameter.Address + "\"@en . ";
                }

                if (!string.IsNullOrEmpty(parameter.Telephone))
                {
                    //SettingUp-telephone
                    hospitalGraph += "<" + hospitalQid + "> "
                    + "<" + schema + "telephone" + "> "
                    //					+" \""+model.createTypedLiteral(Integer.valueOf(values[4].toString())).getInt()+"\"^^<"+model.createTypedLiteral(Integer.valueOf(values[4].toString())).getDatatypeURI()+" . ";
                    + " \"" + parameter.Telephone + "\"^^<http://www.w3.org/2001/XMLSchema#int> . ";

                }
                if (!string.IsNullOrEmpty(parameter.FaxNumber))
                {
                    //SettingUp-faxNumber
                    hospitalGraph += "<" + hospitalQid + "> "
                    + "<" + schema + "faxNumber" + "> "
                    + " \"" + parameter.FaxNumber + "\"@en . ";
                }
                //SettingUp-type_etablissement
                if (!string.IsNullOrEmpty(parameter.HospitalName))
                {
                    hospitalGraph += "<" + hospitalQid + "> "
                    + "<" + property + "P2541" + "> "
                    + " \"" + parameter.HospitalName + "\"@en . ";
                }
                if (1==1)
                {
                    //SettingUp-date_ouverture
                    hospitalGraph += "<" + hospitalQid + "> "
                    + "<" + date_ouverture + "> "
                    + " \"" + 456 + "\"@en . ";
                }
                //SettingUp-lat
                if (parameter.Lat > 0)
                {
                    hospitalGraph += "<" + hospitalQid + "> "
                    + "<" + geo + "lat" + "> "
                    + " \"" + parameter.Lat + "\"@en . ";
                }
                //SettingUp-long
                if (parameter.Lng > 0)
                {
                    hospitalGraph += "<" + hospitalQid + "> "
                    + "<" + geo + "long" + "> "
                    + " \"" + parameter.Lng + "\"@en . ";
                }
                //SettingUp-COMMUNE
                if (!string.IsNullOrEmpty(parameter.BranchCode))
                {
                    hospitalGraph += "<" + hospitalQid + "> "
                    + "<" + schema + "branchCode" + "> "
                    + " \"" + parameter.CityName.ToUpper() + "\"@en . ";
                }

                //SettingUp-typeOf
                // QUAN TRONG: city nao: http://www.wikidata.org/entity/Q456   -- LYON
                if (!string.IsNullOrEmpty(parameter.Wikipedia))
                {
                    hospitalGraph += "<" + hospitalQid + "> "
                    + "<" + schema + "City" + "> "
                    + "<" + parameter.Wikipedia + "> . ";
                }

                //SettingUp-Label
                if (!string.IsNullOrEmpty(parameter.HospitalName))
                {
                    hospitalGraph += "<" + hospitalQid + "> "
                    + "<http://www.w3.org/2000/01/rdf-schema#label> "
                    + " \"" + parameter.HospitalName + "\"@en . ";
                }

                if (!string.IsNullOrEmpty(parameter.HospitalName))
                {
                    //SettingUp-Comment
                    hospitalGraph += "<" + hospitalQid + "> "
                    + "" +
                    "<http://www.w3.org/2000/01/rdf-schema#comment> "
                    + " \"" + parameter.HospitalName + "\" . ";
                }
                //SettingUp-Coordinate
                if (parameter.Lat > 0 && parameter.Lng > 0)
                {
                    hospitalGraph += "<" + hospitalQid + "> "
                    + "<" + property + "P625" + "> "
                    + " \"Point(" + parameter.Lng + " " + parameter.Lat + ")\" . ";
                    //				model.createTypedLiteral(Double.valueOf(stopLat)).getDatatypeURI()
                }
                //if (count % 100 == 0)
                //{
                //    hospitalGraph += "}";

                //    hospitalGraph = "INSERT DATA {";
                //}
                hospitalGraph += "}";
                var data =  InsertDatabase(hospitalGraph);
                return new ResultModel<bool>(false,"Thành công",true);
            }
            catch (Exception e)
            {
                return new ResultModel<bool>(true,"Thất bại",true);
            }
        }
    }
}
