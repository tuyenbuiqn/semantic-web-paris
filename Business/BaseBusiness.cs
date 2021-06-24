using System;
using System.Net;
using Business.Interfaces;
using Common.Constants;
using Model.Model;
using VDS.RDF.Parsing;
using VDS.RDF.Query;
using VDS.RDF.Update;
using VDS.RDF.Update.Commands;

namespace Business
{
    public class BaseBusiness<T> : IBaseBusiness<T> where T:class
    {
        public SparqlResultSet QueryDatabase(string query)
        {
            var endpoint = new SparqlRemoteEndpoint(new Uri(SemanticConstants.BaseUri));
            endpoint.SetCredentials(SemanticConstants.UserNameGraphDb,SemanticConstants.PasswordGraphDb);
            //VDS.RDF.Options.ForceHttpBasicAuth = true;
            SparqlResultSet results = endpoint.QueryWithResultSet(query);
            return results;
        }

        public bool InsertDatabase(string input)
        {
            ////var endpoint = new SparqlRemoteEndpoint(new Uri(SemanticConstants.BaseUriStatements));
            ////endpoint.SetCredentials(SemanticConstants.UserNameGraphDb,SemanticConstants.PasswordGraphDb);
            //////VDS.RDF.Options.ForceHttpBasicAuth = true;
            ////HttpWebResponse results = endpoint.E(query);
            ////return results;

            //var updateProcessor = new RemoteUpdateProcessor(new SparqlRemoteUpdateEndpoint(new Uri(SemanticConstants.BaseUri))); //1
            //SparqlParameterizedString queryData = new SparqlParameterizedString();
            //queryData.CommandText = input; //2
            ////queryString.SetUri("playerId", new Uri("http://example.org/player/5"));
            ////queryString.SetLiteral("givenName", "eric");//3
            ////queryString.SetLiteral("familyName", "Cantona);
            //var parser = new SparqlUpdateParser();
            //var query =   parser.ParseFromString(queryData);
            ////SparqlUpdateCommandSet query = new SparqlUpdateCommandSet();
            //query.Process(updateProcessor);//4
            //return true;

            //First build the update we want to send
            //In this example we are making a copy of a Graph then deleting the rdf:type triples
            //from our copy
            var update = new SparqlParameterizedString {CommandText = input};
            //Then create our Endpoint instance
            var endpoint = new SparqlRemoteUpdateEndpoint(SemanticConstants.BaseUriStatements);
            endpoint.SetCredentials(SemanticConstants.UserNameGraphDb,SemanticConstants.PasswordGraphDb);
            //And finally send the update request
            endpoint.Update(update.ToString());
            return true;
        }

        public static ResultModel<TEntity> HandleExecuteActionResultPrimitive<TEntity>(Exception exception)
        {
            return new ResultModel<TEntity>(true, exception.Message, default(TEntity));
        }
    }
}
