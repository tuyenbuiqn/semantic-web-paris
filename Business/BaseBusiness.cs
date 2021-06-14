using System;
using Business.Interfaces;
using Common.Constants;
using Model.Model;
using VDS.RDF.Query;

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

        public static ResultModel<TEntity> HandleExecuteActionResultPrimitive<TEntity>(Exception exception)
        {
            return new ResultModel<TEntity>(true, exception.Message, default(TEntity));
        }
    }
}
