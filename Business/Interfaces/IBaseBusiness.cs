using VDS.RDF.Query;

namespace Business.Interfaces
{
    public interface IBaseBusiness<T>
    {
        SparqlResultSet QueryDatabase(string query);
    }
}
