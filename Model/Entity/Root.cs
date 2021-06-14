using System.Collections.Generic;

namespace Model.Entity
{
    public class Root
    {
        public int Nhits { get; set; }
        public Parameters Parameters { get; set; }
        public List<Record> Records { get; set; }
    }
}