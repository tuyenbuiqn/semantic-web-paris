using System;
using System.Collections.Generic;

namespace Model.Entity
{
    public class Record : BaseEntity
    {
        public string Datasetid { get; set; }
        public string Recordid { get; set; }
        public List<Fields> Fields { get; set; }
        public Geometry Geometry { get; set; }
        public DateTime RecordTimestamp { get; set; }
    }
}
